# Maintenance and deferred work

## Current release

v0.8.0 is the reviewed beginner listening release. Pages serves main from the repository root. Keep this origin/path stable to preserve browser progress. Run `npm test`; bump the version in package.json, index.html and sw.js together whenever cached app assets change.

## Open audio issue — deferred by release decision

Opening syllable clipping/clicking persists on iPhone 15 Pro Max with reported iOS 27, on speaker and headphones. It reproduces in the isolated audio-check.html page and with multiple Mandarin voices (reported as Tingting, Meijia and a Taiwan voice). Exact alternate voice labels were not independently captured. This makes a single voice or the game lifecycle less likely as the sole cause; the cause is unproven.

Reproduce: Safari, select a Mandarin voice, the coffee-order phrase, Phrase only and Normal. Listen for the initial word; let playback end, wait five seconds, replay, then compare Slow and the listen cue. Record exact OS/voice labels and output route. The diagnostic stores no scores/settings and uploads no recordings.

Attempts already tried: removing autoplay and redundant cancellation, delaying replacement playback, a separate ready tone with delay, and a spoken cue in the same utterance. The last improves perception but is not a final fix. Do not repeat these trials without a new hypothesis. Next consider a small licensed/native-reviewed prerecorded sample with leading silence to compare a different playback path before replacing the curriculum audio. Preserve replay and navigation-stop behavior.

## Other deferred work

- Physical iPhone offline installation, voice availability and persistence qualification. Existing cache support is not a completed device certification.
- Native-speaker curriculum review and future vocabulary expansion.
- Clarify best saved lesson score versus current attempt. Lesson success is 4/6; mission scores are separate from lesson scores.
- GitHub retained historical identity removal, if eligible for Support assistance; external copies cannot be certified erased.

## Release and recovery

1. Keep private progress exports and a verified local Git bundle before release. Never commit either.
2. Run all tests and check the PR diff. Preserve stable lesson/storage IDs. Validate microphone/audio navigation and backup round trips when related code changes.
3. Require GitHub checks and retain branch protection. Use neutral author/committer metadata. GitHub's merge UI can substitute the account display name even when source commits are neutral; inspect metadata before choosing the release method. Do not silently disable protections or rewrite history.
4. Verify Pages built the intended commit, served assets match the release, Settings shows the intended version and progress survives reload. Existing sessions may need the Settings update/restart control or a page reload; do not clear site data as an update step.
5. Roll back through a reviewed PR restoring known-good app files, keeping compatible data keys and using a NEW service-worker version. Do not reset learner progress or blindly force-push old recovery history.

Detailed device results and recovery notes are kept locally in ignored handoff/audit documents. When resuming, check those before repeating work. No temporary firewall exception is needed for the hosted diagnostic; the prior exception was removed and verified.
