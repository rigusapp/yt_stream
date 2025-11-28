export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS"
        }
      });
    }
    if (request.method !== "POST") {
      return new Response("Worker ready. Use POST.", { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
    }
    let data;
    try { data = await request.json(); } catch(e){ 
      return new Response("Invalid JSON", { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }); 
    }
    const payload = {
      event_type: "stream_trigger",
      client_payload: {
        video_url: data.video_url,
        start_time: data.start_time,
        duration_seconds: data.duration_seconds,
        seamless: data.seamless
      }
    };
    const githubUrl = `https://api.github.com/repos/${data.repo}/dispatches`;
    const res = await fetch(githubUrl, {
      method: "POST",
      headers: {
        "Authorization": "token " + env.GH_PAT,
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.everest-preview+json",
        "User-Agent": "ytstream-proxy-worker"
      },
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    return new Response(text, { status: res.status, headers: { "Access-Control-Allow-Origin": "*" } });
  }
};
