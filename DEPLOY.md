# AbujaStays — Deployment Notes

## Status: GitHub Actions deploy workflow pending

The GitHub Actions workflow (`.github/workflows/deploy.yml`) was created locally but **cannot be pushed** via the current OAuth token — it lacks `workflow` scope.

### What's needed to activate CI/CD

**Generate a Personal Access Token (PAT):**
1. Go to → https://github.com/settings/tokens/new
2. Scopes: check `repo` (full) + `workflow`
3. Generate → copy the token

**Then run:**
```bash
# Add token to repo secrets
gh repo secret set DEPLOY_TOKEN --body "ghp_xxxx" --repo jedee/abuja-stays

# Push the workflow file
git remote set-url origin "https://ghp_xxxx@github.com/jedee/abuja-stays.git"
git push origin main
```

Or simply paste the PAT in Zo Settings → Secrets as `GH_PAT`, then run:
```bash
git remote set-url origin "https://$(cat ~/.z/secrets/GH_PAT)@github.com/jedee/abuja-stays.git"
git push origin main
```

## Deployment targets (ranked)

| Target | Status | Notes |
|--------|--------|-------|
| **GitHub Pages** | ✅ Configured | Needs PAT to push workflow |
| **Zo Sites** | ⏳ | Free tier used by AMML; need to upgrade |
| **Vercel** | ⏳ | Needs `VERCEL_TOKEN` in Settings → Advanced |
| **Netlify** | ⏳ | Needs `NETLIFY_AUTH_TOKEN` |
| **Surge** | ⏳ | Interactive — needs account |
| **Cloudflare Pages** | ⏳ | `wrangler` not authenticated |

## Firebase Setup (needed for host features)
```bash
cp .env.example .env.local
# Fill in Firebase config values
```

## GitHub Actions Workflow
Location: `.github/workflows/deploy.yml`
- Triggers: push to `main`
- Steps: bun install → bun run build → GitHub Pages deploy
- Publishes to: https://jedee.github.io/abuja-stays/

## Current Build
- Local build: `bun run build` → `dist/`
- Dist is in `.gitignore` (not tracked in git)
- Build artifacts served via GitHub Pages CI after workflow push
