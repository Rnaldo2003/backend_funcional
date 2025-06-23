const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const PORT = process.env.PORT || 3001;

// Importa la base de datos y el modelo User
const db = require('./src/models');
const { User, Estudiante } = db;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

// Configuración de multer para guardar en /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Endpoint para subir imagen
app.post('/upload', upload.single('imagen'), (req, res) => {
  console.log('Petición recibida en /upload');
  if (!req.file) {
    console.log('No se subió ninguna imagen');
    return res.status(400).json({ error: 'No se subió ninguna imagen' });
  }
  const url = `http://localhost:3000/uploads/${req.file.filename}`;
  console.log('Imagen subida:', url);
  res.json({ url });
});

// Servir archivos estáticos de la carpeta uploads
app.use('/uploads', express.static('uploads'));

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

// Crear usuario
app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email, password, status, dob, profile_picture, rol } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      status,
      dob,
      profile_picture,
      rol // <-- asegúrate de guardar este campo
    });
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

// Ruta de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Acceso de emergencia: admin admin
  if (email === 'admin@admin.com' && password === 'admin') {
    return res.json({
      id: 0,
      nombre: 'Administrador',
      email: 'admin@admin.com',
      rol: 'admin'
    });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    // Comparar contraseñas (en texto plano, para ejemplo)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    res.json({
      id: user.id,
      nombre: user.firstName + ' ' + user.lastName,
      email: user.email,
      rol: user.rol || 'estudiante',
      profile_picture: user.profile_picture // <-- AGREGAR ESTA LÍNEA
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar usuario por id
app.put('/users/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, status, dob, profile_picture, rol } = req.body;
    const usuario = await User.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    usuario.firstName = firstName;
    usuario.lastName = lastName;
    usuario.email = email;
    usuario.status = status;
    usuario.dob = dob;
    usuario.profile_picture = profile_picture;
    usuario.rol = rol;
    await usuario.save();

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
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