const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 3001;

// Importa la base de datos y el modelo User
const db = require('./src/models');
const { User, Estudiante } = db;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

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

// Eliminar usuario por id
app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Usuario eliminado' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

// Obtener todos los estudiantes
app.get('/estudiantes', async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

// Crear un nuevo estudiante
app.post('/estudiantes', async (req, res) => {
  try {
    const estudiante = await Estudiante.create(req.body);
    res.status(201).json(estudiante);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear estudiante', details: error.message });
  }
});

// Eliminar estudiante por id
app.delete('/estudiantes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Estudiante.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Estudiante eliminado' });
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
});

// Actualizar estudiante por id
app.put('/estudiantes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Estudiante.update(req.body, { where: { id } });
    if (updated) {
      const estudiante = await Estudiante.findByPk(id);
      res.json(estudiante);
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar estudiante', details: error.message });
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