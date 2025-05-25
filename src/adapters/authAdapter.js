const authRepository = require('../auth.repository/authRepository');

const getAllUsers=async()=> {
    try {
        const users = await authRepository.getAllUsers();
        return (users)? users : [];

    } catch (error) {
        console.error('Error getting users: ', err.message);
    }
}
const getUserById=async(id)=> {
    try {
        const user = await authRepository.getUserById(id);
        return (user)? user : null;
        
    } catch (error) {
        console.error('Error getting user by id: ', err.message);
        throw err
    }
}

const createUser=async(userData)=> {
    try {
        const user = await authRepository.createUser(userData);
        return (user)? user : [];
        
    } catch (error) {
        console.error('Error creating user: ', err.message);
        throw err;
    }
}

const updateUser=async(id, userData)=> {
    try {
        const user = await authRepository.updateUser(id, userData);
        return (user)? user : [];
        
    } catch (error) {
        console.error('Error updating user: ', err.message);
        throw err;
    }
}

const deleteUser=async(id)=> {
    try {
        const user = await authRepository.deleteUser(id);
        return (user)? user : [];
        
    } catch (error) {
        console.error('Error deleting user: ', err.message);
        throw err;
    }
}
const login=async(email)=> {
    try {
        const user = await authRepository.login(email);
        return (user)? user : null;
        
    } catch (error) {
        console.error('Error logging in: ', err.message);
        throw err;
    }
}
const cambiarFoto=async(id,foto)=> {
    try {
        const user = await authRepository.cambiarFoto(Data, id);
        return (user)? user : null;
        
    } catch (error) {
        console.error('Error cambiando foto: ', err.message);
        throw err;
    }
}

const cambiarClave=async(data, id)=> {
    try {
        const user = await authRepository.cambiarClave(data, id);
        return (user)? user : null;
        
    } catch (error) {
        console.error('Error cambiando password: ', err.message);
        throw err;
    }
}

module.exports={
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    cambiarFoto,
    cambiarClave
 
}