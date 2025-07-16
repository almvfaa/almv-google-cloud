
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const paadRoutes = require('./routes/paad');

// Middleware para parsear JSON
app.use(express.json());

// Sirve los archivos estáticos de la aplicación de React
app.use(express.static(path.join(__dirname, '..', 'frontend/dist')));

// Rutas de la API
app.use('/api/paad', paadRoutes);


// Maneja cualquier otra ruta y sirve el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
