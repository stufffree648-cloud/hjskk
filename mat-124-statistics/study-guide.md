# MAT-124 Statistics — Master Study Guide

**Course:** 26SU7W Statistics (MAT-124-56143), County College of Morris
**Term:** 7-week summer session, **July 1 – August 18, 2026** (LMS: **Blackboard**, courses.ccm.edu; W-deadline ≈ Aug 4; **A = 93–100** at CCM)
**Instructor:** Deanne Stigliano (Associate Professor, Assistant Math Dept. Chair)
**Textbook (likely):** Sullivan, *Statistics: Informed Decisions Using Data*, 7th ed. (Pearson) with **MyLab Statistics** online homework
**Calculator policy (verified):** TI-84 or below ONLY — no TI-Nspire, no Casio
**Intel from student reviews:** homework is on MyLab ("Mathlab"); tests/quizzes are out of 20 points with **NO PARTIAL CREDIT**; **no feedback returned on exams**; she provides a **study guide that mirrors the test**; budget 9–12+ hrs/week.

**➡️ See `course-intel.md` for the full section-specific playbook:** Sullivan chapter map
(NOTE: correlation/regression comes EARLY, in Ch 4), the author's free chapter-test
solution videos at sullystats.com, the MyLab never-lose-a-point checklist, CCM dates,
free tutoring, and the revised week-by-week battle plan in Sullivan chapter order.

**Official course outcomes (from the CCM master syllabus):**
1. Distinguish/formulate methods of random sampling for data collection and inference
2. Compute measures of descriptive statistics
3. Construct and interpret confidence intervals for the mean
4. Conduct and interpret hypothesis tests for the mean (σ known and unknown)
5. Construct and analyze bivariate data via linear correlation and regression

---

## How to use this guide (the loop)

For each unit: **(1)** watch the primary videos → **(2)** tell the tutor you're ready →
**(3)** get quizzed one question at a time from `question-bank.md` + fresh variants →
**(4)** misses/unsures go into `tracker.md` → **(5)** they get re-asked same-session,
next session, and ~3–7 days later until mastered. Every session starts with due reviews
and mixes in old-unit questions (interleaving).

**Default video strategy** (from comparing 8 free resources):
- **Khan Academy** is the spine — the only free resource covering every unit in sequence,
  in 5–12 min videos WITH practice exercises: https://www.khanacademy.org/math/statistics-probability
- **jbstatistics** is the best explainer for Units 4–9 (concise, rigorous, real data):
  https://www.jbstatistics.com/chapters-lessons/
- **The Organic Chemistry Tutor** for long worked-example sessions before quizzes (30–60 min)
- **StatQuest** when CLT / p-values / regression intuition won't click
- **Crash Course Statistics** (~11 min/ep) only as a light first-exposure preview
- **Brandon Foltz (Statistics 101)** as the rescue option — slow, full lectures — if a unit isn't clicking

---

## 7-week schedule — REVISED to Sullivan chapter order (see course-intel.md §6)

⚠️ Sullivan's book (and therefore the course) does **correlation/regression in Chapter 4 —
week 2**, before probability. Unit 9's descriptive half moves up; only the
inference-on-slope part stays at the end.

| Week | Dates | Sullivan chapters | Units | Danger level |
|------|-------|-------------------|-------|-------------|
| 0 | pre-July 1 | Ch 1–3 preview | U1, U2 | free points — bank them early |
| 1 | Jul 1–7 | Ch 1–2 + syllabus recon | U1, U2 | warm-up |
| 2 | Jul 8–14 | Ch 3–4 | U2 + **U9 descriptive** (scatterplots, r, regression line, r²) | medium |
| 3 | Jul 15–21 | Ch 5–6 | U3 Probability, U4 Binomial | medium (conditional probability) |
| 4 | Jul 22–28 | Ch 7–8 | U5 Normal + **CLT** | **HIGHEST** — most-failed topic in intro stats |
| 5 | Jul 29–Aug 4 | Ch 9 (proportion FIRST, then mean) | U6 Confidence Intervals | **HIGH** (interpretation traps) |
| 6 | Aug 5–11 | Ch 10–11 | U7 Hypothesis Testing, U8 Two-sample | **HIGH** (p-value logic) |
| 7 | Aug 12–18 | Ch 12/14.1–14.2 if covered + review | U8 chi-square, U9 inference, cumulative | final exam window |

