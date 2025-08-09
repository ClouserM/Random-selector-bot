const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Enlace RAW de tu Pastebin
const PASTEBIN_URL = 'https://pastebin.com/raw/AuPCg55Z';

app.get('/', (req, res) => {
  res.send('Servidor funcionando. Usa /random para obtener una palabra.');
});

app.get('/random', async (req, res) => {
  try {
    const response = await fetch(PASTEBIN_URL);
    const text = await response.text();
    const lines = text.trim().split('\n');
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    res.type('text/plain').send(randomLine);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error al obtener la palabra');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
