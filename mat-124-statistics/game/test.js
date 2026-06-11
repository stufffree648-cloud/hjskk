/* Automated smoke test for The Climb to 100 — run: node test.js */
"use strict";
const fs = require("fs");

/* ---------------- mini-DOM shim ---------------- */
class El {
  constructor(tag) {
    this.tag = tag; this.children = []; this._cls = new Set(); this.style = {};
    this.dataset = {}; this._html = ""; this.textContent = ""; this.disabled = false;
    this.onclick = null; this.title = ""; this.id = null; this.width = 0; this.height = 0;
  }
  get classList() {
    const s = this._cls;
    return {
      add: (...c) => c.forEach(x => s.add(x)),
      remove: (...c) => c.forEach(x => s.delete(x)),
      toggle: (c, f) => { if (f === undefined) { s.has(c) ? s.delete(c) : s.add(c); } else { f ? s.add(c) : s.delete(c); } },
      contains: c => s.has(c),
    };
  }
  set className(v) { this._cls = new Set(String(v).split(/\s+/).filter(Boolean)); }
  get className() { return [...this._cls].join(" "); }
  set innerHTML(v) { this._html = String(v); this.children = []; parseInto(this); }
  get innerHTML() { return this._html; }
  appendChild(c) { this.children.push(c); return c; }
  remove() {}
  focus() {}
  click() { if (this.onclick && !this.disabled) this.onclick({ preventDefault() {} }); }
  get offsetWidth() { return 100; }
  getBoundingClientRect() { return { top: 0, left: 0, right: 100, bottom: 50 }; }
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
  querySelectorAll(sel) { const out = []; walk(this, el => { if (matches(el, sel)) out.push(el); }); return out; }
  getContext() { return new Proxy({}, { get: () => () => {} }); }
}
function walk(el, fn) { for (const c of el.children) { fn(c); walk(c, fn); } }
function matches(el, sel) {
  if (sel.startsWith("#")) return el.id === sel.slice(1);
  if (sel.startsWith(".")) return el._cls.has(sel.slice(1));
  if (sel.startsWith("[data-")) { const key = sel.slice(6, -1); return el.dataset[key] !== undefined; }
  return el.tag === sel;
}
function parseInto(el) {
  // minimal parser: extract <button ...> tags so querySelector/#id and [data-x] handlers work
  const re = /<button([^>]*)>/g; let m;
  while ((m = re.exec(el._html))) {
    const attrs = m[1]; const b = new El("button");
    const id = /id="([^"]+)"/.exec(attrs); if (id) b.id = id[1];
    const cls = /class="([^"]+)"/.exec(attrs); if (cls) b.className = cls[1];
    let dm; const dre = /data-([\w-]+)="([^"]*)"/g;
    while ((dm = dre.exec(attrs))) b.dataset[dm[1]] = dm[2];
    if (/\bdisabled\b/.test(attrs)) b.disabled = true;
    el.children.push(b);
  }
}

const ids = {};
const html = fs.readFileSync("index.html", "utf8");
for (const m of html.matchAll(/id="([a-zA-Z]+)"/g)) ids[m[1]] = new El("div");

const handlers = {};
const store = {};
global.window = global;
global.document = {
  getElementById: id => ids[id] || null,
  createElement: t => new El(t),
  addEventListener: (ev, fn) => { handlers[ev] = fn; },
  body: new El("body"),
  querySelectorAll: sel => (sel === ".opt" ? [...ids.qOptions.children] : []),
};
global.localStorage = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: k => { delete store[k]; },
};
Object.defineProperty(global, "navigator", { value: { vibrate: () => {}, clipboard: { writeText: async () => {} } }, configurable: true });
global.location = { protocol: "file:" };
global.innerWidth = 800; global.innerHeight = 600;
global.requestAnimationFrame = () => 0;
global.confirm = () => true;
global.alert = () => {};
let promptPayload = null;
global.prompt = () => promptPayload;
global.matchMedia = () => ({ matches: false });
global.scrollTo = () => {};

