#!/usr/bin/env bash
#
# Build the SvelteKit site and publish it into the FruitTrees/ folder of your
# local tdubolyou.github.io checkout, then commit & push.
# Served at https://tdubolyou.github.io/FruitTrees
#
# Usage: npm run deploy
#
# Override with env vars if needed:
#   PAGES_DIR    path to the local pages repo (default: ../tdubolyou.github.io)
#   PAGES_BRANCH branch to push               (default: master)
#   SUBDIR       folder inside the repo        (default: FruitTrees)

set -euo pipefail

# Resolve project root (this script lives in <root>/scripts/).
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PAGES_DIR="${PAGES_DIR:-$ROOT/../tdubolyou.github.io}"
PAGES_BRANCH="${PAGES_BRANCH:-master}"
SUBDIR="${SUBDIR:-FruitTrees}"

# Verify the local pages checkout exists and is the expected repo.
if [ ! -d "$PAGES_DIR/.git" ]; then
	echo "✗ No git repo at $PAGES_DIR — set PAGES_DIR to your tdubolyou.github.io checkout." >&2
	exit 1
fi
PAGES_DIR="$(cd "$PAGES_DIR" && pwd)" # normalise to absolute path

echo "▶ Building site…"
npm run build

if [ ! -f build/toronto.pmtiles ]; then
	echo "✗ build/toronto.pmtiles missing — aborting." >&2
	exit 1
fi

echo "▶ Updating local pages repo at $PAGES_DIR…"
git -C "$PAGES_DIR" fetch origin "$PAGES_BRANCH"
git -C "$PAGES_DIR" checkout "$PAGES_BRANCH"
# Fast-forward only; bails if your local master has diverged so nothing is clobbered.
git -C "$PAGES_DIR" pull --ff-only origin "$PAGES_BRANCH"

echo "▶ Replacing $SUBDIR/ with fresh build…"
rm -rf "${PAGES_DIR:?}/$SUBDIR"
mkdir -p "$PAGES_DIR/$SUBDIR"
cp -R build/. "$PAGES_DIR/$SUBDIR/"

git -C "$PAGES_DIR" add -A -- "$SUBDIR"
if git -C "$PAGES_DIR" diff --cached --quiet; then
	echo "✔ No changes to deploy."
	exit 0
fi

git -C "$PAGES_DIR" commit -q -m "Deploy FruitTrees $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git -C "$PAGES_DIR" push origin "$PAGES_BRANCH"

echo "✔ Deployed to https://tdubolyou.github.io/$SUBDIR/"
