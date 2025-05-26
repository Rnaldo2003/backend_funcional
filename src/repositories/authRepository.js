const db=require('../models');
const User = db.User;

const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: ['id', 
        'firstName', 
        'lastName', 
        'email', 
        'status', 
        'dob',
        'profile_picture']}
    );
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 
        'firstName', 
        'lastName', 
        'email', 
        'status', 
        'dob',
        'profile_picture']
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

const updateUser = async (id, userData) => {
  try {
    const user = await User.update(userData, {
      where: { id }
    });
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

const deleteUser = async (id) => {
  try {
    const user = await User.destroy({
      where: { id }
    });
    return user;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

const login = async (email) => {
  try {
    const user = await User.findOne({
      where: { email }
    });
    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

const cambiarFoto = async (data, id) => {
  try {
    const user = await User.update(data, {
      where: { id }
    });
    return user;
  } catch (error) {
    console.error('Error updating user photo:', error);
    throw error;
  }
}

const cambiarClave = async (data, id) => {
  try {
    const user = await User.update(data, {
      where: { id }
    });
    return user;
  } catch (error) {
    console.error('Error updating user password:', error);
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
  cambiarClave
}

