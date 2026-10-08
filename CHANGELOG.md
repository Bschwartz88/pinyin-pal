# Changes

## 0.8.0 — Reviewed release (2026-10-08)

- Release the beginner listening, vocabulary, accessibility, backup and navigation improvements described below.
- Guided iPhone testing confirmed saved scores, import/export, slower replay and stopping speech on Home/background.
- Opening speech artifact remains reproducible across voices and headphones; retained as a documented future fix. Offline iPhone qualification is also deferred.
- Completed scoped runtime/repository security review, neutralized active historical identities, protected main and excluded private audit workspaces. Retained GitHub objects remain a separate privacy follow-up.
- Added security and maintenance documentation, with a versioned cache update that preserves progress.


## 0.7.9 — Stop speech on leaving

- Centralized speech stopping for navigation, Next, backgrounding and microphone recording.
- Pause active output, clear the queue, and retry cancellation twice while still stopped. New playback invalidates the retries and resumes the engine if needed.
- iPhone retesting required: the user reported that the previous cancellation-only approach continued speaking after Home.

## 0.7.7 — Spoken lead-in trial

- Removed the separate ready tone after device testing still found clipped syllables.
- On iPhone/iPad, a clearly labeled tīng ("listen") cue now precedes the target phrase inside the same speech utterance. No extra delay is imposed on idle speech. Device retesting remains necessary.

## 0.7.6 — Café variety and audio trial

- Café Mission selects five distinct phrases from all 12 café entries, avoiding the previous batch during the current page session. Speaker prompts now distinguish customer and barista phrases.
- Added an iPhone/iPad ready tone and 350 ms lead-in as a trial mitigation for clipped starts. Device verification remains required; delayed speech is cancelled on navigation or another play request.

## 0.7.5 — iPhone playback follow-up

- Listening questions wait for a Play tap instead of starting automatic audio that can compete with it.
- Idle playback no longer cancels speech unnecessarily. Replacing active speech waits 200 ms; navigation or a later tap cancels pending starts.
- Physical iPhone retesting is needed to establish whether the reported clipped starts are resolved.

## 0.7.4 — Guided testing feedback

- Slower beginner replay throughout the app; normal playback is unchanged.
- Added voice setup instructions, a direct setup button in the missing-audio warning, and a voice refresh control.
- Clarified that Mandarin voice installation does not change the device language and that refreshing may be needed after download.

## 0.7.2 — Everyday listening

- Added 24 phrase entries across café and conversation-repair lessons: 19 lessons, 271 lesson phrases and 286 phrasebook entries total.
- Café Mission offers five contextual listening questions without a timer.
- Listening Garden schedules short reviews from listening answers, with earlier returns for missed phrases and no interval inflation from early successful replays.
- Stable phrase IDs and validated review backups preserve existing lesson scores and old backup compatibility.
- New games are reachable from Home and the game picker. Existing games remain available.
- Documented content provenance, pinyin conventions and device-audio limitations in CONTENT.md.

## 0.6.2 — Listening and reliability

- Listening is the default quiz mode; mixed listening/pinyin remains available in Settings.
- All scored games wait for Next and offer replay after feedback.
- A beginner starts with the first lesson; finished-lesson practice no longer silently uses unfamiliar vocabulary.
- Playback follows the speed setting; slow replay is relative to that speed.
- Navigation and backgrounding cancel pending audio. Late microphone permission grants release their tracks.
- Pitch Painter gives cautious estimates and samples less frequently.
- Phrasebook search supports English and unaccented pinyin.
- Keyboard controls, labels, focus indicators, spoken feedback announcements and zoom support improved.
- Failed saves are visible; current-session changes remain exportable. Failed imports attempt rollback and report failure honestly.
- Reset requires an explicit in-page confirmation.
- Personal lesson/greeting examples replaced with a neutral example, including the corresponding content tests.
- Existing scoped offline cache work retained with setup folded away; physical iPhone qualification deferred.
- Added automated checks with read-only GitHub Actions permissions and pinned actions.

Existing lesson scores and backup keys remain compatible. Public historical commits and repository/account identifiers are outside this release's privacy cleanup.
