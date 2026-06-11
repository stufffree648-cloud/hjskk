# Boss Battles — Exam Gauntlets (MAT-124)

**Rules (tutor):** A boss unlocks at 80% unit power. Run under test conditions — one
question at a time, no hints, no aids, simulating Stigliano's no-partial-credit scoring.
**Clear = 9/10** (Dragon = 18/20). 10/10 = perfect-clear bonus (+75 XP). A failed attempt
is "scouting" — costs nothing; rematch after the missed concepts are cleared in the
tracker. Shuffle letters on rematches and regenerate numbers where possible. All
computations below verified with Python.

---

## BOSS 1 — The Biased Pollster (Unit 1)

**B1-1.** A nutrition researcher recruits 500 volunteers at a gym to study Americans' exercise habits. The main problem is:
- A) nonresponse bias — many members refused
- B) interviewer bias — the researcher influenced answers
- C) selection bias — gym members differ systematically from the general population
- D) response bias — people lie about exercise

**Answer: C.** A convenience sample of gym-goers can't represent Americans, no matter how many volunteer.

**B1-2.** Researchers randomly assign 200 farm plots to receive either Fertilizer X or no fertilizer, then compare yields. This is:
- A) a designed experiment
- B) an observational study
- C) a census
- D) a stratified survey

**Answer: A.** Random assignment of treatments = experiment; it supports causal conclusions.

**B1-3.** "ZIP code" is measured at which level?
- A) interval
- B) ratio
- C) ordinal
- D) nominal

**Answer: D.** ZIP codes are numeric labels — no order, no meaningful differences.

**B1-4.** Which value is a *parameter*?
- A) the mean GPA of 250 randomly sampled CCM students
- B) the mean GPA of all 9,000 CCM students
- C) the proportion of a 400-voter exit poll choosing candidate A
- D) the median income computed from a census-tract sample

**Answer: B.** Parameters describe the entire population ("all 9,000"); the others are computed from samples.

**B1-5.** A college randomly selects 5 of its 40 course sections and surveys *every* student in those sections. This is:
- A) stratified sampling
- B) systematic sampling
- C) simple random sampling
- D) cluster sampling

**Answer: D.** Whole groups (clusters) are selected and fully surveyed. Stratified would take *some* students from *every* section.

**B1-6.** In a double-blind drug trial with a placebo group, the placebo and blinding primarily control for:
- A) sampling error in the randomization
- B) nonresponse from dropouts
- C) the placebo effect and unconscious bias in subjects and evaluators
- D) confounding due to age and gender

**Answer: C.** Blinding stops expectations (of patients AND assessors) from contaminating results; randomization handles D.

**B1-7.** To survey opinions, a dean randomly selects 10 students from each of the college's 6 academic divisions. This is:
- A) stratified sampling
- B) cluster sampling
- C) convenience sampling
- D) systematic sampling

**Answer: A.** Some members from every group = stratified.

**B1-8.** An online poll with 2 million voluntary responses finds 71% oppose a policy. A random sample of 1,000 finds 48% oppose. Which estimate deserves more trust?
- A) the online poll — 2 million responses dwarf 1,000
- B) the random sample — random selection beats raw size, which doesn't cure self-selection bias
- C) both equally — they're both samples
- D) neither — polls can never be trusted

**Answer: B.** Bias doesn't shrink with sample size (Literary Digest, 1936).

**B1-9.** Students who take music lessons have higher math scores. Before concluding music causes math skill, the most likely lurking variable to consider is:
- A) family income/parental involvement, which drives both music lessons and academic support
- B) the difficulty of the math test
- C) random chance in who was surveyed
- D) students' height

**Answer: A.** A common cause explains the association without any music→math effect.

**B1-10.** Which variable is continuous?
- A) number of texts sent today
- B) number of siblings
- C) shoe size as sold (6, 6.5, 7, …)
- D) the exact volume of water in a bottle

**Answer: D.** Measured quantities on a continuum are continuous; counts and fixed step-sizes are discrete.

---

## BOSS 2 — The Outlier (Unit 2)

**B2-1.** For the data 12, 15, 11, 14, 50, 13, 12 — which statement is true?
- A) mean ≈ 13, median ≈ 18.1
- B) mean ≈ 18.1, median = 13 — the outlier inflates the mean
- C) mean = median = 13
- D) mean ≈ 18.1, median = 14

**Answer: B.** Mean = 127/7 ≈ 18.14; sorted middle value = 13. The 50 drags only the mean.

**B2-2.** The sample standard deviation of 10, 14, 12, 8, 16 is:
- A) 2.83
- B) 10.00
- C) 8.00
- D) 3.16

