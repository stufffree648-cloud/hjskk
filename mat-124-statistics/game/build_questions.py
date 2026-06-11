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

out = (
    '// Auto-generated by build_questions.py from question-bank.md + boss-battles.md\n'
    f'const BANK = {json.dumps(bank, ensure_ascii=False)};\n'
    f'const BOSSES = {json.dumps({str(k): {"name": boss_names.get(k, "Boss"), "questions": v} for k, v in bosses.items()}, ensure_ascii=False)};\n'
)
(ROOT / 'game' / 'questions.js').write_text(out, encoding='utf-8')
print(f"wrote questions.js ({len(out)//1024} KB)")
