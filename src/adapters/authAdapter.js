const authRepository = require('../repositories/authRepository');

const getAllUsers = async () => {
  try {
    const users = await authRepository.getAllUsers();
    return (users)? users : [];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

const getUserById = async (id) => {
  try {
    const user = await authRepository.getUserById(id);
    return (user)? user : null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

const createUser = async (userData) => {
  try {
    const user = await authRepository.createUser(userData);
    return (user)? user : [];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

const updateUser = async (id, userData) => {
  try {
    const user = await authRepository.updateUser(id, userData);
    return (user)? user : [];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

const deleteUser = async (id) => {
  try {
    const user = await authRepository.deleteUser(id);
    return (user)? user : [];
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

const login = async (email) => {
  try {
    //
    const user = await authRepository.login(email);
    return (user)? user : [];
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

const cambiarFoto = async (data, id) => {
  try {
    //subir el archivo a cloudinary
    //guardar la url en la base de datos
    const user = await authRepository.cambiarFoto(data, id);
    return (user)? user : [];
  } catch (error) {
    console.error('Error changing photo:', error);
    throw error;
  }
}

const cambiarclave = async (data, id) => {
  try {
    //verificar la contraseña actual
    //hacer el bcrypt de la nueva contraseña
    const user = await authRepository.cambiarclave(data, id);
    return (user)? user : [];
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
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