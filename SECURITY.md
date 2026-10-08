# Security and privacy notes

Reviewed for v0.8.0 on 2026-10-08. No embedded credential or exploitable injection was identified in the reviewed scope; this is not a guarantee of security.

## Application safeguards

- Static app with no app backend, analytics, third-party scripts or runtime package dependencies.
- Backup imports accept a constrained schema; failed saves/imports are reported and imports attempt rollback.
- Microphone access requires permission; late permission grants are released after leaving the activity.
- Service-worker caches are scoped to this app and allowlisted assets. Other apps' caches are not deleted.
- The local preview serves an explicit file allowlist and defaults to loopback. Backups, audit workspaces and recovery bundles are excluded from Git.
- Progress is stored unencrypted in browser storage. Other pages on the same hosting origin are not a separate storage boundary. Export progress before clearing browser data.
- Device or online speech providers may process lesson text. A selected voice does not guarantee offline processing.

## Repository safeguards

Main requires a pull request and a passing, up-to-date test check; protections include administrators. Force pushes and deletion are disabled. No second human approval is required for solo maintenance. Actions use pinned revisions and read-only permissions; workflow tokens cannot approve pull requests. Pages enforces HTTPS. Secret scanning and push protection were enabled with zero returned alerts at release review.

Active reviewed history uses neutral author identities and examples. Repository ownership remains visible by design. Rewriting branches does not erase old GitHub commit objects, pull-request caches or third-party clones. Retained historical identity data is a separate support follow-up, not a completed erasure claim.

## Limits and reporting

Account access/2FA, repository hooks with unavailable permissions, external copies and full penetration testing were not verified. The app currently has no runtime dependencies to audit. Review any new dependency or external service before adopting it.

Do not post credentials, progress exports, personal paths or private audit files in public issues. Use GitHub's private vulnerability reporting if available; otherwise establish a private reporting channel with the repository owner before sharing sensitive material.
