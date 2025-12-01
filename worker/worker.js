// Cloudflare Worker proxy: accepts POST JSON payload and dispatches to GitHub repository_dispatch
addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

async function handle(req) {
  if (req.method !== 'POST') return new Response('Use POST', {status:405});
  let data;
  try {
    data = await req.json();
  } catch(e){
    return new Response('Invalid JSON', {status:400});
  }

  // Read GH_PAT from environment variable (Workers -> Variables)
  const GH_PAT = __ENV.GH_PAT;
  if (!GH_PAT) return new Response('GH_PAT missing', {status:500});

  // Replace with your owner/repo
  const repo = 'rigusapp/yt_stream';
  const workflow = 'stream.yml';

  const payload = {
    event_type: 'stream_trigger',
    client_payload: data
  };

  const url = `https://api.github.com/repos/${repo}/dispatches`;

  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'token ' + GH_PAT,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const text = await r.text();
  return new Response(text, {status: r.status, headers:{'Content-Type':'text/plain'}});
}
