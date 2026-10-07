"use strict";
// Intentionally independent of game playback, storage and service-worker setup.
const synth = window.speechSynthesis;
const el = id => document.getElementById(id);
let voices = [], current = null, stopping = false, stopTimer;
function controls() {
  el("play").disabled = !!current || stopping || !voices.length;
  for (const id of ["voice", "phrase", "cue", "speed", "refresh"]) el(id).disabled = !!current || stopping;
}
function loadVoices() {
  if (current || stopping) return;
  const previous = el("voice").value;
  voices = synth ? synth.getVoices().filter(v => /^(zh(-|_)CN|zh(-|_)TW|zh(-|_)SG|cmn)(-|_|$)/i.test(v.lang)) : [];
  el("voice").replaceChildren(...voices.map(v => {
    const option = document.createElement("option");
    option.value = v.voiceURI;
    option.textContent = `${v.name} (${v.lang})`;
    return option;
  }));
  if (voices.some(v => v.voiceURI === previous)) el("voice").value = previous;
  el("status").textContent = voices.length ? "Ready. Check whether the first word sounds complete." : "No Mandarin voice found. Download one in iPhone Settings, then refresh this page in Safari.";
  controls();
}
function stop() {
  if (!synth) return;
  current = null;
  stopping = true;
  const cancel = () => {
    if (synth.speaking || synth.pending) synth.pause();
    synth.cancel();
  };
  cancel();
  clearTimeout(stopTimer);
  controls();
  el("status").textContent = "Stopped. Wait a moment before replaying.";
  stopTimer = setTimeout(() => { cancel(); stopping = false; controls(); }, 450);
}
el("play").addEventListener("click", () => {
  if (!synth || current || stopping) return;
  const voice = voices.find(v => v.voiceURI === el("voice").value);
  if (!voice) return;
  const utterance = new SpeechSynthesisUtterance(el("cue").value + el("phrase").value);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = Number(el("speed").value);
  current = utterance;
  controls();
  el("status").textContent = "Starting… If silent, press Stop before retrying.";
  utterance.onstart = () => { if (current === utterance) el("status").textContent = "Playing — listen for the first word."; };
  utterance.onend = () => {
    if (current !== utterance) return;
    current = null;
    el("status").textContent = "Finished. Was the first word complete? Wait five seconds before replaying.";
    controls();
  };
  utterance.onerror = () => {
    if (current !== utterance) return;
    current = null;
    el("status").textContent = "Playback failed. Try another voice or refresh Safari.";
    controls();
  };
  try {
    // Baseline: no pre-play cancellation, timers, warm-up tone or game callbacks.
    if (synth.paused) synth.resume();
    synth.speak(utterance);
  } catch { utterance.onerror(); }
});
el("stop").addEventListener("click", stop);
el("refresh").addEventListener("click", loadVoices);
document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });
window.addEventListener("pagehide", stop);
if (synth) synth.addEventListener("voiceschanged", loadVoices);
loadVoices();