/* ---------------- load the game ---------------- */
const qsrc = fs.readFileSync("questions.js", "utf8");
let gsrc = fs.readFileSync("game.js", "utf8").replace('"use strict";', "");
let T;
eval(qsrc + "\n" + gsrc + `
; T = { startPractice, startBoss, startDaily, startQuickFive, startBookDrill, startDiag, startGauntlet,
  startForge, forgeQuestion, ncdf,
  lockIn, nextQuestion, renderHome, touchStreak, recordAnswer, dueReviews, byId, bookEntries,
  getS: () => S, getSession: () => session, getOptOrder: () => optOrder, levelFor, unitPower, masteredCount };
`);

/* ---------------- helpers ---------------- */
let pass = 0, fail = 0;
function check(name, cond) {
  if (cond) { pass++; console.log("  ✓ " + name); }
  else { fail++; console.log("  ✗ FAIL: " + name); }
}
function answer(correct, sure = true) {
  const sess = T.getSession();
  const item = sess.queue[sess.i];
  const q = item.q || T.byId(item.id);
  const correctPos = T.getOptOrder().indexOf(q.answer);
  const pos = correct ? correctPos : (correctPos + 1) % 4;
  ids.qOptions.children[pos].click();          // pick
  T.lockIn(sure);                               // lock in
}
function finishSession(correctAll) {
  let guard = 0;
  while (T.getSession() && T.getSession().i < T.getSession().queue.length && guard++ < 200) {
    answer(correctAll);
    T.nextQuestion();
  }
}

/* ---------------- scenarios ---------------- */
console.log("BOOT");
handlers["DOMContentLoaded"]();
check("home renders with level title", ids.levelTitle.textContent === "Data Rookie");
check("intro modal shown on first launch", !ids.modal._cls.has("hidden") || ids.modalCard._html.includes("Welcome"));

console.log("PRACTICE — full unit run, all correct");
T.startPractice(1);
check("quiz title set", ids.quizTitle.textContent.includes("Data"));
const qlen = T.getSession().queue.length;
check("session queue built", qlen > 0);
finishSession(true);
let S1 = T.getS();
check("XP awarded", S1.xp > 0);
check("streak started", S1.streak === 1);
check("history logged", Object.values(S1.history)[0].a >= qlen);
check("session summary modal shown", ids.modalCard._html.includes("Session complete"));

console.log("PRACTICE — wrong answer requeues and Black Book fills");
T.startPractice(2);
const before = T.getSession().queue.length;
answer(false);
check("scout XP message present", ids.fbExpl._html.includes("scout"));
check("wrong answer requeued", T.getSession().queue.length === before + 1);
T.nextQuestion();
let sawRevenge = false;
let guard = 0;
while (T.getSession().i < T.getSession().queue.length && guard++ < 200) {
  answer(true);
  if (ids.fbExpl._html.includes("REVENGE")) sawRevenge = true;
  T.nextQuestion();
}
check("revenge +20 paid on the same-session requeue", sawRevenge);
check("black book has entries", T.bookEntries().length >= 1);

console.log("BLACK BOOK DRILL");
T.startBookDrill();
check("drill started", T.getSession().queue.length >= 1);
answer(true);
check("drill pays review XP", ids.fbExpl._html.includes("review cleared") || ids.fbExpl._html.includes("REVENGE") || ids.fbHead._cls.has("good"));
finishSession(true);

console.log("BOSS — clear with all correct");
T.startBoss(1);
check("boss bar visible", !ids.bossBar._cls.has("hidden"));
check("boss intro line shown", ids.modalCard._html.includes("poll"));
finishSession(true);
S1 = T.getS();
check("boss cleared recorded", !!S1.bossCleared[1]);
check("First Blood badge", !!S1.badges.blood);
check("defeat line in modal", ids.modalCard._html.includes("random sample"));

