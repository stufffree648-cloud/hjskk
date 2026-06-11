/* ================= THE CLIMB TO 100 — game engine =================
   Mechanics follow ../game-system.md: XP only for learning-aligned
   actions, mastery-gated bosses, forgiving streaks (2 freezes/month +
   fresh-start framing), spaced review of misses, ~85% difficulty target,
   surprise (never pre-announced) loot, cliffhanger session endings.    */

"use strict";

/* ---------------- constants ---------------- */
const UNITS = {
  1: { name: "Data & Sampling", sub: "Sullivan Ch 1", icon: "🗳️" },
  2: { name: "Descriptive Statistics", sub: "Sullivan Ch 2–3", icon: "📊" },
  3: { name: "Probability", sub: "Sullivan Ch 5", icon: "🎲" },
  4: { name: "Discrete & Binomial", sub: "Sullivan Ch 6", icon: "🪙" },
  5: { name: "Normal & CLT", sub: "Sullivan Ch 7–8 · hardest", icon: "🔔" },
  6: { name: "Confidence Intervals", sub: "Sullivan Ch 9", icon: "🎯" },
  7: { name: "Hypothesis Testing", sub: "Sullivan Ch 10", icon: "⚖️" },
  8: { name: "Two-Sample & Chi-Square", sub: "Sullivan Ch 11–12", icon: "🧮" },
  9: { name: "Correlation & Regression", sub: "Sullivan Ch 4 + 14", icon: "📈" },
  10: { name: "Procedure Roulette", sub: "mixed final-exam style", icon: "🎰" },
};
const BOSS_FACES = { 1: "🕴️", 2: "👾", 3: "🎰", 4: "👑", 5: "🦹", 6: "🛡️", 7: "⚖️", 8: "🦁", 9: "🔮", 10: "🐉" };
const BOSS_LINES = {
  1: { intro: "My polls say you'll lose. I surveyed everyone who agrees with me.", taunts: ["Just as my biased sample predicted!", "I only polled people who think you'll fail!", "2 million voluntary responses can't be wrong... right?"], defeat: "Curses... a truly random sample..." },
  2: { intro: "I will DRAG your mean wherever I please.", taunts: ["Your score is skewing right... downward!", "One extreme value is all I need!", "Resistant? Your mean isn't!"], defeat: "I've been... trimmed from the data..." },
  3: { intro: "I'm due for a win. I can FEEL it. The streak demands it.", taunts: ["The wheel remembers, I swear it!", "After that miss, my win is GUARANTEED!", "These dice are hot tonight!"], defeat: "The house... the house always wins..." },
  4: { intro: "Success or failure. n trials. There is nothing else in my kingdom.", taunts: ["You forgot the nCx, peasant!", "That was the CUMULATIVE probability, fool!", "n − 1 ways to fail, and you found one!"], defeat: "Improbable... yet... it occurred..." },
  5: { intro: "Your sample means belong to ME. No one remembers the √n.", taunts: ["You used σ instead of σ/√n — DELICIOUS!", "The data never become normal — only the means!", "Another victim of the standard error!"], defeat: "The sampling distribution... it's... normal... after all..." },
  6: { intro: "Are you 95% confident? You shouldn't be. Most can't even say what it means.", taunts: ["95% of the data, you say? WRONG!", "You used z when σ was unknown!", "Your interval missed the parameter!"], defeat: "You... captured me... like the method intended..." },
  7: { intro: "You cannot prove me false. The brave reject me; the careless accept me.", taunts: ["You ACCEPTED me?! I am never accepted!", "Your p-value is not the probability I'm true!", "Insufficient evidence, mortal!"], defeat: "p < α... I am... rejected... with sufficient evidence..." },
  8: { intro: "Answer my riddle, traveler: WHICH TEST do you use?", taunts: ["Wrong procedure, mortal!", "Paired data, independent test — pathetic!", "(O−E)²/E... your expected counts betray you!"], defeat: "You knew... every test... the riddle is solved..." },
  9: { intro: "I have seen your future — I predicted it from data that ends years ago!", taunts: ["My line extends FOREVER!", "r = 0.6 explains 60%... or does it? You'll never know!", "Correlation IS causation if you believe hard enough!"], defeat: "Out of range... extrapolated... into nothing..." },
  10: { intro: "Every concept. Every formula. Every trap. ALL AT ONCE. This is what 100% feels like from the other side.", taunts: ["The final is CUMULATIVE, child!", "Week 1 material — and you've forgotten it!", "Your professor gives NO partial credit, and neither do I!"], defeat: "You are... ready... Go take your 100... Statistician... Supreme..." },
};
const LEVELS = [
  { xp: 0, title: "Data Rookie" },
  { xp: 250, title: "Sample Scout" },
  { xp: 600, title: "Probability Apprentice" },
  { xp: 1100, title: "Distribution Wrangler" },
  { xp: 1800, title: "Inference Agent" },
  { xp: 2700, title: "Hypothesis Hunter" },
  { xp: 3800, title: "Regression Ranger" },
  { xp: 5000, title: "STATISTICIAN SUPREME" },
];
const REVIEW_GAPS = [1, 3, 7];        // days until next due, by stage
const DAILY_REVIEW_CAP = 12;          // anti-burnout: flatten the backlog
const BOSS_UNLOCK_POWER = 0.8;
const DRAGON_UNLOCK_CLEARS = 6;
const GAUNTLET_UNLOCK = "2026-07-22"; // week-4 novelty refresh, per the research
const GAUNTLET_SIZE = 8;
const GAUNTLET_PAR_MS = 4 * 60 * 1000;

const LOOT = [
  "🤯 The Literary Digest poll had 2.4 MILLION responses in 1936 — and still called the election completely wrong. Bias doesn't shrink with size.",
  "🗝️ TI-84 cheat code: CATALOG → DiagnosticOn makes LinReg show r and r². Do it once, it sticks.",
  "🤯 In a room of just 23 people there's a 50.7% chance two share a birthday.",
  "🗝️ TI-84: for P(X ≥ k) use 1 − binomcdf(n, p, k−1). The k−1 is where everyone slips.",
  "🕵️ Boss intel: the #1 exam trap is using σ instead of σ/√n in sample-mean problems. The wrong answer is ALWAYS one of the choices.",
  "🤯 Answer-changing data: across 1,561 real exams, changes were wrong→right twice as often as right→wrong. 'Trust your first instinct' is a myth.",
  "🗝️ Sample size problems ALWAYS round UP. n = 422.04 → 423. Rounding down is a free point lost.",
  "🕵️ Boss intel: 'fail to reject H₀' never means 'H₀ is true.' Stigliano-style tests love this distinction.",
  "🤯 A 95% CI does NOT mean 95% of the data are inside it. It's about the method catching μ across repeated samples.",
  "🗝️ TI-84: invNorm(0.90, μ, σ) gives the 90th percentile directly — no table needed.",
  "🤯 Statistically significant ≠ important. With n = 2,000,000 even a 0.2 lb weight-loss 'works' at p < .001.",
  "🕵️ Boss intel: mutually exclusive events are NEVER independent (when both can actually happen). They're near-opposites.",
  "🗝️ MyLab: 'View an Example' costs nothing and keeps your numbers. 'Similar Exercise' replaces a bad homework score entirely.",
  "🤯 Sleep fact: one all-nighter cuts your brain's ability to form new memories by ~40%. The quiz you're doing now is the anti-cram.",
  "🗝️ normalcdf(lower, upper, μ, σ) — use −1E99 / 1E99 for open tails. The 1E99 is the EE key, not ^99.",
  "🕵️ Boss intel: r = 0.6 explains 36% of variation (r²), not 60%. The Extrapolator counts on you forgetting.",
  "🤯 Retrieval practice doesn't just teach — a Science RCT showed it makes memories survive exam stress that wipes out re-studied material.",
  "🗝️ Probability sanity gauntlet: every probability ∈ [0,1] · r ∈ [−1,1] · SE < SD · CI contains the point estimate. Run it before locking in.",
  "🤯 The 'hot hand' coin: after 5 heads, P(heads) is still exactly 0.5. Coins have no memory. Casinos profit on people who think they do.",
  "🗝️ z vs t: the real rule is whether σ (population SD) is known — basically never. Default to t. 'n ≥ 30 → z' is the trap version.",
  "🕵️ Boss intel: in chi-square, H₀ is ALWAYS 'independent / no association.' A big χ² is evidence of a relationship — never proof of causation.",
  "🤯 The small hospital beats the big one for extreme days: small samples swing harder. Tversky & Kahneman fooled most subjects with this.",
  "🗝️ Paired vs independent: same subjects measured twice = PAIRED t. Before/after is the giveaway word.",
  "🤯 You're studying with the same spacing schedule (1-3-7 days) that raised real course grades by a letter in published trials.",
];

