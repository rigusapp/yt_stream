
## ADMIN - Login & Supabase user management (added)

Files added:
- `login.html` - Admin login page. Use username `admin` and password `Steve123`.
- `admin.html` - Simple admin dashboard to add users to Supabase and list users.
- `worker/admin_worker.js` - Cloudflare Worker that exposes two endpoints:
    - `POST /create-user` to create a Supabase user (requires SUPABASE_SERVICE_ROLE)
    - `GET /list-users` to list users (requires SUPABASE_SERVICE_ROLE)

### How it works (safe setup)
1. Deploy the Cloudflare Worker (`worker/admin_worker.js`) as a Cloudflare Worker script.
2. In the Cloudflare Worker settings add two secrets (environment variables):
   - `SUPABASE_URL` (e.g. `https://xyzcompany.supabase.co`)
   - `SUPABASE_SERVICE_ROLE` (your Supabase service_role key — **keep secret**)
3. After the worker is deployed, copy the worker URL (e.g. `https://my-worker.username.workers.dev`) and edit `admin.html`:
   - Replace `{{CLOUDFLARE_WORKER_URL}}` with your worker base URL (no trailing slash).
     Example: `const WORKER_BASE = 'https://my-worker.username.workers.dev';`
4. Open `login.html` in the browser. Login using `admin` / `Steve123`. You'll be redirected to admin dashboard.
5. Use the "Create user" form to create Supabase users. The worker uses the service_role key to call Supabase Admin API.
6. Use "Refresh list" to fetch users via `GET /list-users` endpoint.

### Security notes
- The admin login here is intentionally simple (single hardcoded admin) as per your instruction.
- Do **not** publish the Supabase `service_role` key in client-side code. Keep it in Cloudflare Worker secrets.
- Consider later adding proper authentication (OAuth + Supabase session) and an admin table in Supabase for production use.

