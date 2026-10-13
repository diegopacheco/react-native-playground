#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

require node
require npx

log "typecheck"
npx tsc --noEmit || fail "typecheck failed"

log "unit tests"
node --test "$ROOT"/tests/*.test.mjs || fail "unit tests failed"

log "all tests passed"
