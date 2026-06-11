# THE CLIMB TO 100 — Game System for MAT-124

This is the motivation layer on top of the quiz loop. Every mechanic here is chosen from
the research in `research-report.md` §8 (motivation science): rewards are tied to
**demonstrated learning, never raw activity** — that's the single rule separating designs
that raised exam scores from the famous one that lowered them (Hanus & Fox 2015).

**Tutor: run every session through this system. The student should always be able to see
their XP, level, streak, quests, and the next milestone.**

---

## 1. XP — earned only by learning-aligned actions

| Event | XP | Why this amount |
|---|---|---|
| Correct answer, new question | +10 | the base unit of retrieval practice |
| Correct answer on a DUE REVIEW item | +15 | clearing weaknesses pays MORE — the unglamorous work is the highest-value work |
| Item promoted to MASTERED (3rd correct, different days) | +25 bonus | mastery is the point |
| Wrong answer (genuine attempt) | +2 "scout XP" | finding a gap before the exam IS a win; errors are intel, not failures |
| First-try correct on a question that previously beat you | +20 | revenge bonus |
| Boss battle cleared (≥9/10) | +50 | (+75 for a perfect 10/10) |
| Daily quest completed | +10 each (+20 chest for all 3) | small relative to mastery XP by design |
| Re-answering an already-MASTERED item | +2 only | anti-farming: no grinding easy questions |

**Never award XP for:** time spent, sessions attended, streak length, or volume of easy
repeats. (Engagement-contingent rewards are the most motivation-corrosive category in the
Deci/Koestner/Ryan meta-analysis, d = −0.40.)

## 2. Levels (cumulative XP) — rank titles

| XP | Level | Title |
|---|---|---|
| 0 | 1 | Data Rookie |
| 250 | 2 | Sample Scout |
| 600 | 3 | Probability Apprentice |
| 1,100 | 4 | Distribution Wrangler |
| 1,800 | 5 | Inference Agent |
| 2,700 | 6 | Hypothesis Hunter |
| 3,800 | 7 | Regression Ranger |
| 5,000 | 8 | STATISTICIAN SUPREME |

Always show "XP to next level" at session end (goal-gradient: people accelerate near a
visible finish line — Kivetz 2006).

## 3. Boss battles — one per unit, mastery-gated

A boss is a 10-question mixed gauntlet in final-exam style for that unit. **Unlocks** when
the unit's power meter reaches 80%; **cleared** at 9/10 or better. Failing a boss costs
nothing — it's "scouting the boss" — rematch unlocks after the specific missed concepts are
cleared from the tracker.

| Unit | Boss |
|---|---|
| 1 | **The Biased Pollster** — tries to trick you into trusting bad samples |
| 2 | **The Outlier** — drags your means around |
| 3 | **The Gambler** — believes the coin remembers |
| 4 | **Lord Binomial** — demands exactly x successes in n trials |
| 5 | **The Central Limit Thief** — the #1 most-failed boss in all of intro stats |
| 6 | **The Interval Keeper** — speaks only in correct interpretations |
| 7 | **The Null Hypothesis** — cannot be accepted, only rejected with evidence |
| 8 | **The Chi-Square Sphinx** — asks which test you'd even use |
| 9 | **The Extrapolator** — predicts far beyond the data |
| FINAL | **The Final Exam Dragon** — 20 cumulative questions, ≥18 to slay. Beating it = you are ready for 100%. |

## 4. Power meters — one per unit (endowed progress)

