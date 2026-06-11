# MAT-124 Question Bank

**Tutor instructions:** Ask ONE question at a time; never reveal the answer until the student
commits. When re-asking a question, shuffle the letter positions and/or change the context
numbers. Answer letters are balanced within each unit — keep them balanced if you add
questions. Distractors are built from documented student misconceptions (see
`research-report.md`); the tag in brackets names the error each wrong option targets.
All computations verified with Python.

---

## Unit 1 — Data, Sampling, Study Design

**U1-Q1.** A quality manager at a factory that produces 12,000 light bulbs per day tests a
random sample of 150 bulbs and finds that 2% are defective. The value 2% is best described as:
- A) a parameter, because it describes part of the population
- B) a statistic, because it was computed from a sample
- C) a parameter, because it estimates the true defect rate
- D) a statistic, because the sample was selected randomly

**Answer: B.** A statistic is any number computed from a sample; a parameter describes the
whole population. (D states the right label for the wrong reason — randomness isn't what
makes it a statistic.)

**U1-Q2.** A pollster stands at a supermarket exit and interviews every 25th shopper who
leaves. Which sampling method is this?
- A) simple random sampling
- B) stratified sampling
- C) cluster sampling
- D) systematic sampling

**Answer: D.** Selecting every kth individual is systematic sampling. It is NOT simple
random sampling because not every possible *group* of shoppers has an equal chance of
being the sample.

**U1-Q3.** A college wants student opinions on parking, so it randomly selects 20 students
from *each* academic major. Which sampling method is this?
- A) stratified sampling
- B) cluster sampling
- C) systematic sampling
- D) simple random sampling

**Answer: A.** The population is divided into groups (strata = majors) and *some members of
every group* are sampled. Cluster sampling would instead randomly pick a few majors and
survey *everyone* in them — that's the classic mix-up.

**U1-Q4.** Which study design allows a researcher to legitimately conclude that a new
fertilizer *causes* increased crop yield?
- A) a survey of farmers comparing yields of those who chose to use the fertilizer
- B) an observational study following a very large number of farms
- C) an experiment in which plots are randomly assigned to fertilizer or no fertilizer
- D) a study finding a strong, statistically significant correlation between fertilizer use and yield

**Answer: C.** Only random assignment balances lurking variables between groups, justifying
cause-and-effect conclusions. [misconception: big-n observational study or significant
correlation proves causation]

**U1-Q5.** Cities with higher ice cream sales also have more drownings. The most likely
explanation is:
- A) ice cream consumption impairs swimming ability
- B) drownings cause community stress, which increases ice cream sales
- C) a lurking variable, such as hot summer weather, drives both
- D) the data must have come from a biased sample

**Answer: C.** A confounding (lurking) variable — temperature — raises both. Association
alone never identifies the causal direction.

**U1-Q6.** Temperatures measured in degrees Fahrenheit have which level of measurement?
- A) interval, because differences are meaningful but there is no true zero
- B) ratio, because temperature can be measured to any precision
- C) ordinal, because temperatures can be ranked from low to high
- D) nominal, because the degree values are just numeric labels

**Answer: A.** 0°F doesn't mean "no temperature," so ratios (80° is NOT "twice as hot" as
40°) are meaningless → interval, not ratio.

**U1-Q7.** "Number of siblings a student has" is what type of variable?
- A) qualitative
- B) quantitative continuous
- C) qualitative ordinal
- D) quantitative discrete

**Answer: D.** It's a count — numeric (quantitative) and takes only separate whole-number
values (discrete). Continuous variables are *measured* (time, weight) and can take any
value in an interval.

**U1-Q8.** A TV station's website poll gets 250,000 responses and finds 78% oppose a new
tax. Why can't we trust the 78%?
- A) the sample is too small relative to the size of the city
- B) voluntary response samples are biased no matter how large they are
- C) poll percentages always need a margin of error of at least 5%
- D) website polls cannot verify each respondent's identity

**Answer: B.** People who self-select into polls differ systematically from the population
(strong opinions overrepresented). Size doesn't fix bias — the 1936 Literary Digest poll had
over 2 million responses and still called the election wrong. [misconception: bigger sample =
representative sample]

**U1-Q9.** Random *selection* (sampling) and random *assignment* serve different purposes.
Which statement is correct?
- A) random selection permits causal conclusions; random assignment permits generalization
- B) both exist primarily to reduce the sample size a study needs
- C) random assignment lets results generalize; random selection creates balanced groups
- D) random selection permits generalizing to the population; random assignment permits cause-and-effect conclusions

**Answer: D.** Selection controls *who* the results describe (generalization); assignment
controls *why* the groups differ (causation). A and C swap them — the most common error.

**U1-Q10.** A researcher surveys the first 40 students who walk into the library. This is:
- A) a convenience sample
- B) a simple random sample, since any student could have walked in
- C) a cluster sample, with the library as the cluster
- D) a systematic sample, taken in arrival order

**Answer: A.** Taking whoever is easiest to reach is convenience sampling — prone to bias
(library users differ from non-users). "Could have walked in" ≠ equal chance for every
possible sample of 40.

---

## Unit 2 — Descriptive Statistics

**U2-Q1.** Find the sample standard deviation of the data set: 4, 8, 6, 5, 2.
- A) 2.00
- B) 5.00
- C) 2.24
- D) 4.00

**Answer: C.** Mean = 5; squared deviations sum to 20; s² = 20/(5−1) = 5; s = √5 ≈ 2.24.
(A divides by n instead of n−1; B is the variance, not the SD; D is the population variance.)

**U2-Q2.** For a strongly right-skewed distribution (such as household incomes), which is
most likely true?
- A) mean > median
- B) mean < median
- C) mean = median
- D) mode > mean

**Answer: A.** The long right tail pulls the mean above the median. (For left-skewed data
the mean is below the median; in symmetric data they're equal.)

**U2-Q3.** Maria scored 82 on a statistics exam (class mean 70, SD 8) and 90 on a history
exam (class mean 80, SD 10). Relative to her classmates, which exam performance was better?
- A) the history exam, because 90 is the higher score
- B) the history exam, because it is a full 10 points above the mean
- C) they were equally good, because both are above their class means
- D) the statistics exam, because its z-score (1.5) exceeds the history z-score (1.0)

**Answer: D.** z = (82−70)/8 = 1.5 vs z = (90−80)/10 = 1.0. Relative standing is measured
in standard deviations, not raw points.

**U2-Q4.** A data set has Q1 = 10 and Q3 = 18. Using the 1.5×IQR rule, which value would
be flagged as an outlier?
- A) 29
- B) 32
- C) 28
- D) −1

**Answer: B.** IQR = 8; fences are 10 − 12 = −2 and 18 + 12 = 30. Only 32 falls outside
(−1 is inside, since −1 > −2).

**U2-Q5.** IQ scores are bell-shaped with mean 100 and SD 15. By the Empirical Rule, about
what percent of scores fall between 85 and 115?
- A) 68%
- B) 95%
- C) 50%
- D) 99.7%

**Answer: A.** 85 to 115 is mean ± 1 SD → about 68%. (±2 SD ≈ 95%, ±3 SD ≈ 99.7%.)

**U2-Q6.** In a boxplot, the box itself spans:
- A) the entire range of the data
- B) the interval mean ± 1 standard deviation
- C) the middle 95% of the data
- D) from Q1 to Q3 — the middle 50% of the data

**Answer: D.** The box runs Q1 to Q3 (width = IQR) with the median line inside; whiskers
extend toward min/max (or to the fences).

**U2-Q7.** Two histograms use the same scale. Histogram I is flat (all bars equal height,
values spread evenly from 0 to 100). Histogram II has one tall peak at 50 with short tails.
Which data set has the larger standard deviation?
- A) Histogram II, because its bar heights vary more
- B) Histogram I, because its values sit farther from the center on average
- C) both the same, because they cover the same range
- D) impossible to determine without the raw data

**Answer: B.** Variability is *horizontal* spread of values around the mean, not
"bumpiness" of bar heights — a flat histogram has lots of data far from center; a tight
peak has most data near the mean. [documented misconception: judging variability by bar
height variation]

**U2-Q8.** A data set of 20 home prices includes one mansion worth 10× the others. Adding
the mansion mostly affects:
- A) the median, but not the mean
- B) both the mean and median equally
- C) the mean, but not (much) the median
- D) neither, because n = 20 is large enough to absorb it

