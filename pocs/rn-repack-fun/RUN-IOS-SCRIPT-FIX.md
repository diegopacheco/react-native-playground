# ✅ Fixed: run-ios.sh Now Uses Webpack

## What Was Changed

### Before (WRONG - Used Metro):
```bash
echo "Starting Metro bundler in background..."
npm start &
METRO_PID=$!
```

### After (CORRECT - Uses Webpack):
```bash
echo "Starting Webpack dev server (Re.Pack) in background..."
npm run webpack-start &
WEBPACK_PID=$!
echo "Waiting for webpack to be ready..."
sleep 10
```

## How to Use

### Option 1: Use the Updated Script
```bash
./run-ios.sh
```

This will:
1. Install dependencies
2. Install iOS pods
3. Start **Webpack dev server** (not Metro)
4. Run the iOS app
5. Keep webpack running

### Option 2: Manual (Better for Development)
```bash
# Terminal 1: Start webpack
npm run webpack-start

# Terminal 2: Run iOS
npm run ios
```

## All Scripts Status

### ✅ Fixed Scripts:
- **`run-ios.sh`** - Now uses `npm run webpack-start` instead of `npm start`

### ✅ Correct Scripts (No changes needed):
- **`run-server.sh`** - Correctly starts the remote chunk server
- **`package.json`** - Has correct `webpack-start` command

### ⚠️ Reference Scripts (Metro-related but for reference):
- **`metro-logs.sh`** - For Metro debugging (not needed now)
- **`stop-all.sh`** - Kills both Metro and Webpack

## Quick Reference

### Start Development Environment:
```bash
# Terminal 1: Remote server (for remote chunks)
cd remote-server && npm run build && npm start

# Terminal 2: Webpack dev server (for main app)
npm run webpack-start

# Terminal 3: iOS app
npm run ios
```

### Or Use the Script:
```bash
# Terminal 1: Remote server
./run-server.sh

# Terminal 2: Run iOS with webpack
./run-ios.sh
```

## Stop Everything:
```bash
./stop-all.sh
```

This kills all processes (Metro, Webpack, node, etc.)

## Verify Webpack is Running

Check port 8081:
```bash
lsof -i :8081
```

Should show: `node` running `@callstack/repack`

Check webpack endpoint:
```bash
curl http://localhost:8081/
```

Should return webpack dev server response, not Metro.

## Common Issues

### Script says "already running on port 8081"
This means something is already on port 8081. Kill it:
```bash
lsof -ti:8081 | xargs kill -9
```

Then run the script again.

### Still getting `__webpack_require__` error
Make sure you're using webpack:
```bash
# Kill everything
./stop-all.sh

# Start fresh
./run-ios.sh
```

### Webpack not starting
Check for errors:
```bash
npm run webpack-start
```

Look for compilation errors in the output.

## Files Modified

1. **`run-ios.sh`**:
   - Changed `npm start` → `npm run webpack-start`
   - Changed references from "Metro" → "Webpack"
   - Increased sleep time from 5s to 10s (webpack takes longer to start)

2. **`package.json`**:
   - Added `webpack-bundle` and `ios:webpack` scripts (for reference)

## Why This Matters

Your app uses:
- `@callstack/repack/client`
- `ScriptManager`
- Remote code splitting

All of these require **webpack runtime** (`__webpack_require__`), which Metro doesn't provide.

Using the updated `run-ios.sh` ensures webpack is always used instead of Metro.

---

**Status**: ✅ Script fixed and ready to use!

Run: `./run-ios.sh`