**Answer: D.** Mean 12; squared deviations sum to 40; s = √(40/4) = √10 ≈ 3.16. (A divides by n; B is the variance; C is the range.)

**B2-3.** Exam: mean 75, SD 6. Is a score of 88 unusual by the z-score criterion (|z| > 2)?
- A) yes — z = (88−75)/6 ≈ 2.17, which exceeds 2
- B) no — 88 is only 13 points above average
- C) no — z ≈ 1.84
- D) yes — any score above 85 is unusual

**Answer: A.** z = 13/6 ≈ 2.17 > 2 → unusual by the criterion.

**B2-4.** Q1 = 22 and Q3 = 30. Which value is an outlier by the 1.5×IQR rule?
- A) 41
- B) 12
- C) 45
- D) 11

**Answer: C.** IQR = 8; fences = 22 − 12 = 10 and 30 + 12 = 42. Only 45 is outside.

**B2-5.** SAT-style scores are bell-shaped: mean 500, SD 100. About what percent fall between 300 and 700?
- A) 95%
- B) 68%
- C) 99.7%
- D) 75%

**Answer: A.** 300–700 is μ ± 2σ → ≈95% by the Empirical Rule.

**B2-6.** A distribution has median 13 and mean 18. Its shape is most likely:
- A) skewed left
- B) skewed right
- C) symmetric
- D) uniform

**Answer: B.** Mean dragged above the median = long right tail.

**B2-7.** The best summary measures for strongly skewed home-price data are:
- A) mean and standard deviation
- B) mean and range
- C) midrange and variance
- D) median and IQR

**Answer: D.** Resistant measures for skewed data.

**B2-8.** Data set I is uniform (flat histogram) over 0–100; data set II is tightly peaked at 50 over the same axis. The larger standard deviation belongs to:
- A) data set II — its peak is taller
- B) neither — same range means same SD
- C) data set I — its values sit farther from the center on average
- D) it cannot be determined

**Answer: C.** SD measures horizontal spread from the mean, not bar-height variation.

**B2-9.** The 90th percentile of ER wait times is 12 minutes. This means:
- A) the average wait is 12 minutes
- B) 90% of patients wait more than 12 minutes
- C) waits are 90% accurate to within 12 minutes
- D) about 90% of patients wait 12 minutes or less

**Answer: D.** Percentile = position: 90% at or below.

**B2-10.** Removing the value 50 from the data in B2-1 will:
- A) decrease the mean substantially but barely move the median
- B) decrease both mean and median substantially
- C) decrease the median substantially but not the mean
- D) leave both unchanged

**Answer: A.** The mean uses magnitudes; the median only order.

---

## BOSS 3 — The Gambler (Unit 3)

*Use this table for B3-1 and B3-2. Drink preference, 150 students:*

| | Coffee | Tea | Neither | Total |
|---|---|---|---|---|
| Male | 24 | 21 | 15 | 60 |
| Female | 51 | 29 | 10 | 90 |
| **Total** | 75 | 50 | 25 | 150 |

**B3-1.** P(prefers coffee | female) = ?
- A) 0.50
- B) 0.34
- C) 0.68
- D) 0.57

**Answer: D.** 51/90 ≈ 0.567. (C is P(female | coffee) = 51/75 — the inverted conditional; B is the joint 51/150; A is the marginal 75/150.)

**B3-2.** P(female | prefers coffee) = ?
- A) 0.57
- B) 0.68
- C) 0.34
- D) 0.60

**Answer: B.** 51/75 = 0.68. Note it differs from B3-1 — the given condition changes the denominator.

**B3-3.** P(A) = 0.4, P(B) = 0.25, P(A and B) = 0.10. The events are:
- A) mutually exclusive
- B) dependent
- C) independent, because (0.4)(0.25) = 0.10
- D) complementary

**Answer: C.** P(A)·P(B) = P(A and B) is the definition of independence.

**B3-4.** With the same values, P(A or B) = ?
- A) 0.55
- B) 0.65
- C) 0.10
- D) 0.75

**Answer: A.** 0.4 + 0.25 − 0.10 = 0.55. (B forgets the overlap.)

**B3-5.** Three components each work with probability 0.95, independently. P(at least one fails) = ?
- A) 0.05
- B) 0.857
- C) 0.143
- D) 0.15

**Answer: C.** 1 − 0.95³ = 1 − 0.857 = 0.143. (B stops at P(none fail); D adds 0.05 three times.)

**B3-6.** A 12-member club selects a 4-person committee. The number of possible committees is:
- A) 48
- B) 11,880
- C) 20,736
- D) 495

**Answer: D.** 12C4 = 495. (B is 12P4 — counts orderings; C is 12⁴.)