**Answer: C.** The mean uses every value's magnitude, so one extreme value drags it; the
median only cares about order, so it barely moves. That's why we report medians for skewed
data like incomes.

**U2-Q9.** Which of these is NOT part of the five-number summary?
- A) the mean
- B) the median
- C) the third quartile
- D) the minimum

**Answer: A.** Five-number summary = min, Q1, median, Q3, max. The mean isn't included
(it's not resistant, and the summary is built from positions).

**U2-Q10.** Dev's exam score is at the 80th percentile. This means:
- A) he answered 80% of the questions correctly
- B) he scored 80% of the maximum possible score
- C) 80% of test-takers scored above him
- D) he scored at or above about 80% of test-takers

**Answer: D.** A percentile is a position in the distribution, not a percent-correct.
(C reverses it.)

---

## Unit 3 — Probability

**U3-Q1.** P(A) = 0.5, P(B) = 0.4, and P(A and B) = 0.2. Find P(A or B).
- A) 0.90
- B) 0.20
- C) 0.10
- D) 0.70

**Answer: D.** P(A or B) = 0.5 + 0.4 − 0.2 = 0.7. (A forgets to subtract the overlap —
which double-counts outcomes in both events.)

**U3-Q2.** Events A and B are mutually exclusive, with P(A) = 0.3 and P(B) = 0.2. Are A
and B independent?
- A) yes, because they have no outcomes in common
- B) no — if A occurs, B cannot occur, so knowing A changes the probability of B
- C) yes, because P(A) + P(B) is less than 1
- D) cannot be determined without knowing P(A and B)

**Answer: B.** Mutually exclusive events (with nonzero probabilities) are *maximally
dependent*: P(B|A) = 0 ≠ P(B) = 0.2. (D is wrong because mutually exclusive *tells* you
P(A and B) = 0.) [documented misconception: disjoint = independent]

**U3-Q3.** 100 students: 30 men passed, 20 men failed, 35 women passed, 15 women failed.
What is P(passed | woman)?
- A) 0.70
- B) 0.54
- C) 0.35
- D) 0.65

**Answer: A.** Restrict to the 50 women: 35/50 = 0.70. (B is P(woman | passed) = 35/65 —
the inverted conditional; C is the joint probability 35/100; D is the overall pass rate
65/100.) [documented misconception: confusing P(A|B) with P(B|A)]

**U3-Q4.** P(A) = 0.3, P(B) = 0.5, and P(A and B) = 0.15. The events A and B are:
- A) mutually exclusive
- B) dependent, since P(A and B) is not zero
- C) independent, since P(A) × P(B) = P(A and B)
- D) complementary

**Answer: C.** 0.3 × 0.5 = 0.15 = P(A and B), which is exactly the definition of
independence. (B has it backwards — disjointness, not dependence, is about zero overlap.)

**U3-Q5.** A fair coin lands heads 5 times in a row. The probability of heads on the next
flip is:
- A) less than 1/2, because tails is now "due"
- B) exactly 1/2
- C) more than 1/2, because the coin is on a streak
- D) 1/64, the probability of six heads in a row

**Answer: B.** Independent trials have no memory. (D confuses the probability of the whole
sequence-in-advance with the next single flip.) [documented misconception: gambler's fallacy]

**U3-Q6.** Two cards are drawn from a standard deck *without replacement*. The probability
both are aces is:
- A) 0.0059
- B) 0.0769
- C) 0.0023
- D) 0.0045

**Answer: D.** (4/52)(3/51) = 1/221 ≈ 0.0045. (A is (4/52)² — with replacement, ignoring
that the first ace is gone; B is just 4/52.)

**U3-Q7.** A club of 10 members must select a 3-person committee (order doesn't matter).
How many different committees are possible?
- A) 720
- B) 30
- C) 120
- D) 1,000

**Answer: C.** 10C3 = 10!/(3!·7!) = 120. (A is 10P3 = 720 — permutations, which wrongly
counts the same 3 people in different orders as different committees; D is 10³.)

**U3-Q8.** Rolling two fair dice, which is more likely: a sum of 7 or a sum of 12?
- A) a sum of 7 — it can occur six ways (1+6, 2+5, 3+4, 4+3, 5+2, 6+1), while 12 occurs only one way
- B) both are equally likely, since every sum from 2 to 12 has the same chance
- C) a sum of 12 — matching dice are just as common as any other specific pair
- D) it cannot be determined without rolling the dice many times

**Answer: A.** Sums are NOT equally likely; you must count the underlying outcomes:
P(7) = 6/36 vs P(12) = 1/36. [documented misconception: equiprobability bias]

**U3-Q9.** A forecaster said there was an 80% chance of rain, and it did not rain. Was the
forecast wrong?
- A) yes — rain was predicted and did not occur
- B) not necessarily — 80% means that on days with conditions like this, it rains about 8 times in 10
- C) yes — any probability above 50% counts as a prediction of rain
- D) no — probability forecasts can never be evaluated

**Answer: B.** A probability is a long-run relative frequency, not a yes/no prediction
about one day. (Forecasts *can* be evaluated — over many 80% days, it should rain about
80% of the time — so D overcorrects.) [documented misconception: outcome orientation]

**U3-Q10.** As a fair coin is flipped more and more times, which statement is true?
- A) the counts of heads and tails become exactly equal
- B) after a run of heads, tails becomes more likely until balance is restored
- C) the proportion of heads tends to get closer and closer to 0.5
- D) the difference between the number of heads and tails shrinks toward zero

**Answer: C.** The Law of Large Numbers is about the *proportion* converging — the raw
count difference can actually grow. (B is the gambler's fallacy again.)

---

## Unit 4 — Discrete Random Variables & Binomial

**U4-Q1.** Which of the following is a valid probability distribution for X = 0, 1, 2, 3?
- A) P(X): 0.1, 0.2, 0.4, 0.3
- B) P(X): 0.2, 0.3, 0.6, −0.1
- C) P(X): 0.1, 0.2, 0.3, 0.5
- D) P(X): 0.25, 0.25, 0.30, 0.10

**Answer: A.** Requirements: every probability in [0, 1] AND the sum equals exactly 1.
(B has a negative; C sums to 1.1; D sums to 0.9.)

**U4-Q2.** A charity sells 1,000 raffle tickets at $5 each; one winner receives $2,000.
The expected value of buying one ticket (net of its cost) is:
- A) +$2.00
- B) −$5.00
- C) −$3.00
- D) $0.00, since someone has to win

**Answer: C.** E = (2000)(1/1000) − 5 = 2 − 5 = −$3. (A forgets you paid for the ticket;
B forgets you might win.)

**U4-Q3.** X takes values 0, 1, 2, 3 with probabilities 0.1, 0.2, 0.4, 0.3. The mean of
X is:
- A) 1.5
- B) 1.9
- C) 2.0
- D) 0.25

**Answer: B.** μ = Σx·P(x) = 0(0.1) + 1(0.2) + 2(0.4) + 3(0.3) = 1.9. (A averages the x
values 0–3 without weighting by their probabilities; C is just the most likely value.)

**U4-Q4.** Which scenario can be modeled by a binomial distribution?
- A) drawing 5 cards from a deck without replacement and counting hearts
- B) rolling a die repeatedly until the first six appears
- C) recording the exact weight of each of 10 packages
- D) asking 20 randomly selected voters whether they support a measure, and counting yes responses

**Answer: D.** Fixed n, two outcomes, (essentially) independent trials, constant p.
(A fails independence/constant p — no replacement; B has no fixed n — that's geometric;
C isn't counting successes at all.)

**U4-Q5.** For a binomial variable with n = 10 and p = 0.3, find P(X = 2).
- A) 0.0052
- B) 0.3828
- C) 0.2335
- D) 0.0900

**Answer: C.** P(2) = 10C2 (0.3)²(0.7)⁸ = 45(0.09)(0.0576) ≈ 0.2335. (A forgets the 10C2
counting factor; B is the *cumulative* P(X ≤ 2); D is just (0.3)².) TI-84: `binompdf(10,.3,2)`.

**U4-Q6.** Five independent trials each succeed with probability 0.2. P(at least one
success) is:
- A) 0.672
- B) 0.328
- C) 1.000, since 5 × 0.2 = 1
- D) 0.200

**Answer: A.** P(at least one) = 1 − P(none) = 1 − (0.8)⁵ = 1 − 0.328 = 0.672. (B stops at
P(none); C illegally adds probabilities across trials.)

