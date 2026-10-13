#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

log "stopping"
stop_bg metro

if port_up "$(service_port metro)"; then
  fail "metro still listening on $(service_port metro)"
fi

log "stopped"
