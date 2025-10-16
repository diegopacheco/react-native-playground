#!/bin/bash
echo "Stopping all servers and iOS simulators..."
echo "==========================================="
echo ""
echo "Killing Metro bundler (port 8081)..."
lsof -ti:8081 | xargs kill -9 2>/dev/null || true
pkill -9 -f "react-native start" 2>/dev/null || true
pkill -9 -f "metro" 2>/dev/null || true
echo "Killing remote server (port 3000)..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
pkill -9 -f "node server.js" 2>/dev/null || true
echo "Killing all node processes related to the app..."
pkill -9 -f "RepackFun" 2>/dev/null || true
echo "Shutting down all iOS simulators..."
xcrun simctl shutdown all 2>/dev/null || true
sleep 1
echo "Killing Simulator app..."
pkill -9 "Simulator" 2>/dev/null || true
echo ""
echo "All processes stopped!"
echo ""
echo "Cleanup summary:"
echo "  ✓ Metro bundler stopped"
echo "  ✓ Remote server stopped"
echo "  ✓ Node processes killed"
echo "  ✓ iOS simulators shutdown"
echo "  ✓ Simulator app closed"