**U4-Q7.** For a binomial variable with n = 10, p = 0.3, the standard deviation of X is:
- A) 3.00
- B) 2.10
- C) 1.73
- D) 1.45

**Answer: D.** σ = √(npq) = √(10 × 0.3 × 0.7) = √2.1 ≈ 1.449. (A is the mean np; B is the
variance npq — forgot the square root.)

**U4-Q8.** A fair coin is flipped 100 times. Using the μ ± 2σ "unusual values" rule, would
62 heads be unusual?
- A) no — 62 is within two standard deviations of 50
- B) yes — 62 exceeds 50 + 2(5) = 60
- C) no — with 100 flips, any count between 35 and 65 is typical
- D) yes — any count above 55 is unusual for a fair coin

**Answer: B.** μ = np = 50, σ = √(100·0.5·0.5) = 5, so the usual range is 40 to 60;
62 falls outside.

**U4-Q9.** A casino game has expected value −$0.50 per play. The correct interpretation is:
- A) every player loses exactly 50 cents on each play
- B) it is impossible to come out ahead in any single play
- C) over many plays, players lose an average of about 50 cents per play
- D) after exactly 10 plays, a player will be down exactly $5

**Answer: C.** Expected value is a *long-run average*, not a guarantee about any single
play or short run. [documented misconception: outcome orientation applied to E(X)]

**U4-Q10.** Which of the following is a *continuous* random variable?
- A) the exact amount of time a customer waits on hold
- B) the number of calls a call center receives in an hour
- C) the number of defective items in a batch of 50
- D) the number showing when a fair die is rolled

**Answer: A.** Time is measured, not counted — it can take any value in an interval.
B, C, D are all counts (discrete).

---

## Unit 5 — Normal Distribution, Sampling Distributions, CLT

**U5-Q1.** Adult women's heights are N(63, 5) inches. P(a randomly chosen woman is taller
than 65 inches) = ?
- A) 0.6554
- B) 0.3446
- C) 0.4000
- D) 0.0446

**Answer: B.** z = (65−63)/5 = 0.40 → area to the RIGHT = 1 − 0.6554 = 0.3446. (A is the
area to the left — forgot the complement; C is the z-value misread as probability.)
TI-84: `normalcdf(65,1E99,63,5)`.

**U5-Q2.** Heights are N(63, 5). What height separates the tallest 10% of women (the 90th
percentile)?
- A) 56.59 inches
- B) 71.23 inches
- C) 64.50 inches
- D) 69.41 inches

**Answer: D.** z₀.₉₀ ≈ 1.28 → x = 63 + 1.28(5) ≈ 69.4. (A used z = −1.28, giving the 10th
percentile; B used z = 1.645, the 95th.) TI-84: `invNorm(0.90,63,5)`.

**U5-Q3.** The Central Limit Theorem says that for large n, which distribution is
approximately normal regardless of the population's shape?
- A) the distribution of the individual data values in the sample
- B) the population distribution, once n ≥ 30
- C) the distribution of the sample mean across all possible samples
- D) every distribution involved in the problem

**Answer: C.** Only the *sampling distribution of x̄* (and sums) becomes normal. A large
sample from a skewed population is still skewed — it mirrors the population. [documented
misconception: "the data become normal"]

**U5-Q4.** A population has standard deviation 15. For random samples of size n = 36, the
standard deviation of the sample mean (the standard error) is:
- A) 2.5
- B) 15, the same as the population
- C) 0.42
- D) 6.0

**Answer: A.** SE = σ/√n = 15/6 = 2.5. (B is the documented SD-vs-SE confusion — averages
vary *less* than individuals; C divides by n instead of √n.)

**U5-Q5.** IQ scores: μ = 100, σ = 15. For a random sample of n = 36 people, find
P(x̄ > 103).
- A) 0.4207
- B) 0.8849
- C) 0.0228
- D) 0.1151

**Answer: D.** SE = 15/√36 = 2.5; z = (103−100)/2.5 = 1.2 → P = 0.1151. (A uses σ = 15
instead of the SE — the classic error, giving z = 0.2; B is the left-tail area.)

**U5-Q6.** As sample size increases from 25 to 100, the sampling distribution of x̄:
- A) looks more and more like the population distribution
- B) becomes narrower — its standard error is cut in half
- C) keeps the same spread but becomes more symmetric
- D) becomes wider, since larger samples can include more extreme values

**Answer: B.** SE = σ/√n: quadrupling n halves the SE (√25=5 → √100=10). It's the *sample
histogram* that comes to resemble the population — not the sampling distribution.
[documented misconception #3]

**U5-Q7.** Which statement correctly distinguishes the three distributions in a sampling
problem?
- A) the sample's histogram resembles the population for large n, while the sampling distribution of x̄ is narrower than both
- B) the sample's histogram becomes normal for large n, whatever the population looks like
- C) the sampling distribution of x̄ has the same spread as the population
- D) population distribution, sample distribution, and sampling distribution are three names for the same idea

**Answer: A.** Three different objects: the population (fixed), one sample's data
(resembles the population as n grows), and the distribution of x̄ over all samples
(narrower: σ/√n, and approximately normal by the CLT).

**U5-Q8.** A small hospital averages 15 births/day; a large hospital averages 60. Over a
year, which hospital records more days on which over 60% of births are boys?
- A) the large hospital — more births means more chances for such days
- B) both about the same — the probability of a boy is the same everywhere
- C) the small hospital — small samples fluctuate more around 50%
- D) neither — days with over 60% boys essentially never happen

**Answer: C.** Smaller samples have larger standard errors, so extreme proportions occur
more often. Most people answer B. [documented misconception: insensitivity to sample size —
Tversky & Kahneman's hospital problem]

**U5-Q9.** P(Z < −1.50) = ?
- A) 0.9332
- B) 0.4332
- C) 0.1500
- D) 0.0668

**Answer: D.** By symmetry, P(Z < −1.5) = P(Z > 1.5) = 1 − 0.9332 = 0.0668. (A is
P(Z < +1.5); B is the mean-to-z table area; C just echoes the 1.5.)

**U5-Q10.** Scores are N(100, 15). What score is exactly 2 standard deviations *below*
the mean?
- A) 85
- B) 70
- C) 130
- D) 97

**Answer: B.** x = μ + zσ = 100 + (−2)(15) = 70. (A is only 1 SD below; C is 2 SD *above*;
D subtracts 2 points + 1... a careless-reading trap.)

---

## Unit 6 — Confidence Intervals

**U6-Q1.** A 95% confidence interval for the mean commute time is (21.5, 26.3) minutes.
The correct interpretation is:
- A) 95% of commuters take between 21.5 and 26.3 minutes
- B) there is a 95% probability that μ lies between 21.5 and 26.3
- C) we are 95% confident this interval captures μ — the method produces intervals that capture the true mean in about 95% of all samples
- D) 95% of future sample means will fall between 21.5 and 26.3

**Answer: C.** The 95% describes the long-run success rate of the *procedure*. A is the
"95% of the data" misreading; B treats the fixed μ as random; D is also false (it's about
the parameter, not future x̄'s). [the most-documented CI misconceptions]

**U6-Q2.** To build a confidence interval for a population mean using the sample standard
deviation s with n = 64, you should use:
- A) the t distribution, because σ is unknown
- B) the z distribution, because n ≥ 30
- C) the z distribution, because s is known from the data
- D) either one — they give identical intervals

**Answer: A.** The rule is about whether σ (the *population* SD) is known — it almost never
is, so use t with df = 63. With large n, t and z are *close* but not identical, and "n ≥ 30
→ z" is the documented shortcut-turned-misconception. [misconception: t is only for small
samples]

**U6-Q3.** n = 25, x̄ = 80, s = 10. The 95% confidence interval for μ is (t* = 2.064):
- A) (76.08, 83.92)
- B) (75.87, 84.13)
- C) (79.17, 80.83)
- D) (59.36, 100.64)

**Answer: B.** SE = 10/√25 = 2; ME = 2.064 × 2 = 4.13 → 80 ± 4.13. (A used z* = 1.96
instead of t*; C used s/n = 0.4 for the SE; D used s itself without dividing by √n.)
TI-84: `TInterval`.

**U6-Q4.** A sample of 100 voters finds 60 support a measure. The 95% confidence interval
for the population proportion is:
- A) (0.560, 0.640)
- B) (0.519, 0.681)
- C) (0.480, 0.720)
- D) (0.504, 0.696)

