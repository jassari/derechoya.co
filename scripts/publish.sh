#!/usr/bin/env bash
# Pushes main to GitHub and asks Cloudflare Pages to deploy it (the deploy hook is the same one the
# GitHub Actions workflow calls). Usage: scripts/publish.sh
set -euo pipefail
cd "$(dirname "$0")/.."
GIT_SSH_COMMAND="${GIT_SSH_COMMAND:-ssh -i ~/.ssh/pc -o IdentitiesOnly=yes}" git push origin main
curl --fail --silent --show-error -X POST "https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/ab70299c-090b-4de5-b36f-36f71e3b5586" >/dev/null
echo "Pushed and deployment requested: https://derechoya.co"
