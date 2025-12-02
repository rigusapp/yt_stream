
addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

async function handle(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST,OPTIONS"
      }
    });
  }

  if (req.method !== 'POST') {
    return new Response("Use POST", { status: 405 });
  }

  // Parse incoming JSON
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return new Response("Bad JSON", { status: 400 });
  }

  // Extract payload
  const payload = body.client_payload || body;

  // Validate required fields
  if (!payload.stream_key) {
    return new Response("Missing stream_key", { status: 400 });
  }
  if (!payload.video_url) {
    return new Response("Missing video_url", { status: 400 });
  }

  // GitHub Repo dispatch URL (hard‑coded for safety)
  const repo = "rigusapp/yt_stream";
  const apiUrl = `https://api.github.com/repos/${repo}/dispatches`;

  // Take PAT from Worker vars
  const token = GH_PAT;
  if (!token) {
    return new Response("Missing GH_PAT", { status: 400 });
  }

  // Body sent to GitHub
  const sendBody = JSON.stringify({
    event_type: "stream_trigger",
    client_payload: payload
  });

  // Execute GitHub Dispatch
  const gh = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Authorization": "token " + token,
      "Accept": "application/vnd.github+json",
      "Content-Type": "application/json"
    },
    body: sendBody
  });

  const text = await gh.text();

  return new Response(text, {
    status: gh.status,
    headers: { "Access-Control-Allow-Origin": "*" }
  });
}
