// ============ Pinyin Pal — app logic (Stage 1) ============
"use strict";

/* ---------------- Pure functions (also unit-tested in Node) ---------------- */

// Autocorrelation pitch detector (ACF2+). Returns frequency in Hz or -1.
function autoCorrelate(buf, sampleRate) {
  let SIZE = buf.length, rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.012) return { freq: -1, rms };
  let r1 = 0, r2 = SIZE - 1;
  const thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buf[i]) < thres) { r1 = i; break; }
  for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }
  buf = buf.slice(r1, r2); SIZE = buf.length;
  const c = new Array(SIZE).fill(0);
  for (let i = 0; i < SIZE; i++)
    for (let j = 0; j < SIZE - i; j++) c[i] += buf[j] * buf[j + i];
  let d = 0; while (c[d] > c[d + 1]) d++;
  let maxval = -1, maxpos = -1;
  for (let i = d; i < SIZE; i++) if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
  let T0 = maxpos;
  if (T0 <= 0) return { freq: -1, rms };
  const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1] || x2;
  const a = (x1 + x3 - 2 * x2) / 2, b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);
  const freq = sampleRate / T0;
  return { freq: (freq > 55 && freq < 520) ? freq : -1, rms };
}

// Normalize a raw pitch trace (array of Hz, voiced only) to semitones relative to its mean.
function normalizeContour(freqs) {
  if (freqs.length < 5) return null;
  // median filter (window 3) to kill octave-error spikes
  const med = freqs.map((f, i) => {
    const w = [freqs[Math.max(0, i - 1)], f, freqs[Math.min(freqs.length - 1, i + 1)]];
    return w.sort((a, b) => a - b)[1];
  });
  const semis = med.map(f => 12 * Math.log2(f));
  const mean = semis.reduce((a, b) => a + b, 0) / semis.length;
  return semis.map(s => s - mean);
}

// Classify a normalized contour (semitones, mean 0) into tone 1-4 with confidence.
function classifyTone(c) {
  if (!c || c.length < 5) return { tone: 0, conf: 0 };
  const n = c.length;
  const avg = (a) => a.reduce((x, y) => x + y, 0) / a.length;
  const q = Math.max(1, Math.floor(n / 4));
  const start = avg(c.slice(0, q));
  const end = avg(c.slice(n - q));
  const midArr = c.slice(q, n - q);
  const midMin = Math.min(...midArr);
  const max = Math.max(...c), min = Math.min(...c);
  const range = max - min;
  const rise = end - start;
  const dip = Math.min(start, end) - midMin;   // how far the middle sinks below both ends
  const recover = end - midMin;

  // Tone 3: clear dip that recovers
  if (dip > 1.2 && recover > 1.0) return { tone: 3, conf: Math.min(1, dip / 3) };
  // Tone 3 (half-third): moderate fall with a small recovery at the end
  if (rise < -1.2 && dip > 0.5 && recover > 0.5) return { tone: 3, conf: 0.5 };
  // Tone 4: strong fall, no recovery
  if (rise < -2.2 && recover < 1.2) return { tone: 4, conf: Math.min(1, -rise / 6) };
  // Tone 2: clear rise
  if (rise > 2.0) return { tone: 2, conf: Math.min(1, rise / 6) };
  // Tone 1: flat
  if (range < 2.4) return { tone: 1, conf: Math.min(1, (2.4 - range) / 2.4 + 0.3) };
  // Half third tone: low fall, small magnitude → 3; moderate fall → 4; moderate rise → 2
  if (rise < -1.0) return { tone: rise < -1.8 ? 4 : 3, conf: 0.4 };
  if (rise > 1.0) return { tone: 2, conf: 0.4 };
  return { tone: 1, conf: 0.3 };
}

if (typeof module !== "undefined") { module.exports = { autoCorrelate, normalizeContour, classifyTone }; }
if (typeof document === "undefined") { /* Node test mode */ } else { initApp(); }

/* ---------------- App ---------------- */
function initApp() {

/* ---- state & storage ---- */
const store = {
  get(k, d) { try { const v = localStorage.getItem("pp_" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem("pp_" + k, JSON.stringify(v)); } catch {} },
};
function bumpStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const last = store.get("lastDay", null);
  let days = store.get("streak", 0);
  if (last === today) return days;
  const yest = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  days = (last === yest) ? days + 1 : 1;
  store.set("streak", days); store.set("lastDay", today);
  return days;
}
function showStreak() { document.getElementById("streakDays").textContent = store.get("streak", 0); }

/* ---- TTS ---- */
const TTSm = {
  voices: [], voice: null,
  rate: store.get("rate", 0.9),
  load() {
    const all = speechSynthesis.getVoices();
    this.voices = all.filter(v => /^zh([-_]|$)/i.test(v.lang));
    const savedURI = store.get("voiceURI", null);
    this.voice =
      this.voices.find(v => v.voiceURI === savedURI) ||
      this.voices.find(v => /tingting|ting-ting/i.test(v.name)) ||
      this.voices.find(v => /^zh[-_]CN/i.test(v.lang)) ||
      this.voices[0] || null;
    renderVoiceSelect();
    document.getElementById("voiceNotice").classList.toggle("show", !this.voice && all.length > 0);
  },
  speak(hanzi, { rate = null, onend = null } = {}) {
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(hanzi);
      if (this.voice) u.voice = this.voice;
      u.lang = this.voice ? this.voice.lang : "zh-CN";
      u.rate = rate ?? this.rate;
      if (onend) u.onend = onend;
      speechSynthesis.speak(u);
    } catch (e) { console.log("TTS error", e); }
  },
};
speechSynthesis.onvoiceschanged = () => TTSm.load();
TTSm.load();

function renderVoiceSelect() {
  const sel = document.getElementById("voiceSelect");
  sel.innerHTML = "";
  if (!TTSm.voices.length) { sel.innerHTML = "<option>No Chinese voice found</option>"; return; }
  TTSm.voices.forEach(v => {
    const o = document.createElement("option");
    o.value = v.voiceURI; o.textContent = `${v.name} (${v.lang})`;
    if (TTSm.voice && v.voiceURI === TTSm.voice.voiceURI) o.selected = true;
    sel.appendChild(o);
  });
}
document.getElementById("voiceSelect").addEventListener("change", e => {
  TTSm.voice = TTSm.voices.find(v => v.voiceURI === e.target.value) || TTSm.voice;
  store.set("voiceURI", e.target.value);
});
const rateSlider = document.getElementById("rateSlider");
rateSlider.value = TTSm.rate;
rateSlider.addEventListener("input", e => {
  TTSm.rate = parseFloat(e.target.value); store.set("rate", TTSm.rate);
  document.getElementById("rateLabel").textContent = TTSm.rate <= 0.7 ? "Slow" : TTSm.rate <= 0.95 ? "Normal" : "Fast";
});
document.getElementById("testVoice").addEventListener("click", () => TTSm.speak("你好"));
document.getElementById("resetBtn").addEventListener("click", () => {
  Object.keys(localStorage).filter(k => k.startsWith("pp_")).forEach(k => localStorage.removeItem(k));
  location.reload();
});

/* ---- helpers ---- */
const $ = s => document.querySelector(s);
const rnd = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);

