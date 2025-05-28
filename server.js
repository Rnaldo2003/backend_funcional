const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Importa la base de datos y el modelo User
const db = require('./src/models');
const { User } = db;

// Middleware para parsear JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
})

app.get('/about', (req, res) => {
    res.send('About Us');
})

// Nueva ruta: obtener todos los usuarios desde la base de datos
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Ruta para crear un nuevo usuario
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear usuario', details: error.message });
  }
});

db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing database: ', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})