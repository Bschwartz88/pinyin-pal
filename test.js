// Run with: node test.js   (no dependencies)
// 1) Content checks for lessons.js / data.js   2) Unit checks for the tone classifier.
const assert = require("assert");
const { LESSONS, VOCAB } = require("./lessons.js");
const { FAMILIES, PAIRS, SPEAK_TARGETS } = require("./data.js");
const { classifyTone, normalizeContour } = require("./app.js");

let n = 0;
const ok = (cond, msg) => { assert(cond, msg); n++; };

// ---- content ----
const TONE_MARK = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/;
const HANZI = /^[㐀-鿿，。！？、]+$/;
const ids = new Set();
for (const l of LESSONS) {
  ok(l.id && !ids.has(l.id), `duplicate lesson id ${l.id}`); ids.add(l.id);
  ok(l.title && l.emoji && l.intro, `lesson ${l.id} missing title/emoji/intro`);
  ok(l.phrases.length >= 8, `lesson ${l.id} has only ${l.phrases.length} phrases`);
  ok(l.phrases.filter(p => p.parts && p.parts.length >= 2).length >= 5,
     `lesson ${l.id} needs more multi-part phrases for Build the Sentence`);
  const seen = new Set();
  for (const p of l.phrases) {
    ok(p.hz && p.py && p.en, `phrase missing field in ${l.id}: ${JSON.stringify(p)}`);
    ok(HANZI.test(p.hz.replace(/Brian/g, "")) || /布莱恩/.test(p.hz), `hanzi field has non-hanzi in ${l.id}: ${p.hz}`);
    ok(TONE_MARK.test(p.py) || /^(Brian|ma|ne|de|le|ba|ge|men)\b/.test(p.py) || /xièxie|bàibai|māma|bàba/.test(p.py),
       `pinyin without tone mark in ${l.id}: ${p.py}`);
    ok(!seen.has(p.py), `duplicate pinyin in ${l.id}: ${p.py}`); seen.add(p.py);
    if (p.parts) {
      ok(p.parts.every(x => Array.isArray(x) && x.length === 2 && x[0] && x[1]), `bad parts in ${l.id}: ${p.py}`);
      // tiles should reassemble into the pinyin (ignoring punctuation/case)
      const norm = s => s.toLowerCase().replace(/[?!,.'’…]/g, "").replace(/\s+/g, "");
      ok(norm(p.parts.map(x => x[0]).join("")) === norm(p.py), `parts don't match pinyin in ${l.id}: "${p.parts.map(x => x[0]).join(" ")}" vs "${p.py}"`);
    }
  }
  for (const note of l.notes || []) ok(note.title && note.body, `bad note in ${l.id}`);
}
ok(VOCAB.length === LESSONS.length + 1, "phrasebook should mirror lessons + connectors");
const total = LESSONS.reduce((a, l) => a + l.phrases.length, 0);
ok(total >= 150, `expected 150+ lesson phrases, got ${total}`);
for (const f of FAMILIES) for (const it of f.items) ok(it.hz && it.py && it.tone >= 1 && it.tone <= 4, "bad family item");
for (const p of PAIRS) ok(p.a.hz && p.b.hz && p.note, "bad pair");
for (const t of SPEAK_TARGETS) ok(t.hz && t.tone, "bad speak target");

// ---- tone classifier ----
const contour = fn => normalizeContour(Array.from({ length: 40 }, (_, i) => 200 * Math.pow(2, fn(i / 39) / 12)));
ok(classifyTone(contour(() => 0)).tone === 1, "flat → tone 1");
ok(classifyTone(contour(t => -3 + 6 * t)).tone === 2, "rising → tone 2");
ok(classifyTone(contour(t => 4 - 8 * t)).tone === 4, "falling → tone 4");
ok(classifyTone(contour(t => -4 * Math.sin(Math.PI * t))).tone === 3, "dip → tone 3");
ok(classifyTone(null).tone === 0, "empty → unknown");

console.log(`✓ ${n} checks passed · ${LESSONS.length} lessons · ${total} lesson phrases · ${VOCAB.reduce((a, c) => a + c.words.length, 0)} phrasebook entries`);
