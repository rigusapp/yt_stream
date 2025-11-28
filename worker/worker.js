export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const data = await request.json();

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

    const res = await fetch(githubUrl,{
      method:"POST",
      headers:{
        "Authorization": "token " + env.GH_PAT,
        "Content-Type":"application/json",
        "Accept":"application/vnd.github.everest-preview+json"
      },
      body: JSON.stringify(payload)
    });

    return new Response(await res.text(),{status:res.status});
  }
}
