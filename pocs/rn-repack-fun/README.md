# Repack POC

## Components Flow

1. User navigates to Calculator screen
2. RemoteLoader.createLazyRemoteComponent('Calculator')
3. ScriptManager.loadScript('Calculator')
4. Resolver: 'Calculator' → 'http://localhost:3000/chunks/Calculator.bundle.js'
5. Native module fetches bundle (13.39 KB)
6. Script executed, Calculator component available globally
7. React renders Calculator component
8. Cached in AsyncStorage for next time

## Server

run
```
./run-server.sh
```

All Chunks
```
http://localhost:3000/chunks/
```

```
{
  "message": "Available chunks",
  "chunks": [
    {
      "name": "Calculator.bundle.js",
      "url": "http://localhost:3000/chunks/Calculator.bundle.js",
      "size": "13.99 KB"
    },
    {
      "name": "ContentInfoPage.bundle.js",
      "url": "http://localhost:3000/chunks/ContentInfoPage.bundle.js",
      "size": "11.47 KB"
    },
    {
      "name": "FooterContentPage.bundle.js",
      "url": "http://localhost:3000/chunks/FooterContentPage.bundle.js",
      "size": "7.69 KB"
    },
    {
      "name": "HeaderInfoPage.bundle.js",
      "url": "http://localhost:3000/chunks/HeaderInfoPage.bundle.js",
      "size": "6.23 KB"
    },
    {
      "name": "NoteTaking.bundle.js",
      "url": "http://localhost:3000/chunks/NoteTaking.bundle.js",
      "size": "15.31 KB"
    },
    {
      "name": "NoteTakingFooter.bundle.js",
      "url": "http://localhost:3000/chunks/NoteTakingFooter.bundle.js",
      "size": "14.73 KB"
    }
  ]
}
```

Get a spesific chunk
```
http://localhost:3000/chunks/Calculator.bundle.js
```