**Answer: D.** SE = √(0.6×0.4/100) = 0.049; ME = 1.96 × 0.049 = 0.096 → 0.6 ± 0.096.
(B used z* = 1.645, the 90% value.) TI-84: `1-PropZInt`.

**U6-Q5.** You want to estimate a population proportion to within E = 0.03 with 95%
confidence and have no prior estimate. The required sample size is:
- A) 1,068
- B) 1,067
- C) 752
- D) 34

**Answer: A.** n = (1.96)²(0.25)/(0.03)² = 1067.1 → ALWAYS round UP → 1068. (B rounds
down — the classic point-loser; C used z* = 1.645.)

**U6-Q6.** Which change makes a confidence interval NARROWER?
- A) increasing the confidence level from 95% to 99%
- B) decreasing the sample size
- C) increasing the sample size
- D) requiring the interval to capture μ with higher probability

**Answer: C.** Larger n shrinks the SE (σ/√n). Higher confidence (A, D) requires a *wider*
net to be more sure of catching μ. [documented misconception: students invert both effects]

**U6-Q7.** A confidence interval for μ is (12, 20). The point estimate and margin of
error are:
- A) x̄ = 12, ME = 8
- B) x̄ = 20, ME = 8
- C) x̄ = 16, ME = 8
- D) x̄ = 16, ME = 4

**Answer: D.** The interval is centered at x̄ = (12+20)/2 = 16, and ME is the *half*-width:
(20−12)/2 = 4. (C takes the full width as the ME.)

**U6-Q8.** After computing a specific 95% CI of (4.1, 7.9), which statement is true?
- A) μ has a 95% chance of being between 4.1 and 7.9
- B) this fixed interval either contains μ or it doesn't — the 95% describes the method, not this one interval
- C) if we sampled again, there is a 95% chance of getting this same interval
- D) 95% of the sample's data values lie between 4.1 and 7.9

**Answer: B.** Once computed, nothing is random anymore: μ is a fixed (unknown) number and
the interval is fixed. The probability statement applies to the procedure across repeated
samples.

**U6-Q9.** Which value is *guaranteed* to lie inside a confidence interval for μ?
- A) the sample mean x̄, because the interval is built symmetrically around it
- B) the population mean μ
- C) the majority of the individual data values
- D) the sample median

**Answer: A.** The interval is x̄ ± ME — x̄ is always the center. μ is what we're *hoping*
to capture (and miss 5% of the time); the data values themselves can mostly lie outside.

**U6-Q10.** To estimate a population mean to within E = 2 units with 95% confidence, with
σ = 10, the required sample size is:
- A) 96
- B) 68
- C) 97
- D) 10

**Answer: C.** n = (1.96 × 10/2)² = 96.04 → round UP → 97. (A rounds down; B used 1.645.)

---

## Unit 7 — Hypothesis Testing

**U7-Q1.** A test of H₀: μ = 50 gives a p-value of 0.03. This means:
- A) there is a 3% chance that H₀ is true
- B) there is a 97% chance this result would replicate
- C) the result happened by chance 3% of the time
- D) if μ really were 50, results at least this extreme would occur in about 3% of samples

**Answer: D.** The p-value is P(data this extreme | H₀ true) — a statement about *data*
assuming H₀, never about the probability of H₀ itself. A is the single most common
misconception in all of intro stats; B is the documented "replication fallacy."

**U7-Q2.** Which is a properly stated pair of hypotheses?
- A) H₀: x̄ = 50 vs Hₐ: x̄ ≠ 50
- B) H₀: μ = 50 vs Hₐ: μ ≠ 50
- C) H₀: μ ≠ 50 vs Hₐ: μ = 50
- D) H₀: x̄ = 50 vs Hₐ: μ ≠ 50

**Answer: B.** Hypotheses are claims about population *parameters* (μ, p) — never sample
statistics (we *know* x̄, no need to test it). And H₀ always carries the equality.
[documented misconception: hypotheses about the sample]

**U7-Q3.** A test gives p-value = 0.42 with α = 0.05. The correct conclusion is:
- A) accept H₀ — we have shown the null hypothesis is true
- B) the data prove there is no effect
- C) fail to reject H₀ — the data don't give sufficient evidence against it, which is not proof that it's true
- D) reject Hₐ and conclude H₀ is correct

**Answer: C.** "Fail to reject" ≠ "accept": the study may simply lack power. Absence of
evidence is not evidence of absence. [documented misconception #6]

**U7-Q4.** H₀ says a new drug has no effect. A Type I error here means:
- A) concluding the drug works when it actually does not
- B) concluding the drug doesn't work when it actually does
- C) failing to reach any conclusion from the data
- D) choosing a significance level that is too small

**Answer: A.** Type I = rejecting a TRUE H₀ (false positive); its probability is α.
(B describes Type II, the false negative — students swap these constantly.)

**U7-Q5.** Claim: exactly half of customers prefer Brand X. From n = 200, p̂ = 0.56, the
two-tailed test gives z ≈ 1.70 and p-value ≈ 0.09. At α = 0.05, you should:
- A) reject H₀, since 56% is clearly more than 50%
- B) fail to reject H₀, since the p-value 0.09 exceeds α = 0.05
- C) reject H₀, since the p-value is less than 0.10
- D) accept H₀ and conclude exactly half prefer Brand X

**Answer: B.** Decision rule: reject only when p-value ≤ α. 0.09 > 0.05 → not enough
evidence. (A judges by the raw difference instead of the test; C uses the wrong threshold;
D "accepts.") TI-84: `1-PropZTest`.

**U7-Q6.** Setting α = 0.05 means:
- A) 5% of the data will be treated as outliers and discarded
- B) the probability that H₀ is true is 5%
- C) we will be wrong in 5% of all decisions we ever make
- D) if H₀ is true, we are accepting a 5% risk of wrongly rejecting it

**Answer: D.** α is the Type I error rate — a *conditional* probability (given H₀ true),
chosen before the test. (B inverts the conditional; C drops the condition.)

**U7-Q7.** A study with n = 2,000,000 finds a weight-loss pill produces an average loss of
0.2 lb, p < 0.001. The best characterization:
- A) statistically significant, but probably not practically important
- B) both statistically and practically significant, since p is so small
- C) not statistically significant, because 0.2 lb is tiny
- D) unreliable — samples that large distort p-values

**Answer: A.** Huge samples detect even trivial effects. Significance measures *evidence
of existence*, not *size or importance* of the effect. [documented misconception #7]

**U7-Q8.** You want to test the claim "more than 30% of students work full time." The
alternative hypothesis is:
- A) Hₐ: p ≠ 0.30
- B) Hₐ: p < 0.30
- C) Hₐ: p > 0.30
- D) Hₐ: p ≥ 0.30

**Answer: C.** "More than" → right-tailed alternative; the claim being tested for support
goes in Hₐ (strict inequality). (D can't be an alternative — it includes equality, which
belongs to H₀.)

**U7-Q9.** Test H₀: μ = 50 with x̄ = 52, s = 6, n = 36. The test statistic is:
- A) t = 0.33
- B) t = 12.0
- C) t = 0.06
- D) t = 2.0

**Answer: D.** t = (52 − 50)/(6/√36) = 2/1 = 2.0 with df = 35. (A divides by s instead of
the SE; B divides by s/n.)

**U7-Q10.** β is the probability of:
- A) rejecting a true null hypothesis
- B) failing to reject a false null hypothesis
- C) the null hypothesis being false
- D) making an error of either type

**Answer: B.** β = P(Type II error); power = 1 − β is the chance of correctly detecting a
real effect. (A is α/Type I.)

---

## Unit 8 — Two-Sample Inference & Chi-Square

**U8-Q1.** To evaluate a training program, each employee's productivity is measured before
and after training. The appropriate procedure is:
- A) a paired t-test on the before/after differences
- B) a two-sample t-test treating the groups as independent
- C) a one-proportion z-test on the fraction who improved
- D) a chi-square test of independence

**Answer: A.** Same subjects measured twice → the samples are dependent (paired); analyze
the differences d = after − before. (B wrongly ignores the pairing, wasting power.)

**U8-Q2.** In a chi-square test of independence, a cell's row total is 60, its column total
is 50, and the grand total is 200. The expected count for that cell is:
- A) 30
- B) 55
- C) 15
- D) 110

**Answer: C.** E = (row total)(column total)/(grand total) = 60 × 50/200 = 15.

**U8-Q3.** In a chi-square test of independence, the null hypothesis states:
- A) the two variables are related in the population
- B) the observed counts equal the expected counts exactly
- C) all the population proportions are equal to each other
- D) the two variables are independent in the population

**Answer: D.** H₀ = independence (no association); rejecting it gives evidence of an
association. (Chi-square null hypotheses are always the "no relationship" claim.)

**U8-Q4.** You want to compare the proportion of men versus women who voted yes on a
measure. The appropriate procedure is:
- A) a two-sample t-test
- B) a two-proportion z-test
- C) a paired t-test
- D) a one-way ANOVA

**Answer: B.** Comparing two *proportions* from independent groups → two-proportion z.
(A is for two *means*.)

**U8-Q5.** A contingency table has 3 rows and 4 columns. The degrees of freedom for the
test of independence are:
- A) 12
- B) 11
- C) 6
- D) 7

**Answer: C.** df = (r−1)(c−1) = 2 × 3 = 6. (A is r×c; B is rc−1, the GOF-style formula
misapplied.)

**U8-Q6.** A large chi-square test statistic means:
- A) the observed counts are far from what independence would predict — evidence against H₀
- B) the observed counts closely match the expected counts
- C) the sample size must have been too small
- D) the two variables must be causally related

**Answer: A.** χ² = Σ(O−E)²/E grows as observed counts deviate from expected; large χ² →
small p-value → reject independence. (D overreaches: association ≠ causation, even when
significant.)

**U8-Q7.** A 95% confidence interval for μ₁ − μ₂ is (−1.2, 3.4). At α = 0.05 (two-tailed),
you should conclude:
- A) group 1's mean is significantly larger
- B) no significant difference — zero is a plausible value for the difference
- C) group 2's mean is significantly larger
- D) the samples must have been paired

**Answer: B.** The interval contains 0, so "no difference" can't be ruled out — equivalent
to failing to reject H₀: μ₁ = μ₂.

**U8-Q8.** One-way ANOVA is used to:
- A) compare the variances of two populations
- B) test whether a single mean equals a claimed value
- C) compare two proportions across several groups
- D) test whether three or more population means are all equal

**Answer: D.** ANOVA generalizes the two-sample t to 3+ group means, using the F statistic
(between-group variation / within-group variation). (A confuses it with an F test for
variances.)

---

## Unit 9 — Correlation & Regression

**U9-Q1.** A correlation of r = −0.85 between hours of TV and exam score indicates:
- A) a weak negative linear relationship
- B) a strong negative linear relationship
- C) a strong relationship proving TV watching lowers scores
- D) a computational error, since r cannot be negative

**Answer: B.** |r| near 1 = strong; the sign gives direction. (C smuggles in causation —
correlation can't deliver it.)

**U9-Q2.** An observational study finds students who eat breakfast have significantly
higher GPAs (p < 0.01). The justified conclusion is:
- A) eating breakfast causes higher GPAs, since p < 0.01
- B) breakfast has no real effect — observational studies prove nothing
- C) the relationship is almost certainly due to chance
- D) breakfast and GPA are associated, but confounding variables could explain the link

**Answer: D.** Significance rules out chance as a likely explanation, but in an
observational study it cannot rule out confounders (sleep habits, family structure, etc.).
[documented misconception: significant association → causation]

**U9-Q3.** For a data set, r = 0.8, the SD of y is 4, and the SD of x is 2. The slope of
the least-squares line is:
- A) 1.6
- B) 0.4
- C) 0.8
- D) 3.2

**Answer: A.** b = r(s_y/s_x) = 0.8 × (4/2) = 1.6. (B inverts the ratio; C forgets the
ratio entirely; D multiplies by s_y alone.)

**U9-Q4.** The regression line is ŷ = 12 + 1.6x. The predicted y when x = 7 is:
- A) 13.6
- B) 95.2
- C) 23.2
- D) 19.2

**Answer: C.** ŷ = 12 + 1.6(7) = 12 + 11.2 = 23.2. (A adds the slope once instead of
multiplying; B multiplies the whole expression by 7.)

**U9-Q5.** ŷ = 50 + 2.5x predicts exam score from hours studied. The best interpretation
of 2.5 is:
- A) each extra hour of study causes a 2.5-point score increase
- B) every student who studies one more hour scores exactly 2.5 points higher
- C) 2.5% of the variation in scores is explained by study time
- D) for each additional hour studied, the predicted score increases by about 2.5 points on average

**Answer: D.** Slope language must be *predicted/average* change ("on average"), not
deterministic (B) or causal (A — this would need a randomized experiment). [documented
misconception: deterministic/causal slope interpretation]

**U9-Q6.** The correlation between x and y is r = 0.6. What percent of the variation in y
is explained by the linear relationship with x?
- A) 60%
- B) 36%
- C) 77%
- D) 40%

**Answer: B.** r² = 0.36 → 36%. (A reads r itself as the percent — the #1 error; C treats
0.6 as if it were r², taking √0.6.) [documented misconception: r vs r²]

**U9-Q7.** A regression of weight on age was fit using children aged 2–10. Using the line
to predict the weight of a 40-year-old is:
- A) fine, because the line fit the data well
- B) fine, as long as r is close to 1
- C) unreliable extrapolation — the linear pattern may not continue beyond the observed ages
- D) acceptable, provided the prediction is reported as an average

**Answer: C.** The fitted relationship is only supported inside the observed x-range
(2–10); growth obviously doesn't continue linearly to age 40. [documented misconception:
extrapolation]

**U9-Q8.** For a data set, r ≈ 0. The correct conclusion is:
- A) there is no LINEAR relationship — though a strong curved relationship is still possible
- B) there is no relationship of any kind between the variables
- C) the two variables must be independent
- D) the regression line cannot be computed

**Answer: A.** r measures only *linear* association: a perfect U-shaped (parabolic)
relationship can give r = 0. (B and C overstate; D is false — the line exists, it's just
flat and useless.)

**U9-Q9.** In ŷ = 50 + 2.5x (score from hours studied), the intercept 50 means:
- A) the minimum possible exam score is 50
- B) studying zero hours causes a score of exactly 50
- C) the line crosses the x-axis at 50
- D) the predicted score for someone who studies 0 hours is 50 — meaningful only if x = 0 is within the data's range

**Answer: D.** The intercept is the prediction at x = 0, and interpreting it requires
x = 0 to make sense and be in the data's scope. [documented misconception: over-interpreting
the intercept]

**U9-Q10.** A data point has y = 30, and the regression line predicts ŷ = 26. The residual
for that point is:
- A) −4
- B) 4
- C) 56
- D) 1.15

**Answer: B.** Residual = observed − predicted = 30 − 26 = +4; positive residual = point
lies *above* the line. (A reverses the subtraction — the most common sign error.)

---

## Mixed Set — Choosing the Right Procedure (final-exam style)

**MX-Q1.** Estimate the average commute time of all students at a college from a random
sample of 45 students (population SD unknown). Use:
- A) a one-proportion z-interval
- B) a z-interval for the mean with σ known
- C) a t-interval for the mean
- D) a chi-square test

**Answer: C.** Goal = estimate a MEAN, σ unknown → t-interval, df = 44.

**MX-Q2.** Test whether a coin is fair using the results of 500 flips. Use:
- A) a one-proportion z-test
- B) a one-sample t-test
- C) a paired t-test
- D) a two-proportion z-test

**Answer: A.** The data are yes/no (heads or not) and the claim is about a single
proportion (H₀: p = 0.5).

**MX-Q3.** Is college major (5 categories) related to preferred study location
(3 categories)? Use:
- A) one-way ANOVA
- B) linear regression
- C) a two-sample t-test
- D) a chi-square test of independence

**Answer: D.** Two *categorical* variables, one sample, question of association → chi-square
independence with df = (5−1)(3−1) = 8.

**MX-Q4.** Predict starting salary from years of work experience. Use:
- A) a chi-square goodness-of-fit test
- B) linear regression
- C) a one-proportion z-interval
- D) a paired t-test

**Answer: B.** Two *quantitative* variables with one predicting the other → least-squares
regression.

**MX-Q5.** Compare mean recovery times under three different physical-therapy programs. Use:
- A) three separate two-sample t-tests at α = 0.05 each
- B) a chi-square goodness-of-fit test
- C) a two-proportion z-test
- D) one-way ANOVA

**Answer: D.** Three or more means → ANOVA. (A inflates the overall Type I error rate —
that's exactly the problem ANOVA exists to avoid.)

**MX-Q6.** A randomized, double-blind experiment finds the treatment group improved
significantly more than placebo (p = 0.001). You may conclude:
- A) strong evidence that the drug causes improvement — random assignment justifies the causal claim
- B) association only — correlation never implies causation
- C) the drug works for 99.9% of patients
- D) H₀ has been proven false

