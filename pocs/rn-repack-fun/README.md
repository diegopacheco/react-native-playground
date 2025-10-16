# Server

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
