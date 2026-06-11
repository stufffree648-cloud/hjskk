# Course Intel — MAT-124 with Prof. Stigliano (verified June 2026)

Everything actionable we know about THIS specific section, from the third deep-research
pass. Sources and confidence levels in `research-report.md` §9.

---

## 1. The textbook & the author's free goldmine

**Sullivan, *Statistics: Informed Decisions Using Data*, 7th ed. (Pearson, ©2025), 15
chapters in 4 parts.** A standard semester covers Ch 1–12 (+ maybe 14.1–14.2). ANOVA
(Ch 13), multiple regression (14.3+), and nonparametrics (Ch 15) are usually skipped —
and chi-square/ANOVA aren't even in CCM's MAT-124 course description, so expect the core
to be Ch 1–11.

**⚠️ KEY ORDERING QUIRK:** Sullivan covers **correlation & regression in Chapter 4** —
right after descriptive statistics, BEFORE probability. Our Unit 9 material arrives in
~week 2 of the course, descriptively (scatterplots, r, least-squares, r²); the
inference-on-regression part (t-test on slope) returns at the end (Ch 14.1–14.2) if
covered. Also: confidence intervals and hypothesis tests do **proportions first, then
means** (9.1 → 9.2, 10.2 → 10.3).

**Unit ↔ Sullivan chapter map:**

| Our unit | Sullivan 7e |
|---|---|
| U1 Data & sampling | Ch 1 (1.1–1.6) |
| U2 Descriptive stats | Ch 2 (graphs) + Ch 3 (numeric) |
| U9 Correlation/regression (descriptive) | **Ch 4** ← comes EARLY |
| U3 Probability | Ch 5 (5.1–5.4 core; 5.5 counting often optional) |
| U4 Discrete/binomial | Ch 6 (6.1–6.2; Poisson 6.3 optional) |
| U5 Normal + CLT | Ch 7 + Ch 8 |
| U6 Confidence intervals | Ch 9 (9.1 proportion, 9.2 mean) |
| U7 Hypothesis testing | Ch 10 (10.1, 10.2 proportion, 10.3 mean) |
| U8 Two-sample / chi-square | Ch 11 / Ch 12 (if covered) |
| U9 Regression inference | Ch 14.1–14.2 (if covered) |

**SullyStats — the author's own free resources (use these as PRIMARY):**
- **Chapter Test video solutions:** complete worked videos for EVERY end-of-chapter
  Chapter Test problem — by hand, TI-84, StatCrunch, Excel. The closest legal thing to an
  exam answer key, since MyLab tests draw from the same exercise bank:
  https://sullystats.com/statistics-videos/ and https://www.sullystats.com/video/
- **Classroom notes:** free fill-in lecture packets for Ch 1–14 with fresh examples not
  in the book: https://sullystats.com/classroom-notes/