**B3-7.** A roulette wheel lands on red 8 spins in a row. On the next spin, black is:
- A) more likely — black is overdue
- B) exactly as likely as it always was
- C) less likely — the wheel is streaking red
- D) certain within the next few spins

**Answer: B.** Independent spins have no memory.

**B3-8.** A and B are mutually exclusive with P(A) = 0.30, P(B) = 0.45. P(A and B) = ?
- A) 0
- B) 0.135
- C) 0.75
- D) cannot be determined

**Answer: A.** Mutually exclusive MEANS they can't both occur. (B multiplies as if independent — disjoint events with nonzero probabilities are never independent.)

**B3-9.** Why do casino profits become highly predictable over millions of plays even though each play is random?
- A) the casino adjusts odds when losing
- B) wins and losses must exactly alternate eventually
- C) each gambler's luck cancels another's
- D) the law of large numbers — long-run proportions converge to the true probabilities

**Answer: D.** Relative frequencies stabilize at the expected values over many trials.

**B3-10.** Rolling two dice, which is more likely: a sum of 7 or a sum of 2?
- A) sum of 2 — snake eyes is a special roll
- B) sum of 7 — six combinations produce it versus one for a sum of 2
- C) equally likely — every sum has the same chance
- D) impossible to say without rolling

**Answer: B.** P(7) = 6/36; P(2) = 1/36. Count the underlying outcomes.

---

## BOSS 4 — Lord Binomial (Unit 4)

**B4-1.** An insurer sells a $300 policy that pays out $10,000 with probability 0.02. The expected profit per policy is:
- A) $100
- B) $300
- C) −$200
- D) $200

**Answer: A.** 300 − (10,000)(0.02) = 300 − 200 = $100.

**B4-2.** X ~ binomial, n = 12, p = 0.4. P(X = 5) = ?
- A) 0.0102
- B) 0.1009
- C) 0.2270
- D) 0.7730

**Answer: C.** 12C5(0.4)⁵(0.6)⁷ ≈ 0.227. (A omits 12C5; B swaps p and q; D is the complement of the answer.) TI-84: `binompdf(12,.4,5)`.

**B4-3.** For that variable, the mean of X is:
- A) 6.0
- B) 4.8
- C) 2.88
- D) 5.0

**Answer: B.** μ = np = 12(0.4) = 4.8.

**B4-4.** And the standard deviation of X is:
- A) 2.88
- B) 4.80
- C) 2.19
- D) 1.70

**Answer: D.** σ = √(npq) = √2.88 ≈ 1.697. (A is the variance; C is √4.8.)

**B4-5.** Four independent shots each hit with probability 0.1. P(at least one hit) = ?
- A) 0.6561
- B) 0.3439
- C) 0.4000
- D) 0.1000

**Answer: B.** 1 − 0.9⁴ = 0.3439. (A is P(no hits); C is 4 × 0.1.)

**B4-6.** Drawing 5 cards from a deck *without replacement* and counting hearts is NOT binomial because:
- A) the trials aren't independent — p changes as cards leave the deck
- B) there are more than two outcomes per draw
- C) n isn't fixed
- D) hearts are too rare for the binomial model

**Answer: A.** Without replacement breaks independence/constant p.

**B4-7.** Which is a valid probability distribution for X = 1, 2, 3, 4?
- A) 0.3, 0.3, 0.3, 0.3
- B) 0.5, 0.3, 0.3, −0.1
- C) 0.4, 0.3, 0.2, 0.1
- D) 0.1, 0.2, 0.3, 0.5

**Answer: C.** Sums to exactly 1 with all values in [0,1]. (A sums to 1.2; B has a negative; D sums to 1.1.)

**B4-8.** A game's expected value is −$0.25 per play. The correct reading is:
- A) every play loses a quarter
- B) you cannot win on any given play
- C) after 4 plays you will be down exactly $1
- D) over many plays, losses average about 25 cents per play

**Answer: D.** Expected value is the long-run per-play average.

**B4-9.** Which is a discrete random variable?
- A) the number of customers entering a store in an hour
- B) the time between customer arrivals
- C) the weight of a randomly chosen customer's purchase
- D) the temperature in the store at noon

**Answer: A.** Counts are discrete; times, weights, temperatures are continuous.

**B4-10.** A fair coin is flipped 400 times: μ = 200 heads, σ = 10. Getting 230 heads would be:
- A) typical — within the usual range
- B) impossible for a fair coin
- C) unusual — 230 exceeds μ + 2σ = 220, suggesting the coin may not be fair
- D) unusual only if exactly 230 was predicted in advance

**Answer: C.** 230 is 3 SDs above the mean — strong evidence against fairness.

---

