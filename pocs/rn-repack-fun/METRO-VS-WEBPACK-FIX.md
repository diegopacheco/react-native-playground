# ⚠️ CRITICAL FIX: You're Using Metro, Not Webpack!

## THE ROOT PROBLEM

The error `__webpack_require__ doesn't exist` is happening because:

**❌ You're running the app with METRO bundler** (default React Native)  
**✅ You NEED to run it with WEBPACK** (Re.Pack)

Your code uses:
- `@callstack/repack/client` 
- ScriptManager
- Module Federation
- Remote chunks

**All of these require webpack, NOT Metro!**

## How to Tell Which Bundler You're Using

### Metro (WRONG for your app):
The error URL shows:
```
?platform=ios&dev=true&lazy=true&minify=false&inlineSourceMap=false
```
These are Metro parameters.

### Webpack (CORRECT):
Should show Re.Pack logs:
```
[RePack] Initialized
[webpack] Compiled successfully
```

## THE FIX - Stop Everything and Restart Correctly

### Step 1: KILL ALL PROCESSES
```bash
# Kill Metro if it's running
pkill -f "react-native start"
pkill -f "metro"

# Kill webpack dev server if running
pkill -f "repack"
pkill -f "webpack"

# Or just kill all node processes
killall node
```

### Step 2: Start Webpack Dev Server (REQUIRED!)
```bash
npm run webpack-start
```

**Wait for this message:**
```
<i> [RepackPlugin] Built in XXXXms
<i> [webpack-dev-server] Loopback: http://localhost:8081
<i> [webpack-dev-server] Project is running at:
```

**DO NOT CLOSE THIS TERMINAL!** Keep it running.

### Step 3: In a NEW Terminal - Run iOS App
```bash
# Make sure you're in the project root
npm run ios
```

**OR** if you need to rebuild:
```bash
cd ios
pod install
cd ..
npm run ios
```

## Alternative: Use the Webpack Bundle Command

If the dev server approach doesn't work:

```bash
# Generate the webpack bundle
npm run webpack-bundle

# Then run iOS
npm run ios
```

## What You Should See (Success)

### Terminal 1 (Webpack Dev Server):
```
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:8081
<i> [RepackPlugin] Built successfully
```

### Terminal 2 (React Native):
```
info Launching "org.reactjs.native.example.RepackFun"
success Successfully launched the app
```

### App Console:
```
[App] React, ReactNative, and AsyncStorage exposed globally
[ScriptManager] Initialized with resolver and storage
```

**NO MORE `__webpack_require__` errors!**

## Verifying You're Using Webpack

### Check the Dev Server:
```bash
# Should return webpack dev server response
curl http://localhost:8081/
```

### Check the Bundle:
```bash
# Should show webpack bundle, not Metro
curl http://localhost:8081/index.bundle?platform=ios&dev=true
```

Look for webpack-specific code like `__webpack_require__` defined in the bundle.

## Common Mistakes

### ❌ WRONG: Running with Metro
```bash
npm start          # This starts METRO
npm run ios        # Uses Metro by default
```

### ✅ CORRECT: Running with Webpack
```bash
npm run webpack-start    # Terminal 1: Webpack dev server
npm run ios             # Terminal 2: Runs app with webpack bundle
```

## Still Not Working?

### 1. Check which process is on port 8081:
```bash
lsof -i :8081
```

**Should show:** `node` running `@callstack/repack`  
**NOT:** `node` running `metro`

### 2. Force kill port 8081 and restart:
```bash
lsof -ti:8081 | xargs kill -9
npm run webpack-start
```

### 3. Clear all caches:
```bash
# Clear iOS build
cd ios
rm -rf build/
pod deintegrate
pod install
cd ..

# Clear node modules
rm -rf node_modules
npm install

# Clear Metro cache (just in case)
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*
```

### 4. Check react-native.config.js:
Make sure you don't have a config forcing Metro:

```bash
cat react-native.config.js
```

If it exists and doesn't mention Re.Pack, you might need to configure it.

## Create a Helper Script

Create `start-with-webpack.sh`:
```bash
#!/bin/bash
echo "Killing any existing bundlers..."
killall node 2>/dev/null

echo "Starting Webpack dev server..."
npm run webpack-start &
WEBPACK_PID=$!

echo "Waiting for webpack to be ready..."
sleep 5

echo "Starting iOS app..."
npm run ios

# Cleanup on exit
trap "kill $WEBPACK_PID" EXIT
```

Make it executable:
```bash
chmod +x start-with-webpack.sh
./start-with-webpack.sh
```

## Summary

The error occurs because:
1. Your code imports `@callstack/repack/client` 
2. This requires webpack runtime (`__webpack_require__`)
3. But Metro bundler doesn't provide this
4. Solution: Use webpack dev server instead of Metro

**Always run:**
```bash
npm run webpack-start    # Keep this running!
npm run ios             # In another terminal
```

---

**Next Step:** Kill all node processes and run `npm run webpack-start` in one terminal, then `npm run ios` in another.