**Answer: A.** "Correlation isn't causation" applies to *observational* data; a randomized
experiment is precisely the design that licenses causal conclusions. (This question catches
students who over-apply the slogan.)

**MX-Q7.** Which symbol represents a statistic (not a parameter)?
- A) μ
- B) σ
- C) x̄
- D) p (the population proportion)

**Answer: C.** Sample quantities: x̄, s, p̂. Population quantities: μ, σ, p.

**MX-Q8.** A population of incomes is strongly right-skewed. Why is it still valid to use
normal-based inference for x̄ with n = 100?
- A) large samples make the population itself normal
- B) by the CLT, the sampling distribution of x̄ is approximately normal for large n
- C) skewness disappears from the data once n > 30
- D) it isn't valid — t procedures require a normal population at every sample size

**Answer: B.** The CLT is about the distribution of x̄, which normalizes as n grows even
though the population and the sample stay skewed.

**MX-Q9.** A 95% CI for μ is (21.5, 26.3). Testing H₀: μ = 20 against Hₐ: μ ≠ 20 at
α = 0.05, you should:
- A) reject H₀, because 20 lies outside the interval
- B) fail to reject H₀, because 20 is close to 21.5
- C) accept H₀, because the interval is narrow
- D) conclude nothing — CIs cannot be used to test hypotheses

**Answer: A.** A 95% CI contains exactly the values that would NOT be rejected at α = 0.05
(two-tailed). 20 is outside → reject.

**MX-Q10.** Which gives the strongest basis for GENERALIZING results to an entire
population?
- A) a very large convenience sample
- B) random assignment of subjects to treatment groups
- C) a high response rate among volunteers
- D) a random sample drawn from that population

**Answer: D.** Generalization comes from random *selection*. Random *assignment* (B) buys
causal validity, not representativeness — the two pillars are independent of each other.

---

## Wave 2 — deeper unit pools (IDs continue each unit's numbering)

**U1-Q11.** A podcast host asks listeners to text 1 for "yes" or 2 for "no," and 5,000 texts arrive. The sampling method is:
- A) simple random sampling
- B) cluster sampling
- C) voluntary response sampling
- D) systematic sampling

**Answer: C.** Listeners self-selected — the texts came from whoever cared enough to respond, which biases the result regardless of the 5,000 count.

**U1-Q12.** In the study "plants given Fertilizer X grow taller than unfertilized plants," the RESPONSE variable is:
- A) plant height
- B) fertilizer type
- C) the garden plots
- D) the number of plants

**Answer: A.** The response is the measured outcome (height); fertilizer type is the explanatory variable.

**U1-Q13.** "Class rank (1st, 2nd, 3rd, …)" has which level of measurement?
- A) nominal
- B) ratio
- C) interval
- D) ordinal

**Answer: D.** Ranks order the students, but the gap between 1st and 2nd needn't equal the gap between 2nd and 3rd — order without meaningful differences = ordinal.

**U1-Q14.** A census is:
- A) a random sample of at least 10% of the population
- B) data collected from EVERY member of the population
- C) any survey run by a government agency
- D) a study that uses stratified sampling

**Answer: B.** Census = the whole population; everything smaller is a sample.

**U1-Q15.** A survey asks: "Don't you agree that the cafeteria's food is overpriced?" The biggest flaw is:
- A) nonresponse bias
- B) undercoverage
- C) too small a sample
- D) leading question wording, which produces response bias

**Answer: D.** The phrasing pushes respondents toward "yes" — answers reflect the wording, not true opinion.

**U2-Q11.** For the data 5, 7, 7, 9, 12 the mean and median are:
- A) mean 8, median 9
- B) mean 8, median 7
- C) mean 7, median 8
- D) mean 9, median 7

**Answer: B.** Mean = 40/5 = 8; the middle of the sorted list is 7.

**U2-Q12.** A data set has standard deviation s = 4. Its variance is:
- A) 2
- B) 8
- C) 4
- D) 16

**Answer: D.** Variance = s² = 16. (A takes the square root again; B doubles.)

**U2-Q13.** Ten points are added to every score in a data set. What happens?
- A) the mean increases by 10; the standard deviation is unchanged
- B) both the mean and standard deviation increase by 10
- C) the mean is unchanged; the standard deviation increases by 10
- D) neither changes

**Answer: A.** Shifting every value moves the center but not the spread — distances between values are unchanged.

**U2-Q14.** For 9 ordered data values, the median is:
- A) the average of the 4th and 5th values
- B) the 4th value
- C) the 5th value
- D) any value between the 4th and 6th

**Answer: C.** With odd n, the median is the single middle value: position (9+1)/2 = 5.

**U2-Q15.** Scores are bell-shaped with mean 40 and SD 5. About what percent exceed 50?
- A) 2.5%
- B) 5%
- C) 16%
- D) 0.3%

**Answer: A.** 50 is 2 SDs above the mean; ~95% lie within ±2σ, leaving ~5% split between two tails → ~2.5% above.

**U3-Q11.** P(A) = 0.35. P(A does not occur) = ?
- A) 0.35
- B) 0.50
- C) 1.35
- D) 0.65

**Answer: D.** Complement rule: 1 − 0.35 = 0.65.

**U3-Q12.** A and B are independent with P(A) = 0.6 and P(B) = 0.5. P(A and B) = ?
- A) 1.10
- B) 0.30
- C) 0.55
- D) 0.11

**Answer: B.** Independent → multiply: (0.6)(0.5) = 0.30. (A adds — that's the "or" rule's first step, not "and.")

**U3-Q13.** P(A) = 0.40 and P(A and B) = 0.12. P(B | A) = ?
- A) 0.12
- B) 0.48
- C) 0.30
- D) 3.33

**Answer: C.** P(B|A) = P(A and B)/P(A) = 0.12/0.40 = 0.30. (D divides the wrong way.)

**U3-Q14.** Two independent smoke alarms each work with probability 0.9. P(at least one works) = ?
- A) 0.99
- B) 0.81
- C) 0.90
- D) 1.80

**Answer: A.** 1 − P(both fail) = 1 − (0.1)(0.1) = 0.99. (B is P(both work); D illegally adds.)

**U3-Q15.** How many ways can 2 co-captains be chosen from 5 players (order doesn't matter)?
- A) 20
- B) 10
- C) 25
- D) 120

**Answer: B.** 5C2 = 10. (A is 5P2 = 20, which wrongly counts AB and BA separately.)

**U4-Q11.** X ~ binomial with n = 20, p = 0.25. The mean of X is:
- A) 5
- B) 4
- C) 15
- D) 0.25

**Answer: A.** μ = np = 20(0.25) = 5.

**U4-Q12.** For that same X, the standard deviation is:
- A) 3.75
- B) 5.00
- C) 1.94
- D) 2.24

**Answer: C.** σ = √(npq) = √(20·0.25·0.75) = √3.75 ≈ 1.94. (A is the variance.)

**U4-Q13.** Four independent customers each buy with probability 0.3. P(NO ONE buys) = ?
- A) 0.0081
- B) 0.2401
- C) 0.7000
- D) 0

**Answer: B.** P(none) = (0.7)⁴ = 0.2401. (A computes (0.3)⁴ — everyone buying.)

**U4-Q14.** A game pays $10 with probability 0.1 and nothing otherwise. The fair (break-even) price to play is:
- A) $10.00
- B) $0.10
- C) $5.00
- D) $1.00

**Answer: D.** E(payout) = 10(0.1) = $1 — pay more than that and the house wins long-run.

**U4-Q15.** Which is NOT a binomial random variable?
- A) the number of heads in 20 coin flips
- B) the number of "yes" answers among 50 randomly polled voters
- C) the number of rolls of a die needed to get the first six
- D) the number of defective parts in a random batch of 10

**Answer: C.** "Trials until first success" has no fixed n — that's geometric, not binomial.

**U5-Q11.** P(Z > 1.28) = ?
- A) 0.8997
- B) 0.1003
- C) 0.2810
- D) 0.6400

**Answer: B.** 1 − 0.8997 = 0.1003 — about the top 10%. (A is the left-tail area.)

**U5-Q12.** IQ ~ N(100, 15). P(85 < X < 115) is approximately:
- A) 0.68
- B) 0.95
- C) 0.50
- D) 0.997