// Draw an ideal tone curve on a canvas.
function drawToneCurve(canvas, tone, { user = null, color = null } = {}) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || 84, h = canvas.clientHeight || 56;
  canvas.width = w * dpr; canvas.height = h * dpr;
  const ctx = canvas.getContext("2d"); ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);
  // guide lines
  ctx.strokeStyle = "rgba(0,0,0,0.06)"; ctx.lineWidth = 1;
  [0.25, 0.5, 0.75].forEach(y => { ctx.beginPath(); ctx.moveTo(0, h * y); ctx.lineTo(w, h * y); ctx.stroke(); });
  const shape = TONES[tone].shape;
  ctx.strokeStyle = color || TONES[tone].colorHex; ctx.lineWidth = 3.5; ctx.lineCap = "round";
  ctx.beginPath();
  for (let i = 0; i <= 40; i++) {
    const t = i / 40, y = h * (1 - Math.max(0.05, Math.min(0.95, shape(t))));
    i ? ctx.lineTo(8 + t * (w - 16), y) : ctx.moveTo(8, y);
  }
  ctx.stroke();
  if (user && user.length > 2) {
    const min = Math.min(...user), max = Math.max(...user);
    const span = Math.max(4, max - min);           // semitone span, at least 4 for visual sanity
    ctx.strokeStyle = "#2b2523"; ctx.lineWidth = 2.5; ctx.setLineDash([5, 4]);
    ctx.beginPath();
    user.forEach((s, i) => {
      const t = i / (user.length - 1);
      const y = h * (1 - (0.15 + 0.7 * ((s - min) / span)));
      i ? ctx.lineTo(8 + t * (w - 16), y) : ctx.moveTo(8, y);
    });
    ctx.stroke(); ctx.setLineDash([]);
  }
}

/* ---- router ---- */
const screens = ["home", "learn", "ear", "speak", "pairs", "settings"];
function go(name) {
  screens.forEach(s => $("#screen-" + s).classList.toggle("active", s === name));
  document.querySelectorAll(".nav button").forEach(b => b.classList.toggle("active", b.dataset.go === name));
  speechSynthesis.cancel();
  if (name === "learn") renderLearn();
  if (name === "ear") EarGame.start();
  if (name === "speak") SpeakGame.enter();
  if (name === "pairs") PairsGame.start();
  if (name === "home") renderHome();
  window.scrollTo(0, 0);
}
document.body.addEventListener("click", e => {
  const t = e.target.closest("[data-go]");
  if (t) go(t.dataset.go);
});

function renderHome() {
  showStreak();
  const be = store.get("bestEar", null), bp = store.get("bestPairs", null);
  if (be !== null) $("#bestEar").textContent = `Best: ${be}/10`;
  if (bp !== null) $("#bestPairs").textContent = `Best: ${bp}/10`;
}

/* ---- Learn screen ---- */
function renderLearn() {
  const wrap = $("#toneCards"); wrap.innerHTML = "";
  const fam = FAMILIES[0]; // ma family
  [1, 2, 3, 4].forEach(tn => {
    const item = fam.items.find(i => i.tone === tn);
    const card = document.createElement("div");
    card.className = "card tone-card";
    card.innerHTML = `
      <canvas class="mini"></canvas>
      <div>
        <span class="tonechip" style="background:${TONES[tn].colorHex}">${item.py}</span>
        <div style="font-weight:700;margin-top:6px">${TONES[tn].name} — ${item.en}</div>
        <div class="sub">${TONES[tn].desc}<br><i>${TONES[tn].tip}</i></div>
      </div>
      <div class="say">🔊</div>`;
    card.addEventListener("click", () => TTSm.speak(item.hz, { rate: 0.75 }));
    wrap.appendChild(card);
    drawToneCurve(card.querySelector("canvas"), tn);
  });
  const note = document.createElement("p");
  note.className = "sub"; note.style.marginTop = "10px";
  note.innerHTML = "Ready? Head back and play <b>Tone Detective</b> to train your ear. 🕵️";
  wrap.appendChild(note);
}

