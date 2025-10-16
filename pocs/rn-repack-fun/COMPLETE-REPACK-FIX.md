# 🔧 Complete Re.Pack v5 Setup Fix

## Issues Fixed

1. ✅ **Missing `react-native.config.js`** - Commands not registered with RN CLI
2. ✅ **Webpack config using deprecated API** - Updated to v5 `defineWebpackConfig`
3. ✅ **Missing babel-loader configuration** - Added explicit JavaScript/TypeScript processing
4. ✅ **ES module compatibility** - Fixed `__dirname` → `context`

## Files Changed

### 1. Created `react-native.config.js`
```javascript
module.exports = {
  commands: [
    ...require('@callstack/repack/commands/webpack'),
  ],
};
```

### 2. Updated `webpack.config.mjs`
- Wrapped config with `Repack.defineWebpackConfig()`
- Removed deprecated `getInitializationEntries()`
- Removed deprecated `getPublicPath()`
- Added explicit babel-loader for all JavaScript/TypeScript files
- Fixed `__dirname` → `context` for ES modules

### 3. Updated `package.json` scripts
```json
{
  "webpack-start": "react-native webpack-start --platform ios",
  "webpack-bundle": "react-native webpack-bundle --platform ios"
}
```

## How to Run

### Step 1: Clean Everything
```bash
# Kill all processes
killall node

# Clean build directories
rm -rf build/ ios/build/

# Clean iOS cache
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
```

### Step 2: Start Webpack Dev Server
```bash
npm run webpack-start
```

**Expected Output:**
```
▄▀▀▀ ▀▀▀▀   █▀▀█ █▀▀█ ▄▀▀▀ █  █
█    ▀▀▀▀   █▀▀▀ █▀▀█ █    █▀▀▄
▀    ▀▀▀▀ ▀ ▀    ▀  ▀  ▀▀▀ ▀  ▀
5.2.1, powered by webpack

<i> [webpack-dev-server] Project is running at http://localhost:8081
✔ Compiled ios in X.Xs
```

### Step 3: In New Terminal - Start Remote Server
```bash
cd remote-server
npm start
```

**Expected Output:**
```
Remote chunks server running at http://localhost:3000
```

### Step 4: In New Terminal - Run iOS App
```bash
npm run ios
```

**OR use the script:**
```bash
./run-ios.sh
```

## Verification Checklist

- [ ] Webpack dev server starts without errors
- [ ] Remote server is running on port 3000
- [ ] iOS app builds successfully
- [ ] App connects to http://localhost:8081/index.bundle?platform=ios
- [ ] No "Module parse failed" errors
- [ ] No "__webpack_require__ is not defined" errors
- [ ] Remote components load successfully

## Troubleshooting

### If you still see "Module parse failed" errors:

1. **Rebuild everything:**
   ```bash
   killall node
   rm -rf node_modules ios/Pods ios/Podfile.lock build/
   npm install
   cd ios && pod install && cd ..
   ```

2. **Clear Metro cache (if Metro is running):**
   ```bash
   npx react-native start --reset-cache
   ```

3. **Clear Xcode derived data:**
   ```bash
   rm -rf ~/Library/Developer/Xcode/DerivedData/
   ```

4. **Restart webpack dev server:**
   ```bash
   killall node
   npm run webpack-start
   ```

### If webpack dev server won't start:

Check if babel-loader is installed:
```bash
npm install --save-dev babel-loader @babel/core
```

Check if Re.Pack commands are registered:
```bash
npx react-native --help | grep webpack
```

Should show:
```
webpack-bundle    Build the bundle
webpack-start     Start the dev server
```

### If app shows old cached bundle:

The iOS simulator might be loading cached bundles. Try:

1. **Shake device (Cmd+Ctrl+Z) → Reload**
2. **Reset simulator:** Device → Erase All Content and Settings
3. **Rebuild app:** 
   ```bash
   cd ios
   xcodebuild clean -workspace RepackFun.xcworkspace -scheme RepackFun
   cd ..
   npm run ios
   ```

## Key Changes Summary

| Component | Old (Broken) | New (Fixed) |
|-----------|-------------|-------------|
| CLI Commands | `node dist/bin.js` | `react-native webpack-start` |
| Config Wrapper | `export default (env) =>` | `Repack.defineWebpackConfig((env) =>` |
| Entry Point | `...Repack.getInitializationEntries()` | Simple `entry` (auto-handled) |
| Public Path | `Repack.getPublicPath()` | Removed (auto-handled) |
| Babel Loader | Missing or excluding node_modules | Explicit loader for all `.js/.ts` files |
| __dirname | Used in ES module | Use `context` instead |

## Next Steps

After everything is running:

1. Test loading remote components (Calculator, Notes, Info screens)
2. Verify ScriptManager caching works
3. Check chunk loading in logs
4. Test hot reload functionality

---

**Current Status:** All configuration files updated. Ready to test!

Run `npm run webpack-start` to begin testing.
