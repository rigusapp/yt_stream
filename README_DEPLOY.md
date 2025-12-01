YT Stream — Final bundle
Files:
- index.html (UI original with Looping + Stop button)
- worker/worker.js (Worker endpoints: /streams, /schedule, /start, /stop, /delete-stream, /finish)
- wrangler.toml (configured with your account id & KV namespaces)

Deploy notes:
1. Ensure KV namespaces (STREAMS and STREAM_STATUS) exist in your Cloudflare account.
2. Deploy using 'wrangler publish' from this project root or via your GitHub Actions.
3. Use the Worker URL in the 'Cloudflare Worker URL' field of the UI (pre-filled).
4. Trigger stream via UI -> Trigger Stream.
5. Stop stream -> use Stop Stream quick action (calls POST {worker}/stop).

Stop behavior:
- Calling /stop without id marks all queued/running streams as stopped and sets STREAM_STATUS entries = "STOP".
- Calling /stop?id=... stops specific stream.

Looping:
- When a stream finishes, external scheduler or encoder should call /finish?id=... to mark done.
- If looping=true the worker will reschedule next run by adding duration minutes.

