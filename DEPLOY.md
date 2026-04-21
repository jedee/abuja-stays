# AbujaStays — Deployment Notes

## GitHub Pages Status (as of 2026-04-21)

⚠️ **GitHub Pages is currently showing the Zo Space default page** — not the AbujaStays app. The workflow deploys but GitHub seems to serve a default page first.

### What Works
- **https://amml-jedi.zocomputer.io/stays/** ✅ — AbujaStays mounted on AMML's server at `/stays/`
- **https://jedee.github.io/amml/** ✅ — AMML GitHub Pages

### What's Broken
- **https://jedee.github.io/abuja-stays/** — Shows Zo Space default

## Root Cause
GitHub Pages may have a cached default page from the initial `zo-site` template. The workflow deploys correctly but GitHub seems to prioritize something else for the custom subpath.

## Deployment Checklist (for future deploys)
1. Check `list_user_services` — no hosted service slots available (plan limit reached)
2. Snapshot before changes: `cp server.ts server.ts.backup`
3. For Zo Sites: `bun run build` then verify `dist/index.html`
4. Verify asset paths: `grep -r '/old-base/' dist/` → replace with correct base
5. Screenshot via `agent-browser screenshot` — HTTP 200 ≠ correct content
6. Asset verification: `curl -sI https://domain.com/path/to/asset.js` for every file
7. GitHub workflow: push via API with PAT, not OAuth CLI
8. Batch commits: build → verify → commit → next

## AbujaStays GitHub Workflow
GitHub Actions builds and deploys to GitHub Pages. See `.github/workflows/abuja-stays.yml`.

To redeploy manually:
```bash
cd /home/workspace/abuja-stays
bun run build
git add -f dist/
git commit -m "build: fixed asset paths"
git push
# Wait 60s then check https://jedee.github.io/abuja-stays/
```DEPLOY
