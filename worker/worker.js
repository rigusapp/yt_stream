export default {
  async fetch(req, env) {

    // CORS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "POST,OPTIONS"
        }
      });
    }

    if (req.method !== "POST") {
      return new Response("POST only", { status: 405 });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    const payload = body.client_payload || body;

    if (!payload.stream_key) {
      return new Response("Missing stream_key", { status: 400 });
    }

    if (!payload.video_url) {
      return new Response("Missing video_url", { status: 400 });
    }

    const GH_PAT = env.GH_PAT;
    if (!GH_PAT) {
      return new Response("Missing GH_PAT", { status: 400 });
    }

    const repo = "rigusapp/yt_stream";
    const url = "https://api.github.com/repos/" + repo + "/dispatches";

    const send = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + GH_PAT,
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "yt-stream-worker"
      },
      body: JSON.stringify({
        event_type: "stream_trigger",
        client_payload: payload
      })
    });

    const text = await send.text();

    return new Response(text, {
      status: send.status,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}
