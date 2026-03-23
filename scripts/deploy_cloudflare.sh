#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."
BRANCH="${1:-main}"

python3 "$SCRIPT_DIR/build_site.py"
wrangler pages deploy "$PROJECT_DIR/dist" --project-name staycalculator --branch "$BRANCH"
