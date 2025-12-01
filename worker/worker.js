addEventListener('fetch', event => event.respondWith(handle(event.request)));
async function handle(req){
  if(req.method === 'OPTIONS') return new Response(null,{status:204, headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'*'}});
  if(req.method !== 'POST') return new Response('Use POST', {status:405});
  try { const body = await req.json(); var payload = body.client_payload || body; } catch(e){ return new Response('Bad JSON', {status:400}); }
  if(!payload.stream_key || !payload.video_url) return new Response('Missing fields', {status:400});
  const repo = 'rigusapp/yt_stream';
  const apiUrl = `https://api.github.com/repos/${repo}/dispatches`;
  const token = GH_PAT;
  if(!token) return new Response('Missing GH_PAT', {status:400});
  const sendBody = JSON.stringify({ event_type: 'stream_trigger', client_payload: payload });
  const gh = await fetch(apiUrl, { method: 'POST', headers: { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github+json', 'Content-Type': 'application/json', 'User-Agent': 'YT-Stream-Worker' }, body: sendBody });
  const text = await gh.text();
  return new Response(text, {status: gh.status, headers: {'Access-Control-Allow-Origin':'*'}});
}