/* ---- Ear game: Tone Detective ---- */
const EarGame = {
  round: 0, score: 0, current: null, total: 10,
  start() {
    this.round = 0; this.score = 0;
    this.next();
  },
  next() {
    this.round++;
    if (this.round > this.total) return this.finish();
    const fam = rnd(FAMILIES);
    this.current = rnd(fam.items);
    const scr = $("#screen-ear");
    scr.innerHTML = `
      <button class="backlink" data-go="home">‹ Quit</button>
      <div class="game-head"><h2>🕵️ Tone Detective</h2><div class="score">${this.score} ⭐</div></div>
      <div class="progressbar"><div style="width:${((this.round - 1) / this.total) * 100}%"></div></div>
      <div class="card" style="text-align:center;padding:26px">
        <p class="sub">Round ${this.round} of ${this.total} — which tone do you hear?</p>
        <button class="btn jade big" id="earPlay" style="margin-top:14px">🔊 Play the word</button>
        <div class="choices" id="earChoices"></div>
        <div class="feedback" id="earFb"></div>
      </div>`;
    const choices = $("#earChoices");
    [1, 2, 3, 4].forEach(tn => {
      const b = document.createElement("div");
      b.className = "choice";
      b.innerHTML = `<canvas class="curveicon curve"></canvas>${TONES[tn].name}`;
      b.addEventListener("click", () => this.answer(tn, b));
      choices.appendChild(b);
      drawToneCurve(b.querySelector("canvas"), tn);
    });
    $("#earPlay").addEventListener("click", () => TTSm.speak(this.current.hz, { rate: 0.75 }));
    setTimeout(() => TTSm.speak(this.current.hz, { rate: 0.75 }), 350);
    this.answered = false;
  },
  answer(tn, el) {
    if (this.answered) return;
    this.answered = true;
    const ok = tn === this.current.tone;
    el.classList.add(ok ? "correct" : "wrong");
    if (!ok) {
      const right = [...document.querySelectorAll("#earChoices .choice")][this.current.tone - 1];
      right.classList.add("correct");
    }
    if (ok) this.score++;
    $(".game-head .score").textContent = `${this.score} ⭐`;
    $("#earFb").innerHTML = (ok ? rnd(PRAISE) : rnd(ENCOURAGE)) +
      `<div class="detail"><b class="pinyin">${this.current.py}</b> = ${this.current.en}. ${TONE_EXPLAIN[this.current.tone]}</div>`;
    setTimeout(() => this.next(), ok ? 1400 : 2600);
  },
  finish() {
    bumpStreak(); showStreak();
    const best = Math.max(store.get("bestEar", 0), this.score);
    store.set("bestEar", best);
    $("#screen-ear").innerHTML = `
      <div class="roundend card">
        <div style="font-size:3rem">${this.score >= 8 ? "🏆" : this.score >= 5 ? "🎉" : "💪"}</div>
        <div class="bigscore">${this.score}/${this.total}</div>
        <p class="sub" style="margin:8px 0 4px">${this.score >= 8 ? "Detective-level ears!" : this.score >= 5 ? "Solid — one more round and you'll own it." : "Tones are new muscles — they grow fast."}</p>
        <p class="sub">Best: ${best}/${this.total}</p>
        <div class="btn-row"><button class="btn" id="earAgain">Play again</button>
        <button class="btn secondary" data-go="home">Home</button></div>
      </div>`;
    $("#earAgain").addEventListener("click", () => this.start());
  },
};