## BOSS 5 — The Central Limit Thief (Unit 5) ⚠️ the big one

**B5-1.** Adult male heights ~ N(70, 8) (inches). P(a random man is shorter than 58 in) = ?
- A) 0.9332
- B) 0.1500
- C) 0.0668
- D) 0.4332

**Answer: C.** z = (58−70)/8 = −1.5 → 0.0668. TI-84: `normalcdf(-1E99,58,70,8)`.

**B5-2.** For N(70, 8), the cutoff for the tallest 5% is:
- A) 56.84
- B) 72.60
- C) 78.40
- D) 83.16

**Answer: D.** z₀.₉₅ = 1.645 → 70 + 1.645(8) ≈ 83.2. (A is the *shortest* 5% cutoff.) TI-84: `invNorm(0.95,70,8)`.

**B5-3.** The Central Limit Theorem guarantees that for large n:
- A) the sampling distribution of x̄ is approximately normal, whatever the population's shape
- B) the population becomes approximately normal
- C) the sample's histogram becomes approximately normal
- D) all variables in the study become normal

**Answer: A.** Only the distribution of the sample MEAN normalizes; sample data mirror the population.

**B5-4.** σ = 8 and n = 64. The standard error of x̄ is:
- A) 8.00
- B) 1.00
- C) 0.125
- D) 2.83

**Answer: B.** 8/√64 = 1. (A forgets to divide — the classic SD-vs-SE trap; C divides by n.)

**B5-5.** For that setting (μ = 70, SE = 1), P(x̄ > 72) = ?
- A) 0.4013
- B) 0.1056
- C) 0.5987
- D) 0.0228

**Answer: D.** z = (72−70)/1 = 2 → 0.0228. (A used σ = 8 instead of the SE, giving z = 0.25 — the #1 CLT exam error.)

**B5-6.** Still N(70, 8), one individual: P(58 < x < 78) = ?
- A) 0.6826
- B) 0.9104
- C) 0.7745
- D) 0.8413

**Answer: C.** z from −1.5 to 1.0 → 0.8413 − 0.0668 = 0.7745.

**B5-7.** Increasing the sample size from 25 to 100 changes the standard error by:
- A) nothing — SE depends only on σ
- B) cutting it in half (√25 = 5 → √100 = 10)
- C) cutting it to one quarter
- D) doubling it

**Answer: B.** SE = σ/√n; quadrupling n halves SE.

**B5-8.** A small clinic delivers ~10 babies/day; a large hospital ~50/day. Over a year, more days with over 70% girls will occur at:
- A) the small clinic — smaller samples swing more around 50%
- B) the large hospital — more births, more chances
- C) both equally — P(girl) is the same everywhere
- D) neither — that percentage is essentially impossible

**Answer: A.** Sampling variability shrinks with n; small n → extreme days more often.

**B5-9.** For p = 0.40 and n = 100, the standard error of the sample proportion p̂ is:
- A) 0.24
- B) 0.0024
- C) 0.049
- D) 0.40

**Answer: C.** √(0.4·0.6/100) = √0.0024 ≈ 0.049. (A is pq; B forgets the square root.)

**B5-10.** As n grows, which ONE of these gets narrower?
- A) the population distribution
- B) the sample's histogram
- C) the range of the raw data
- D) the sampling distribution of x̄

**Answer: D.** The population is fixed; the sample increasingly resembles it; only the distribution of x̄ tightens (σ/√n).

---

## BOSS 6 — The Interval Keeper (Unit 6)

**B6-1.** n = 16, x̄ = 50, s = 8. The 95% CI for μ (t* = 2.131, df = 15) is:
- A) (46.08, 53.92)
- B) (45.74, 54.26)
- C) (48.93, 51.07)
- D) (32.95, 67.05)

**Answer: B.** SE = 8/√16 = 2; ME = 2.131 × 2 = 4.26. (A used z* = 1.96; C used s/n = 0.5; D used s without √n.) TI-84: `TInterval`.

**B6-2.** Why t* and not z* in B6-1?
- A) the population standard deviation σ is unknown — we estimated it with s
- B) the sample size is below 30
- C) the data are skewed
- D) t is always more accurate than z

**Answer: A.** The t distribution compensates for estimating σ — that's the rule, at any n. (B is the shortcut misconception.)

**B6-3.** 132 of 200 customers prefer the new recipe. The 95% CI for p is:
- A) (0.625, 0.695)
- B) (0.606, 0.714)
- C) (0.660, 0.726)
- D) (0.594, 0.726)

**Answer: D.** p̂ = 0.66; SE = √(0.66·0.34/200) ≈ 0.0335; ME = 1.96(0.0335) ≈ 0.066. TI-84: `1-PropZInt`.

