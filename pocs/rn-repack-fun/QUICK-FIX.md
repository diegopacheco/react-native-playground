# Quick Fix Steps

## The Error
The error `__webpack_require__ doesn't exist` happens because the remote bundles expect webpack runtime but are loaded as standalone scripts.

## What Was Fixed

### 1. Updated `remote-server/webpack.config.js`
- Changed `globalObject` from `'this'` to `'globalThis'`
- Added `var` to externals for proper global resolution
- This ensures components are exposed on `globalThis` object

### 2. Updated `src/utils/RemoteLoader.ts`
- Better error handling
- Checks for components on `globalThis`
- More detailed logging for debugging

## Steps to Fix

### 1. Rebuild Remote Server Bundles
```bash
cd remote-server
npm run build
```

This will recreate all `.bundle.js` files in `remote-server/dist/` with the new configuration.

### 2. Restart Remote Server
```bash
# Stop the current server (Ctrl+C)
npm start
```

### 3. Restart Your App
```bash
# In your app terminal, stop and restart
npm run webpack-start
```

### 4. Reload iOS Simulator
- Press `Cmd+R` in simulator
- Or stop and run: `npm run ios`

## What to Look For

### Success Indicators:
```
[ScriptManager] Resolving script: Calculator
[RemoteLoader] Calling ScriptManager.loadScript('Calculator')
[RemoteLoader] Script loaded, checking for component...
[RemoteLoader] Found Calculator on globalThis
[RemoteLoader] SUCCESS: Calculator loaded in XXms
```

### If Still Failing:
```
[RemoteLoader] Component Calculator not found. Available globals: [...]
```

This will show you what's actually available. The component should appear in that list.

## Verification

Test a bundle manually:
```bash
curl http://localhost:3000/chunks/Calculator.bundle.js | grep "globalThis.Calculator"
```

You should see: `globalThis.Calculator = ...`

## If Still Not Working

The remote bundles might need React/ReactNative to be available globally. Update `index.js`:

```javascript
// Add before ScriptManager config
globalThis.React = require('react');
globalThis.ReactNative = require('react-native');
```

---

**Next Step**: Rebuild remote server bundles with `cd remote-server && npm run build`
