#!/bin/bash
cd remote-server
echo "Installing dependencies..."
npm install
echo ""
echo "Building remote chunks..."
npm run build
echo ""
echo "Starting remote server..."
npm start