**B6-4.** The correct interpretation of "95% confident" for the interval in B6-3 is:
- A) 95% of customers fall inside the interval
- B) there is a 95% chance p is between 0.594 and 0.726
- C) the method used produces intervals that capture the true proportion in about 95% of all samples
- D) 95% of future samples will give exactly this interval

**Answer: C.** The confidence describes the procedure's long-run success rate, not this one interval or the data.

**B6-5.** To estimate a proportion within E = 0.04 at 90% confidence with no prior estimate, the required n is:
- A) 423
- B) 422
- C) 601
- D) 26

**Answer: A.** n = (1.645)²(0.25)/(0.04)² = 422.8 → round UP. (B rounds down; C used z* = 1.96.)

**B6-6.** Which interval is WIDER, all else equal?
- A) a 95% CI compared to a 99% CI
- B) a 99% CI compared to a 95% CI
- C) an interval from a larger sample
- D) an interval with a smaller s

**Answer: B.** More confidence demands a wider net.

**B6-7.** From the interval (45.74, 54.26), the point estimate and margin of error are:
- A) 50 and 8.52
- B) 45.74 and 8.52
- C) 50 and 4.26
- D) 54.26 and 4.26

**Answer: C.** Center = midpoint; ME = half-width.

**B6-8.** Once the interval (0.594, 0.726) is computed, which is true?
- A) p has a 95% probability of being inside it
- B) p moves in and out of the interval from sample to sample
- C) the interval will contain 95% of customer responses
- D) the interval either captures p or it doesn't — nothing about it is random anymore

**Answer: D.** Probability attaches to the method before sampling, not to a computed interval.

**B6-9.** Before building a proportion CI, the condition to check is:
- A) the population must be normal
- B) np̂ ≥ 10 and n(1−p̂) ≥ 10 (and a random sample)
- C) n must exceed 100
- D) p̂ must be between 0.3 and 0.7

**Answer: B.** Enough successes AND failures for the normal approximation.

**B6-10.** Quadrupling the sample size (with the same confidence level) changes the margin of error by:
- A) cutting it in half
- B) cutting it to one quarter
- C) doubling it
- D) nothing predictable

**Answer: A.** ME ∝ 1/√n.

---

## BOSS 7 — The Null Hypothesis (Unit 7)

**B7-1.** Claim to test: "Fewer than 25% of students commute by bus." The hypotheses are:
- A) H₀: p = 0.25 vs Hₐ: p ≠ 0.25
- B) H₀: p < 0.25 vs Hₐ: p = 0.25
- C) H₀: p̂ = 0.25 vs Hₐ: p̂ < 0.25
- D) H₀: p = 0.25 vs Hₐ: p < 0.25

**Answer: D.** "Fewer than" → left-tailed alternative; H₀ holds the equality; parameters (p), never statistics (p̂).

**B7-2.** Test H₀: μ = 100 with x̄ = 104, s = 12, n = 36. The test statistic is:
- A) t = 0.33
- B) t = 12.0
- C) t = 2.0
- D) t = 4.0

**Answer: C.** t = (104−100)/(12/√36) = 4/2 = 2.0, df = 35.

**B7-3.** That test's two-tailed p-value is 0.053. At α = 0.05:
- A) fail to reject H₀ — the evidence falls just short of significance (which is not proof that μ = 100)
- B) reject H₀ — 0.053 is close enough to 0.05
- C) accept H₀ — the mean is exactly 100
- D) the test is inconclusive and must be thrown out

**Answer: A.** Reject only when p ≤ α; and "fail to reject" never means "proved H₀."

**B7-4.** A p-value of 0.053 means:
- A) there's a 5.3% chance H₀ is true
- B) if μ really were 100, samples this extreme would occur about 5.3% of the time
- C) the result will replicate 94.7% of the time
- D) 5.3% of the data are outliers

**Answer: B.** P(data this extreme | H₀ true). Never a probability about H₀ itself.

**B7-5.** Claim: "More than 60% of members renew." n = 150, p̂ = 0.66. The test statistic is:
- A) z = 0.06
- B) z = 3.0
- C) z = 1.5
- D) z = 0.66

**Answer: C.** SE = √(0.6·0.4/150) = 0.04; z = (0.66−0.60)/0.04 = 1.5. TI-84: `1-PropZTest`.

**B7-6.** The right-tailed p-value for z = 1.5 is:
- A) 0.9332
- B) 0.1336
- C) 0.0500
- D) 0.0668

