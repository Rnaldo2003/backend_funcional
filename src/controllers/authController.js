const authAdapter = require('../adapters/authAdapter');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await authAdapter.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await authAdapter.getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await authAdapter.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userData = req.body;
    const user = await authAdapter.updateUser(id, userData);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await authAdapter.deleteUser(id);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authAdapter.login(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        //aqui se puede agregar un token JWT
        //aqui vamos a crear la cookie
        res.status(200).json(user); 
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const cambiarFoto = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await authAdapter.cambiarFoto(data, id);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error changing photo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const cambiarclave = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await authAdapter.cambiarclave(data, id);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  cambiarFoto,
  cambiarclave
}