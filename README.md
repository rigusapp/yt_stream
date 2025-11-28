# yt_stream Dashboard v9 — Repository Dispatch Version

Architecture:
- Browser sends `repository_dispatch` event with event_type `stream_trigger`.
- Proxy workflow listens to this repository_dispatch event.
- Proxy workflow runs a composite action that uses `GH_PAT` from Secrets to dispatch the actual `stream.yml` workflow.
- `stream.yml` runs FFmpeg on GitHub Actions runner to stream to YouTube.

Install:
1. Upload files to repo root (maintain structure).
2. Add Secrets in repository: GH_PAT, YT_STREAM_KEY
3. Ensure repo is public.
4. From browser use index.html to send repository_dispatch.

Notes:
- Some GitHub API endpoints still require auth; repository_dispatch for public repositories can be accepted without auth in many setups, but if your repo or org enforces stricter policies you may need to allow it.