**Answer: D.** 1 − 0.9332 = 0.0668. (B is the two-tailed value — read the claim's direction.)

**B7-7.** At α = 0.05, the conclusion for B7-5/B7-6 is:
- A) reject H₀ — 66% is clearly more than 60%
- B) fail to reject H₀ — insufficient evidence that more than 60% renew (p = 0.0668 > 0.05)
- C) accept H₀ — exactly 60% renew
- D) reject Hₐ and adopt a larger sample

**Answer: B.** The sample difference wasn't large enough relative to sampling variability.

**B7-8.** H₀: the new therapy has no effect. A Type II error is:
- A) concluding the therapy doesn't work when it actually does
- B) concluding the therapy works when it actually doesn't
- C) setting β too low
- D) rejecting both hypotheses

**Answer: A.** Type II = failing to detect a real effect (a miss); B is Type I (false alarm).

**B7-9.** Moving α from 0.05 to 0.01:
- A) requires stronger evidence to reject H₀ — fewer Type I errors but more Type II errors
- B) makes rejecting H₀ easier
- C) reduces both error types simultaneously
- D) changes nothing about the test's behavior

**Answer: A.** The error types trade off; only larger n improves both.

**B7-10.** A study of 1.5 million users finds an app increases daily steps by 11 steps, p < 0.0001. The best description:
- A) practically and statistically significant
- B) statistically insignificant because 11 steps is tiny
- C) statistically significant but practically trivial — the huge n detected a meaningless difference
- D) evidence the app meaningfully improves fitness

**Answer: C.** Significance measures detectability, not importance.

---

## BOSS 8 — The Chi-Square Sphinx (Unit 8)

**B8-1.** In a test of independence, a cell's row total is 80, column total 90, grand total 300. Its expected count is:
- A) 24
- B) 27
- C) 85
- D) 170

**Answer: A.** E = (80)(90)/300 = 24.

**B8-2.** A contingency table has 4 rows and 3 columns. The degrees of freedom are:
- A) 12
- B) 6
- C) 11
- D) 7

**Answer: B.** (4−1)(3−1) = 6.

**B8-3.** The null hypothesis of a chi-square test of independence states:
- A) the observed counts equal the expected counts
- B) at least one proportion differs
- C) the variables are associated
- D) the two variables are independent in the population

**Answer: D.** Chi-square nulls are always the "no relationship" claim; rejection = evidence of association.

**B8-4.** Each employee's output is measured before and after ergonomic training. The right procedure is:
- A) two-sample t with independent samples
- B) two-proportion z-test
- C) paired t-test on the differences
- D) chi-square goodness-of-fit

**Answer: C.** Same subjects twice → dependent samples.

**B8-5.** Comparing the *proportion* of freshmen vs seniors who own cars requires:
- A) a paired t-test
- B) one-way ANOVA
- C) a one-sample z-test
- D) a two-proportion z-test

**Answer: D.** Two independent groups, categorical outcome.

**B8-6.** A 95% CI for μ₁ − μ₂ is (0.8, 4.2). At α = 0.05:
- A) group 1's mean is significantly greater — zero isn't a plausible difference
- B) no significant difference exists
- C) group 2's mean is significantly greater
- D) the interval is invalid because it excludes zero

**Answer: A.** Zero lies outside, and the whole interval is positive → μ₁ > μ₂.

**B8-7.** A chi-square statistic near zero means:
- A) the variables are strongly associated
- B) observed counts are close to what independence predicts — no evidence against H₀
- C) the sample size was too small
- D) a calculation error occurred — χ² can't be near zero

**Answer: B.** χ² = Σ(O−E)²/E grows with discrepancy; small χ² = good agreement with independence.

**B8-8.** A die is rolled 120 times to test whether it's fair (6 categories). The goodness-of-fit df is:
- A) 119
- B) 6
- C) 5
- D) 120

**Answer: C.** df = k − 1 = 5.

**B8-9.** Which scenario calls for an INDEPENDENT two-sample t-test?
- A) twins split between two diets
- B) 30 randomly chosen users of phone A vs 32 randomly chosen users of phone B, comparing mean battery life
- C) the same students tested before and after a course
- D) one sample compared against a known standard

**Answer: B.** Two unrelated random groups; A and C are paired designs.

**B8-10.** Comparing mean test scores across FOUR teaching methods in one analysis requires:
- A) four separate t-tests
- B) a chi-square test of independence
- C) a two-proportion z-test
- D) one-way ANOVA

**Answer: D.** ANOVA tests 3+ means at once without inflating Type I error.

---

## BOSS 9 — The Extrapolator (Unit 9)

*Setup for B9-1 to B9-4: hours of TV per week (x) vs exam score (y). r = −0.7, s_y = 10, s_x = 5, ȳ = 40, x̄ = 10.*

**B9-1.** The least-squares slope is:
- A) −0.35
- B) −0.7
- C) −1.4
- D) −2.0

