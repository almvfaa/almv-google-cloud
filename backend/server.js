const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Sirve los archivos estáticos de la aplicación de React
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Maneja cualquier otra ruta y sirve el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
