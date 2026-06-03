#!/usr/bin/env bash
#
# Build the SvelteKit site and publish it into the FruitTrees/ folder of the
# GitHub Pages repo, served at https://tdubolyou.github.io/FruitTrees
#
# Usage: npm run deploy
#
# Override the target with env vars if needed:
#   PAGES_REPO   git URL of the pages repo   (default below)
#   PAGES_BRANCH branch to push              (default: master)
#   SUBDIR       folder inside the repo       (default: FruitTrees)

set -euo pipefail

PAGES_REPO="${PAGES_REPO:-https://github.com/tdubolyou/tdubolyou.github.io.git}"
PAGES_BRANCH="${PAGES_BRANCH:-master}"
SUBDIR="${SUBDIR:-FruitTrees}"

# Resolve project root (this script lives in <root>/scripts/).
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "▶ Building site…"
npm run build

# Sanity check: the build must contain the basemap and an entry point.
if [ ! -f build/toronto.pmtiles ]; then
	echo "✗ build/toronto.pmtiles missing — aborting." >&2
	exit 1
fi

echo "▶ Cloning $PAGES_REPO ($PAGES_BRANCH)…"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
git clone --depth 1 --branch "$PAGES_BRANCH" "$PAGES_REPO" "$TMP"

echo "▶ Replacing $SUBDIR/ with fresh build…"
rm -rf "${TMP:?}/$SUBDIR"
mkdir -p "$TMP/$SUBDIR"
cp -R build/. "$TMP/$SUBDIR/"

cd "$TMP"
git add -A
if git diff --cached --quiet; then
	echo "✔ No changes to deploy."
	exit 0
fi

git commit -q -m "Deploy FruitTrees $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push origin "$PAGES_BRANCH"

echo "✔ Deployed to https://tdubolyou.github.io/$SUBDIR/"
