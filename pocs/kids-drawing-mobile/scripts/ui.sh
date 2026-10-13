#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

port_up "$(service_port metro)" || fail "metro is not running, run scripts/start-all.sh first"
open "$(service_url metro)"
