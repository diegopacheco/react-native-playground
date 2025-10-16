# Testing Remote Chunk Loading

## Server Response Mapping

Your server provides these bundles:

| Bundle Name | Component Name | Size |
|------------|---------------|------|
| `Calculator.bundle.js` | `Calculator` | 13.39 KB |
| `NoteTaking.bundle.js` | `NoteTaking` | 14.41 KB |
| `NoteTakingFooter.bundle.js` | `NoteTakingFooter` | 13.83 KB |
| `HeaderInfoPage.bundle.js` | `HeaderInfoPage` | 5.62 KB |
| `ContentInfoPage.bundle.js` | `ContentInfoPage` | 10.95 KB |
| `FooterContentPage.bundle.js` | `FooterContentPage` | 7.17 KB |

## How It Works

### 1. Component Request Flow
```
Screen requests: Calculator
    ↓
RemoteLoader maps: Calculator → Calculator
    ↓
ScriptManager.loadScript('Calculator')
    ↓
Resolver adds extension: Calculator → Calculator.bundle.js
    ↓
Request URL: http://localhost:3000/chunks/Calculator.bundle.js
    ↓
Server returns bundle
    ↓
Native module executes script
    ↓
Component available as global.Calculator
```

### 2. Key Configuration

**index.js Resolver:**
```javascript
ScriptManager.shared.addResolver(async (scriptId, caller) => {
  const url = `http://localhost:3000/chunks/${scriptId}.bundle.js`;
  // scriptId = 'Calculator'
  // url = 'http://localhost:3000/chunks/Calculator.bundle.js'
  return { url, cache: false };
});
```

**RemoteLoader mapping:**
```typescript
const chunkNameMap = {
  'Calculator': 'Calculator',          // → Calculator.bundle.js
  'NoteTaking': 'NoteTaking',          // → NoteTaking.bundle.js
  'NoteTakingFooter': 'NoteTakingFooter', // → NoteTakingFooter.bundle.js
  // ... etc
};
```

## Testing Steps

### 1. Verify Server is Running
```bash
curl http://localhost:3000/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "chunks": [...],
  "totalChunks": 6,
  "baseUrl": "http://localhost:3000/chunks/"
}
```

### 2. Test Individual Bundle Download
```bash
curl -I http://localhost:3000/chunks/Calculator.bundle.js
```

**Expected:**
```
HTTP/1.1 200 OK
Content-Type: application/javascript
```

### 3. Check Bundle Content
```bash
curl http://localhost:3000/chunks/Calculator.bundle.js | head -20
```

**Expected:** JavaScript code with global variable assignment

### 4. Run the App

**Terminal 1: Remote Server**
```bash
cd remote-server
npm start
```

**Terminal 2: App Dev Server**
```bash
npm run webpack-start
```

**Terminal 3: iOS Simulator**
```bash
npm run ios
```

### 5. Watch the Logs

**Expected Console Output:**
```
[ScriptManager] Initialized with resolver and storage
[ScriptManager] Resolving script: Calculator
[ScriptManager] DEV mode - URL: http://localhost:3000/chunks/Calculator.bundle.js
[RemoteLoader] Loading Calculator...
[RemoteLoader] SUCCESS: Calculator loaded in 250ms
```

**Server Logs:**
```
[CHUNK REQUEST] Calculator.bundle.js | Size: 13.39 KB | Duration: 45ms | Status: 200
```

## Debugging

### If Components Don't Load

1. **Check Server Response**
   ```bash
   curl http://localhost:3000/chunks/Calculator.bundle.js
   ```
   Should return JavaScript code, not 404

2. **Check Bundle Exports**
   The bundle should export the component globally:
   ```javascript
   var Calculator = /* component code */;
   // or
   this.Calculator = /* component code */;
   // or
   globalThis.Calculator = /* component code */;
   ```

3. **Check Network Tab**
   - Open React Native debugger
   - Look for requests to `http://localhost:3000/chunks/*.bundle.js`
   - Verify 200 status codes

4. **Check Console Logs**
   ```
   [ScriptManager] Resolving script: <name>
   [RemoteLoader] Loading <name>...
   ```
   If you see these, the flow is working

### Common Issues

**Problem:** `Component Calculator not found after loading script`
**Solution:** Check that the webpack config exports component as global variable:
```javascript
output: {
  library: {
    type: 'var',
    name: 'Calculator',
    export: 'default',
  },
  globalObject: 'this',
}
```

**Problem:** 404 for bundle
**Solution:** 
- Rebuild remote server: `cd remote-server && npm run build`
- Check `remote-server/dist/` folder has `.bundle.js` files

**Problem:** Component loads but crashes
**Solution:** Check that React and React Native are properly externalized in webpack config

## Success Indicators

✅ Server responds with 200 for bundle requests  
✅ Console shows `[RemoteLoader] SUCCESS`  
✅ Components render correctly  
✅ No errors in console  
✅ Server logs show chunk requests  

## Performance Metrics

You can check load times:
```javascript
// In your app or console
RemoteLoader.printSummary();
```

**Expected Output:**
```
[RemoteLoader] === Remote Load Summary ===
[RemoteLoader]   Calculator: 250ms
[RemoteLoader]   NoteTaking: 180ms
[RemoteLoader]   HeaderInfoPage: 120ms
[RemoteLoader]   TOTAL: 550ms
[RemoteLoader] ========================
```

## Next Steps

Once working:
1. Test caching (navigate away and back)
2. Test offline behavior (stop server, check cache)
3. Monitor bundle sizes
4. Consider code splitting optimizations