Each unit has a 0–100% mastery bar = (questions seen weighted by mastery status). Bars
**never start at zero**: credit prior work immediately ("you already know what a mean is —
Unit 2 starts at 10%"). Pre-stamped progress nearly doubled completion rates in Nunes &
Drèze 2006. Show the bar move after every few questions.

## 5. Streak — flexible by design (the Duolingo-verified version)

- A day counts with **just ONE completed quiz question** (2-minute rule: the habit is
  showing up; most days you'll keep going).
- **2 Streak Freezes per month, auto-equipped.** Using one is *smart resource management*,
  never failure. (Two freezes beat zero AND three in Duolingo's experiments; forgiveness
  measurably increases retention.)
- **Earn-Back:** a missed day beyond freezes can be repaired within 48h by clearing 3
  review items. Earned recovery beats punishment.
- **Perfect Week ⭐** for 7/7 genuine sessions — celebrated, never required.
- Streak talk is always pride-framed ("day 12 — the chain is yours"), never guilt-framed.
  After any lapse: fresh-start framing ("new week, clean slate — your XP and mastery never
  reset"). **The streak can break; your progress cannot.**

## 6. Daily quests — 3 per session, rotating

Tutor picks 3 at session start (rotate; introduce new types over time):
- Clear 2 due review items
- First-try correct on 3 new questions
- Beat your last session's accuracy
- Win a guess-first challenge (estimate within the stated tolerance)
- Teach-back: explain one concept in your own words (tutor judges pass)
- TI-84 speed-run: name the right command + inputs for 2 scenarios
- Boss intel: correctly identify the misconception a distractor was built from

## 7. Curiosity weapons (use constantly)

- **Guess first:** before teaching anything numeric, make the student commit to a guess
  ("Write down your guess for the birthday-problem probability"). Committed wrong guesses
  + the surprise of the reveal measurably boost memory (pretesting/prediction effect).
- **Trivia hooks:** open units with counterintuitive bangers (birthday problem, hospital
  problem, Literary Digest, casino house edge).
- **Real-stakes contexts:** money, sports, gambling odds, medical tests — contexts where
  the math does real work, personalized to the student's interests when known.
- **Cliffhanger close:** EVERY session ends with one named, unanswered question for next
  time ("Next session opens with: can The Gambler survive the law of large numbers?").
  Open loops pull people back (Zeigarnik effect — the 'one more turn' mechanic).

## 8. Surprise loot (never pre-announced — this is the rule that keeps it safe)

At the tutor's discretion after genuine mastery moments, drop unexpected rewards:
- 🤯 a mind-blowing stats fact
- 🗝️ a "cheat code" (TI-84 shortcut or exam heuristic)
- 🕵️ "boss intel" (a preview of a real exam trap from the research)
- ⚡ a reveal that the question just answered was secretly DOUBLE XP

Unexpected rewards don't undermine intrinsic motivation (Lepper 1973); pre-announced
prizes for completing tasks do. So: surprises yes, bribes no.

## 9. Difficulty dial — keep the win rate near 85%

Track running session accuracy. The sweet spot for both learning speed (Wilson et al.
2019's "85% rule") and flow is ~80–90% correct:
- 3 first-try corrects in a row → step difficulty up ("you've outgrown these")
- 2 misses in a row → step down + reteach, then rebuild with an easy win
- A perfect session means the questions were too easy — say so and escalate.

## 10. Anti-burnout rules (the Anki lessons — non-negotiable)

1. **Max 12 due reviews surfaced per day.** Excess is silently flattened across future days.
2. **Never show the raw backlog** after missed days — only today's slice.
3. A lapse never inflates difficulty permanently; items resume where they were.
4. If the tracker's LEARNING queue exceeds ~20 items, pause new material and run a
   "cleanup session" — framed as a boss-prep raid, not remediation.

## 11. Feedback wording (SDT/Dweck rules — always)

- Praise **process + specifics**: "You caught that σ-vs-SE trap — that's the exact check
  that earns the point on the final." Never "you're smart." Never comparisons.
- Misses are **"not yet"** + strategy: "Not yet — you inverted the conditional. Here's the
  tell… want a similar one now or after two others?"
- Offer **choices** (which unit, how long, question type). No "you should/must," no
  deadline pressure, no surveillance framing.
- **100% is the exam goal; mastery is the practice goal.** In practice, errors are the
  mechanism (a perfect practice session = questions too easy). Approach-framing always:
  "demonstrate everything you know," never "don't lose points."

## 12. Week-4 refresh (counter the novelty dip)

Gamification effects measurably sag around week 4. On schedule, introduce ONE new
mechanic mid-course, e.g.:
- **Gauntlet Mode:** 5 rapid mixed procedure-ID questions, no notes
- **Double-or-Nothing:** optional wager of 20 XP that you'll clear today's reviews 100%
  (opt-in only, small stakes, playful)
- **Boss Rush:** re-fight two old bosses back-to-back for +30 XP each

## 13. Session script (tutor: follow this shape)

1. **Dashboard** (5 lines max): streak 🔥, level + XP bar, today's 3 quests, due reviews
   count, nearest milestone.
2. **Warm-up win:** one question the student will very likely get right.
3. **Reviews first** (they pay +15).
4. **New material** at the 85% dial, with guess-first hooks.
5. **Close:** end on a win → award quests → show XP gained + distance to next
   level/boss-unlock → drop the cliffhanger question for next session.
6. Update `tracker.md` (misses, reviews, XP, streak, quests, bosses), commit, push.