- **Every dataset as CSV** (Ch_Section_Problem naming): https://sullystats.github.io/Stats7e/
- **YouTube** (partial, StatCrunch-heavy): https://www.youtube.com/channel/UCzr7w2ao67nC8lldc77Rcrg
- 7e additions: R support + free R Guidebook (https://sullystats.com/r-guidebook/),
  NHANES/tornado threaded datasets, simulation "A/B" section tracks.

## 2. The Stigliano playbook (from past students)

- **She gives a study guide that "looks exactly like the test"** (verbatim student quote,
  grade-A reviewer). Rule: the day a study guide drops, it becomes the question bank's
  top priority — every problem type on it gets drilled to 3-consecutive-correct.
- **Tests/quizzes ≈ 20 points, NO partIAL credit, test-heavy grade, NO feedback returned
  on exams.** Implications: (1) one slip = ~5% of a test, so precision drills + the
  MyLab formatting checklist below matter as much as concepts; (2) all diagnosis happens
  BEFORE test day — that's the tracker's job; (3) treat every boss battle as a dress
  rehearsal under no-partial-credit scoring.
- **Her own syllabus reportedly advises 9–12 hrs/week** for the 7-week format. A student
  doing 10 hrs/week got a C+. For 100%: plan 12+, front-load before July 1.
- **4.1/5 on RMP (51 ratings, 76% would take again), difficulty 2.9.** Strengths per
  reviews: "amazing lectures," clear grading criteria, good homework feedback, very
  responsive to email, "wants students to succeed." The negative cluster = students who
  fell behind the accelerated pace (one class reportedly shrank 20+ → 6 via withdrawals).
- **Week-1 questions to email her** (not public anywhere): exact grade weights; exam
  format (MC vs show-work) and modality (Blackboard/MyLab online vs Testing Center);
  proctoring/webcam rules; any dropped-quiz/curve/extra-credit policy (assume none).

## 3. MyLab Statistics — never lose a point (mechanics verified from Pearson docs)

**Homework = guaranteed 100% if you grind it:**
- **"View an Example"** costs nothing and does NOT regenerate your problem — use freely.
- **"Help Me Solve This"** costs nothing but regenerates the numbers afterward.
- **"Similar Exercise"** (after a wrong answer) generates a fresh version whose score
  REPLACES the old one — repeatable until the due date on homework. Never settle below 100%.
- Watch "tries per part" (often 3 checks per answer box) — re-read the instruction in
  parentheses before your last try.
- **Quizzes/tests:** all aids disabled, often 1 try/question, may block going back, timer
  keeps running if you leave, question pooling means everyone gets different numbers.
  Items usually come from the SAME exercise bank as homework, re-randomized → re-drilling
  homework via Similar Exercise is the highest-yield test prep.

**The formatting checklist (tape to monitor):**
1. NEVER round intermediate values — carry 6+ decimals; round only the final answer.
2. "Round to X places as needed" = exactly X places.
3. Percent box (% shown) → enter 45.3; proportion/probability "as a decimal" → 0.453.
4. **Sample size n always rounds UP** (122.04 → 123).
5. Use the math palette for fractions/√/exponents — never improvise with / or ^.
6. No $ signs, commas, units, or % unless the box shows them.
7. "Use technology" → use StatCrunch full-precision output; "use the table" → table values.
8. Hypotheses are dropdowns — only the numeric null value is typed; match units exactly.
9. Confidence intervals are usually two boxes (lower, upper) — keep the order.
10. Work every problem on paper first — your notebook becomes the exam review.
11. Use Review mode on completed work (Results > Review) — free answer key for studying.
12. 14-day free temporary MyLab access exists — activate day 1, buy the code by mid-July.

**StatCrunch quick paths** (datasets preload from MyLab questions): Stat > Summary Stats >
Columns · Stat > Calculators > Normal/Binomial · Stat > Proportion Stats / T Stats (One
Sample > With Summary; choose CI or Hypothesis Test radio button) · Stat > Regression >
Simple Linear · Graph > Histogram/Boxplot. Copy unrounded output into MyLab, round last.

## 4. CCM logistics — Summer 2026, 7-week session

- **LMS: Blackboard** (courses.ccm.edu) — course appears ~8 a.m. on **July 1**. Login:
  lastname.firstname; Titans Direct is just registration.
- **Key dates:** classes Jul 1 – Aug 18 · College closed Jul 4 · **withdraw-with-W
  deadline ≈ Aug 4** · no separate finals week (final lands in the last days) · grades
  due Aug 20.
- **GRADING SCALE: A = 93–100** (A− = 90–92, B+ = 87–89, B = 83–86). Every point counts.
- **Proctoring:** CCM has no public Respondus/Honorlock license; online sections are
  asynchronous, and the campus **Testing Center (LRC 102, testing@ccm.edu,
  973-328-5362)** proctors online-course exams when required. Confirm modality from the
  syllabus day 1.
- **Free help:** Tutoring Center DH-156 (virtual appointments, tutorcenter@ccm.edu,
  973-328-5367) · Math Center walk-ins (LRC 2nd floor) · **Brainfuse 24/7 online
  tutoring** incl. statistics, free via Blackboard.
- Transfer: MAT-124 is NJ-Transfer listed (maps to intro-stats at Rutgers/Montclair/NJIT);
  grade of C+ better required for course-by-course credit — moot at 100%.

## 5. Practice-exam library (Sullivan-aligned, free)

- **Author's chapter-test solution videos** (see §1) — first stop before every test.
- LA Mission College Math 227 (uses Sullivan Fundamentals) posted real exams + keys:
  - Exam 1 key (Ch 1): https://mymission.lamission.edu/userdata/yamadarn/docs/SP15%20Math%20227/Math%20227%20Exam%201%20Key.pdf
  - Exam 2 key (Ch 5–6): https://mymission.lamission.edu/userdata/yamadarn/docs/SP15%20Math%20227/Math%20227%20Exam%202%20Key.pdf
  - Ch 1–6 cumulative review: https://mymission.lamission.edu/userdata/sargsye2/docs/Math%20227/Resources/Math%20227%20Review%20of%20Chapters%201%20through%206.pdf
  - Sullivan-keyed chapter answer keys (Ch 1, 9, 10): see research-report §9 links
- Quizlet hub (~275 sets by Sullivan chapter): https://quizlet.com/subject/Statistics-Informed-Decisions-Sullivan/
- Generic cumulative practice final: https://www.mtsac.edu/eops/tutoring/Math_110_Statistics_Final_Review_Exercises.pdf

## 6. Revised 7-week battle plan (Sullivan chapter order)

| Week | Dates | Sullivan | Our units | Boss |
|---|---|---|---|---|
| 0 (pre-game) | now–Jun 30 | Ch 1–3 preview | U1, U2 | Biased Pollster, The Outlier |
| 1 | Jul 1–7 | Ch 1–2 + syllabus recon | U1, U2 | (banked) |
| 2 | Jul 8–14 | Ch 3–4 | U2, **U9-descriptive** | The Extrapolator (part 1) |
| 3 | Jul 15–21 | Ch 5–6 | U3, U4 | The Gambler, Lord Binomial |
| 4 | Jul 22–28 | Ch 7–8 | U5 ⚠️ hardest | The Central Limit Thief + **week-4 mechanic refresh** |
| 5 | Jul 29–Aug 4 | Ch 9 | U6 | The Interval Keeper (W-deadline Aug 4) |
| 6 | Aug 5–11 | Ch 10–11 | U7, U8 | The Null Hypothesis |
| 7 | Aug 12–18 | Ch 12/14 if covered + cumulative | all | **The Final Exam Dragon** |

Adjust to the real syllabus pacing on July 1 — but Sullivan chapter order is near-certain.