**Answer: A.** That's μ ± 1σ → ≈68% (exactly 0.6827).

**U5-Q13.** Wait times ~ N(50, 10). The 25th percentile is about:
- A) 56.7
- B) 25.0
- C) 47.5
- D) 43.3

**Answer: D.** z₀.₂₅ ≈ −0.67 → 50 + (−0.67)(10) ≈ 43.3. (B confuses the percentile with the value.)

**U5-Q14.** σ = 12 and n = 9. The standard error of x̄ is:
- A) 1.33
- B) 12
- C) 4
- D) 3

**Answer: C.** 12/√9 = 12/3 = 4. (A divides by n; D is √9.)

**U5-Q15.** A population is strongly skewed. Why can normal-based methods still be used for x̄ when n = 64?
- A) they can't be — the population must be normal
- B) skewness disappears from the sample data once n > 30
- C) the population becomes normal as sampling continues
- D) the CLT makes the sampling distribution of x̄ approximately normal for large n

**Answer: D.** Only the distribution of the sample MEAN normalizes; the population and the data stay skewed.

**U6-Q11.** The critical value z* for a 90% confidence interval is:
- A) 1.96
- B) 2.576
- C) 1.645
- D) 1.282

**Answer: C.** 90% leaves 5% in each tail → z₀.₉₅ = 1.645. (A is 95%, B is 99%, D is 80%.)

**U6-Q12.** n = 9, x̄ = 20, s = 3, t* = 2.306. The 95% CI for μ is:
- A) (18.04, 21.96)
- B) (19.23, 20.77)
- C) (13.08, 26.92)
- D) (17.69, 22.31)

**Answer: D.** SE = 3/√9 = 1; ME = 2.306 → 20 ± 2.31. (A used z* = 1.96; C used s without √n.)

**U6-Q13.** To cut a confidence interval's margin of error in HALF, the sample size must be:
- A) quadrupled
- B) doubled
- C) halved
- D) unchanged — change the confidence level instead

**Answer: A.** ME ∝ 1/√n, so halving ME needs 4× the n.

**U6-Q14.** n = 20 with p̂ = 0.10. Is the normal-based proportion CI valid?
- A) yes — n is at least 10
- B) no — np̂ = 2 successes, below the required 10
- C) yes — p̂ is below 0.5
- D) no — proportion intervals require n ≥ 100

**Answer: B.** Need at least ~10 successes AND 10 failures; 20(0.10) = 2 fails the check.

**U6-Q15.** From the same data, a 90% CI compared to a 95% CI is:
- A) narrower
- B) wider
- C) identical
- D) shifted to the left

**Answer: A.** Less confidence demanded → smaller critical value → narrower interval.

**U7-Q11.** A test produces p-value = 0.003 with α = 0.01. The decision is:
- A) fail to reject H₀
- B) accept H₀
- C) raise α and retest
- D) reject H₀ — the result is significant even at the 0.01 level

**Answer: D.** 0.003 ≤ 0.01 → reject.

**U7-Q12.** Test H₀: p = 0.40 with p̂ = 0.46, n = 100. The test statistic is about:
- A) z = 0.06
- B) z = 6.0
- C) z = 1.22
- D) z = 2.45

**Answer: C.** SE = √(0.40·0.60/100) = 0.049; z = 0.06/0.049 ≈ 1.22. (A forgets to divide by SE.)

**U7-Q13.** For z = 1.22, the TWO-tailed p-value is about:
- A) 0.11
- B) 0.22
- C) 0.89
- D) 0.06

**Answer: B.** 2 × P(Z > 1.22) = 2(0.1112) ≈ 0.22. (A forgets to double.)

**U7-Q14.** The power of a hypothesis test is:
- A) 1 − β — the probability of detecting an effect that really exists
- B) α — the significance level
- C) β — the Type II error rate
- D) 1 − α — the confidence level

**Answer: A.** Power = P(reject H₀ | H₀ false). More power = fewer missed effects.

**U7-Q15.** The only change that reduces BOTH Type I and Type II error rates is:
- A) raising α
- B) lowering α
- C) increasing the sample size
- D) switching to a one-tailed test

**Answer: C.** α and β trade off against each other at fixed n; more data improves both.

**U8-Q11.** A die-fairness check: 4 categories each expected 25 times; observed 30, 20, 25, 25. χ² = ?
- A) 2.0
- B) 0.5
- C) 10.0
- D) 0

**Answer: A.** (30−25)²/25 + (20−25)²/25 + 0 + 0 = 1 + 1 = 2.0.

**U8-Q12.** That goodness-of-fit test's degrees of freedom:
- A) 4
- B) 3
- C) 2
- D) 99

**Answer: B.** df = k − 1 = 3.

**U8-Q13.** Which scenario calls for an INDEPENDENT-samples t-test?
- A) the same patients' blood pressure before and after medication
- B) twins assigned one to each diet
- C) the proportion of men vs women who exercise
- D) the mean GPA of randomly selected athletes vs randomly selected non-athletes

**Answer: D.** Two unrelated groups, comparing MEANS. (A and B are paired; C is proportions.)

**U8-Q14.** Two-proportion test: 30 of 100 in group 1, 20 of 100 in group 2. The pooled proportion is:
- A) 0.30
- B) 0.20
- C) 0.25
- D) 0.50

**Answer: C.** Pool everything: (30+20)/(100+100) = 50/200 = 0.25.

**U8-Q15.** A chi-square test of independence gives p-value = 0.40. Conclusion:
- A) the variables are proven independent
- B) fail to reject H₀ — no evidence of an association
- C) the variables are associated
- D) the test must be rerun with more categories

**Answer: B.** Large p → the data are consistent with independence; that's absence of evidence, not proof.

**U9-Q11.** For a regression with r² = 0.81 and a NEGATIVE slope, r = ?
- A) 0.81
- B) 0.90
- C) −0.90
- D) −0.81

**Answer: C.** r = ±√0.81 = ±0.9; the slope's sign gives the direction → −0.9.

**U9-Q12.** ŷ = 5 + 2x. The predicted value at x = 10 is:
- A) 25
- B) 20
- C) 7
- D) 52

**Answer: A.** 5 + 2(10) = 25.

**U9-Q13.** A point has y = 22 and ŷ = 25. The residual is:
- A) 3
- B) −3
- C) 47
- D) 0.88

**Answer: B.** Residual = y − ŷ = −3; the point sits below the line. (A reverses the order.)

**U9-Q14.** Heights (x) are converted from centimeters to inches. The correlation r:
- A) is multiplied by 2.54
- B) is divided by 2.54
- C) becomes 0
- D) is unchanged — r has no units

**Answer: D.** Correlation is computed from z-scores, so linear unit changes can't touch it.

**U9-Q15.** Which addition damages a strong correlation the most?
- A) one point far from the line at an extreme x value
- B) one point exactly on the line near the center
- C) a duplicate of an existing point
- D) re-sorting the rows of the data table

**Answer: A.** Influential points — extreme in x AND off the pattern — grab the line and crush r.

---

## Wave 3 — extra depth on the most-failed units (5, 6, 7) + Procedure Roulette

**U5-Q16.** Heights ~ N(70, 8). P(60 < X < 80) = ?
- A) 0.7887
- B) 0.8944
- C) 0.2113
- D) 0.1056

**Answer: A.** z runs from −1.25 to 1.25 → 0.8944 − 0.1056 = 0.7887. (B forgets to subtract the left tail.)

**U5-Q17.** SAT scores ~ N(500, 90). For random samples of n = 36, P(x̄ > 515) = ?
- A) 0.4338
- B) 0.8413
- C) 0.1587
- D) 0.0475

**Answer: C.** SE = 90/√36 = 15; z = (515−500)/15 = 1 → 0.1587. (A uses σ = 90, the SD-vs-SE trap.)

**U5-Q18.** A fair coin (p = 0.5) is flipped 400 times. P(the sample proportion of heads exceeds 0.55) = ?
- A) 0.4207
- B) 0.3085
- C) 0.0500
- D) 0.0228

**Answer: D.** SE = √(0.5·0.5/400) = 0.025; z = 0.05/0.025 = 2 → 0.0228.

**U5-Q19.** A population is heavily skewed. The usual rule of thumb says normal-based methods for x̄ are safe once:
- A) n ≥ 5
- B) n ≥ 30
- C) n ≥ 100
- D) the data are transformed to be symmetric

