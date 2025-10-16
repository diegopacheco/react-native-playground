#!/bin/bash
set -e
echo "Installing npm dependencies..."
npm install
echo "Installing iOS pods..."
cd ios
bundle install
bundle exec pod install
cd ..
echo "Starting Metro bundler in background..."
npm start &
METRO_PID=$!
sleep 5
echo "Building and running iOS app..."
npx react-native run-ios
wait $METRO_PID
