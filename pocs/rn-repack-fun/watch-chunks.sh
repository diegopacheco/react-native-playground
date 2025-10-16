#!/bin/bash
echo "Monitoring Remote Chunk Requests..."
echo "===================================="
echo ""
echo "Navigate between tabs in the iOS simulator to see chunk loading."
echo "Press Ctrl+C to stop."
echo ""
tail -f /tmp/remote-server.log | grep --line-buffered "\[CHUNK"
