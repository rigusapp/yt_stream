addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Cloudflare Worker that proxies admin actions to Supabase using the service_role key.
 * IMPORTANT: Set environment variables in Cloudflare Worker:
 *   SUPABASE_URL  - e.g. https://xyzcompany.supabase.co
 *   SUPABASE_SERVICE_ROLE - service_role secret (kept private)
 *
 * Endpoints:
 *  POST /create-user  -> {email,password,display_name}
 *  GET  /list-users   -> lists users (limited)
 */

async function handleRequest(request){
  const url = new URL(request.url);
  if(url.pathname === '/create-user' && request.method === 'POST'){
    return createUser(request);
  }
  if(url.pathname === '/list-users' && (request.method === 'GET' || request.method === 'OPTIONS')){
    if(request.method === 'OPTIONS') return new Response(null, {status:204, headers: corsHeaders()});
    return listUsers(request);
  }
  return new Response('Not found', {status:404});
}

function corsHeaders(){
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

async function createUser(request){
  try{
    const body = await request.json();
    const {email,password,display_name} = body;
    if(!email || !password) return jsonResponse({error:'email and password required'}, 400);

    const supabaseUrl = SUPABASE_URL;
    const serviceRole = SUPABASE_SERVICE_ROLE;
    if(!supabaseUrl || !serviceRole) return jsonResponse({error:'server not configured'},500);

    // call Supabase Admin API to create user
    const resp = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'apiKey': serviceRole,
        'Authorization': 'Bearer ' + serviceRole
      },
      body: JSON.stringify({
        email: email,
        password: password,
        user_metadata: {display_name: display_name || null},
        email_confirm: true
      })
    });
    const data = await resp.json();
    if(!resp.ok){
      return jsonResponse({error: data?.message || data}, resp.status);
    }
    return new Response(JSON.stringify(data), {status:200, headers: Object.assign({'Content-Type':'application/json'}, corsHeaders())});
  }catch(e){
    return jsonResponse({error: e.message}, 500);
  }
}

async function listUsers(request){
  try{
    const supabaseUrl = SUPABASE_URL;
    const serviceRole = SUPABASE_SERVICE_ROLE;
    if(!supabaseUrl || !serviceRole) return jsonResponse({error:'server not configured'},500);
    // Supabase does not provide a single paginated admin list endpoint in all projects;
    // we'll call the users endpoint with limit=100 for convenience.
    const resp = await fetch(`${supabaseUrl}/auth/v1/admin/users?limit=100`, {
      method:'GET',
      headers:{
        'apiKey': serviceRole,
        'Authorization': 'Bearer ' + serviceRole
      }
    });
    const data = await resp.json();
    if(!resp.ok){
      return jsonResponse({error: data?.message || data}, resp.status);
    }
    return new Response(JSON.stringify({users: data?.users || data}), {status:200, headers: Object.assign({'Content-Type':'application/json'}, corsHeaders())});
  }catch(e){
    return jsonResponse({error: e.message}, 500);
  }
}

function jsonResponse(obj, status=200){
  return new Response(JSON.stringify(obj), {status: status, headers: Object.assign({'Content-Type':'application/json'}, corsHeaders())});
}