console.log("DAILY CHALLENGE");
T.startDaily();
check("daily queue is 10", T.getSession().queue.length === 10);
finishSession(true);
S1 = T.getS();
check("daily recorded", S1.daily && S1.daily.score === 10);
check("daily crown XP message", ids.modalCard._html.includes("DAILY CROWN"));
T.startDaily();
check("second attempt blocked", ids.modalCard._html.includes("Already"));

console.log("DIAG");
T.startDiag();
finishSession(true);
S1 = T.getS();
check("diag recorded 15/15", S1.diagDone && S1.diagDone.score === 15);
check("Scouted badge", !!S1.badges.scout);

console.log("GAUNTLET (forced)");
T.startGauntlet();
check("gauntlet queue built", T.getSession().queue.length === 8);
finishSession(true);
check("gauntlet end modal", ids.modalCard._html.includes("Gauntlet") || ids.modalCard._html.includes("SPEED"));

console.log("FORGE — infinite algorithmic questions");
let forgeOk = true;
for (let i = 0; i < 300; i++) {
  const q = T.forgeQuestion();
  if (!q || new Set(q.options).size !== 4 || q.answer !== 0 ||
      q.options.some(o => /NaN|Infinity|undefined/.test(String(o)))) { forgeOk = false; console.log("    bad forge:", q && q.id, q && q.options); break; }
}
check("300 forged questions all valid (4 distinct options, no NaN)", forgeOk);
check("normal CDF sane", Math.abs(T.ncdf(1.96) - 0.975) < 0.001 && Math.abs(T.ncdf(-2) - 0.0228) < 0.001);
const xpBeforeForge = T.getS().xp;
T.startForge();
check("forge queue is 10", T.getSession().queue.length === 10);
finishSession(true);
check("forge XP awarded", T.getS().xp > xpBeforeForge);
check("forge summary modal", ids.modalCard._html.includes("Session complete"));

console.log("EARN-BACK — broken chain restored by clearing reviews");
S1 = T.getS();
S1.streak = 10; S1.bestStreak = 10; S1.freezesUsed = 2;
const today = new Date().toISOString().slice(0, 10);
const past = new Date(Date.now() - 5 * 86400000).toISOString().slice(0, 10);
S1.lastPlay = past;
// plant 3 due reviews
for (const qid of ["U3-Q1", "U3-Q2", "U3-Q3"]) {
  S1.perQ[qid] = { tc: 0, tw: 1, stage: 0, due: today, days: [], everWrong: true, lastWrong: false };
}
T.touchStreak();
S1 = T.getS();
check("earn-back armed", S1.earnBack && S1.earnBack.oldStreak === 10);
check("streak provisionally 1", S1.streak === 1);
for (const qid of ["U3-Q1", "U3-Q2", "U3-Q3"]) T.recordAnswer(T.byId(qid), true, true, true);
S1 = T.getS();
check("chain restored to 11", S1.streak === 11 && !S1.earnBack);

console.log("EXPORT / IMPORT");
ids.reportBtn.onclick();
ids.exportBtn.onclick();
const snapshot = JSON.stringify(T.getS());
promptPayload = snapshot;
ids.importBtn.onclick();
check("import restores xp", T.getS().xp === JSON.parse(snapshot).xp);
promptPayload = "not json";
ids.importBtn.onclick();
check("garbage import rejected without crash", T.getS().xp === JSON.parse(snapshot).xp);

console.log("RENDER HOME — banners wired");
T.renderHome();
check("daily banner shows done state", ids.dailyBanner._html.includes("daily challenge"));
check("book banner present", ids.bookBanner._html.includes("BLACK BOOK"));
check("badges grid populated", ids.badgeGrid.children.length >= 15);
check("heatmap painted", ids.heatGrid.children.length > 60);

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
