#!/bin/bash
APP_NAME="RepackFun"
BUNDLE_ID="org.reactjs.native.example.RepackFun"
DEVICE_NAME=${1:-"iPhone 17 Pro"}
echo "Streaming iOS Simulator logs for: $APP_NAME"
echo "Device: $DEVICE_NAME"
echo "Bundle ID: $BUNDLE_ID"
echo "=========================================="
echo ""
DEVICE_ID=$(xcrun simctl list devices | grep "$DEVICE_NAME" | grep "Booted" | head -1 | grep -o '[A-F0-9-]\{36\}')
if [ -z "$DEVICE_ID" ]; then
    echo "No booted device found matching: $DEVICE_NAME"
    echo ""
    echo "Available booted devices:"
    xcrun simctl list devices | grep "Booted"
    echo ""
    echo "Usage: ./ios-logs.sh [device-name]"
    exit 1
fi
echo "Found device ID: $DEVICE_ID"
echo ""
echo "Filtering logs for app: $BUNDLE_ID"
echo "Press Ctrl+C to stop"
echo ""
xcrun simctl spawn "$DEVICE_ID" log stream --predicate "processImagePath CONTAINS '$APP_NAME'" --style compact