/* ---------------- state ---------------- */
const SAVE_KEY = "climb100_v1";
let S = null;

function freshState() {
  return {
    xp: 0,
    streak: 0, bestStreak: 0, lastPlay: null,
    freezeMonth: monthStr(), freezesUsed: 0,
    perQ: {},                       // id -> {tc, tw, stage, due, days[], everWrong, lastWrong}
    bossCleared: {}, bossPerfect: {},
    questDate: "", quests: [],
    totals: { answered: 0, correct: 0 },
    cliffhanger: null,
    diagDone: null,
    badges: {},                       // id -> date earned
    counters: { revenge: 0, maxCombo: 0 },
    history: {},                      // date -> {a: answered, c: correct, xp}
    luckyDate: null,                  // date the daily lucky question was claimed
    daily: null,                      // {date, score, streak} for the Daily Challenge
    seenIntro: false,
    muted: false,
    theme: null,           // null = follow system preference; else 'dark' | 'light'
  };
}
function load() {
  try { S = JSON.parse(localStorage.getItem(SAVE_KEY)) || freshState(); }
  catch { S = freshState(); }
  for (const [k, v] of Object.entries(freshState())) if (!(k in S)) S[k] = v;
}
function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); }

function todayStr(d) { return (d || new Date()).toISOString().slice(0, 10); }
function monthStr() { return todayStr().slice(0, 7); }
function dayDiff(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }
function addDays(dstr, n) { const d = new Date(dstr); d.setDate(d.getDate() + n); return todayStr(d); }

function qstate(id) {
  if (!S.perQ[id]) S.perQ[id] = { tc: 0, tw: 0, stage: 0, due: null, days: [], everWrong: false, lastWrong: false };
  return S.perQ[id];
}
function isMastered(id) { const q = S.perQ[id]; return !!q && q.days.length >= 3; }

/* ---------------- formula scrolls (unlock at 50% unit power) ---------------- */
const SCROLLS = {
  1: { name: "Scroll of Sound Sampling", html: `
    <p><b>Statistic</b> = from a sample (x̄, s, p̂) · <b>Parameter</b> = whole population (μ, σ, p)</p>
    <p><b>Methods:</b> simple random · stratified (some from EVERY group) · cluster (ALL of a few groups) · systematic (every kth) · convenience (⚠️ biased)</p>
    <p><b>The two pillars:</b> random <i>selection</i> → generalize · random <i>assignment</i> → causation</p>
    <p>Levels: nominal → ordinal → interval (no true 0) → ratio</p>` },
  2: { name: "Scroll of the Center & Spread", html: `
    <p>x̄ = Σx/n · s² = Σ(x−x̄)²/(n−1) ← <b>divide by n−1</b></p>
    <p>z = (x − μ)/σ · IQR = Q3 − Q1 · fences: Q1 − 1.5·IQR, Q3 + 1.5·IQR</p>
    <p>Empirical Rule: 68 / 95 / 99.7 within 1 / 2 / 3 SD</p>
    <p>Right-skew → mean &gt; median · use median + IQR for skewed data</p>
    <p>TI-84: <code>STAT → 1-Var Stats</code> (x̄ = mean, Sx = sample SD)</p>` },
  3: { name: "Scroll of Chance", html: `
    <p>P(A′) = 1 − P(A) · P(A or B) = P(A) + P(B) − P(A and B)</p>
    <p>P(A and B) = P(A)·P(B|A) — independent ⇔ P(A and B) = P(A)P(B)</p>
    <p>P(B|A) = P(A and B)/P(A) ← <b>the given event is the denominator</b></p>
    <p>Mutually exclusive ≠ independent (they're near-opposites!)</p>
    <p>nCr = n!/(r!(n−r)!) — order doesn't matter · nPr — order matters</p>` },
  4: { name: "Scroll of Lord Binomial", html: `
    <p>Valid distribution: each P in [0,1], ΣP = 1 · μ = Σx·P(x)</p>
    <p>Binomial: fixed n, two outcomes, independent, constant p</p>
    <p>P(x) = nCx·pˣ·qⁿ⁻ˣ · μ = np · σ = √(npq)</p>
    <p>P(at least one) = 1 − P(none)</p>
    <p>TI-84: <code>binompdf(n,p,x)</code> = exactly x · <code>binomcdf(n,p,x)</code> = ≤ x · P(X≥k) = 1 − binomcdf(n,p,k−1)</p>` },
  5: { name: "Scroll of the Bell (the Thief's weakness)", html: `
    <p>z = (x − μ)/σ · x = μ + zσ</p>
    <p><b>CLT:</b> x̄ ~ Normal(μ, σ/√n) for large n — the SAMPLE MEAN normalizes, never the data</p>
    <p><b>SE = σ/√n</b> ← using σ instead of σ/√n is the #1 exam error</p>
    <p>p̂: SE = √(pq/n)</p>
    <p>TI-84: <code>normalcdf(lo,hi,μ,σ)</code> · <code>invNorm(area,μ,σ)</code> · tails: ±1E99</p>` },
  6: { name: "Scroll of the Interval Keeper", html: `
    <p>Mean (σ unknown — always, basically): x̄ ± t*·s/√n, df = n−1</p>
    <p>Proportion: p̂ ± z*·√(p̂q̂/n) — need ≥10 successes AND failures</p>
    <p>z*: 90% → 1.645 · 95% → 1.96 · 99% → 2.576</p>
    <p>n for proportion: (z*)²(0.25)/E² · n for mean: (z*σ/E)² — <b>ALWAYS round UP</b></p>
    <p>Interpretation: "95% of intervals built this way capture μ" — never "95% of data"</p>
    <p>TI-84: <code>TInterval</code> · <code>1-PropZInt</code></p>` },
  7: { name: "Scroll of the Null", html: `
    <p>H₀ has the = , about PARAMETERS (μ, p) — never x̄ or p̂</p>
    <p>Proportion: z = (p̂−p₀)/√(p₀q₀/n) · Mean: t = (x̄−μ₀)/(s/√n)</p>
    <p>Reject H₀ ⇔ p-value ≤ α · "fail to reject" ≠ "accept"</p>
    <p>p-value = P(data this extreme | H₀ true) — never P(H₀)</p>
    <p>Type I = reject true H₀ (α) · Type II = miss real effect (β) · power = 1−β</p>
    <p>TI-84: <code>T-Test</code> · <code>1-PropZTest</code></p>` },
  8: { name: "Scroll of the Sphinx", html: `
    <p>Paired (same subjects twice): t = d̄/(s_d/√n) · Independent: 2-SampTTest</p>
    <p>χ² = Σ(O−E)²/E · E = (row total)(col total)/grand total</p>
    <p>df: GOF = k−1 · independence = (r−1)(c−1)</p>
    <p>χ² H₀ is ALWAYS "independent / no association"</p>
    <p>CI for difference contains 0 ⇔ no significant difference</p>
    <p>3+ means → ANOVA (one test, not many t-tests)</p>` },
  9: { name: "Scroll of the Line", html: `
    <p>ŷ = a + bx · b = r·(s_y/s_x) · a = ȳ − b·x̄</p>
    <p>residual = y − ŷ (positive = point above line)</p>
    <p>r ∈ [−1,1], unit-free · <b>r² = % of variation explained</b> (r = 0.6 → 36%!)</p>
    <p>Slope speak: "predicted y changes by b per unit x, on average" — no causation from observational data, no extrapolation beyond the data's x-range</p>
    <p>TI-84: <code>LinReg(ax+b)</code> — run <code>DiagnosticOn</code> once first</p>` },
};
function showScroll(u) {
  const s = SCROLLS[u];
  if (!s) return;
  modal(`<div class="big-emoji">📜</div><h2>${s.name}</h2><div style="text-align:left">${s.html}</div>
    <button class="big-btn primary" onclick="closeModal()">Tuck it away ➜</button>`);
}

