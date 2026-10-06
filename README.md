# Pinyin Pal

Personal Mandarin learning app for iPad/iPhone — pinyin only, no characters. Runs as a website (bookmark it, or add to the home screen).

## What's inside (v0.6)

- **Lessons** — 17 short lessons on everyday basics (hello, thanks, how are you, names, yes/no, numbers, food, at the table, ordering, "I don't understand", time, family, wants & likes, this/that/where, weather & comfort, daily routine, health & care). Each one explains the phrases word by word, adds a few "how Chinese works" notes, and ends with a 6-question **Try it** check. Progress and a "continue" card are saved on the device.
- **Phrasebook** — every phrase (≈260), tap to hear, 🐢 for slow.
- **Word Match** — listening-first practice with slow replay and a Next button so feedback stays available. Settings also offers mixed listening/pinyin practice. New learners start with a familiar lesson; finished-lesson practice unlocks after a lesson is completed.
- **Build the Sentence** — put word tiles in the right order (one decoy tile).
- **Sound practice** (optional, folded away on Home) — Meet the Tones, Tone Detective, Pitch Painter (mic + pitch curve), Sound Match.
- **Settings** — Mandarin voice picker, consistent playback speed, practice style, progress backup export/import (JSON), and a confirmed reset.
- **Phrase search** — find English or pinyin across the phrasebook, including pinyin typed without tone marks.

## Files

| File | What |
|---|---|
| `index.html` | layout + styles |
| `lessons.js` | all lesson content and the phrasebook |
| `data.js` | tone / sound-practice content |
| `app.js` | app logic |
| `sw.js`, `offline.js` | scoped cache, voice selection and update controls |
| `test.js`, `test-reliability.js`, `test-offline.js` | content, storage, microphone, playback and cache regression checks |

## Development and checks

Use `npm test` for all checks and `npm run preview` for a loopback-only preview at `http://127.0.0.1:4173/pinyin-pal/`. No package installation is needed. The GitHub Actions workflow runs the same checks on pull requests and main. Change the service-worker version whenever a cached asset changes; preserve progress exports before release testing.

## Optional offline setup

Settings has folded-away home-screen instructions and an explicit update/restart control. Offline speech requires a downloaded Mandarin device voice. Real iPhone audio testing is deferred until the core release is stable. A cached-files message does not certify audible offline playback. Pitch Painter is an experimental pitch visualization, not a validated pronunciation assessment.

## Editing lesson content

Add or change phrases in `lessons.js`. Each phrase needs `hz` (Chinese, used only for the voice), `py` (pinyin shown on screen) and `en`; optional `parts` (word-by-word breakdown, also used as game tiles) and `tip`. Run `node test.js` afterwards.