/* ---- Pairs game: Sound Match ---- */
const PairsGame = {
  round: 0, score: 0, total: 10, current: null, correctSide: null,
  start() { this.round = 0; this.score = 0; this.next(); },
  next() {
    this.round++;
    if (this.round > this.total) return this.finish();
    this.current = rnd(PAIRS);
    this.correctSide = Math.random() < 0.5 ? "a" : "b";
    const cur = this.current, target = cur[this.correctSide];
    const scr = $("#screen-pairs");
    scr.innerHTML = `
      <button class="backlink" data-go="home">‹ Quit</button>
      <div class="game-head"><h2>👂 Sound Match</h2><div class="score">${this.score} ⭐</div></div>
      <div class="progressbar"><div style="width:${((this.round - 1) / this.total) * 100}%"></div></div>
      <div class="card" style="text-align:center;padding:26px">
        <p class="sub">Round ${this.round} of ${this.total} — which word did you hear?</p>
        <button class="btn jade big" id="prPlay" style="margin-top:14px">🔊 Play the word</button>
        <div class="choices">
          <div class="choice" id="prA"><span class="pinyin" style="font-size:1.6rem">${cur.a.py}</span><div class="sub">${cur.a.en}</div></div>
          <div class="choice" id="prB"><span class="pinyin" style="font-size:1.6rem">${cur.b.py}</span><div class="sub">${cur.b.en}</div></div>
        </div>
        <div class="feedback" id="prFb"></div>
      </div>`;
    $("#prPlay").addEventListener("click", () => TTSm.speak(target.hz, { rate: 0.75 }));
    $("#prA").addEventListener("click", () => this.answer("a"));
    $("#prB").addEventListener("click", () => this.answer("b"));
    setTimeout(() => TTSm.speak(target.hz, { rate: 0.75 }), 350);
    this.answered = false;
  },
  answer(side) {
    if (this.answered) return;
    this.answered = true;
    const ok = side === this.correctSide;
    $(side === "a" ? "#prA" : "#prB").classList.add(ok ? "correct" : "wrong");
    if (!ok) $(this.correctSide === "a" ? "#prA" : "#prB").classList.add("correct");
    if (ok) this.score++;
    $(".game-head .score").textContent = `${this.score} ⭐`;
    $("#prFb").innerHTML = (ok ? rnd(PRAISE) : rnd(ENCOURAGE)) + `<div class="detail">${this.current.note}</div>`;
    setTimeout(() => this.next(), ok ? 1500 : 2800);
  },
  finish() {
    bumpStreak(); showStreak();
    const best = Math.max(store.get("bestPairs", 0), this.score);
    store.set("bestPairs", best);
    $("#screen-pairs").innerHTML = `
      <div class="roundend card">
        <div style="font-size:3rem">${this.score >= 8 ? "🏆" : "🎉"}</div>
        <div class="bigscore">${this.score}/${this.total}</div>
        <p class="sub">Best: ${best}/${this.total}</p>
        <div class="btn-row"><button class="btn" id="prAgain">Play again</button>
        <button class="btn secondary" data-go="home">Home</button></div>
      </div>`;
    $("#prAgain").addEventListener("click", () => this.start());
  },
};