/* ---------------- trophies ---------------- */
function masteredCount() {
  return Object.values(S.perQ).filter(st => st.days && st.days.length >= 3).length;
}
const BADGES = [
  { id: "first", icon: "👣", name: "First Step", desc: "Answer your first question", check: s => s.totals.answered >= 1 },
  { id: "scout", icon: "🧪", name: "Scouted", desc: "Finish the Readiness Check", check: s => !!s.diagDone },
  { id: "week", icon: "🔥", name: "Week Warrior", desc: "Reach a 7-day streak", check: s => s.bestStreak >= 7 },
  { id: "fort", icon: "🌋", name: "Fortnight Flame", desc: "Reach a 14-day streak", check: s => s.bestStreak >= 14 },
  { id: "cent", icon: "💯", name: "Centurion", desc: "100 lifetime correct", check: s => s.totals.correct >= 100 },
  { id: "spree", icon: "🌟", name: "Hot Streak Scholar", desc: "250 lifetime correct", check: s => s.totals.correct >= 250 },
  { id: "blood", icon: "⚔️", name: "First Blood", desc: "Defeat any boss", check: s => Object.keys(s.bossCleared).length >= 1 },
  { id: "hunter", icon: "🏹", name: "Boss Hunter", desc: "Defeat 5 bosses", check: s => Object.keys(s.bossCleared).length >= 5 },
  { id: "flawless", icon: "💥", name: "Flawless", desc: "Perfect-clear a boss", check: s => Object.keys(s.bossPerfect).length >= 1 },
  { id: "dragon", icon: "🐉", name: "DRAGONSLAYER", desc: "Defeat the Final Exam Dragon", check: s => !!s.bossCleared[10] },
  { id: "comeback", icon: "🦅", name: "Comeback Kid", desc: "5 revenge clears", check: s => s.counters.revenge >= 5 },
  { id: "fire", icon: "🎯", name: "On Fire", desc: "8-correct combo in one session", check: s => s.counters.maxCombo >= 8 },
  { id: "deck", icon: "🃏", name: "Deck Builder", desc: "Master 10 questions", check: () => masteredCount() >= 10 },
  { id: "palace", icon: "🏛️", name: "Memory Palace", desc: "Master 50 questions", check: () => masteredCount() >= 50 },
  { id: "quest", icon: "📜", name: "Questmaster", desc: "Clear all 3 daily quests", check: s => s.quests.length === 3 && s.quests.every(q => q.done) },
  { id: "daily7", icon: "👑", name: "Daily Devotee", desc: "Complete 7 Daily Challenges", check: s => (s.counters.dailies || 0) >= 7 },
];
function awardBadges() {
  for (const b of BADGES) {
    if (!S.badges[b.id] && b.check(S)) {
      S.badges[b.id] = todayStr();
      toast(`🏆 Trophy unlocked: ${b.icon} ${b.name} — ${b.desc}`, true);
      sfx("loot"); confetti(70);
    }
  }
  save();
}

/* ---------------- streak (forgiving by design) ---------------- */
function touchStreak() {
  const today = todayStr();
  if (S.freezeMonth !== monthStr()) { S.freezeMonth = monthStr(); S.freezesUsed = 0; }
  if (S.lastPlay === today) return;
  if (S.lastPlay === null) {
    S.streak = 1; toast("🔥 Day 1. The chain begins.");
  } else {
    const gap = dayDiff(S.lastPlay, today);
    if (gap === 1) {
      S.streak += 1; toast(`🔥 Streak: ${S.streak} days!`);
    } else {
      const missed = gap - 1;
      const avail = 2 - S.freezesUsed;
      if (missed <= avail) {
        S.freezesUsed += missed; S.streak += 1;
        toast(`🧊 ${missed} streak freeze${missed > 1 ? "s" : ""} used — chain intact at ${S.streak}. Smart resource management.`);
      } else {
        S.streak = 1;
        toast("🌅 Fresh start — new chain begins today. Your XP and mastery never reset.");
      }
    }
  }
  S.bestStreak = Math.max(S.bestStreak, S.streak);
  S.lastPlay = today;
  save();
}

/* ---------------- daily quests ---------------- */
const QUEST_POOL = [
  { key: "q10", desc: "Answer 10 questions", target: 10 },
  { key: "c8", desc: "Get 8 questions right", target: 8 },
  { key: "rev3", desc: "Clear 3 due reviews", target: 3 },
  { key: "ft5", desc: "First-try correct on 5 new questions", target: 5 },
  { key: "rv2", desc: "Get revenge on 2 questions that once beat you", target: 2 },
  { key: "dmg5", desc: "Deal 5 damage in a boss battle", target: 5 },
];
function hashStr(s) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}
function luckyId() {
  return BANK[hashStr("lucky" + todayStr()) % BANK.length].id;
}
function logHistory(correct, xp) {
  const d = todayStr();
  const h = S.history[d] || { a: 0, c: 0, xp: 0 };
  h.a++; if (correct) h.c++; h.xp += xp;
  S.history[d] = h;
}

