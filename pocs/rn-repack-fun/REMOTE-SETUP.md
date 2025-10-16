# React Native Remote Module Federation Setup

This app demonstrates true remote module federation using Repack and a Node.js Express server.

## Architecture

```
┌─────────────────────────┐
│  React Native App       │
│  (localhost:8081)       │
│                         │
│  - Tab Navigation       │
│  - Lazy loads remotes   │
│  - Federated imports    │
└────────┬────────────────┘
         │
         │ HTTP Requests
         │
         ▼
┌─────────────────────────┐
│  Remote Server          │
│  (localhost:3000)       │
│                         │
│  - Express + Node 24    │
│  - Serves chunks        │
│  - Logs requests        │
│  - CORS enabled         │
└─────────────────────────┘
```

## Remote Chunks

All components in `src/remotes/` have been moved to `remote-server/remotes/` and are served as remote bundles:

1. **Calculator.bundle.js** (13.99 KB) - Tab 1
2. **NoteTaking.bundle.js** (15.31 KB) - Tab 2
3. **NoteTakingFooter.bundle.js** (14.73 KB) - Tab 2
4. **HeaderInfoPage.bundle.js** (6.23 KB) - Tab 3
5. **ContentInfoPage.bundle.js** (11.47 KB) - Tab 3
6. **FooterContentPage.bundle.js** (7.69 KB) - Tab 3

## Running the App

### Step 1: Start Remote Server

```bash
./run-server.sh
```

This will:
- Install dependencies in `remote-server/`
- Build all remote chunks with webpack
- Start Express server on port 3000
- Display available chunks with sizes

Server logs will show:
```
[CHUNK REQUEST] Calculator.bundle.js | Size: 13.99 KB | Duration: 1ms | Status: 200
```

### Step 2: Start React Native Metro

In a separate terminal:

```bash
npm start
```

Metro will run on port 8081.

### Step 3: Run iOS App

In a third terminal:

```bash
npx react-native run-ios
```

Or use the existing script:

```bash
./run-ios.sh
```

## How It Works

### Remote Loading

Each screen uses Repack's `Federated.importModule()`:

```typescript
const Calculator = React.lazy(() =>
  Federated.importModule('Calculator', 'http://localhost:3000/chunks/Calculator.bundle.js')
);
```

When you navigate to a tab:
1. React Native makes HTTP request to remote server
2. Server logs the request with chunk name, size, and duration
3. Chunk is downloaded and executed
4. Component renders

### Server Logging

The Express server logs every chunk request:

```javascript
[CHUNK REQUEST] <filename> | Size: <KB> KB | Duration: <ms>ms | Status: <code>
```

### Health Check

Check server status:

```bash
curl http://localhost:3000/health
```

Returns JSON with all available chunks and their sizes.

## File Structure

```
rn-repack-fun/
├── remote-server/          # Remote chunk server
│   ├── remotes/           # Component source code
│   │   ├── calculator/
│   │   ├── noteTaking/
│   │   └── infoPage/
│   ├── dist/              # Built chunks (generated)
│   ├── server.js          # Express server with logging
│   ├── webpack.config.js  # Webpack build config
│   └── package.json
│
├── src/
│   ├── screens/           # Screen components
│   │   ├── CalculatorScreen.tsx   # Loads remote Calculator
│   │   ├── NotesScreen.tsx        # Loads remote NoteTaking + Footer
│   │   └── InfoScreen.tsx         # Loads 3 remote info components
│   └── utils/
│       └── RemoteLoader.ts        # Remote loading utility
│
├── run-server.sh          # Start remote server
├── run-ios.sh             # Build and run iOS app
└── webpack.config.mjs     # Main app Repack config
```

## Troubleshooting

### Remote server not responding

Check if server is running:
```bash
ps aux | grep "node server.js"
curl http://localhost:3000/health
```

### Chunks not loading

1. Verify server is running on port 3000
2. Check Metro logs for network errors
3. Verify chunks exist: `ls -la remote-server/dist/`

### Rebuild chunks

```bash
cd remote-server
npm run build
```

## Development

### Adding New Remote Component

1. Create component in `remote-server/remotes/`
2. Add entry to `remote-server/webpack.config.js`
3. Rebuild: `cd remote-server && npm run build`
4. Use in app with `Federated.importModule()`

### Viewing Logs

Server logs: `tail -f /tmp/remote-server.log`
Metro logs: `tail -f /tmp/metro-output.log`