**Answer: C.** b = r(s_y/s_x) = −0.7(10/5) = −1.4. (A inverts the ratio.)

**B9-2.** The intercept is:
- A) 26
- B) 40
- C) 14
- D) 54

**Answer: D.** a = ȳ − b·x̄ = 40 − (−1.4)(10) = 54.

**B9-3.** The predicted score for a student watching 12 hours is:
- A) 70.8
- B) 37.2
- C) 52.6
- D) 16.8

**Answer: B.** ŷ = 54 − 1.4(12) = 37.2.

**B9-4.** That student actually scored 35. The residual is:
- A) −2.2, the point lies below the line
- B) +2.2, the point lies above the line
- C) −2.2, the point lies above the line
- D) +2.2, the point lies below the line

**Answer: A.** Residual = y − ŷ = 35 − 37.2 = −2.2; negative = observed below predicted.

**B9-5.** With r = −0.7, the percent of variation in scores explained by the linear relationship with TV hours is:
- A) 70%
- B) 49%
- C) −49%
- D) 30%

**Answer: B.** r² = 0.49. (A reads r as a percent; C — r² can't be negative.)

**B9-6.** The best interpretation of the slope −1.4:
- A) each TV hour causes a 1.4-point score drop
- B) every student who watches one more hour scores exactly 1.4 points lower
- C) each additional weekly TV hour is associated with a predicted score about 1.4 points lower, on average
- D) scores fall 1.4% per TV hour

**Answer: C.** Predicted/average language only — no causation (observational), no determinism.

**B9-7.** The data covered 5–15 TV hours. Predicting the score of someone watching 40 hours is:
- A) valid because the line extends forever
- B) valid if r is strong enough
- C) valid as an average prediction
- D) unreliable extrapolation — the linear pattern is unverified beyond the data

**Answer: D.** Predictions are only supported within the observed x-range.

**B9-8.** Even with p < 0.001 for this relationship, concluding "TV watching lowers exam scores" is unjustified because:
- A) this is observational data — confounders (e.g., study time) could drive both variables
- B) the correlation is negative
- C) the sample came from one college
- D) p-values can't be that small

**Answer: A.** Significance rules out chance, not confounding. Causation needs random assignment.

**B9-9.** r = −0.7 describes a relationship that is:
- A) weak and negative
- B) strong and curved
- C) moderately strong, positive, linear
- D) moderately strong, negative, linear

**Answer: D.** Sign = direction; |0.7| = moderately strong; r only measures LINEAR association.

**B9-10.** One added point far to the right of all the others, well off the line's trend, will most likely:
- A) leave the line unchanged — one point can't matter
- B) substantially pull the slope toward itself (an influential point)
- C) change the intercept but never the slope
- D) increase r toward +1 automatically

**Answer: B.** Points extreme in x have high leverage on the fitted line.

---

## 🐉 FINAL BOSS — The Final Exam Dragon (cumulative, 20 questions, clear at 18)

**DR-1.** Estimate the mean coffee spending of all students from a random sample of 40 (σ unknown). Procedure:
- A) t-interval for a mean
- B) one-proportion z-interval
- C) z-interval with σ known
- D) chi-square goodness-of-fit

**Answer: A.** Estimating a MEAN with σ unknown → t-interval, df = 39.

**DR-2.** Which symbol is a statistic? 
- A) σ
- B) p
- C) p̂
- D) μ

**Answer: C.** Hats/Latin letters from samples; Greek/plain p for populations.

**DR-3.** Inspecting every 12th item off an assembly line is:
- A) cluster sampling
- B) stratified sampling
- C) convenience sampling
- D) systematic sampling

**Answer: D.** Selecting every kth item is systematic sampling.

**DR-4.** Ana scored 84 on test 1 (mean 76, SD 4) and 88 on test 2 (mean 82, SD 6). Her relatively better performance was:
- A) test 2 — the higher raw score
- B) test 1 — z = 2.0 beats z = 1.0
- C) equal — both above the mean
- D) test 2 — it had more spread

**Answer: B.** (84−76)/4 = 2.0 vs (88−82)/6 = 1.0.

**DR-5.** P(pass math) = 0.40, P(pass stats) = 0.25, P(pass both) = 0.10. P(pass at least one) = ?
- A) 0.65
- B) 0.75
- C) 0.10
- D) 0.55

**Answer: D.** 0.40 + 0.25 − 0.10 = 0.55.

**DR-6.** Four independent free throws, each made with probability 0.1 (a struggling shooter). P(makes at least one) = ?
- A) 0.3439
- B) 0.6561
- C) 0.4000
- D) 0.9000

**Answer: A.** 1 − 0.9⁴.

