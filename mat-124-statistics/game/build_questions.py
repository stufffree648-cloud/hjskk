#!/usr/bin/env python3
"""Parse question-bank.md and boss-battles.md into questions.js for the game."""
import json
import re
import sys
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
Q_RE = re.compile(r'^\*\*(U(\d+)-Q(\d+)|B(\d+)-(\d+)|MX-Q(\d+)|DR-(\d+))\.\*\*\s*(.*)')
OPT_RE = re.compile(r'^- ([A-D])\) ?(.*)')
ANS_RE = re.compile(r'^\*\*Answer: ([A-D])\.?\*\*\s*(.*)')
BOSS_HDR_RE = re.compile(r'^## (?:BOSS (\d+)|🐉 FINAL BOSS) — ([^(\n]+)')


def md_inline(text):
    """Escape HTML then restore minimal markdown (bold/italic/code)."""
    t = escape(text, quote=False)
    t = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'(?<![\w*])\*([^*\n]+)\*(?![\w*])', r'<i>\1</i>', t)
    t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
    return t


def md_block(lines):
    """Convert a small block (paragraphs + markdown tables) to HTML."""
    html, i = [], 0
    while i < len(lines):
        line = lines[i]
        if line.lstrip().startswith('|'):
            tbl = []
            while i < len(lines) and lines[i].lstrip().startswith('|'):
                tbl.append(lines[i].strip())
                i += 1
            rows = [r for r in tbl if not re.match(r'^\|[\s\-|]+\|$', r)]
            out = ['<table>']
            for ri, r in enumerate(rows):
                cells = [c.strip() for c in r.strip('|').split('|')]
                tag = 'th' if ri == 0 else 'td'
                out.append('<tr>' + ''.join(f'<{tag}>{md_inline(c)}</{tag}>' for c in cells) + '</tr>')
            out.append('</table>')
            html.append(''.join(out))
        else:
            para = []
            while i < len(lines) and not lines[i].lstrip().startswith('|'):
                para.append(lines[i])
                i += 1
            txt = ' '.join(p.strip() for p in para if p.strip())
            if txt:
                html.append(f'<p>{md_inline(txt)}</p>')
    return ''.join(html)


def parse_file(path):
    lines = path.read_text(encoding='utf-8').split('\n')
    questions, boss_names = [], {}
    cur = None          # question being built
    mode = None         # 'stem' | 'opts' | 'answer'
    pending_setup = []  # setup lines (tables/notes) before next question
    cur_boss = None

    def finalize():
        nonlocal cur
        if cur is None:
            return
        assert len(cur['options']) == 4, f"{cur['id']}: {len(cur['options'])} options"
        assert cur['answer'] is not None, f"{cur['id']}: no answer"
        cur['stem'] = md_block(cur['stem_lines'])
        cur['expl'] = md_inline(' '.join(x.strip() for x in cur['expl_lines'] if x.strip()))
        del cur['stem_lines'], cur['expl_lines']
        questions.append(cur)
        cur = None

    for line in lines:
        bh = BOSS_HDR_RE.match(line)
        if bh:
            finalize()
            num = int(bh.group(1)) if bh.group(1) else 10
            boss_names[num] = bh.group(2).strip()
            cur_boss = num
            pending_setup = []
            continue
        if line.startswith('## '):
            finalize()
            cur_boss = None
            pending_setup = []
            continue
        qm = Q_RE.match(line)
        if qm:
            finalize()
            qid = qm.group(1)
            if qm.group(2):
                unit, kind = int(qm.group(2)), 'bank'
            elif qm.group(4):
                unit, kind = int(qm.group(4)), 'boss'
            elif qm.group(6):
                unit, kind = 10, 'bank'   # mixed set
            else:
                unit, kind = 10, 'boss'   # dragon
            setup = [s for s in pending_setup if s.strip()]
            pending_setup = []
            cur = {'id': qid, 'unit': unit, 'kind': kind,
                   'stem_lines': setup + [qm.group(8)],
                   'options': [], 'answer': None, 'expl_lines': []}
            mode = 'stem'
            continue
        if cur is not None:
            om = OPT_RE.match(line)
            am = ANS_RE.match(line)
            if om:
                cur['options'].append(md_inline(om.group(2).strip()))
                mode = 'opts'
                continue
            if am:
                cur['answer'] = 'ABCD'.index(am.group(1))
                cur['expl_lines'] = [am.group(2)]
                mode = 'answer'
                continue
            if mode == 'stem':
                cur['stem_lines'].append(line)
            elif mode == 'answer':
                if line.strip() == '' or line.strip() == '---':
                    finalize()
                else:
                    cur['expl_lines'].append(line)
            # stray lines during 'opts' (shouldn't happen) are ignored
        else:
            if line.strip() and not line.startswith(('#', '---')):
                pending_setup.append(line)
    finalize()
    return questions, boss_names


