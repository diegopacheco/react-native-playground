#!/bin/bash
echo "Metro Bundler Logs (JavaScript console.log output)"
echo "===================================================="
echo ""
echo "The [CHUNK] loading logs appear in the Metro bundler terminal."
echo ""
echo "To see chunk loading logs:"
echo "  1. Look at the terminal where you ran 'npm start'"
echo "  2. Or enable Chrome DevTools by pressing 'j' in Metro terminal"
echo "  3. Or shake the simulator and select 'Debug'"
echo ""
echo "Searching for recent Metro log output..."
echo ""
METRO_LOG="/tmp/metro-bundler.log"
if [ -f "$METRO_LOG" ]; then
    echo "Found Metro log file:"
    grep -i "chunk\|bundle" "$METRO_LOG" | tail -20
else
    echo "Metro bundler is running in your terminal."
    echo "Check the terminal where 'npm start' is running for:"
    echo "  - [CHUNK] IMPORT started: <name>"
    echo "  - [CHUNK] SUCCESS: <name> loaded in Xms"
    echo ""
    echo "The chunks that were bundled are shown as:"
    echo "  BUNDLE  src/remotes/calculator/Calculator.tsx"
    echo "  BUNDLE  src/remotes/noteTaking/NoteTaking.tsx"
    echo "  etc."
fi