**DR-7.** Heights ~ N(70, 8). The 95th percentile is:
- A) 56.84
- B) 78.00
- C) 83.16
- D) 86.45

**Answer: C.** 70 + 1.645(8).

**DR-8.** Same population, samples of n = 64: P(x̄ > 72) = ?
- A) 0.4013
- B) 0.0228
- C) 0.5987
- D) 0.1056

**Answer: B.** SE = 1, z = 2. (A is the σ-instead-of-SE trap.)

**DR-9.** Which statement about a 95% confidence interval is TRUE?
- A) the procedure that built it captures the parameter in about 95% of all possible samples
- B) it contains 95% of the population's individual values
- C) the parameter has a 95% probability of being inside this specific interval
- D) 95% of sample means from future studies will land inside it

**Answer: A.** The 95% describes the method’s long-run capture rate — not this one interval, not the data, not future sample means.

**DR-10.** n = 16, x̄ = 50, s = 8, t* = 2.131. The 95% CI for μ:
- A) (46.08, 53.92)
- B) (48.93, 51.07)
- C) (42.00, 58.00)
- D) (45.74, 54.26)

**Answer: D.** 50 ± 2.131(2).

**DR-11.** Claim: "More than 60% of customers would recommend us." Hₐ is:
- A) p ≠ 0.60
- B) p < 0.60
- C) p > 0.60
- D) p ≥ 0.60

**Answer: C.** “More than” → right-tailed alternative, stated about the parameter p.

**DR-12.** That test gives p-value = 0.0668 at α = 0.05. Conclusion:
- A) reject H₀ — there is sufficient evidence for the claim
- B) fail to reject H₀ — there is not sufficient evidence that more than 60% recommend
- C) accept H₀ — exactly 60% recommend
- D) lower α until the result is significant

**Answer: B.** p-value 0.0668 > α = 0.05 → insufficient evidence for the claim; and we never “accept” H₀.

**DR-13.** H₀: the alarm system has no effect on break-ins. A Type I error means:
- A) failing to adopt a system that works
- B) the study was underpowered
- C) correctly detecting an effect
- D) concluding the system works when it actually does nothing

**Answer: D.** Rejecting a true H₀ = false positive.

**DR-14.** Row total 80, column total 90, n = 300: the expected cell count is:
- A) 24
- B) 27
- C) 56.7
- D) 7,200

**Answer: A.** E = (row total)(column total)/(grand total) = 80 × 90/300 = 24.

**DR-15.** Same 12 athletes timed before and after a training program. Compare means with:
- A) two-sample independent t-test
- B) paired t-test
- C) two-proportion z-test
- D) chi-square test

**Answer: B.** Same subjects measured twice → dependent samples → paired t-test on the differences.

**DR-16.** ŷ = 54 − 1.4x (score from TV hours). The −1.4 means:
- A) scores drop exactly 1.4 points per hour for every student
- B) TV causes a 1.4-point drop per hour
- C) each extra TV hour predicts a score about 1.4 points lower, on average
- D) 1.4% of scores are explained by TV

**Answer: C.** Slope interpretation must use predicted/average language — never deterministic (B-style) or causal (observational data).

**DR-17.** r = −0.7. The proportion of variation in y explained by x is:
- A) 0.70
- B) 0.30
- C) −0.49
- D) 0.49

**Answer: D.** r² = (−0.7)² = 0.49 — the sign disappears when squaring; r² can never be negative.

**DR-18.** Which study design would justify the headline "New app CAUSES better sleep"?
- A) a randomized experiment assigning users to app vs no-app and comparing sleep
- B) a survey of 1 million app users reporting good sleep
- C) a strong correlation between app downloads and sleep scores
- D) expert testimony from the app's developers

**Answer: A.** Only random assignment justifies causal language; sample size and correlation strength cannot.

**DR-19.** The quantity σ/√n describes the variability of:
- A) individual observations
- B) the population
- C) the sample mean from sample to sample
- D) the sample standard deviation

**Answer: C.** That's the standard error — the Dragon's favorite trap.

**DR-20.** A test yields p-value = 0.41. The student writes: "We accept H₀ and have proven the mean is unchanged." The correct fix:
- A) "We reject H₀" — 0.41 is a large test statistic
- B) "We fail to reject H₀ — the data do not provide sufficient evidence of a change," which is weaker than proof
- C) the sentence is fine as written
- D) "The probability H₀ is true is 41%"

**Answer: B.** Tests never prove the null; they only measure evidence against it.

---

*Letter balance audited per boss (~25% each letter, no 3-in-a-row). All numeric answers Python-verified. Tutor: regenerate numbers on rematches and keep the verified structure.*