---

## Unit 1 — Data, Sampling, Study Design

**Watch:** Khan Academy "Study design" unit (https://www.khanacademy.org/math/statistics-probability/designing-studies); preview: Crash Course #10 Sampling Methods.
**Key terms:** population vs sample · parameter vs statistic · qualitative vs quantitative (discrete/continuous) · levels of measurement (nominal, ordinal, interval, ratio) · simple random / stratified / cluster / systematic / convenience sampling · observational study vs experiment · confounding (lurking) variable · placebo, blinding, random assignment.
**The two pillars (memorize):** random *selection* → results generalize to the population; random *assignment* → cause-and-effect conclusions are justified.
**Misconception traps:** big samples do NOT fix voluntary-response bias (Literary Digest 1936: 2M responses, wrong answer) · stratified (some from every group) vs cluster (all from a few groups).

## Unit 2 — Descriptive Statistics

**Watch:** Khan Academy "Summarizing quantitative data" + "Modeling data distributions"; worked examples: Organic Chemistry Tutor "Introduction to Statistics" (57 min).
**Formulas:** x̄ = Σx/n · s² = Σ(x−x̄)²/(n−1) — note the n−1 · z = (x−μ)/σ · IQR = Q3−Q1 · outlier fences Q1−1.5(IQR), Q3+1.5(IQR) · Empirical Rule 68–95–99.7.
**TI-84:** `STAT > Edit` then `1-Var Stats` (gives x̄, Sx, five-number summary); `STAT PLOT` for boxplots/histograms.
**Skills:** mean vs median under skew (right skew → mean > median); resistant measures; z-scores for comparing across distributions; reading boxplots.
**Misconception traps:** variability = horizontal spread of values, NOT "bumpiness" of bar heights (a flat histogram has HIGH variability) · percentile = position, not percent correct · Sx (sample) vs σx (population) on the calculator.

## Unit 3 — Probability

**Watch:** Khan Academy "Probability" unit; preview: Crash Course #13–14.
**Formulas:** P(A′) = 1−P(A) · P(A or B) = P(A)+P(B)−P(A and B) · P(A and B) = P(A)·P(B|A) (= P(A)P(B) if independent) · P(B|A) = P(A and B)/P(A) · nCr = n!/(r!(n−r)!), nPr = n!/(n−r)!
**Skills:** conditional probability from two-way tables (the #1 exam form of this) · independence check: does P(A)P(B) = P(A and B)? · with/without replacement.
**Misconception traps:** P(A|B) ≠ P(B|A) — always ask "what am I given?" · mutually exclusive ≠ independent (they're nearly opposites) · gambler's fallacy — independent trials have no memory · sums of two dice are NOT equally likely (count the ways).

## Unit 4 — Discrete Random Variables & Binomial

**Watch:** jbstatistics "Discrete Probability Distributions" (https://www.jbstatistics.com/category/discrete-probability-distributions/); backup: Khan Academy "Random variables", Crash Course #15.
**Formulas:** valid distribution: each P in [0,1], ΣP = 1 · μ = Σx·P(x) · binomial: P(x) = nCx pˣ(1−p)ⁿ⁻ˣ, μ = np, σ = √(npq) · P(at least one) = 1 − P(none).
**TI-84:** `binompdf(n,p,x)` for P(X = x); `binomcdf(n,p,x)` for P(X ≤ x) — for P(X ≥ x) use 1 − binomcdf(n,p,x−1).
**Skills:** verify a distribution; expected value (raffle/insurance problems — subtract the cost!); identify binomial settings (fixed n, two outcomes, independent, constant p); unusual values via μ ± 2σ.
**Misconception traps:** forgetting the nCx factor · pdf vs cdf · expected value is a long-run average, not a per-play guarantee.

## Unit 5 — Normal Distribution, Sampling Distributions, CLT ⚠️ HARDEST UNIT

**Watch:** jbstatistics "Sampling Distributions" category — especially "4.3 Introduction to the Central Limit Theorem" (https://www.jbstatistics.com/category/sampling-distributions/); intuition: StatQuest "The Central Limit Theorem" + "The Standard Error"; computation drill: OCT z-score video (51 min).
**Formulas:** z = (x−μ)/σ · x = μ + zσ · **sampling distribution of x̄: mean μ, SD = σ/√n (the standard error)** · CLT: x̄ ~ approx Normal for n ≥ 30, regardless of population shape.
**TI-84:** `normalcdf(lower, upper, μ, σ)` (use −1E99/1E99 for open tails); `invNorm(area-to-left, μ, σ)`. For sample means, plug in σ/√n as the SD.
**Skills:** forward problems (x → probability) and inverse problems (percentile → x); CLT probability problems about x̄.
**Misconception traps (the most-failed in all of intro stats):**
- The CLT makes the distribution of the *SAMPLE MEAN* normal — NOT the data, NOT the population. A big sample from a skewed population is still skewed.
- SD (spread of individuals) vs SE = σ/√n (spread of sample means). Using σ instead of σ/√n in an x̄ problem is the #1 calculation error.
- Three different distributions: population / one sample's data / sampling distribution of x̄. As n grows, the SAMPLE resembles the population; the sampling distribution gets NARROWER.
- Small samples fluctuate MORE (hospital problem).

## Unit 6 — Confidence Intervals ⚠️ INTERPRETATION TRAPS

**Watch:** jbstatistics "Confidence Intervals" — especially "5.1 Introduction to Confidence Intervals"; then Khan Academy CI unit + its exercises; preview: Crash Course #20.
**Formulas:** mean (σ unknown — the realistic case): x̄ ± t*·s/√n, df = n−1 · proportion: p̂ ± z*·√(p̂q̂/n) · sample size: n = (z*)²(0.25)/E² for proportions (no estimate), n = (z*σ/E)² for means — **ALWAYS round UP**.
**TI-84:** `TInterval`, `ZInterval`, `1-PropZInt` (STAT > TESTS).
**Skills:** choose t vs z (rule: σ unknown → t, at ANY sample size); check conditions; find point estimate (center) and ME (half-width) from a given interval.
**Misconception traps:**
- Correct interpretation: "95% of intervals built this way capture μ" — NOT "95% probability μ is in this interval," NOT "95% of the data," NOT "95% of future sample means."
- A computed interval either contains μ or it doesn't — the randomness is in the procedure.
- Higher confidence → WIDER; larger n → NARROWER.
- "n ≥ 30 → use z" is a shortcut, not the rule; the rule is whether σ is known.

## Unit 7 — Hypothesis Testing ⚠️ P-VALUE LOGIC

**Watch:** jbstatistics "Hypothesis Testing" — "6.1 An Introduction to Hypothesis Testing"; intuition: StatQuest p-values videos; preview: Crash Course #21.
**Formulas:** proportion: z = (p̂−p₀)/√(p₀q₀/n) · mean: t = (x̄−μ₀)/(s/√n), df = n−1 · decision: reject H₀ iff p-value ≤ α.
**TI-84:** `1-PropZTest`, `T-Test`, `Z-Test` (STAT > TESTS) — read off the test statistic AND p-value.
**The 5-step ritual:** (1) H₀/Hₐ about *parameters* (H₀ gets the =) · (2) α and tail direction from the claim's wording ("more than" → right, "different" → two) · (3) test statistic · (4) p-value vs α · (5) conclusion IN CONTEXT: "reject/fail to reject H₀; there IS/IS NOT sufficient evidence that [claim]."
**Misconception traps (memorize these cold):**
- p-value = P(data this extreme | H₀ true). NOT the probability H₀ is true. NOT the chance the result is a fluke. NOT the replication probability.
- "Fail to reject" ≠ "accept/prove H₀" — maybe the study just lacked power.
- Type I = reject a TRUE H₀ (prob = α); Type II = fail to reject a FALSE H₀ (prob = β); power = 1−β.
- Statistically significant ≠ large/important (huge n makes trivial effects significant).
- Hypotheses use μ and p — never x̄ or p̂.

## Unit 8 — Two-Sample Inference & Chi-Square

**Watch:** jbstatistics "Inference for Two Means" + "Inference for Proportions" + "Chi-square Tests"; backup: Khan Academy two-sample unit; preview: Crash Course #29.
**Formulas:** paired: t = d̄/(s_d/√n) · two means: t = (x̄₁−x̄₂)/√(s₁²/n₁ + s₂²/n₂) · χ² = Σ(O−E)²/E with E = (row total)(col total)/(grand total) · df: GOF = k−1, independence = (r−1)(c−1).
**TI-84:** `2-SampTTest`, `2-PropZTest`, `χ²-Test` (matrix of observed counts).
**Skills:** the BIG one is *choosing the procedure*: paired (same subjects twice) vs independent samples; means vs proportions; CI for difference containing 0 ⇔ no significant difference.
**Misconception traps:** before/after = PAIRED · H₀ in chi-square = "independent / no association" · significant chi-square shows association, not causation.

## Unit 9 — Correlation & Regression

**Watch:** jbstatistics "Regression"; intuition: StatQuest "Linear Regression" + "R-squared"; backup: Khan Academy "Exploring bivariate numerical data".
**Formulas:** ŷ = a + bx with b = r(s_y/s_x), a = ȳ − b·x̄ · residual = y − ŷ · r ∈ [−1, 1] · r² = % of variation in y explained by the linear relationship with x.
**TI-84:** `LinReg(ax+b) L1, L2` — run `DiagnosticOn` (CATALOG) first so r and r² display.
**Skills:** interpret r (sign + strength); interpret slope ("for each 1-unit increase in x, *predicted* y changes by b *on average*"); interpret intercept (prediction at x = 0 — only meaningful if x = 0 is in the data's range); predict within range; refuse to extrapolate.
**Misconception traps:** correlation ≠ causation (unless randomized experiment) · r = 0.6 explains 36%, not 60% (r vs r²) · r ≈ 0 means no LINEAR relationship (curve still possible) · deterministic slope language ("every student scores exactly 2.5 more") is wrong — it's a predicted average.

---

## Final-exam question types (compiled from real intro-stats finals — drill all 13)

1. Classify data/variables/sampling method/study type
2. Compute mean, median, SD, five-number summary from raw data
3. z-scores to compare relative standing
4. Empirical Rule percentages
5. Probability from two-way tables; addition/multiplication/conditional rules
6. Verify a discrete distribution; expected value
7. Binomial probabilities + binomial mean/SD
8. Normal probabilities (forward) and percentile cutoffs (inverse)
9. CLT probabilities about a sample mean
10. Confidence intervals (t for mean, z for proportion) + sample size + interpretation
11. Full hypothesis tests with conclusion in context + Type I/II identification (the biggest block)
12. Correlation, regression line, prediction, slope/r² interpretation
13. Chi-square test of independence (sometimes omitted — confirm from the real syllabus)

## MyLab Statistics point-banking tactics

- Homework typically allows "Help Me Solve This" / "View an Example" and regenerates a
  **similar question** for retries — you can usually grind homework to 100%. Do it; homework
  is the cheapest 10–20% of the grade.
- **Rounding is unforgiving**: match the stated decimal places exactly; check whether the
  answer wants a proportion (0.45) or a percent (45%).
- Quizzes/tests disable the aids — that's what our quiz loop trains for.
- With "no partial credit" scoring, always double-check on the TI-84 before submitting.
