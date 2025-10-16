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
    echo "Webpack dev server is already running on port 8081"
    WEBPACK_PID=""
else
    echo "Starting Webpack dev server (Re.Pack) in background..."
    npm run webpack-start &
    WEBPACK_PID=$!
    echo "Waiting for webpack to be ready..."
    sleep 10
fi

echo "Building and running iOS app..."
npx react-native run-ios --no-packager

if [ ! -z "$WEBPACK_PID" ]; then
    wait $WEBPACK_PID
fi
