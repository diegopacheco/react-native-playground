#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

require node
require npm

log "installing dependencies"
npm install --no-audit --no-fund
log "setup done"
