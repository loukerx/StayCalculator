# StayCalculator Agent Notes

This file summarizes the project rules and recent decisions that matter for future AI/code agents.

## Project Shape

- Main public site source files live in the repo root:
  - `index.html`
  - `app.js`
  - `lang.js`
- Test file:
  - `test.js`
- Local-only test helpers:
  - `LocalTestExample/run.sh`
  - `LocalTestExample/no_cache_server.py`
- Deployment/build helpers:
  - `scripts/build_site.py`
  - `scripts/deploy_cloudflare.sh`

## Critical Deployment Rule

Do **not** deploy the repository root directly to Cloudflare Pages.

Reason:

- Deploying `.` exposes local-only files such as `LocalTestExample/run.sh`.
- This already happened once and `LocalTestExample/run.sh` became publicly reachable at:
  - `https://staycalculator.pages.dev/LocalTestExample/run.sh`

Correct deployment flow:

1. Build a clean publish directory:
   - `python3 scripts/build_site.py`
2. Deploy only `dist/`:
   - `scripts/deploy_cloudflare.sh main`

How it works:

- `scripts/build_site.py` deletes and recreates `dist/`
- It copies only an allowlist of public files into `dist/`
- `dist/` is a generated artifact and is ignored by Git

Do not manually edit `dist/`.
Edit the source files in the repo root, then rebuild.

## LocalTestExample Purpose

`LocalTestExample/` exists only for local manual testing.

Purpose:

- Open the calculator with preset URL parameters
- Reproduce real scenarios quickly
- Avoid browser cache problems during local testing

Current behavior:

- `LocalTestExample/run.sh` first builds `dist/`
- It then starts `LocalTestExample/no_cache_server.py`
- The local server serves `dist/` only, not the repo root
- The server sends `Cache-Control: no-store` headers
- `run.sh` also appends a cache-busting `cb` query parameter

Important:

- `LocalTestExample/` should never be treated as public site content
- Do not include it in Cloudflare deployment artifacts

## Stay-Day Counting Rule

The calculator currently uses **inclusive** day counting:

- Historical records: `[entry, exit]`
- Current stay: `[currentEntry, currentEndDay]`
- Both arrival day and departure day count as days in Australia

This was changed because government-style calculation needed arrival and departure days both included.

Key implementation points:

- `app.js`
  - `inclusiveDaysBetween(...)`
  - `countDaysInWindow(...)`
- Historical record totals and current stay totals both use inclusive counting
- The last valid stay date shown in the UI is itself an allowed stay day

Example:

- If the UI says `You can stay until 24 September 2026`
- Then `24 September 2026` is included
- Staying until `25 September 2026` would exceed the limit

## Important Regression Tests

Tests live in `test.js`.

Important coverage added:

- Historical trips include the departure day
- Same-day entry/exit counts as `1` day
- Current stay counts both ends
- The concrete regression case for latest valid stay date:
  - historical: `2024-10-15 ~ 2025-01-12`
  - historical: `2025-04-13 ~ 2025-09-21`
  - current entry: `2026-03-06`
  - expected last valid date: `2026-09-24`

Run tests with:

- `node --test test.js`

## Cloudflare Notes

- Cloudflare Pages project name: `staycalculator`
- The production domain may temporarily serve cached old files at old URLs
- When verifying whether an old path is truly gone, use a cache-busting query string, for example:
  - `https://staycalculator.pages.dev/LocalTestExample/run.sh?cb=TIMESTAMP`

## Safe Default For Future Agents

If you need to change the site:

1. Edit root source files
2. Run `node --test test.js`
3. Run `python3 scripts/build_site.py`
4. Confirm `dist/` contains only public files
5. Deploy with `scripts/deploy_cloudflare.sh main`

If you are about to deploy the repository root directly, stop and do not proceed.
