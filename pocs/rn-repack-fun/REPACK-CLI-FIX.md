# ✅ Fixed: Correct Re.Pack CLI Commands

## The Problem

The webpack-start command was trying to use a non-existent `bin.js` file:

```text
node node_modules/@callstack/repack/dist/bin.js start  ❌ WRONG
```

## The Solution

Re.Pack v5.x integrates with React Native CLI, but requires configuration!

### Step 1: Create react-native.config.js

Created `react-native.config.js` to register Re.Pack commands:

```javascript
module.exports = {
  commands: [
    ...require('@callstack/repack/commands/webpack'),
  ],
};
```

### Step 2: Use React Native CLI Commands

### Updated package.json Scripts:
```json
"webpack-start": "react-native webpack-start --platform ios"
"webpack-bundle": "react-native webpack-bundle --platform ios"
```

## How to Use

### Start Webpack Dev Server:
```bash
npm run webpack-start
```

This runs: `react-native webpack-start --platform ios`

### Or Build Bundle:
```bash
npm run webpack-bundle
```

This runs: `react-native webpack-bundle --platform ios`

## Run Your App

### Option 1: Use run-ios.sh (Recommended)
```bash
./run-ios.sh
```

### Option 2: Manual Steps
```bash
# Terminal 1: Webpack dev server
npm run webpack-start

# Terminal 2: iOS app
npm run ios
```

## Why This Works

Re.Pack v5.x registers custom commands with React Native CLI:
- `react-native webpack-start` - Starts webpack dev server
- `react-native webpack-bundle` - Builds webpack bundle

These are NOT standalone binaries, they're React Native CLI plugins!

## Test It

```bash
# Kill everything
killall node

# Start webpack
npm run webpack-start
```

You should see:
```
<i> [webpack-dev-server] Project is running at http://localhost:8081
<i> [RepackPlugin] Built successfully
```

---

**Status**: ✅ Scripts fixed! Run `npm run webpack-start` to test.
