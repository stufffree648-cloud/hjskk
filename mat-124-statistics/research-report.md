# Deep-Research Report: MAT-124 Statistics (CCM, Summer 2026)

Research date: June 11, 2026. Method: 10 parallel web-research agents (course
identification, curriculum mapping, assessment formats, misconceptions, videos ×4,
study-science ×2) followed by an adversarial verification pass on the load-bearing claims.
Most .edu/publisher sites block automated fetching (HTTP 403), so many findings were
triangulated from search-index excerpts across multiple independent queries; confidence
is flagged throughout.

---

## 1. The course (verification verdicts in brackets)

- **[VERIFIED]** Institution: **County College of Morris**, Randolph NJ. Deanne Stigliano is
  Associate Professor & Assistant Chair, Mathematics — the only academic "Deanne Stigliano"
  found anywhere. Sources: https://www.ccm.edu/teachers/stigliano-deanne/,
  https://www.ratemyprofessors.com/professor/1766779 (4+/5, ~51 ratings)
- **[VERIFIED]** MAT-124 "Statistics": 3 credits, 45 lecture hours; prereq MAT-016/026/120
  or equivalent; credit for only one of MAT-124/MAT-130. Catalog:
  https://catalog.ccm.edu/credit/courselistings/mat/ · Master syllabus:
  https://www.ccm.edu/wp-content/uploads/2024/08/MAT-124-Statistics.pdf
- **[LIKELY]** The five course outcomes listed in `study-guide.md` (sampling methods,
  descriptive stats, CIs for the mean, hypothesis tests for the mean σ known/unknown,
  correlation/regression) — consistently returned by exact-phrase searches of the official
  syllabus PDF, but the PDF itself is fetch-blocked so not quoted verbatim.
- **[VERIFIED]** Calculator policy: "only TI 84 models or below are acceptable," TI-Nspire
  and all Casio models prohibited (identical language across CCM math syllabi).
- **[LIKELY]** Textbook: Sullivan, *Statistics: Informed Decisions Using Data*, 7th ed.
  (Pearson) + R Technology Guide supplements; **MyLab Statistics** homework (CCM bookstore
  sells an "Intro Statistics w/MyStatLab" package:
  https://bookstore.ccm.edu/intro-statistics-wmystatlab-and-sol-man-pkg-ccm; student
  reviews confirm "homework is done on Mathlab").
- **[VERIFIED]** Term: 7-week Summer 2026 session, **July 1 – August 18, 2026**
  (https://wrnjradio.com/county-college-of-morris-opens-registration-for-summer-session-2026/,
  TAPinto Morristown, updated June 9, 2026).
