"use strict";

function isMandarinVoice(voice) {
  return /^(zh|cmn)(?:[-_](?:CN|TW|SG|Hans|Hant)(?:[-_].*)?)?$/i.test(voice.lang);
}
function chooseMandarinVoice(voices, savedURI, offline) {
  const candidates = voices.filter(v => isMandarinVoice(v) && (!offline || v.localService));
  return candidates.find(v => v.voiceURI === savedURI) ||
    candidates.find(v => v.localService && /ting[- ]?ting/i.test(v.name)) ||
    candidates.find(v => v.localService && /^zh[-_]CN/i.test(v.lang)) ||
    candidates.find(v => v.localService) || candidates[0] || null;
}
if (typeof module !== "undefined") module.exports = { isMandarinVoice, chooseMandarinVoice };
if (typeof window !== "undefined") {
  window.PinyinOffline = { isMandarinVoice, chooseMandarinVoice };
  const status = document.getElementById("offlineStatus");
  const updateButton = document.getElementById("offlineUpdate");
  const checkButton = document.getElementById("offlineCheck");
  let registration;
  let restarting = false;
  async function refreshStatus() {
    const controller = navigator.serviceWorker?.controller;
    if (!controller) { status.textContent = "Preparing offline files. Stay connected until setup finishes."; return; }
    try {
      const result = await new Promise((resolve, reject) => {
        const channel = new MessageChannel();
        const timeout = setTimeout(() => { channel.port1.close(); reject(new Error("timeout")); }, 5000);
        channel.port1.onmessage = event => { clearTimeout(timeout); channel.port1.close(); resolve(event.data); };
        controller.postMessage({ type: "OFFLINE_STATUS" }, [channel.port2]);
      });
      status.textContent = result.ready
        ? `App files saved (${result.version}). Audio needs a downloaded Mandarin voice. Test in airplane mode before relying on it.`
        : "Offline files are incomplete. Reconnect and check for updates.";
    } catch { status.textContent = "Could not verify offline files. Reconnect, close all app windows, and open again."; }
  }
  function watchUpdate() {
    updateButton.hidden = !registration.waiting;
    const installing = registration.installing;
    if (installing) installing.addEventListener("statechange", () => {
      updateButton.hidden = !registration.waiting;
      if (installing.state === "redundant") status.textContent = "Download did not finish. Your existing version is unchanged; reconnect and try again.";
    });
  }
  updateButton.addEventListener("click", () => {
    if (!registration?.waiting) return;
    restarting = true;
    registration.waiting.postMessage({ type: "ACTIVATE_UPDATE" });
  });
  checkButton.addEventListener("click", async () => {
    if (!registration) { location.reload(); return; }
    checkButton.disabled = true;
    try {
      if (navigator.storage?.persist) await navigator.storage.persist().catch(() => false);
      await registration.update();
      watchUpdate();
      await refreshStatus();
    } catch { status.textContent = "Cannot check for updates now. Reconnect and try again; saved files remain available."; }
    finally { checkButton.disabled = false; }
  });
  if ("serviceWorker" in navigator && window.isSecureContext) {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (restarting) location.reload(); else refreshStatus();
    });
    navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).then(reg => {
      registration = reg;
      reg.addEventListener("updatefound", watchUpdate);
      watchUpdate(); refreshStatus();
    }).catch(() => { status.textContent = "Offline setup failed. Reconnect and tap Check offline files to retry."; });
    window.addEventListener("online", refreshStatus);
    window.addEventListener("offline", refreshStatus);
  } else {
    status.textContent = "Offline installation requires HTTPS or localhost and a browser with service workers.";
    checkButton.disabled = true;
  }
}
