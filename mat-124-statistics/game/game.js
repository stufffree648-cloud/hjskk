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
    muted: false,
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

    if (st.lastWrong) { xp += 20; msgs.push("⚔️ REVENGE +20"); questEvent("rv2"); }
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

let optOrder = [];
function renderQuestion() {
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

  const res = recordAnswer(q, isRight, sure, !!item.review);
  session.stats[isRight ? "right" : "wrong"]++;
  session.stats.xp += res.xp;

  if (session.mode === "boss") {
    if (isRight) {
      session.boss.score++; session.boss.hp--;
      $("bossFace").classList.remove("hit"); void $("bossFace").offsetWidth;
      $("bossFace").classList.add("hit");
      questEvent("dmg5");
    } else {
      session.boss.misses.push(q.id);
      $("qCard").classList.remove("shake"); void $("qCard").offsetWidth;
      $("qCard").classList.add("shake");
    }
    updateBossBar();
  } else if (!isRight) {
    $("qCard").classList.remove("shake"); void $("qCard").offsetWidth;
    $("qCard").classList.add("shake");
    // re-ask later this session (spaced a few questions out), once
    if (!item.requeued) {
      const clone = { id: item.id, review: true, requeued: true };
      session.queue.splice(Math.min(session.i + 4, session.queue.length), 0, clone);
    }
  }

  sfx(isRight ? "good" : "bad");
  const r = $("qCard").getBoundingClientRect();
  xpFloat(`+${res.xp} XP`, r.right - 70, r.top + 30);

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
      save(); confetti(220); sfx("level");
      modal(`
        <div class="big-emoji">${perfect ? "💥" : "🏆"}</div>
        <h2>${BOSSES[String(session.unit)].name} DEFEATED${perfect ? " — FLAWLESS" : ""}!</h2>
        <div class="modal-stats">
          <div>${b.score}/${b.total}<span>score</span></div>
          <div>+${perfect ? 75 : 50}<span>XP</span></div>
        </div>
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
        <button class="${bossClass}" data-boss="${u}" ${unlocked ? "" : "disabled"}>${bossLabel}</button>
      </div>`;
    grid.appendChild(card);
  }
  grid.querySelectorAll("[data-train]").forEach(b => (b.onclick = () => startPractice(+b.dataset.train)));
  grid.querySelectorAll("[data-boss]").forEach(b => (b.onclick = () => startBoss(+b.dataset.boss)));

  $("totalsLine").textContent = `${S.totals.correct}/${S.totals.answered} lifetime correct · best streak ${S.bestStreak} 🔥 · 208 questions in the arsenal`;
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
function sfx(kind) {
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
    if (kind === "good") { play(660, 0, 0.12); play(880, 0.1, 0.18); }
    else if (kind === "bad") { play(180, 0, 0.25, "square", 0.08); }
    else if (kind === "quest") { play(523, 0, 0.1); play(659, 0.09, 0.1); play(784, 0.18, 0.2); }
    else if (kind === "loot") { play(987, 0, 0.08); play(1318, 0.08, 0.22); }
    else if (kind === "level") { [523, 659, 784, 1046].forEach((f, i) => play(f, i * 0.11, 0.25)); }
  } catch (e) { /* audio unavailable — fine */ }
}

/* ---------------- wiring ---------------- */
window.closeModal = closeModal;
document.addEventListener("DOMContentLoaded", () => {
  load(); ensureQuests();
  $("smartBtn").onclick = () => startPractice(weakestUnit());
  $("lockSure").onclick = () => lockIn(true);
  $("lockUnsure").onclick = () => lockIn(false);
  $("nextBtn").onclick = nextQuestion;
  $("quitBtn").onclick = () => { endSession(true); };
  $("muteBtn").onclick = () => { S.muted = !S.muted; save(); renderHome(); };
  $("resetBtn").onclick = () => {
    if (confirm("Wipe ALL progress (XP, streak, mastery)? This cannot be undone.")) {
      localStorage.removeItem(SAVE_KEY); load(); ensureQuests(); renderHome();
    }
  };
  renderHome();
});