- **[NOT PUBLIC]** Grade breakdown for this section — no public CCM MAT-124 syllabus shows
  percentages. Anecdotal (RateMyProfessors): tests/quizzes scored out of 20, **no partial
  credit**. Comparable online summer sections elsewhere run: homework 10–20% (up to 35%
  online), quizzes 10–25%, unit exams 40–60%, cumulative final 20–30% (e.g., Nashville
  State MATH 1530: HW 10/quizzes 10/three tests 60/final 20 —
  https://ww2.nscc.edu/catalog/desc/syllabi/math/math1530.pdf; NTCC online summer:
  proctored final worth 30% — https://www.ntcc.edu/sites/default/files/hb2504/documents/5336.pdf).
  **Update this file when the real syllabus opens July 1.**

## 2. The curriculum (what to learn)

The canonical 9-unit sequence in `study-guide.md` was cross-verified against four
textbooks' tables of contents — OpenStax *Introductory Statistics 2e*
(https://openstax.org/books/introductory-statistics-2e/pages/index), Triola *Elementary
Statistics* 14e (https://www.triolastats.com/es14), Larson/Farber 8e
(https://www.pearson.com/en-us/subject-catalog/p/elementary-statistics-picturing-the-world/P200000007106),
OpenIntro Statistics 4e (https://open.umn.edu/opentextbooks/textbooks/60) — and the ASA's
GAISE College Report (https://www.amstat.org/asa/files/pdfs/gaise/gaisecollege_full.pdf).
All four books follow the same arc; CCM's course description matches it exactly.
Universal topics: data/sampling/design → descriptive stats → probability → binomial →
normal/CLT → CIs → hypothesis tests (one mean t, one proportion z) → two-sample →
correlation/regression; chi-square near-universal; ANOVA is the classic "if time permits"
cut, especially plausible to be cut in a 7-week summer section.

## 3. Most-missed topics (where the quiz fire is concentrated)

From CAOS assessment research (delMas, Garfield, Ooms & Chance 2007 — average posttest
score after a full course: just 54%! https://www.stat.auckland.ac.nz/~iase/serj/SERJ6(2)_delMas.pdf),
the Castro Sotos et al. 2007 review
(https://www.sciencedirect.com/science/article/abs/pii/S1747938X07000164), Hoekstra et
al. 2014 on CIs (https://link.springer.com/article/10.3758/s13423-013-0572-3), and a 2025
instructor survey (https://www.tandfonline.com/doi/full/10.1080/26939169.2025.2455560):

1. **Sampling distributions / CLT** — consensus hardest topic in intro stats
2. **Confidence-interval interpretation** — students endorse valid AND invalid readings
   simultaneously; "95% of data" error *increases* during a typical course
3. **p-value logic** — only ~20% of methodology *instructors* flagged all six false
   p-value statements (Haller & Krauss 2002)
4. **SD vs SE confusion**, 5. **conditional probability inversion**, 6. **t vs z**,
7. **regression interpretation** (r vs r², deterministic slope, extrapolation)

The 24-item misconception list driving the distractors in `question-bank.md` includes:
p-value = P(H₀) inversion · CI = "95% of data" · "data become normal" CLT error ·
SD-vs-SE · "fail to reject = accept" · mutually-exclusive-means-independent · gambler's
fallacy · hospital-problem insensitivity to n · base-rate neglect / inverted conditionals ·
correlation→causation · Type I/II swap · "n ≥ 30 → z" · sample-vs-population hypotheses ·
significance = importance · replication fallacy · equiprobability bias · outcome
orientation · variability-as-bumpiness · bigger-sample-fixes-bias · r vs r² ·
deterministic slope · meaningless intercept · extrapolation · wider-CI-when-n-grows.

## 4. Assessment landscape

- **MyLab Statistics** dominates (numeric entry with strict rounding, MC, StatCrunch
  applets; homework allows "View an Example" + similar-question retries; quizzes/tests
  disable aids; proctoring via LockDown Browser/Honorlock is common for finals).
- **13 recurring final-exam question types** were compiled from five public final reviews
  (Broward STA2023: https://www.broward.edu/students/asc/north-asc/_docs/sta2023-exam-review.pdf,
  Mt. SAC practice final, MCCKC MC review, East Central 30-pp review w/ keys, Monroe CC) —
  the list is in `study-guide.md` and the Mixed Set of `question-bank.md` mirrors it.
- **TI-84 keystrokes that get tested:** 1-Var Stats, binompdf/cdf, normalcdf, invNorm,
  TInterval, 1-PropZInt, T-Test, Z-Test, 1-PropZTest, 2-SampTTest, χ²-Test, LinReg(ax+b)
  with DiagnosticOn (e.g., https://www.mtsac.edu/eops/tutoring/Math_110_Statistics_Final_Review_Exercises.pdf,
  Moorpark TI guide).

## 5. The study protocol is evidence-based (why the loop works)

- **Practice testing & spaced practice are the only two "high-utility" techniques** of ten
  reviewed in Dunlosky et al. 2013 (rereading/highlighting/summarizing rated LOW):
  https://journals.sagepub.com/doi/abs/10.1177/1529100612453266
- **Testing effect:** one read + three recall attempts beat four reads, 61% vs 40% recall
  at one week (Roediger & Karpicke 2006):
  https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x
- **MC practice works when distractors are competitive** — and it strengthens knowledge of
  why lures are wrong, transferring even to related untested questions (Little, Bjork,
  Bjork & Angello 2012:
  https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/07/Little_EBjork_RBjork_Angello_2012.pdf);
  meta-analytically, MC practice tests g = 0.70 vs restudy (Adesope et al. 2017:
  https://journals.sagepub.com/doi/abs/10.3102/0034654316689306). Feedback prevents
  learning the lures (Butler & Roediger 2008:
  https://link.springer.com/article/10.3758/MC.36.3.604), and **explanation feedback beats
  answer-only feedback for transfer** (Butler, Godbole & Marsh 2013:
  https://eric.ed.gov/?id=EJ1007933).
- **Spacing:** optimal review gap ≈ 10–20% of the time until the exam (Rohrer & Pashler
  2007: https://files.eric.ed.gov/fulltext/ED505647.pdf); for a 35-day retention interval
  the empirical optimum was an 11-day gap (Cepeda et al. 2008, N>1,350:
  https://journals.sagepub.com/doi/abs/10.1111/j.1467-9280.2008.02209.x) → in a 7-week
  course: re-test each unit ~5–10 days after learning it, again in final-review week.
- **Interleaving:** mixing problem types beat blocked practice on delayed tests in a
  preregistered RCT of 787 students — 61% vs 38%, d = 0.83 (Rohrer, Dedrick, Hartwig &
  Cheung 2020: https://files.eric.ed.gov/fulltext/ED595322.pdf). Blocked practice *feels*
  better while performing worse — don't trust practice fluency. The killer skill it builds
  is exactly what stats finals demand: *choosing which procedure applies*.
- **Successive relearning** (retrieve to criterion, then ~3 spaced relearning sessions)
  raised real course exam scores by ~a letter grade (Rawson, Dunlosky & Sciartelli 2013:
  https://link.springer.com/article/10.1007/s10648-013-9240-4; replication with d = 0.54–1.10:
  Janes et al. 2020: https://onlinelibrary.wiley.com/doi/abs/10.1002/acp.3699). This is the
  basis for the tracker's "3 consecutive correct on different days = mastered" rule.

## 6. Video resources (full comparison)

| Resource | Coverage | Length | Best for |
|---|---|---|---|
| Khan Academy Statistics & Probability | ALL units, 16-unit sequence + exercises/mastery | 5–12 min | spine: first exposure + practice |
| jbstatistics (Balka, U. Guelph) | Units 4–9 superbly; thin on design/descriptive | 5–10 min | rigorous concepts, inference half |
| Organic Chemistry Tutor | descriptive→hypothesis testing | 30–60 min | worked computational examples |
| StatQuest (Starmer) | CLT, SE, p-values, regression; no z-test/chi-square depth; bootstrap-flavored CIs | 5–15 min | intuition repair |
| Crash Course Statistics (44 eps, AP-based) | broad, almost no computation | ~11 min | first-exposure previews |
| Professor Leonard | full lectures through ONE-sample hypothesis testing only | 1–2.5 hr | deep dives, units 1–7 |
| Brandon Foltz Statistics 101 | descriptive → ANOVA | ~30 min | slow rescue lectures |
| Simple Learning Pro | descriptive + inference basics | ~5 min | quick refreshers |

Key URLs: https://www.khanacademy.org/math/statistics-probability ·
https://www.jbstatistics.com/chapters-lessons/ ·
https://www.youtube.com/playlist?list=PL0o_zxa4K1BVsziIRdfv4Hl4UIqDZhXWV (OCT) ·
https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9 (StatQuest) ·
https://www.youtube.com/playlist?list=PL8dPuuaLjXtNM_Y-bUAhblSAdWRnmBUcr (Crash Course) ·
https://www.youtube.com/playlist?list=PL5102DFDC6790F3D0 (Prof Leonard) ·
https://www.bcfoltz.com/stats-101/ (Foltz). jbstatistics also has a free ~450-pp textbook
with exercises/answers: https://www.jbstatistics.com/text-resources/.

## 7. Open items (to resolve after July 1, 2026)

1. Pull the real section syllabus: grade breakdown, exam count/dates, proctoring rules,
   whether chi-square/ANOVA are included, exact MyLab assignment list.
2. Confirm textbook edition from the course shell/bookstore listing.
3. Re-map the week-by-week schedule in `study-guide.md` to the actual due dates.