**Answer: B.** The classic CLT cutoff — by n ≈ 30 the sampling distribution of x̄ is approximately normal for most population shapes.

**U5-Q20.** σ = 10. Which sample size gives the SMALLEST standard error of x̄?
- A) n = 25
- B) n = 100
- C) they're all equal — SE depends only on σ
- D) n = 400

**Answer: D.** SE = 10/√n: 2.0, 1.0, and 0.5 — bigger samples pin down the mean tighter.

**U5-Q21.** The z-value with area 0.975 to its LEFT is:
- A) 1.96
- B) 0.975
- C) 1.645
- D) 2.576

**Answer: A.** That's why 1.96 is the 95% critical value — 2.5% sits in each tail.

**U5-Q22.** IQ ~ N(100, 15). P(X < 70) = ?
- A) 0.0668
- B) 0.0228
- C) 0.9772
- D) 0.1587

**Answer: B.** z = (70−100)/15 = −2 → 0.0228. (C is the complement; A uses z = −1.5.)

**U5-Q23.** The population's shape is unknown and possibly skewed, and the sample has n = 12. Normal-based inference for x̄ is:
- A) fine — the CLT always applies
- B) fine — 12 exceeds 10
- C) not safe — with small n you need the population itself to be approximately normal
- D) impossible at any sample size

**Answer: C.** The CLT needs large n; for small samples the normality must come from the population.

**U6-Q16.** The critical value z* for a 99% confidence interval is:
- A) 1.96
- B) 2.576
- C) 1.645
- D) 3.000

**Answer: B.** 99% leaves 0.5% per tail → z₀.₉₉₅ ≈ 2.576.

**U6-Q17.** A confidence interval for μ is (10.2, 14.6). The point estimate and margin of error are:
- A) 10.2 and 4.4
- B) 12.4 and 4.4
- C) 14.6 and 2.2
- D) 12.4 and 2.2

**Answer: D.** Center = (10.2+14.6)/2 = 12.4; half-width = 2.2.

**U6-Q18.** n = 400 and p̂ = 0.50. The 95% margin of error for p is about:
- A) 0.049
- B) 0.025
- C) 0.098
- D) 0.0006

**Answer: A.** ME = 1.96·√(0.25/400) = 1.96(0.025) ≈ 0.049 — the classic "±5 points" of polls. (B forgets z*.)

**U6-Q19.** For the same confidence level and data, t* compared to z* is always:
- A) smaller
- B) equal
- C) larger — t compensates for estimating σ with s
- D) sometimes smaller, sometimes larger

**Answer: C.** The t distribution has heavier tails (extra uncertainty from using s), so its critical values exceed z's, shrinking toward z as df grows.

**U6-Q20.** Keeping the same data but raising the confidence level from 90% to 99% makes the margin of error:
- A) larger
- B) smaller
- C) unchanged
- D) exactly zero

**Answer: A.** Higher confidence demands a bigger critical value → wider net.

**U6-Q21.** A 95% CI for μ is (45.7, 54.3). Testing H₀: μ = 55 vs Hₐ: μ ≠ 55 at α = 0.05:
- A) fail to reject — 55 is close to the upper bound
- B) accept H₀
- C) the CI cannot be used for this
- D) reject H₀ — 55 lies outside the interval

**Answer: D.** A 95% CI contains exactly the H₀ values that survive a two-tailed α = 0.05 test; 55 doesn't.

**U6-Q22.** To estimate a mean within E = 3 with 95% confidence when σ = 15, the required n is:
- A) 96
- B) 25
- C) 97
- D) 10

**Answer: C.** n = (1.96·15/3)² = 96.04 → always round UP.

**U6-Q23.** Which set of conditions justifies a t-interval for μ?
- A) the sample mean must equal the population mean
- B) a random sample AND (population roughly normal OR n large)
- C) σ must be known exactly
- D) the data must contain no variability

**Answer: B.** Random sampling plus normality-or-large-n is the standard checklist; σ known would call for z instead.

**U7-Q16.** Test H₀: μ = 8 hours against Hₐ: μ ≠ 8 with x̄ = 7.4, s = 1.8, n = 36. The test statistic is:
- A) t = −0.33
- B) t = −3.6
- C) t = −2.0
- D) t = 0.60

**Answer: C.** SE = 1.8/√36 = 0.3; t = (7.4−8)/0.3 = −2.0. (A divides by s; B divides by s/n.)

**U7-Q17.** The degrees of freedom for that test are:
- A) 35
- B) 36
- C) 34
- D) 6

**Answer: A.** df = n − 1 = 35.

**U7-Q18.** That test's two-tailed p-value is about 0.053. At α = 0.05 the decision is:
- A) reject H₀ — it's close enough
- B) accept H₀ — the mean is exactly 8
- C) flip a coin — the evidence is perfectly balanced
- D) fail to reject H₀ — 0.053 exceeds 0.05, even if barely

**Answer: D.** The rule is mechanical: reject only when p ≤ α. Report the near-miss honestly, but the formal decision stands.

**U7-Q19.** Testing the claim "fewer than 40% of students commute" yields z = −1.8. The p-value (left-tailed) is:
- A) 0.9641
- B) 0.0359
- C) 0.0718
- D) 0.1800

**Answer: B.** P(Z < −1.8) = 0.0359. (C doubles it — but this is one-tailed; A is the wrong tail.)

**U7-Q20.** With that p-value (0.0359) and α = 0.05:
- A) fail to reject H₀ — insufficient evidence
- B) accept H₀ — commuting is exactly 40%
- C) the test is invalid because z is negative
- D) reject H₀ — sufficient evidence that fewer than 40% commute

**Answer: D.** 0.0359 ≤ 0.05 → reject, and conclude in the claim's direction and context.

**U7-Q21.** Using α = 0.05 means that IF H₀ is true:
- A) the test will be wrong 95% of the time
- B) β must equal 0.95
- C) there is a 5% chance of wrongly rejecting it (a Type I error)
- D) the p-value will always be 0.05

**Answer: C.** α is the Type I error rate, fixed before the data are seen.

**U7-Q22.** A result is significant at α = 0.01. At α = 0.05 the same result is:
- A) also significant — p ≤ 0.01 implies p ≤ 0.05
- B) not necessarily significant
- C) significant only if n is large
- D) exactly borderline

**Answer: A.** Clearing the stricter bar clears the looser one automatically.

**U7-Q23.** Before a one-proportion z-test, the condition to verify is:
- A) the sample mean is normal
- B) np₀ ≥ 10 and n(1−p₀) ≥ 10 — using the H₀ value p₀, not p̂
- C) σ is known
- D) the population is smaller than the sample

**Answer: B.** The test is computed under H₀, so the normality check uses p₀.

**MX-Q11.** Estimate the average weight change for 15 people measured before AND after a program. Procedure:
- A) two-sample independent t-interval
- B) one-proportion z-interval
- C) chi-square test of independence
- D) paired t-interval on the differences

**Answer: D.** Same people, two measurements → dependent samples → analyze the differences.

**MX-Q12.** Does the percent of defective parts differ between two factories (random samples from each)? Procedure:
- A) paired t-test
- B) two-proportion z-test
- C) one-way ANOVA
- D) linear regression

**Answer: B.** Two independent groups, categorical (defective/not) outcome.

**MX-Q13.** Describe the relationship between hours studied and exam score (both quantitative). Procedure:
- A) correlation and least-squares regression
- B) chi-square goodness-of-fit
- C) two-sample t-test
- D) one-proportion z-test

**Answer: A.** Two quantitative variables → scatterplot, r, regression line.

**MX-Q14.** A casino die is rolled 600 times; you record how often each face appeared. To test fairness:
- A) one-sample t-test
- B) two-proportion z-test
- C) chi-square goodness-of-fit test
- D) linear regression

**Answer: C.** One categorical variable against claimed proportions (1/6 each) → GOF, df = 5.

**MX-Q15.** Estimate the percentage of all CCM students who work, from a random sample of 300. Procedure:
- A) one-sample t-interval
- B) one-proportion z-interval
- C) paired t-interval
- D) chi-square test of independence

**Answer: B.** One categorical yes/no variable, goal = estimate a proportion.

**MX-Q16.** Compare the mean customer wait time across FOUR bank branches. Procedure:
- A) six separate two-sample t-tests
- B) chi-square test of homogeneity
- C) two-sample t-test on the largest and smallest
- D) one-way ANOVA

**Answer: D.** 3+ group means in one analysis; running many t-tests inflates the Type I error rate.
