const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mundo desde la api');
})

app.listen(port, () => {
  console.log(`Listen on port: ${port}`);
})
