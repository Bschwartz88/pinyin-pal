const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createSessionTimers, speechRate, acquireCurrentMic, restoreBackup, validateBackupData } = require('./app');
const { startSpeech } = require('./app');
const { stopSpeech } = require('./app');

test('leaving pauses output and retries cancellation without cancelling a subsequent play', () => {
  const callbacks = [], calls = [];
  let stopped = true;
  const synth = {speaking:true, pending:false, paused:false,
    pause() { this.paused=true; calls.push('pause'); },
    cancel() { calls.push('cancel'); },
    resume() { this.paused=false; calls.push('resume'); },
    speak(u) { calls.push(u); }};
  stopSpeech(synth, fn => callbacks.push(fn), () => stopped);
  assert.deepEqual(calls, ['pause','cancel']);
  callbacks[0]();
  assert.deepEqual(calls, ['pause','cancel','pause','cancel']);
  stopped = false; synth.speaking = false;
  startSpeech(synth, 'new phrase', () => {}, () => true);
  callbacks[1]();
  assert.deepEqual(calls, ['pause','cancel','pause','cancel','resume','new phrase']);
});

test('idle speech starts in the tap handler without an unnecessary cancellation', () => {
  const calls = [];
  startSpeech({speaking:false,pending:false,cancel:()=>calls.push('cancel'),speak:u=>calls.push(u)}, 'phrase',
    () => { throw Error('Idle playback should not be delayed'); }, () => true);
  assert.deepEqual(calls, ['phrase']);
});

test('interrupted speech waits; rapid replacement and navigation invalidate pending starts', () => {
  const calls = [], callbacks = [];
  const timers = createSessionTimers(fn => { callbacks.push(fn); return callbacks.length; }, () => {});
  const synth = {speaking:true,pending:false,cancel:()=>calls.push('cancel'),speak:u=>calls.push(u)};
  const queue = phrase => {
    timers.cancel();
    const revision = timers.revision;
    startSpeech(synth, phrase, (fn, ms) => { assert.equal(ms,200); timers.later(fn,ms); }, () => timers.revision === revision);
  };
  queue('first'); queue('second');
  callbacks[0](); callbacks[1]();
  assert.deepEqual(calls, ['cancel','cancel','second']);
  queue('leaving'); timers.cancel(); callbacks[2]();
  assert.deepEqual(calls, ['cancel','cancel','second','cancel']);
});

test('navigation cancels audio timers, including a callback already queued by the event loop', () => {
  const callbacks = [], cancelled = [];
  const session = createSessionTimers(fn => { callbacks.push(fn); return callbacks.length; }, id => cancelled.push(id));
  let spoken = 0;
  session.later(() => spoken++, 350);
  session.cancel();
  callbacks[0]();
  assert.equal(spoken, 0);
  assert.deepEqual(cancelled, [1]);
  session.later(() => spoken++, 350);
  callbacks[1]();
  assert.equal(spoken, 1);
});

test('a late microphone grant releases every track after leaving the screen', async () => {
  let grant, current = true, stopped = 0;
  const pending = acquireCurrentMic(() => new Promise(resolve => { grant = resolve; }), () => current);
  current = false;
  grant({ getTracks: () => [{stop: () => stopped++}, {stop: () => stopped++}] });
  assert.equal(await pending, null);
  assert.equal(stopped, 2);
});

test('a current microphone request can proceed and permission failure propagates', async () => {
  const stream = { getTracks: () => [] };
  assert.equal(await acquireCurrentMic(async () => stream, () => true), stream);
  await assert.rejects(acquireCurrentMic(async () => { throw Error('permission denied'); }, () => true));
});

test('all playback rates respect settings and slow is slower even at the minimum', () => {
  for (const rate of [0.5, 0.7, 0.9, 1.1]) {
    assert.equal(speechRate(rate), rate);
    assert.ok(speechRate(rate, true) < rate);
  }
  assert.equal(speechRate(NaN), 0.9);
  assert.equal(speechRate(2), 1.1);
  assert.equal(speechRate(0.1), 0.5);
});

test('backup failure rolls back earlier writes and never reports success', () => {
  const data = new Map([['pp_streak', '3'], ['pp_rate', '0.9']]);
  const storage = {
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => { if (key === 'pp_rate' && value === '0.7') throw Error('quota'); data.set(key,value); },
    removeItem: key => data.delete(key)
  };
  const result = restoreBackup(storage, {streak:8, practiceMode:'mixed', rate:0.7});
  assert.deepEqual(result, {ok:false, reason:'storage', rolledBack:true});
  assert.deepEqual([...data], [['pp_streak','3'],['pp_rate','0.9']]);
  assert.deepEqual(restoreBackup(storage, {streak:5}), {ok:true});
  assert.equal(data.get('pp_streak'), '5');
});

test('restoring a cafe score preserves the exact backup value in both directions', () => {
  for (const [existing, saved] of [[4,3], [3,4], [3,3]]) {
    const values = new Map([['pp_lessonScores', JSON.stringify({cafe:existing, hello:6})]]);
    const storage = {getItem:k=>values.get(k) ?? null, setItem:(k,v)=>values.set(k,v), removeItem:k=>values.delete(k)};
    const backup = JSON.parse(JSON.stringify({lessonScores:{cafe:saved, hello:6}}));
    assert.deepEqual(restoreBackup(storage, backup), {ok:true});
    assert.deepEqual(JSON.parse(values.get('pp_lessonScores')), {cafe:saved, hello:6});
    assert.equal(backup.lessonScores.cafe, saved);
  }
});

test('unavailable storage or failed rollback is reported; old backups still work', () => {
  const unavailable = {getItem: () => null, setItem: () => {throw Error('blocked');}, removeItem: () => {throw Error('blocked');}};
  assert.deepEqual(restoreBackup(unavailable, {streak:2}), {ok:false,reason:'storage',rolledBack:false});
  assert.deepEqual(restoreBackup(unavailable, {unexpected:2}), {ok:false,reason:'invalid'});
  assert.deepEqual(validateBackupData({streak:2,lessonScores:{hello:5}}), {streak:2,lessonScores:{hello:5}});
  assert.equal(validateBackupData({practiceMode:'injected'}), null);
  assert.deepEqual(validateBackupData({practiceMode:'listen'}), {practiceMode:'listen'});
});