bank_qs, _ = parse_file(ROOT / 'question-bank.md')
boss_qs, boss_names = parse_file(ROOT / 'boss-battles.md')

bank = [q for q in bank_qs if q['kind'] == 'bank']
bosses = {}
for q in boss_qs:
    bosses.setdefault(q['unit'], []).append(q)

print(f"bank questions: {len(bank)}")
for u in sorted({q['unit'] for q in bank}):
    print(f"  unit {u}: {sum(1 for q in bank if q['unit'] == u)}")
print(f"boss units: {sorted(bosses)} sizes: {[len(bosses[k]) for k in sorted(bosses)]}")
print(f"boss names: {boss_names}")

letters = [0, 0, 0, 0]
for q in bank + boss_qs:
    letters[q['answer']] += 1
print(f"answer letter balance A/B/C/D: {letters}")

# Readiness diagnostic (from performance-protocol.md §3, converted to MCQ).
# Skills: the 6th-8th-grade gaps that research shows actually sink stats students.
DIAG = [
    {"id": "D1", "skill": "percents", "stem": "<p>Write 0.3% as a decimal.</p>",
     "options": ["0.03", "0.003", "0.3", "0.0003"], "answer": 1,
     "expl": "Percent means ÷100: 0.3% = 0.3/100 = 0.003. This exact conversion shows up in every p-value and probability."},
    {"id": "D2", "skill": "percents", "stem": "<p>A lottery has a 1% chance of winning per ticket. About how many winners among 1,000 players?</p>",
     "options": ["1", "100", "50", "10"], "answer": 3,
     "expl": "1% of 1,000 = 0.01 × 1000 = 10. (Only ~80% of highly-educated adults get this one right.)"},
    {"id": "D3", "skill": "fractions", "stem": "<p>Which is larger: 4/7 or 5/8?</p>",
     "options": ["5/8", "4/7", "they are equal", "impossible to tell without a calculator"], "answer": 0,
     "expl": "5/8 = 0.625 vs 4/7 ≈ 0.571. Community-college students get fraction comparisons right only ~70% of the time — chance is 50%."},
    {"id": "D4", "skill": "fractions", "stem": "<p>Compute 1/2 ÷ 2/3.</p>",
     "options": ["1/3", "3", "3/4", "4/3"], "answer": 2,
     "expl": "Dividing by a fraction = multiply by its reciprocal: (1/2)(3/2) = 3/4. 38% of intro-stats students miss this exact item. (1/3 is the multiply-instead trap.)"},
    {"id": "D5", "skill": "decimals", "stem": "<p>True or false: 0.049 &lt; 0.05.</p>",
     "options": ["true", "false", "they are equal", "it depends on rounding"], "answer": 0,
     "expl": "0.049 < 0.050. This IS the p-value-vs-α comparison — the single most consequential decimal judgment in the course."},
    {"id": "D6", "skill": "negatives", "stem": "<p>−3² equals:</p>",
     "options": ["9", "−9", "6", "−6"], "answer": 1,
     "expl": "Exponents come before negation: −3² = −(3²) = −9, while (−3)² = 9. The TI-84 follows this rule and it's a documented top calculator error."},
    {"id": "D7", "skill": "parentheses", "stem": "<p>Compute 12 ÷ (6 ÷ 36).</p>",
     "options": ["0.056", "2", "18", "72"], "answer": 3,
     "expl": "Inside first: 6/36 = 1/6, and 12 ÷ (1/6) = 72. Typed without parentheses, 12/6/36 = 0.056 — the classic stats-formula calculator disaster (it's the t-statistic error in disguise)."},
    {"id": "D8", "skill": "formulas", "stem": "<p>Compute z = (68 − 74)/4.</p>",
     "options": ["1.5", "−6", "−1.5", "0.67"], "answer": 2,
     "expl": "(68−74) = −6, then −6/4 = −1.5. Negative z just means below the mean — you'll compute this a hundred times in Unit 5."},
    {"id": "D9", "skill": "equations", "stem": "<p>Solve for x: 1.96 = (x − 100)/15.</p>",
     "options": ["101.96", "129.4", "70.6", "96.1"], "answer": 1,
     "expl": "Multiply both sides by 15: 29.4 = x − 100, so x = 129.4. This is literally “solve the z-formula for x” — the only algebra move intro stats demands."},
    {"id": "D10", "skill": "formulas", "stem": "<p>For the data {2, 4, 9}, the sample standard deviation s = √(Σ(x−x̄)²/(n−1)) is closest to:</p>",
     "options": ["√13 ≈ 3.61", "√8.67 ≈ 2.94", "13", "26"], "answer": 0,
     "expl": "x̄ = 5; deviations −3, −1, 4; squares 9+1+16 = 26; 26/(3−1) = 13; s = √13 ≈ 3.61. (2.94 divides by n instead of n−1.) This one item rehearses ~80% of the course's hand computation."},
    {"id": "D11", "skill": "roots", "stem": "<p>√40 lies between which two whole numbers?</p>",
     "options": ["4 and 5", "5 and 6", "20 and 21", "6 and 7"], "answer": 3,
     "expl": "6² = 36 and 7² = 49, so √40 is between 6 and 7 (≈6.32). Estimating roots was one of the five skills that significantly predicted stats grades."},
    {"id": "D12", "skill": "formulas", "stem": "<p>SE = σ/√n with σ = 20 and n = 25. SE = ?</p>",
     "options": ["0.8", "100", "4", "20"], "answer": 2,
     "expl": "√25 = 5, then 20/5 = 4. (0.8 divides by n; 20 forgets to divide at all — the future SD-vs-SE trap.)"},
    {"id": "D13", "skill": "notation", "stem": "<p>Your calculator displays <code>2.3E-4</code>. As a decimal, that is:</p>",
     "options": ["2.30004", "0.00023", "23000", "0.0023"], "answer": 1,
     "expl": "E-4 means ×10⁻⁴: move the decimal 4 places left → 0.00023. Misreading E-notation as ≈2.3 is a documented exam-point killer for tiny p-values."},
    {"id": "D14", "skill": "percents", "stem": "<p>40 of 250 survey respondents said yes. The proportion who said yes is:</p>",
     "options": ["0.16", "6.25", "1.6", "0.62"], "answer": 0,
     "expl": "40/250 = 0.16 (which is 16%). Counts → proportion → percent is the p̂ pipeline you'll use in every inference chapter."},
    {"id": "D15", "skill": "notation", "stem": "<p>“x is at least 30” written in symbols is:</p>",
     "options": ["x &gt; 30", "x &lt; 30", "x ≤ 30", "x ≥ 30"], "answer": 3,
     "expl": "“At least” includes the boundary: x ≥ 30 (and yes, “at least 2” includes 2). Hypothesis-test setups live and die on this wording."},
]
dl = [0, 0, 0, 0]
for q in DIAG:
    dl[q["answer"]] += 1
print(f"diagnostic: {len(DIAG)} items, letter balance {dl}")

out = (
    '// Auto-generated by build_questions.py from question-bank.md + boss-battles.md\n'
    f'const BANK = {json.dumps(bank, ensure_ascii=False)};\n'
    f'const BOSSES = {json.dumps({str(k): {"name": boss_names.get(k, "Boss"), "questions": v} for k, v in bosses.items()}, ensure_ascii=False)};\n'
    f'const DIAG = {json.dumps(DIAG, ensure_ascii=False)};\n'
)
(ROOT / 'game' / 'questions.js').write_text(out, encoding='utf-8')
print(f"wrote questions.js ({len(out)//1024} KB)")
