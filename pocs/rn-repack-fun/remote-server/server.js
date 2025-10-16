const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(compression());

app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.includes('.bundle.js') || req.path.includes('.chunk.js')) {
      const filePath = path.join(__dirname, 'dist', path.basename(req.path));
      let size = 0;

      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        size = stats.size;
        const sizeKB = (size / 1024).toFixed(2);

        console.log(`[CHUNK REQUEST] ${path.basename(req.path)} | Size: ${sizeKB} KB | Duration: ${duration}ms | Status: ${res.statusCode}`);
      }
    }
  });

  next();
});

app.use('/chunks', express.static(path.join(__dirname, 'dist')));

app.get('/chunks', (req, res) => {
  const distPath = path.join(__dirname, 'dist');
  const files = fs.readdirSync(distPath).filter(f => f.endsWith('.bundle.js'));
  res.json({
    message: 'Available chunks',
    chunks: files.map(f => {
      const stats = fs.statSync(path.join(distPath, f));
      return {
        name: f,
        url: `http://localhost:${PORT}/chunks/${f}`,
        size: `${(stats.size / 1024).toFixed(2)} KB`
      };
    })
  });
});

app.get('/chunks/:chunk', (req, res) => {
  const chunkName = req.params.chunk;
  const filePath = path.join(__dirname, 'dist', chunkName);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    console.log(`[CHUNK NOT FOUND] ${chunkName}`);
    res.status(404).send('Chunk not found');
  }
});

app.get('/health', (req, res) => {
  const chunks = fs.readdirSync(path.join(__dirname, 'dist'))
    .filter(f => f.endsWith('.bundle.js'))
    .map(f => {
      const stats = fs.statSync(path.join(__dirname, 'dist', f));
      return {
        name: f,
        size: `${(stats.size / 1024).toFixed(2)} KB`,
        sizeBytes: stats.size
      };
    });

  res.json({
    status: 'ok',
    chunks: chunks,
    totalChunks: chunks.length,
    baseUrl: `http://localhost:${PORT}/chunks/`
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Remote Chunk Server running on http://localhost:${PORT}`);
  console.log(`Chunks available at http://localhost:${PORT}/chunks/`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log('');
  console.log('Available chunks:');

  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath).filter(f => f.endsWith('.bundle.js'));
    files.forEach(file => {
      const stats = fs.statSync(path.join(distPath, file));
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`  - ${file} (${sizeKB} KB)`);
    });
  } else {
    console.log('  No chunks built yet. Run "npm run build" first.');
  }
});