function seededPick(dateStr, pool, n) {
  let h = 0;
  for (const c of dateStr) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const idx = [...pool.keys()];
  for (let i = idx.length - 1; i > 0; i--) { h = (h * 1103515245 + 12345) >>> 0; const j = h % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return idx.slice(0, n).map(i => pool[i]);
}
function ensureQuests() {
  const today = todayStr();
  if (S.questDate === today && S.quests.length) return;
  S.questDate = today;
  S.quests = seededPick(today, QUEST_POOL, 3).map(q => ({ ...q, prog: 0, done: false }));
  save();
}
function questEvent(key, amt = 1) {
  let allDoneBefore = S.quests.every(q => q.done);
  for (const q of S.quests) {
    if (q.key === key && !q.done) {
      q.prog += amt;
      if (q.prog >= q.target) {
        q.done = true;
        grantXP(10, `quest: ${q.desc}`);
        toast(`📜 Quest complete — ${q.desc}! +10 XP`);
        sfx("quest");
      }
    }
  }
  if (!allDoneBefore && S.quests.every(q => q.done)) {
    grantXP(20, "all quests chest");
    toast("🎁 All 3 quests done — bonus chest +20 XP!", true);
    confetti(60);
  }
  save();
}

/* ---------------- XP & levels ---------------- */
function levelFor(xp) {
  let lvl = 0;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].xp) lvl = i;
  return lvl;
}
function grantXP(amount, why) {
  const before = levelFor(S.xp);
  S.xp += amount;
  const after = levelFor(S.xp);
  save();
  if (after > before) {
    sfx("level"); confetti(160);
    modal(`
      <div class="big-emoji">🏅</div>
      <h2>LEVEL ${after + 1}: ${LEVELS[after].title}</h2>
      <p>${S.xp} XP and climbing. ${after === LEVELS.length - 1 ? "The summit. You ARE the curve." : `Next rank at ${LEVELS[after + 1].xp} XP.`}</p>
      <button class="big-btn primary" onclick="closeModal()">Keep climbing ➜</button>`);
  }
}
function xpFloat(text, x, y) {
  const el = document.createElement("div");
  el.className = "xp-float"; el.textContent = text;
  el.style.left = (x - 20) + "px"; el.style.top = (y - 10) + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

/* ---------------- unit power & reviews ---------------- */
function unitQuestions(u) { return BANK.filter(q => q.unit === u); }
function unitPower(u) {
  const qs = unitQuestions(u);
  if (!qs.length) return 0;
  let pts = 0;
  for (const q of qs) { const st = S.perQ[q.id]; if (st) pts += Math.min(st.tc, 2); }
  return pts / (2 * qs.length);
}
function allQById() {
  const map = {};
  for (const q of BANK) map[q.id] = q;
  for (const k of Object.keys(BOSSES)) for (const q of BOSSES[k].questions) map[q.id] = q;
  for (const q of DIAG) map[q.id] = q;
  return map;
}
let _qbyid = null;
function byId(id) { if (!_qbyid) _qbyid = allQById(); return _qbyid[id]; }

function dueReviews() {
  const today = todayStr();
  const due = Object.entries(S.perQ)
    .filter(([id, st]) => st.due && st.due <= today && byId(id))
    .sort((a, b) => (a[1].due < b[1].due ? -1 : 1))
    .map(([id]) => id);
  return due.slice(0, DAILY_REVIEW_CAP);   // backlog beyond the cap stays silently queued
}

/* ---------------- answer processing (the learning engine) ---------------- */
function recordAnswer(q, correctPick, sure, isReviewDue) {
  const st = qstate(q.id);
  const today = todayStr();
  S.totals.answered++;
  questEvent("q10");
  let xp = 0, msgs = [];

  if (correctPick) {
    S.totals.correct++;
    questEvent("c8");
    const firstTry = st.tc === 0 && st.tw === 0;
    const wasMastered = isMastered(q.id);
    st.tc++;
    if (!st.days.includes(today)) st.days.push(today);

    if (st.lastWrong) { xp += 20; msgs.push("⚔️ REVENGE +20"); S.counters.revenge++; questEvent("rv2"); }
    else if (wasMastered && !isReviewDue) { xp += 2; msgs.push("+2 (already mastered)"); }
    else if (isReviewDue) { xp += 15; msgs.push("🧹 review cleared +15"); questEvent("rev3"); }
    else { xp += 10; msgs.push("+10"); }
    if (firstTry && sure) questEvent("ft5");

    if (!wasMastered && isMastered(q.id)) {
      xp += 25; msgs.push("⭐ MASTERED +25");
      toast(`⭐ Mastered: ${q.id} — third correct on a different day. +25 XP`, true);
      dropLoot(true);
    } else if (Math.random() < 0.12) {
      dropLoot(false);
    }

    if (sure) {
      st.stage = Math.min(st.stage + 1, 3);
      st.due = st.stage >= 3 ? null : addDays(today, REVIEW_GAPS[st.stage - 1]);
    } else {
      st.due = addDays(today, 1);     // unsure-correct decays fast — see it tomorrow
      msgs.push("🤔 logged as unsure — it'll come back tomorrow");
    }
    st.lastWrong = false;
  } else {
    st.tw++; st.everWrong = true; st.lastWrong = true;
    st.stage = 0;
    st.due = today;                    // re-asked this session, then tomorrow
    xp += 2; msgs.push("🔎 scout XP +2 — you found a weak spot before the exam did");
  }

  grantXP(xp, q.id);
  save();
  return { xp, msgs };
}

function dropLoot(guaranteed) {
  const item = LOOT[Math.floor(Math.random() * LOOT.length)];
  setTimeout(() => { toast(item, true); sfx("loot"); }, guaranteed ? 900 : 500);
}

/* ---------------- session builder ---------------- */
function buildSession(unit) {
  // due reviews first (any unit), then new/weak questions from the chosen unit
  const reviews = dueReviews().map(id => ({ id, review: true }));
  const today = todayStr();
  const fresh = unitQuestions(unit)
    .filter(q => !reviews.some(r => r.id === q.id))
    .sort((a, b) => {
      const sa = S.perQ[a.id], sb = S.perQ[b.id];
      const ka = sa ? Math.min(sa.tc, 3) * 10 + (sa.days.includes(today) ? 5 : 0) : -1;
      const kb = sb ? Math.min(sb.tc, 3) * 10 + (sb.days.includes(today) ? 5 : 0) : -1;
      return ka - kb || Math.random() - 0.5;
    })
    .slice(0, 10)
    .map(q => ({ id: q.id, review: false }));
  return [...reviews, ...fresh];
}
function weakestUnit() {
  let best = 1, bestP = Infinity;
  for (let u = 1; u <= 9; u++) { const p = unitPower(u); if (p < bestP) { bestP = p; best = u; } }
  return best;
}

/* ---------------- quiz flow ---------------- */
const $ = id => document.getElementById(id);
let session = null; // {queue, i, mode:'practice'|'boss', unit, boss:{hp,total,score,misses[]}, picked, answered, stats}

function startPractice(unit) {
  touchStreak(); ensureQuests();
  const queue = buildSession(unit);
  if (!queue.length) { toast("Nothing to train here right now — pick another unit."); return; }
  session = { queue, i: 0, mode: "practice", unit, picked: null, answered: false, stats: { right: 0, wrong: 0, xp: 0 } };
  $("quizTitle").textContent = `${UNITS[unit].icon} ${UNITS[unit].name}`;
  $("bossBar").classList.add("hidden");
  showView("quiz"); renderQuestion();
}

const SKILL_FIX = {
  fractions: "Khan Academy → Arithmetic → Fractions unit (~2h). Highest-yield fix in all of stats prep.",
  percents: "Khan Academy → Pre-algebra → Percentages unit (~1h). Every p-value and probability is one of these.",
  decimals: "Khan Academy → Arithmetic → Decimals unit (~45min). Train the p-value-vs-α comparison.",
  negatives: "Khan Academy → Negative numbers unit + retype −3² vs (−3)² on the TI-84 until they make sense.",
  parentheses: "Order-of-operations drills + retype 12/(6/36) on the TI-84. Parentheses discipline = free exam points.",
  equations: "Khan Academy → Algebra basics → Linear equations (~1h). 'Solve the z-formula for x' is the whole game.",
  roots: "Khan Academy → Roots & exponents (~30min). Estimate before you compute — it catches calculator slips.",
  formulas: "Drill the SD recipe (item 10) and SE = σ/√n on paper twice, then on the TI-84 until hand and calculator agree.",
  notation: "Quick review: inequality wording ('at least' = ≥) + scientific-notation display (E-4). 15 minutes, done.",
};

function startDiag() {
  touchStreak(); ensureQuests();
  session = {
    queue: DIAG.map(q => ({ id: q.id, review: false })), i: 0, mode: "diag",
    picked: null, answered: false,
    stats: { right: 0, wrong: 0, xp: 0 }, diagMisses: [],
  };
  $("quizTitle").textContent = "🧪 Readiness Check";
  $("bossBar").classList.add("hidden");
  showView("quiz"); renderQuestion();
  modal(`
    <div class="big-emoji">🧪</div>
    <h2>Readiness Check</h2>
    <p>15 quick questions on the basic math that research shows actually decides stats grades (hint: it's NOT algebra II).</p>
    <p>Misses cost nothing — each one comes with an exact, targeted fix. Find the gaps now, before the course can.</p>
    <button class="big-btn primary" onclick="closeModal()">Begin 🔍</button>`);
}

function startQuickFive() {
  touchStreak(); ensureQuests();
  const u = weakestUnit();
  const reviews = dueReviews().slice(0, 3).map(id => ({ id, review: true }));
  const fill = unitQuestions(u)
    .filter(q => !reviews.some(r => r.id === q.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 5 - reviews.length)
    .map(q => ({ id: q.id, review: false }));
  session = { queue: [...reviews, ...fill], i: 0, mode: "practice", unit: u, picked: null, answered: false, stats: { right: 0, wrong: 0, xp: 0 } };
  $("quizTitle").textContent = `⚡ Quick 5 — ${UNITS[u].name}`;
  $("bossBar").classList.add("hidden");
  showView("quiz"); renderQuestion();
}

function startDaily() {
  const today = todayStr();
  if (S.daily && S.daily.date === today) {
    modal(`<div class="big-emoji">🗓️</div><h2>Already conquered today</h2>
      <p>You scored <b>${S.daily.score}/10</b>. A fresh challenge drops at midnight — same 10 questions for everyone, one shot.</p>
      <button class="big-btn primary" onclick="closeModal()">Back tomorrow ➜</button>`);
    return;
  }
  touchStreak(); ensureQuests();
  const qs = seededPick(today + "daily", BANK, 10);
  session = {
    queue: qs.map(q => ({ id: q.id, review: false })), i: 0, mode: "daily",
    picked: null, answered: false, stats: { right: 0, wrong: 0, xp: 0 },
  };
  $("quizTitle").textContent = "🗓️ Daily Challenge";
  $("bossBar").classList.add("hidden");
  showView("quiz"); renderQuestion();
  modal(`
    <div class="big-emoji">🗓️</div>
    <h2>Daily Challenge</h2>
    <p>Today's 10 — fixed for the whole day, one attempt only. Score 8+ for the <b>+30 XP Daily Crown</b>.</p>
    <p>Misses still enter your review deck. No retries until midnight.</p>
    <button class="big-btn primary" onclick="closeModal()">Take it on ➜</button>`);
}

function startGauntlet() {
  touchStreak(); ensureQuests();
  const pool = [...BANK];
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  session = {
    queue: pool.slice(0, GAUNTLET_SIZE).map(q => ({ id: q.id, review: false })), i: 0,
    mode: "gauntlet", picked: null, answered: false,
    startMs: Date.now(),
    stats: { right: 0, wrong: 0, xp: 0 },
  };
  $("quizTitle").textContent = "🌀 GAUNTLET";
  $("bossBar").classList.add("hidden");
  showView("quiz"); renderQuestion();
  modal(`
    <div class="big-emoji">🌀</div>
    <h2>GAUNTLET MODE</h2>
    <p>${GAUNTLET_SIZE} random questions from anywhere in the course, back to back. The clock counts up.</p>
    <p><b>Clear at 7/${GAUNTLET_SIZE} (+25 XP). Beat ${Math.round(GAUNTLET_PAR_MS / 60000)}:00 par while clearing → SPEED DEMON +15.</b> Keyboard: 1–4 to answer, Enter to lock in.</p>
    <button class="big-btn primary" onclick="closeModal()">RUN IT ⚡</button>`);
}

function startBoss(unit) {
  touchStreak(); ensureQuests();
  const boss = BOSSES[String(unit)];
  if (!boss) return;
  const qs = [...boss.questions];
  session = {
    queue: qs.map(q => ({ id: q.id, review: false })), i: 0, mode: "boss", unit,
    picked: null, answered: false,
    boss: { hp: qs.length, total: qs.length, score: 0, misses: [] },
    stats: { right: 0, wrong: 0, xp: 0 },
  };
  $("quizTitle").textContent = `BOSS FIGHT`;
  $("bossBar").classList.remove("hidden");
  $("bossFace").textContent = BOSS_FACES[unit];
  $("bossName").textContent = boss.name;
  updateBossBar();
  showView("quiz"); renderQuestion();
  modal(`
    <div class="big-emoji">${BOSS_FACES[unit]}</div>
    <h2>${boss.name}</h2>
    <p style="color:var(--purple)"><i>"${BOSS_LINES[unit].intro}"</i></p>
    <p>${session.boss.total} questions. Test conditions: no notes, no partial credit, one shot each.</p>
    <p><b>Clear at ${session.boss.total - (unit === 10 ? 2 : 1)}/${session.boss.total}.</b> Losing costs nothing — it's scouting.</p>
    <button class="big-btn primary" onclick="closeModal()">FIGHT ⚔️</button>`);
}

function updateBossBar() {
  const b = session.boss;
  $("hpFill").style.width = (b.hp / b.total * 100) + "%";
  $("bossScore").textContent = `${b.score}✓ / ${session.i}`;
}

function shuffled(n) {
  const a = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function updateComboChip() {
  const c = (session && session.combo) || 0;
  $("comboChip").classList.toggle("hidden", c < 2);
  $("comboNum").textContent = c;
}

let optOrder = [];
function renderQuestion() {
  updateComboChip();
  const item = session.queue[session.i];
  const q = byId(item.id);
  session.picked = null; session.answered = false;
  $("progFill").style.width = (session.i / session.queue.length * 100) + "%";
  $("qStreakNum").textContent = S.streak;
  $("qXpNum").textContent = S.xp;
  $("qTag").innerHTML =
    `${session.mode === "boss" ? "⚔️ boss · " : ""}Q ${session.i + 1}/${session.queue.length} · ${q.id}` +
    (item.review ? ` · <span class="review-flag">DUE REVIEW (+15)</span>` : "");
  $("qStem").innerHTML = q.stem;
  optOrder = shuffled(4);
  const box = $("qOptions"); box.innerHTML = "";
  optOrder.forEach((orig, pos) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.innerHTML = `<span class="letter">${"ABCD"[pos]})</span><span>${q.options[orig]}</span>`;
    btn.onclick = () => pick(pos, btn);
    box.appendChild(btn);
  });
  $("lockRow").classList.add("hidden");
  $("feedback").classList.add("hidden");
}

function pick(pos, btn) {
  if (session.answered) return;
  session.picked = pos;
  document.querySelectorAll(".opt").forEach(o => o.classList.remove("picked"));
  btn.classList.add("picked");
  $("lockRow").classList.remove("hidden");
}

function lockIn(sure) {
  if (session.picked === null || session.answered) return;
  session.answered = true;
  $("lockRow").classList.add("hidden");
  const item = session.queue[session.i];
  const q = byId(item.id);
  const correctPos = optOrder.indexOf(q.answer);
  const isRight = session.picked === correctPos;
  const opts = document.querySelectorAll(".opt");
  opts.forEach(o => (o.disabled = true));
  opts[correctPos].classList.add("correct");
  if (!isRight) opts[session.picked].classList.add("wrong");

  let res;
  if (session.mode === "diag") {
    // diagnostic items don't enter the spaced-repetition deck
    const xp = isRight ? 10 : 2;
    grantXP(xp, q.id);
    if (!isRight || !sure) session.diagMisses.push(q.skill);
    res = { xp, msgs: isRight ? [] : ["🔎 gap found — that's the point of this check"] };
    S.totals.answered++; if (isRight) S.totals.correct++;
    questEvent("q10"); if (isRight) questEvent("c8");
    save();
  } else {
    res = recordAnswer(q, isRight, sure, !!item.review);
  }
  session.stats[isRight ? "right" : "wrong"]++;
  session.stats.xp += res.xp;

  logHistory(isRight, res.xp);
  if (navigator.vibrate) navigator.vibrate(isRight ? 25 : [60, 40, 60]);
  if (isRight && q.id === luckyId() && S.luckyDate !== todayStr()) {
    S.luckyDate = todayStr();
    grantXP(res.xp, "lucky question");
    setTimeout(() => { toast(`⚡ THAT was today's secret LUCKY QUESTION — XP doubled (+${res.xp})!`, true); sfx("loot"); confetti(90); }, 700);
  }

  if (session.mode === "diag") {
    if (!isRight) {
      $("qCard").classList.remove("shake"); void $("qCard").offsetWidth;
      $("qCard").classList.add("shake");
    }
  } else if (session.mode === "boss") {
    if (isRight) {
      session.boss.score++; session.boss.hp--;
      $("bossFace").classList.remove("hit"); void $("bossFace").offsetWidth;
      $("bossFace").classList.add("hit");
      questEvent("dmg5");
    } else {
      session.boss.misses.push(q.id);
      const lines = BOSS_LINES[session.unit];
      if (lines) toast(`${BOSS_FACES[session.unit]} "${lines.taunts[Math.floor(Math.random() * lines.taunts.length)]}"`);
      $("qCard").classList.remove("shake"); void $("qCard").offsetWidth;
      $("qCard").classList.add("shake");
    }
    updateBossBar();
  } else if (!isRight) {
    $("qCard").classList.remove("shake"); void $("qCard").offsetWidth;
    $("qCard").classList.add("shake");
    // re-ask later this session (spaced a few questions out), once — practice only;
    // gauntlet keeps moving, the miss still lands in the review queue for later
    if (session.mode === "practice" && !item.requeued) {
      const clone = { id: item.id, review: true, requeued: true };
      session.queue.splice(Math.min(session.i + 4, session.queue.length), 0, clone);
    }
  }

  // combo: consecutive corrects this session — rising pitch, milestone bonuses
  if (isRight) {
    session.combo = (session.combo || 0) + 1;
    S.counters.maxCombo = Math.max(S.counters.maxCombo, session.combo);
    if (session.combo % 5 === 0) {
      grantXP(5, "combo");
      toast(`🎯 COMBO ×${session.combo} — +5 bonus!`, true);
    }
  } else {
    session.combo = 0;
  }
  updateComboChip();

  sfx(isRight ? "good" : "bad", session.combo);
  const r = $("qCard").getBoundingClientRect();
  xpFloat(`+${res.xp} XP`, r.right - 70, r.top + 30);
  awardBadges();

  const head = $("fbHead");
  if (isRight && sure) { head.textContent = "✅ Correct."; head.className = "fb-head good"; }
  else if (isRight) { head.textContent = "✅ Correct — and here's WHY, since you weren't sure:"; head.className = "fb-head good"; }
  else { head.textContent = "❌ Not yet."; head.className = "fb-head bad"; }
  $("fbExpl").innerHTML = q.expl + (res.msgs.length ? `<br><br><b>${res.msgs.join(" · ")}</b>` : "");
  $("feedback").classList.remove("hidden");
  $("nextBtn").textContent = session.i + 1 >= session.queue.length ? "Finish session 🏁" : "Next ➜";
  $("nextBtn").focus();
}

function nextQuestion() {
  session.i++;
  if (session.i >= session.queue.length) return endSession();
  renderQuestion();
}

function endSession(early) {
  $("progFill").style.width = "100%";
  const st = session.stats;
  const acc = st.right + st.wrong ? Math.round(st.right / (st.right + st.wrong) * 100) : 0;
  let diffNote = "";
  if (acc >= 95 && st.right + st.wrong >= 8) diffNote = "Near-perfect — these were too easy for you. Next session steps UP.";
  else if (acc >= 75) diffNote = "Right in the 85% sweet spot where learning is fastest. Perfect.";
  else if (st.right + st.wrong > 0) diffNote = "Tough one — every miss is now scheduled to come back until it's yours. That's the system working.";

  if (session.mode === "diag") {
    const score = st.right;
    S.diagDone = { score, date: todayStr() };
    save(); awardBadges();
    const weak = [...new Set(session.diagMisses)];
    let body;
    if (!weak.length && score === 15) {
      body = `<p><b>15/15 — your math foundation is exam-ready.</b> Nothing stands between you and the stats itself. Straight to Unit 1.</p>`;
      confetti(160); sfx("level");
    } else {
      body = `<p><b>${score}/15.</b> ${score >= 13 ? "Strong foundation — just patch these before July 1:" : "Good news: everything below is 6th–8th-grade material, fixable in a weekend. Patch list:"}</p>
        <div style="text-align:left">${weak.map(s => `<p>🔧 <b>${s}</b> — ${SKILL_FIX[s]}</p>`).join("")}</div>
        <p style="color:var(--dim);font-size:12px">In a randomized trial, students who failed algebra placement still passed college stats at higher rates than students sent to remedial algebra. The gaps are patchable.</p>`;
    }
    modal(`
      <div class="big-emoji">${score >= 13 ? "🟢" : "🟡"}</div>
      <h2>Readiness Report</h2>
      ${body}
      <button class="big-btn primary" onclick="closeModal(); showView('home'); renderHome();">To the map ➜</button>`);
    return;
  }

  if (session.mode === "daily") {
    const today = todayStr();
    const prev = S.daily;
    const dStreak = prev && prev.date === addDays(today, -1) ? prev.streak + 1 : 1;
    S.daily = { date: today, score: st.right, streak: dStreak };
    S.counters.dailies = (S.counters.dailies || 0) + 1;
    const crowned = st.right >= 8;
    if (crowned) { grantXP(30, "daily crown"); confetti(150); sfx("level"); }
    save(); awardBadges();
    modal(`
      <div class="big-emoji">${crowned ? "👑" : "🗓️"}</div>
      <h2>${crowned ? "DAILY CROWN!" : "Daily Challenge done"}</h2>
      <div class="modal-stats">
        <div>${st.right}/10<span>score</span></div>
        <div>${dStreak}<span>daily streak</span></div>
        <div>+${st.xp + (crowned ? 30 : 0)}<span>XP</span></div>
      </div>
      <p>${crowned ? "8+ on one attempt, no retries — that's exam-grade performance." : "Misses are queued for review. Tomorrow's challenge is a fresh 10."}</p>
      <button class="big-btn primary" onclick="closeModal(); showView('home'); renderHome();">Back to the map ➜</button>`);
    return;
  }

  if (session.mode === "gauntlet") {
    const ms = Date.now() - session.startMs;
    const mm = Math.floor(ms / 60000), ss = String(Math.floor(ms / 1000) % 60).padStart(2, "0");
    const cleared = st.right >= GAUNTLET_SIZE - 1;
    const speed = cleared && ms <= GAUNTLET_PAR_MS;
    if (cleared) grantXP(25, "gauntlet");
    if (speed) grantXP(15, "speed demon");
    if (cleared) { confetti(140); sfx("level"); }
    modal(`
      <div class="big-emoji">${cleared ? (speed ? "⚡" : "🌀") : "🌪️"}</div>
      <h2>${cleared ? (speed ? "SPEED DEMON!" : "Gauntlet cleared!") : "Gauntlet survived"}</h2>
      <div class="modal-stats">
        <div>${st.right}/${GAUNTLET_SIZE}<span>score</span></div>
        <div>${mm}:${ss}<span>time</span></div>
        <div>+${st.xp + (cleared ? 25 : 0) + (speed ? 15 : 0)}<span>XP</span></div>
      </div>
      <p>${cleared ? "Mixed questions, no warning what's coming — exactly the skill the final exam tests." : "Misses are queued for review. Run it back."}</p>
      <button class="big-btn primary" onclick="closeModal(); showView('home'); renderHome();">Back to the map ➜</button>`);
    return;
  }

  if (session.mode === "boss") {
    const b = session.boss;
    const need = b.total - (session.unit === 10 ? 2 : 1);
    const win = b.score >= need;
    if (win && !early) {
      const perfect = b.score === b.total;
      const first = !S.bossCleared[session.unit];
      S.bossCleared[session.unit] = true;
      if (perfect) S.bossPerfect[session.unit] = true;
      grantXP(perfect ? 75 : 50, "boss");
      save(); awardBadges(); confetti(220); sfx("level");
      modal(`
        <div class="big-emoji">${perfect ? "💥" : "🏆"}</div>
        <h2>${BOSSES[String(session.unit)].name} DEFEATED${perfect ? " — FLAWLESS" : ""}!</h2>
        <div class="modal-stats">
          <div>${b.score}/${b.total}<span>score</span></div>
          <div>+${perfect ? 75 : 50}<span>XP</span></div>
        </div>
        <p style="color:var(--purple)"><i>"${BOSS_LINES[session.unit].defeat}"</i></p>
        <p>${first ? "Under test conditions, no partial credit — and you cleared it. This is exactly what exam day feels like." : "Rematch won. The drill stays sharp."}</p>
        <button class="big-btn primary" onclick="closeModal(); showView('home'); renderHome();">Back to the map ➜</button>`);
    } else {
      const missed = [...new Set(b.misses)];
      modal(`
        <div class="big-emoji">🛡️</div>
        <h2>Boss scouted — ${b.score}/${b.total}</h2>
        <p>No penalty. ${missed.length ? `The boss's weapons are now in your review queue: <b>${missed.join(", ")}</b>. Clear them and come back for the rematch.` : ""}</p>
        <p>Clear at ${need}/${b.total}. You'll get there.</p>
        <button class="big-btn primary" onclick="closeModal(); showView('home'); renderHome();">Plan the rematch ➜</button>`);
    }
  } else {
    // cliffhanger: name the next thing (Zeigarnik hook)
    const nextU = weakestUnit();
    S.cliffhanger = `Next time: can you beat ${BOSSES[String(nextU)] ? BOSSES[String(nextU)].name : "the next boss"}'s favorite trap in ${UNITS[nextU].name}?`;
    save();
    modal(`
      <div class="big-emoji">${acc >= 75 ? "🌟" : "🧗"}</div>
      <h2>Session complete</h2>
      <div class="modal-stats">
        <div>${st.right}✓ ${st.wrong}✗<span>answers</span></div>
        <div>${acc}%<span>accuracy</span></div>
        <div>+${st.xp}<span>XP</span></div>
      </div>
      <p>${diffNote}</p>
      <p style="color:var(--purple)">📌 ${S.cliffhanger}</p>
      <button class="big-btn" style="background:linear-gradient(135deg,var(--blue),#2f5fd0);color:#fff" onclick="closeModal(); startQuickFive();">⚡ One more quick 5</button>
      <button class="big-btn primary" onclick="closeModal(); showView('home'); renderHome();">Back to the map ➜</button>`);
  }
}

/* ---------------- home rendering ---------------- */
function renderHome() {
  ensureQuests();
  const lvl = levelFor(S.xp);
  $("levelBadge").textContent = lvl + 1;
  $("levelTitle").textContent = LEVELS[lvl].title;
  const lo = LEVELS[lvl].xp, hi = LEVELS[lvl + 1] ? LEVELS[lvl + 1].xp : null;
  $("xpFill").style.width = hi ? Math.min(100, (S.xp - lo) / (hi - lo) * 100) + "%" : "100%";
  $("xpText").textContent = hi ? `${S.xp} XP — ${hi - S.xp} to ${LEVELS[lvl + 1].title}` : `${S.xp} XP — MAX RANK`;
  $("streakNum").textContent = S.streak;
  $("freezeNum").textContent = Math.max(0, 2 - S.freezesUsed);
  $("muteBtn").textContent = S.muted ? "🔇" : "🔊";

  const ql = $("questList"); ql.innerHTML = "";
  for (const q of S.quests) {
    const div = document.createElement("div");
    div.className = "quest" + (q.done ? " done" : "");
    div.innerHTML = `<div class="box">${q.done ? "✓" : ""}</div><div class="q-desc">${q.desc}</div><div class="q-prog">${Math.min(q.prog, q.target)}/${q.target}</div>`;
    ql.appendChild(div);
  }
  $("questBonus").textContent = S.quests.every(q => q.done) ? "— chest claimed 🎁" : "(+10 XP each · all 3 = +20 chest)";

  const banner = $("diagBanner");
  if (!S.diagDone) {
    banner.innerHTML = `<button class="big-btn" style="background:linear-gradient(135deg,var(--purple),#7a4ddb);color:#fff;margin-top:10px" id="diagBtn">🧪 READINESS CHECK<small>15 quick questions — find your math gaps before the course opens</small></button>`;
    banner.querySelector("#diagBtn").onclick = startDiag;
  } else {
    banner.innerHTML = `<div style="text-align:center;color:var(--dim);font-size:12px;margin-top:8px">🧪 readiness: ${S.diagDone.score}/15 (${S.diagDone.date}) · <button class="link-btn" id="diagRetake">retake</button></div>`;
    banner.querySelector("#diagRetake").onclick = startDiag;
  }

  const db = $("dailyBanner");
  const dailyDone = S.daily && S.daily.date === todayStr();
  db.innerHTML = dailyDone
    ? `<div style="text-align:center;color:var(--dim);font-size:12px;margin-top:8px">🗓️ daily challenge: <b>${S.daily.score}/10</b> today · streak ${S.daily.streak} 👑 · new one at midnight</div>`
    : `<button class="big-btn" style="background:linear-gradient(135deg,var(--gold),var(--gold2));color:#2a1c00;margin-top:10px" id="dailyBtn">🗓️ DAILY CHALLENGE<small>today's 10 — one attempt · 8+ wins the +30 XP crown${S.daily ? ` · streak ${S.daily.streak}` : ""}</small></button>`;
  if (!dailyDone) db.querySelector("#dailyBtn").onclick = startDaily;

  const gb = $("gauntletBanner");
  if (todayStr() >= GAUNTLET_UNLOCK) {
    gb.innerHTML = `<button class="big-btn" style="background:linear-gradient(135deg,var(--blue),#2f5fd0);color:#fff;margin-top:10px" id="gauntletBtn">🌀 GAUNTLET MODE<small>${GAUNTLET_SIZE} random questions vs the clock — clear 7 for +25 XP</small></button>`;
    gb.querySelector("#gauntletBtn").onclick = startGauntlet;
  } else {
    gb.innerHTML = `<div style="text-align:center;color:var(--dim);font-size:12px;margin-top:8px">🔒 <b>GAUNTLET MODE</b> unlocks July 22 — week 4. Something new arrives right when you'll need it.</div>`;
  }

  const due = dueReviews().length;
  $("reviewDue").textContent = due ? `🧹 ${due} review${due > 1 ? "s" : ""} due — they pay +15 XP each and go first` : (S.cliffhanger || "");
  $("smartSub").textContent = due ? `${due} due reviews, then your weakest unit` : "reviews first, then your weakest unit";

  const grid = $("unitGrid"); grid.innerHTML = "";
  const clears = Object.keys(S.bossCleared).filter(k => k !== "10").length;
  for (let u = 1; u <= 10; u++) {
    const card = document.createElement("div");
    const isDragon = u === 10;
    card.className = "unit-card" + (isDragon ? " dragon-card" : "");
    const p = isDragon ? null : unitPower(u);
    const boss = BOSSES[String(u)];
    const cleared = !!S.bossCleared[u];
    const unlocked = isDragon ? clears >= DRAGON_UNLOCK_CLEARS : (p >= BOSS_UNLOCK_POWER || cleared);
    const qs = isDragon ? BANK.filter(q => q.unit === 10) : unitQuestions(u);
    const mcount = qs.filter(q => isMastered(q.id)).length;
    let bossLabel, bossClass = "u-btn";
    if (cleared) { bossLabel = `${S.bossPerfect[u] ? "💥" : "🏆"} Rematch`; bossClass += " boss-dead"; }
    else if (unlocked) { bossLabel = `${BOSS_FACES[u]} FIGHT BOSS`; bossClass += " boss-ready"; }
    else bossLabel = isDragon ? `🔒 ${DRAGON_UNLOCK_CLEARS - clears} more boss${DRAGON_UNLOCK_CLEARS - clears > 1 ? "es" : ""}` : `🔒 boss at 80%`;
    card.innerHTML = `
      <div class="u-name">${UNITS[u].icon} ${isDragon ? "🐉 THE FINAL EXAM DRAGON" : "Unit " + u + " — " + UNITS[u].name}</div>
      <div class="u-sub">${isDragon ? "20 cumulative questions · clear at 18 · the dress rehearsal for 100%" : UNITS[u].sub + " · " + boss.name + " · " + mcount + "/" + qs.length + " mastered"}</div>
      ${isDragon ? "" : `<div class="power-bar"><div class="power-fill" style="width:${Math.round(p * 100)}%"></div></div>`}
      <div class="u-btns">
        ${isDragon ? "" : `<button class="u-btn" data-train="${u}">Train (${Math.round(p * 100)}%)</button>`}
        ${isDragon || !SCROLLS[u] ? "" : `<button class="u-btn scroll" data-scroll="${u}" ${p >= 0.5 || cleared ? "" : "disabled"} title="${p >= 0.5 || cleared ? SCROLLS[u].name : "Formula scroll — unlocks at 50% power"}">${p >= 0.5 || cleared ? "📜" : "🔒"}</button>`}
        <button class="${bossClass}" data-boss="${u}" ${unlocked ? "" : "disabled"}>${bossLabel}</button>
      </div>`;
    grid.appendChild(card);
  }
  grid.querySelectorAll("[data-train]").forEach(b => (b.onclick = () => startPractice(+b.dataset.train)));
  grid.querySelectorAll("[data-boss]").forEach(b => (b.onclick = () => startBoss(+b.dataset.boss)));
  grid.querySelectorAll("[data-scroll]").forEach(b => (b.onclick = () => showScroll(+b.dataset.scroll)));

  // summer heatmap: every day from "now-ish" through the final
  const heat = $("heatGrid"); heat.innerHTML = "";
  const start = "2026-06-08", end = "2026-08-18", today = todayStr();
  for (let d = start; d <= end; d = addDays(d, 1)) {
    const h = S.history[d];
    const a = h ? h.a : 0;
    const sq = document.createElement("div");
    let cls = "heat";
    if (a >= 25) cls += " h3"; else if (a >= 10) cls += " h2"; else if (a >= 1) cls += " h1";
    if (d === today) cls += " today";
    if (d === "2026-07-01" || d === end) cls += " mark";
    sq.className = cls;
    sq.title = `${d} — ${a} question${a === 1 ? "" : "s"}`;
    if (d === "2026-07-01") sq.textContent = "📚";
    if (d === end) sq.textContent = "🐉";
    heat.appendChild(sq);
  }
  const t = S.history[today] || { a: 0, c: 0, xp: 0 };
  let week = 0;
  for (let i = 0; i < 7; i++) { const h = S.history[addDays(today, -i)]; if (h) week += h.a; }
  const tmrw = addDays(today, 1);
  const dueTomorrow = Object.values(S.perQ).filter(st => st.due && st.due <= tmrw && st.due > today).length;
  $("climbStats").textContent = `today: ${t.a} answered (+${t.xp} XP) · last 7 days: ${week} · tomorrow: ${dueTomorrow} review${dueTomorrow === 1 ? "" : "s"} due · paint a square green every day and the Dragon falls`;

  const bg = $("badgeGrid"); bg.innerHTML = "";
  for (const b of BADGES) {
    const earned = S.badges[b.id];
    const d = document.createElement("div");
    d.className = "badge " + (earned ? "earned" : "locked");
    d.title = earned ? `Earned ${earned}` : "Locked";
    d.innerHTML = `<div class="b-icon">${earned ? b.icon : "🔒"}</div><div class="b-name">${b.name}</div><div class="b-desc">${b.desc}</div>`;
    bg.appendChild(d);
  }

  const arsenal = BANK.length + Object.values(BOSSES).reduce((a, b) => a + b.questions.length, 0);
  $("totalsLine").textContent = `${S.totals.correct}/${S.totals.answered} lifetime correct · best streak ${S.bestStreak} 🔥 · ${masteredCount()} mastered · ${Object.keys(S.badges).length}/${BADGES.length} 🏆 · ${arsenal}-question arsenal`;
}

/* ---------------- theme ---------------- */
function currentTheme() {
  if (S.theme) return S.theme;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
function applyTheme() {
  const t = currentTheme();
  document.body.classList.toggle("light", t === "light");
  const btn = $("themeBtn");
  if (btn) btn.textContent = t === "light" ? "☀️" : "🌙";
}
function toggleTheme() {
  S.theme = currentTheme() === "light" ? "dark" : "light";
  save(); applyTheme();
}

/* ---------------- views, modal, toasts ---------------- */
function showView(v) {
  $("home").classList.toggle("hidden", v !== "home");
  $("quiz").classList.toggle("hidden", v !== "quiz");
  window.scrollTo(0, 0);
}
function modal(html) { $("modalCard").innerHTML = html; $("modal").classList.remove("hidden"); }
function closeModal() { $("modal").classList.add("hidden"); }
function toast(text, gold) {
  const t = document.createElement("div");
  t.className = "toast" + (gold ? " gold" : "");
  t.textContent = text;
  $("toasts").appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .4s"; }, 3800);
  setTimeout(() => t.remove(), 4300);
}

/* ---------------- confetti ---------------- */
function confetti(n) {
  const cv = $("fx"), ctx = cv.getContext("2d");
  cv.width = innerWidth; cv.height = innerHeight;
  const colors = ["#ffce3a", "#3ddc84", "#5aa7ff", "#b98aff", "#ff5d6c"];
  const ps = Array.from({ length: n }, () => ({
    x: Math.random() * cv.width, y: -20 - Math.random() * 150,
    vx: (Math.random() - 0.5) * 3, vy: 2 + Math.random() * 4,
    s: 4 + Math.random() * 6, c: colors[Math.floor(Math.random() * colors.length)],
    r: Math.random() * Math.PI,
  }));
  let frames = 0;
  (function tick() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (const p of ps) {
      p.x += p.vx; p.y += p.vy; p.r += 0.1;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
      ctx.restore();
    }
    if (++frames < 130) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, cv.width, cv.height);
  })();
}

/* ---------------- tiny synth sfx ---------------- */
let AC = null;
function sfx(kind, combo) {
  if (S.muted) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const t = AC.currentTime;
    const play = (freq, start, dur, type = "sine", vol = 0.12) => {
      const o = AC.createOscillator(), g = AC.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, t + start);
      g.gain.exponentialRampToValueAtTime(0.001, t + start + dur);
      o.connect(g).connect(AC.destination);
      o.start(t + start); o.stop(t + start + dur + 0.05);
    };
    if (kind === "good") { const m = 1 + 0.05 * Math.min(combo || 0, 10); play(660 * m, 0, 0.12); play(880 * m, 0.1, 0.18); }
    else if (kind === "bad") { play(180, 0, 0.25, "square", 0.08); }
    else if (kind === "quest") { play(523, 0, 0.1); play(659, 0.09, 0.1); play(784, 0.18, 0.2); }
    else if (kind === "loot") { play(987, 0, 0.08); play(1318, 0.08, 0.22); }
    else if (kind === "level") { [523, 659, 784, 1046].forEach((f, i) => play(f, i * 0.11, 0.25)); }
  } catch (e) { /* audio unavailable — fine */ }
}

/* ---------------- wiring ---------------- */
window.closeModal = closeModal;
window.startQuickFive = startQuickFive;
document.addEventListener("DOMContentLoaded", () => {
  load(); ensureQuests(); applyTheme();
  $("smartBtn").onclick = () => startPractice(weakestUnit());
  $("lockSure").onclick = () => lockIn(true);
  $("lockUnsure").onclick = () => lockIn(false);
  $("nextBtn").onclick = nextQuestion;
  $("quitBtn").onclick = () => { endSession(true); };
  $("muteBtn").onclick = () => { S.muted = !S.muted; save(); renderHome(); };
  $("themeBtn").onclick = toggleTheme;
  // arcade keyboard controls: 1-4 / a-d pick, Enter = lock in sure, U = lock in unsure,
  // Enter/Space = next when feedback is showing
  document.addEventListener("keydown", (e) => {
    if (!session || $("quiz").classList.contains("hidden") || !$("modal").classList.contains("hidden")) return;
    const k = e.key.toLowerCase();
    if (session.answered) {
      if (k === "enter" || k === " ") { e.preventDefault(); nextQuestion(); }
      return;
    }
    const idx = ["1", "2", "3", "4"].indexOf(k) !== -1 ? ["1", "2", "3", "4"].indexOf(k)
              : ["a", "b", "c", "d"].indexOf(k);
    if (idx !== -1) {
      const btn = $("qOptions").children[idx];
      if (btn) btn.click();
      return;
    }
    if (k === "enter" && session.picked !== null) { e.preventDefault(); lockIn(true); }
    if (k === "u" && session.picked !== null) lockIn(false);
  });
  $("reportBtn").onclick = () => {
    const lvl = levelFor(S.xp);
    const wrongs = Object.entries(S.perQ).filter(([, st]) => st.lastWrong).map(([id]) => id);
    const due = dueReviews();
    const lines = [
      `THE CLIMB TO 100 — progress report (${todayStr()})`,
      `Level ${lvl + 1} ${LEVELS[lvl].title} — ${S.xp} XP · streak ${S.streak} (best ${S.bestStreak}) · ${masteredCount()} mastered · trophies ${Object.keys(S.badges).length}/${BADGES.length}`,
      `Lifetime: ${S.totals.correct}/${S.totals.answered} correct${S.diagDone ? ` · readiness ${S.diagDone.score}/15` : " · readiness check NOT done"}`,
      "Unit power: " + [1,2,3,4,5,6,7,8,9].map(u => `U${u} ${Math.round(unitPower(u) * 100)}%`).join(" · "),
      "Bosses cleared: " + (Object.keys(S.bossCleared).length ? Object.keys(S.bossCleared).map(u => BOSSES[u].name).join(", ") : "none yet"),
      `Due reviews: ${due.length}${due.length ? " (" + due.join(", ") + ")" : ""}`,
      `Currently-wrong questions: ${wrongs.length ? wrongs.join(", ") : "none"}`,
      "",
      "Paste this to your AI tutor for a targeted session on the weak spots.",
    ];
    const text = lines.join("\n");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast("📋 Progress report copied — paste it to your tutor!", true));
    } else {
      modal(`<h2>📋 Progress report</h2><p style="text-align:left;white-space:pre-wrap;font-size:12px">${text}</p><button class="big-btn primary" onclick="closeModal()">Done</button>`);
    }
  };
  $("resetBtn").onclick = () => {
    if (confirm("Wipe ALL progress (XP, streak, mastery)? This cannot be undone.")) {
      localStorage.removeItem(SAVE_KEY); load(); ensureQuests(); renderHome();
    }
  };
  $("exportBtn").onclick = () => {
    const text = JSON.stringify(S);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast("💾 Save copied to clipboard — stash it somewhere safe (notes app, email to yourself).", true));
    } else {
      modal(`<h2>💾 Your save</h2><p style="text-align:left;word-break:break-all;font-size:10px;max-height:40vh;overflow:auto">${text.replace(/</g, "&lt;")}</p><button class="big-btn primary" onclick="closeModal()">Done</button>`);
    }
  };
  $("importBtn").onclick = () => {
    const txt = prompt("Paste an exported save to restore it (this REPLACES current progress):");
    if (!txt) return;
    try {
      const obj = JSON.parse(txt);
      if (!obj || typeof obj.xp !== "number") throw new Error("bad save");
      localStorage.setItem(SAVE_KEY, JSON.stringify(obj));
      load(); ensureQuests(); applyTheme(); renderHome();
      toast("📥 Save imported — welcome back, climber.", true);
    } catch {
      alert("That doesn't look like a valid save. Nothing was changed.");
    }
  };
  renderHome();
  if (!S.seenIntro) {
    S.seenIntro = true; save();
    modal(`
      <div class="big-emoji">🏔️</div>
      <h2>Welcome to THE CLIMB TO 100</h2>
      <p style="text-align:left"><b>The loop:</b><br>
      1️⃣ Watch a unit's videos (links in the study guide)<br>
      2️⃣ <b>Train</b> the unit here — one question at a time, misses come back until they're yours<br>
      3️⃣ At 80% power, fight the unit's <b>boss</b> under real test conditions<br>
      🐉 Beat all of them, slay the Final Exam Dragon, walk into the real final ready for 100.</p>
      <p style="text-align:left">🔥 One question a day keeps your streak. 🗓️ The Daily Challenge crowns 8+/10. ⌨️ Keys 1–4 answer, Enter locks in.</p>
      <p><b>Start with the 🧪 Readiness Check</b> — 15 quick questions to find what to patch before the course opens.</p>
      <button class="big-btn primary" onclick="closeModal()">Begin the climb ➜</button>`);
  }
});
