# Fix Applied for __webpack_require__ Error

## Problem
The app was showing: `ReferenceError: Property '__webpack_require__' doesn't exist`

This happened because remote bundles had webpack dependencies but weren't properly configured as standalone scripts.

## Solution Applied

### 1. Fixed Remote Server Webpack Config (`remote-server/webpack.config.js`)
- Changed `globalObject: 'this'` → `globalObject: 'globalThis'`
- Added `var` export type to externals
- This ensures components are exposed on the global scope

### 2. Made React/ReactNative Available Globally (`index.js`)
```javascript
global.React = React;
global.ReactNative = ReactNative;
global.AsyncStorage = AsyncStorage;
```
This allows remote bundles to access these dependencies.

### 3. Updated RemoteLoader (`src/utils/RemoteLoader.ts`)
- Better error handling
- Checks for components on global scope
- More debugging logs

## Steps to Apply the Fix

### Step 1: Rebuild Remote Server Bundles
```bash
cd remote-server
npm run build
```

**What this does:** Recreates all `.bundle.js` files with the new `globalThis` configuration.

### Step 2: Restart Remote Server
```bash
# Stop current server (Ctrl+C if running)
cd remote-server
npm start
```

**Expected output:**
```
Remote Chunk Server running on http://localhost:3000
Chunks available at http://localhost:3000/chunks/
Available chunks:
  - Calculator.bundle.js (13.39 KB)
  - NoteTaking.bundle.js (14.41 KB)
  ...
```

### Step 3: Restart App Dev Server
```bash
# In your main project directory
# Stop current server (Ctrl+C)
npm run webpack-start
```

### Step 4: Reload iOS Simulator
**Option A:** Press `Cmd+R` in the simulator

**Option B:** Restart completely:
```bash
npm run ios
```

## Expected Behavior After Fix

### Console Logs (Success):
```
[App] React, ReactNative, and AsyncStorage exposed globally
[ScriptManager] Initialized with resolver and storage
[ScriptManager] Resolving script: Calculator
[ScriptManager] DEV mode - URL: http://localhost:3000/chunks/Calculator.bundle.js
[RemoteLoader] Loading Calculator...
[RemoteLoader] Calling ScriptManager.loadScript('Calculator')
[RemoteLoader] Script loaded, checking for component...
[RemoteLoader] Found Calculator on globalThis
[RemoteLoader] SUCCESS: Calculator loaded in 250ms
```

### What You Should See:
✅ App loads without errors  
✅ Calculator screen loads and works  
✅ Notes screen loads and works  
✅ Info screen loads and works  
✅ No `__webpack_require__` errors  

## Troubleshooting

### If Still Getting Errors:

**1. Check bundle was rebuilt:**
```bash
ls -lh remote-server/dist/
# Should show recent timestamps
```

**2. Check bundle content:**
```bash
curl http://localhost:3000/chunks/Calculator.bundle.js | head -50
```

Look for: `global.Calculator = ` or similar assignment

**3. Check what's on global:**
Add this to your App.tsx temporarily:
```javascript
useEffect(() => {
  console.log('Global keys:', Object.keys(global).filter(k => 
    k.includes('Calc') || k.includes('Note') || k.includes('Info')
  ));
}, []);
```

**4. Clear cache:**
- Simulator → Device → Erase All Content and Settings
- Or: `npm start -- --reset-cache`

### Common Issues:

**Issue:** Component still not found  
**Fix:** Make sure remote-server/webpack.config.js paths point to correct location (`./src/` vs `./remotes/`)

**Issue:** React is not defined  
**Fix:** The global assignment in index.js should fix this. Check console for the log message.

**Issue:** AsyncStorage errors  
**Fix:** AsyncStorage is now globally available. Remote bundles should use `global.AsyncStorage`

## Verification Commands

```bash
# 1. Check server is running
curl http://localhost:3000/health

# 2. Check bundle exists
curl -I http://localhost:3000/chunks/Calculator.bundle.js

# 3. Check bundle content
curl http://localhost:3000/chunks/Calculator.bundle.js | grep "global\."
```

## What Changed in Each File

**index.js:**
- Added React, ReactNative, AsyncStorage to global scope

**src/utils/RemoteLoader.ts:**
- Better component lookup on global scope
- Enhanced error messages

**remote-server/webpack.config.js:**
- Changed globalObject to 'globalThis'
- Fixed external declarations

---

**Status:** Ready to test! Follow steps 1-4 above.