/* ---- Speak game: Pitch Painter ---- */
const SpeakGame = {
  idx: 0, audioCtx: null, analyser: null, stream: null, recording: false,
  enter() {
    this.idx = store.get("speakIdx", 0) % SPEAK_TARGETS.length;
    this.render();
  },
  target() { return SPEAK_TARGETS[this.idx % SPEAK_TARGETS.length]; },
  render() {
    const t = this.target();
    $("#screen-speak").innerHTML = `
      <button class="backlink" data-go="home">‹ Home</button>
      <div class="game-head"><h2>🎤 Pitch Painter</h2><div class="score sub">${(this.idx % SPEAK_TARGETS.length) + 1}/${SPEAK_TARGETS.length}</div></div>
      <div class="card">
        <div class="bigword">
          <span class="tonechip pinyin" style="background:${TONES[t.tone].colorHex};font-size:1.9rem;padding:10px 22px">${t.py}</span>
          <div class="en" style="margin-top:10px">${t.en} · ${TONES[t.tone].name}</div>
          <div class="sub" style="margin-top:4px"><i>${TONES[t.tone].tip}</i></div>
        </div>
        <div class="pitchbox"><span class="hint">Your voice (dashed) vs target</span><canvas class="curve" id="speakCanvas"></canvas></div>
        <div class="feedback" id="spFb">Tap ▶︎ to hear it, then 🎙 and say it!</div>
        <div class="speak-controls">
          <button class="roundbtn" id="spHear" title="Hear it">▶︎</button>
          <button class="micbtn" id="spMic">🎙</button>
          <button class="roundbtn" id="spSlow" title="Hear it slowly">🐢</button>
        </div>
        <div class="btn-row">
          <button class="btn secondary" id="spPrev">‹ Prev</button>
          <button class="btn secondary" id="spNext">Next ›</button>
        </div>
      </div>`;
    drawToneCurve($("#speakCanvas"), t.tone);
    $("#spHear").addEventListener("click", () => TTSm.speak(t.hz, { rate: 0.8 }));
    $("#spSlow").addEventListener("click", () => TTSm.speak(t.hz, { rate: 0.5 }));
    $("#spNext").addEventListener("click", () => { this.idx++; store.set("speakIdx", this.idx); this.render(); });
    $("#spPrev").addEventListener("click", () => { this.idx = (this.idx + SPEAK_TARGETS.length - 1) % SPEAK_TARGETS.length; store.set("speakIdx", this.idx); this.render(); });
    $("#spMic").addEventListener("click", () => this.record());
  },
  async ensureMic() {
    if (this.stream && this.stream.active) return true;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false } });
      this.audioCtx = this.audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const src = this.audioCtx.createMediaStreamSource(this.stream);
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 2048;
      src.connect(this.analyser);
      return true;
    } catch (e) {
      $("#spFb").innerHTML = `🎙 Microphone blocked.<div class="detail">Allow the mic in Settings → Safari (or the permission popup) and try again.</div>`;
      return false;
    }
  },
  async record() {
    if (this.recording) return;
    if (!(await this.ensureMic())) return;
    if (this.audioCtx.state === "suspended") await this.audioCtx.resume();
    this.recording = true;
    const mic = $("#spMic"); mic.classList.add("recording"); mic.textContent = "👂";
    $("#spFb").textContent = "Listening… say it now!";
    const buf = new Float32Array(this.analyser.fftSize);
    const freqs = [];
    const t0 = performance.now();
    const DURATION = 1800;
    const loop = () => {
      this.analyser.getFloatTimeDomainData(buf);
      const { freq } = autoCorrelate(buf, this.audioCtx.sampleRate);
      if (freq > 0) freqs.push(freq);
      if (performance.now() - t0 < DURATION) requestAnimationFrame(loop);
      else this.evaluate(freqs);
    };
    requestAnimationFrame(loop);
  },
  evaluate(freqs) {
    this.recording = false;
    const mic = $("#spMic"); mic.classList.remove("recording"); mic.textContent = "🎙";
    const t = this.target();
    const contour = normalizeContour(freqs);
    if (!contour || contour.length < 8) {
      $("#spFb").innerHTML = `I didn't catch that 🤔<div class="detail">Speak a little louder, closer to the mic, and stretch the word out.</div>`;
      return;
    }
    drawToneCurve($("#speakCanvas"), t.tone, { user: contour });
    const { tone, conf } = classifyTone(contour);
    if (tone === t.tone) {
      $("#spFb").innerHTML = `${rnd(PRAISE)}<div class="detail">That's a textbook ${TONES[t.tone].name}. Tap Next ›</div>`;
    } else if (tone === 0) {
      $("#spFb").innerHTML = `Hmm, hard to read that one.<div class="detail">Try holding the vowel longer — exaggerate the shape.</div>`;
    } else {
      $("#spFb").innerHTML = `Close! That sounded like a <b>${TONES[tone].name}</b>.<div class="detail">Target: ${TONE_EXPLAIN[t.tone]} You did: ${TONE_EXPLAIN[tone]} Compare the curves above, listen 🐢, and try again.</div>`;
    }
  },
};

/* ---- boot ---- */
renderHome();
// iOS: voices often load only after first interaction
document.body.addEventListener("touchstart", () => { if (!TTSm.voices.length) TTSm.load(); }, { once: true });

// Service worker
if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
}
