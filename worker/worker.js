addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

async function handle(req) {
  if (req.method === 'OPTIONS') return new Response(null, {status:204, headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'POST,OPTIONS'}});
  if (req.method !== 'POST') return new Response('Use POST', {status:405});
  let body = await req.text();
  try{ body = JSON.parse(body); }catch(e){}
  const payload = body.client_payload || body;
  const url = 'https://api.github.com/repos/rigusapp/yt_stream/dispatches';
  const token = GH_PAT || BINDINGS?.GH_PAT || '';
  if(!token) return new Response('Missing GH_PAT', {status:400});
  const res = await fetch(url, {method:'POST', headers:{'Authorization':'token '+token,'Content-Type':'application/json','Accept':'application/vnd.github.v3+json'}, body: JSON.stringify({event_type:'stream_trigger', client_payload: payload})});
  const text = await res.text();
  return new Response(text, {status: res.status, headers:{'Access-Control-Allow-Origin':'*'}});
}
