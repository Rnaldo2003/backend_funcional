const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3001

app.get('/', (req, res) => { 
    res.send('Hello, World!');
  });

app.get('/about', (req, res) => { 
    res.send('About Page');
  
});
const db=require('./models');
db.sequelize.sync()
 .then(() => {
  console.log('Base de datos sincronizada correctamente');
    
  })
  .catch(err => {
    console.error('Error al sincronizar base de datos:', err.message);
  });

  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });