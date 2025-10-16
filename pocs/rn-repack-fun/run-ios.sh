#!/bin/bash
set -e
echo "Installing npm dependencies..."
npm install
echo "Installing iOS pods..."
cd ios
bundle install
bundle exec pod install
cd ..

if lsof -ti:8081 > /dev/null 2>&1; then
    echo "Metro bundler is already running on port 8081"
    METRO_PID=""
else
    echo "Starting Metro bundler in background..."
    npm start &
    METRO_PID=$!
    sleep 5
fi

echo "Building and running iOS app..."
npx react-native run-ios --no-packager

if [ ! -z "$METRO_PID" ]; then
    wait $METRO_PID
fi
