const db=require('./models');
const Users=db.Users;

const getAllUsers=async()=>{
    try{
        const users=await Users.findAll();
        {
             ['id', 'FirstName', 'email','status', 'dod', 'profile_picture' ]
        }
        return users;
    }catch(error){
        console.error(error);
        return [];
    }

}

const getUserById = async (id) => {
  try {
    const user = await Users.findByPk(id); // Corrige aquí
    return user;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return null;  // Devuelve null en caso de error
  }
};

const createUser=async(userObj)=>{
    try{
        const newUser=await Users.create(userData);
        return user;
    }catch(error){
        console.log('error al crear el usuario', error.message);
        throw error;
    }
}

const updateUser=async(id, userObj)=>{
    try{
        const user=await Users.updateUser(userData, {where: {id}});
        return user;
        
        
    }catch(error){
        console.error('error al actualizar el usuario', error.message);
        throw error;
       
    }
}

const deleteUser = async (id) => {
  try {
    const user = await Users.destroy({
      where: { id }
    });
    
    if (user === 0) {
      // Si no se eliminó ningún usuario, esto puede significar que no se encontró el usuario con el ID proporcionado
      throw new Error('Usuario no encontrado');
    }

    return user;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error.message);
    throw error;
  }
};


const login=async(email)=>{
    try{ const  user=await Users.findOne({where: {email}});
        return user;}
        catch(error){
        console.error('error al iniciar sesión', error.message);
        throw error;
    }
}
const cambiarFoto=async(id, id)=>{
    try{
        const user=await Users.update({data,}, {where: {id}});
        return user;
    }catch(error){
        console.error('error al cambiar la foto', error.message);
        throw error;
    }
}
const cambiarClave=async(data, id)=>{
    try{
        const user=await Users.update({data,}, {where: {id}});
        return user;
    }catch(error){
        console.error('error al cambiar la clave', error.message);
        throw error;
    }
}
module.exports={getAllUsers, getUserById, createUser, updateUser, deleteUser, login, cambiarFoto, cambiarClave};
