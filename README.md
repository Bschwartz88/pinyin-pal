# Pinyin Pal

Personal Mandarin learning app for iPad/iPhone — pinyin only, no characters. Runs as a website (bookmark it, or add to the home screen).

## What's inside (v0.4)

- **Lessons** — 17 short lessons on everyday basics (hello, thanks, how are you, names, yes/no, numbers, food, at the table, ordering, "I don't understand", time, family, wants & likes, this/that/where, weather & comfort, daily routine, health & care). Each one explains the phrases word by word, adds a few "how Chinese works" notes, and ends with a 6-question **Try it** check. Progress and a "continue" card are saved on the device.
- **Phrasebook** — every phrase (≈260), tap to hear, 🐢 for slow.
- **Word Match** — hear/see a phrase, pick the meaning. Wrong answers come from the same lesson. Play with all words, one lesson, or just lessons you've finished.
- **Build the Sentence** — put word tiles in the right order (one decoy tile).
- **Sound practice** (optional, folded away on Home) — Meet the Tones, Tone Detective, Pitch Painter (mic + pitch curve), Sound Match.
- **Settings** — Voice picker, speed slider, progress backup export/import (JSON), and reset.

## Files

| File | What |
|---|---|
| `index.html` | layout + styles |
| `lessons.js` | all lesson content and the phrasebook |
| `data.js` | tone / sound-practice content |
| `app.js` | app logic |
| `sw.js` | offline cache; updates automatically on next open |
| `test.js` | `node test.js` — checks the content and the tone classifier |

## Editing content

Add or change phrases in `lessons.js`. Each phrase needs `hz` (Chinese, used only for the voice), `py` (pinyin shown on screen) and `en`; optional `parts` (word-by-word breakdown, also used as game tiles) and `tip`. Run `node test.js` afterwards.
