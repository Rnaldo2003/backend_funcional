const { cambiarFoto, cambiarClave } = require('../repositories/authRepository');
const authController = require('./controllers/authAdapter');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
    const users = await authController.getAllUsers();
    res.status(200).json(users);
    } catch (error) {
    console.log('Error fetching users:', error.message);
    res.status(500).json({ message: 'Error en el getUsers' });
    }
}
const createUser = async (req, res, next) => {
    try {
        const userData=req.body
        const user=await authAdapter.getUserById(id);
        res.status(200).json(user);

    }
    catch(error){
        console.log('Error al crear el usuario:', error.message);
        res.status(500).json({ message: 'Error en el createUser' });
    }

}
const deleteUser = async (req, res, next) => {
    try {
        const id=req.params.id
        const user=await authAdapter.deleteUser(id);
        res.status(200).json(user);
    }catch  {
        console.log('Error al borrar el usuario:', error.message);
        res.status(500).json({ message: 'Error en el deleteUser' });
    }
}
const login = async (req, res, next) => {
    try {
        const email=req.body.email
        const user=await authAdapter.login(email);
        if(!user){
            return res.status(401).json({message: 'Usuario no encontrado'});
        }
        const match=await bcrypt.compare(req.body.password, user.password);
        if(!match){
            return res.status(401).json({message: 'Contraseña incorrecta'});
        }
        res.status(200).json({user});
        
    } catch (error) {
        console.log('Error al iniciar sesión:', error.message);
        res.status(500).json({ message: 'Error en el login' });
    
    }
}
const cambiarFoto=async(req, res, next) => {
    try {
        const id=req.params.id
        const foto=req.body
        const user =await authAdapter.cambiarFoto(data ,  id);
        res.status(200).json({message: 'Foto actualizada correctamente'});
    } catch (error) {
        console.log('Error al cambiar la foto:', error.message);
        res.status(500).json({ message: 'Error en el cambiarFoto' });
    }
}

const cambiarClave=async(req, res, next) => {
    try {
        const id=req.params.id
        const password=req.body
        const user = await authAdapter.cambiarClave(data, id);
        res.status(200).json(user);
    } catch (error) {
        console.log('Error al cambiar la clave:', error.message);
        res.status(500).json({ message: 'Error en el cambiarClave' });
    }
}
