/* Real-DOM smoke test (jsdom) — catches what the mini-DOM can't:
   element destruction via innerHTML, null lookups, real HTML parsing.
   Run: npm install && node browser-test.js                            */
"use strict";
const fs = require("fs");
let JSDOM;
try { ({ JSDOM } = require("jsdom")); }
catch { console.log("jsdom not installed — run: npm install"); process.exit(2); }

const html = fs.readFileSync("index.html", "utf8")
  .replace(/<script src="questions\.js[^"]*"><\/script>/, "")
  .replace(/<script src="game\.js[^"]*"><\/script>/, "");
const dom = new JSDOM(html, { url: "https://example.com/game/", runScripts: "outside-only", pretendToBeVisual: true });
const w = dom.window;
w.matchMedia = w.matchMedia || (() => ({ matches: false }));

const pageErrors = [];
w.addEventListener("error", e => pageErrors.push(e.message));

// one eval = one shared top-level scope, like consecutive <script> tags
w.eval(fs.readFileSync("questions.js", "utf8") + "\n" + fs.readFileSync("game.js", "utf8"));
w.document.dispatchEvent(new w.Event("DOMContentLoaded", { bubbles: true }));

let pass = 0, fail = 0;
const check = (name, cond) => { if (cond) { pass++; console.log("  ✓ " + name); } else { fail++; console.log("  ✗ FAIL: " + name); } };
const $ = id => w.document.getElementById(id);

console.log("REAL-DOM BOOT");
check("no uncaught page errors during boot", pageErrors.length === 0);
check("unit grid renders (10 units + Forge + Exam)", $("unitGrid").children.length === 12);
check("heatmap paints the summer", $("heatGrid").children.length > 60);
check("trophy case renders", $("badgeGrid").children.length >= 15);
check("campaign strip renders", $("campaignStrip").textContent.includes("THE CLIMB"));
check("totals line renders", $("totalsLine").textContent.includes("arsenal"));
check("PLAY button routes", $("smartBtn").textContent.includes("Readiness"));

console.log("REAL-DOM PLAY-THROUGH");
// close the welcome modal, press PLAY, answer the first question
w.document.querySelector("#modalCard .big-btn") && w.eval("closeModal()");
$("smartBtn").click();
check("quiz view opens", !$("quiz").classList.contains("hidden"));
check("a question renders", $("qStem").textContent.trim().length > 10);
check("four options render", $("qOptions").children.length === 4);
$("qOptions").children[0].click();
check("lock-in row appears after picking", !$("lockRow").classList.contains("hidden"));
$("lockSure").click();
check("feedback shows after lock-in", !$("feedback").classList.contains("hidden"));
check("explanation text present", $("fbExpl").textContent.trim().length > 10);
$("nextBtn").click();
check("advances to the next question", $("qTag").textContent.includes("2/"));
check("still no page errors after play-through", pageErrors.length === 0);

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
