const test = require('node:test');
const assert = require('node:assert/strict');
const { LESSONS } = require('./lessons.js');
const { sanitizeReview, scheduleReview, duePhrases, validateBackupData } = require('./app.js');
const day = 86400000, now = 1700000000000;

test('every phrase has a unique stable ID accepted by backup validation', () => {
  const phrases = LESSONS.flatMap(l => l.phrases);
  assert.equal(new Set(phrases.map(p => p.id)).size, phrases.length);
  for (const l of [...LESSONS].reverse()) for (const p of [...l.phrases].reverse()) {
    assert.equal(p.id, l.id + '-' + Array.from(p.hz, c => c.codePointAt(0).toString(16)).join(''));
    const record = scheduleReview(null, true, now);
    assert.deepEqual(sanitizeReview({[p.id]: record})[p.id], record);
  }
});

test('correct answers space reviews; early repeats do not inflate the level', () => {
  let record = scheduleReview(null, true, now);
  assert.equal(record.due, now + day);
  const repeated = scheduleReview(record, true, now + 1000);
  assert.equal(repeated.level, 1);
  assert.equal(repeated.due, record.due);
  for (const interval of [3, 7, 14, 30, 30]) {
    const time = record.due;
    record = scheduleReview(record, true, time);
    assert.equal(record.due, time + interval * day);
  }
});

test('missed phrases return sooner and are prioritized without duplicate queue entries', () => {
  const [a,b,c] = LESSONS[0].phrases;
  const right = scheduleReview(null, true, now);
  const missed = scheduleReview(right, false, now + 1000);
  assert.equal(missed.level, 0);
  assert.equal(missed.misses, 1);
  assert.equal(missed.due, now + 601000);
  const records = {[a.id]: right, [b.id]: missed, unknown: missed};
  assert.deepEqual(duePhrases([a,b,c], records, now), []);
  assert.deepEqual(duePhrases([a,b,c], records, now + day), [b,a]);
});

test('review imports reject hostile IDs, malformed values, and extra fields', () => {
  const id = LESSONS[0].phrases[0].id;
  const record = scheduleReview(null, true, now);
  assert.deepEqual(sanitizeReview(JSON.parse('{"__proto__":{"polluted":true}}')), {});
  for (const patch of [{due: Infinity},{last:-1},{level:6},{attempts:0},{misses:2},{due:now-1}]) {
    assert.deepEqual(sanitizeReview({[id]:{...record,...patch}}), {});
  }
  assert.deepEqual(validateBackupData({phraseReview:{[id]:{...record,html:'<script>'}}}), {phraseReview:{[id]:record}});
  assert.deepEqual(validateBackupData({lessonScores:{hello:6}}), {lessonScores:{hello:6}});
});
