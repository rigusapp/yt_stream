Deployment steps (quick):

1) Deploy Cloudflare Worker (worker/worker.js)
   - Create variable GH_PAT (Plaintext) in Worker settings.
   - Set route or workers.dev subdomain.

2) Put the static index.html on Pages/Vercel/GitHub Pages and open it.
   - In dashboard, set Worker URL to your deployed worker URL.

3) Add repository secret GH_PAT (if using proxy.yml composite action)
   - Or set GH_PAT as Worker variable (preferred).

4) Trigger from dashboard.
