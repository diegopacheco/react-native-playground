#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

require npx
[ -d "$ROOT/node_modules" ] || fail "dependencies missing, run scripts/setup.sh first"

port="$(service_port metro)"
if port_up "$port"; then
  log "metro already running"
else
  start_bg metro npx expo start --lan --port "$port"
  wait_port_up "$port" 60 || fail "metro did not open port $port, see $LOGS/metro.log"
fi

"$SCRIPTS/status.sh"

log "links"
printf "%-14s %s\n" "web" "$(service_url metro)"
printf "%-14s %s\n" "iphone" "$(phone_url metro)"
log "on the iPhone open Expo Go, tap Enter URL manually and type the iphone link"
