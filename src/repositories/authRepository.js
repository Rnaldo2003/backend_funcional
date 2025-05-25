const db=require('../models');
const Users=db.Users;

const getAllUsers=async()=>{
    try{
        const users=await Users.findAll(
            {
                attributes: ['id', 'firstName', 'lastName', 'email','status', 'dob', 'profile_picture']
            }
        );        
        return users;

    }catch(error){
        console.log('error in getAllUsers',err.message);
        throw err
    }

}

const getUserById = async (id) => {
  try {
    const user = await Users.findByPk(id, {attributes: ['id', 'firstName', 'lastName', 'email','status', 'dob', 'profile_picture']
    });
    return user;
  } catch (error) {
    console.log('Error al obtener el usuario:', err.message);
     throw err
  }
};

const createUser=async(userData)=>{
    try{
        const user=await Users.create(userData);
        return user;
    }catch(error){
        console.log('error al crear el usuario', err.message);
        throw error;
    }
}

const updateUser=async(id, userData)=>{
    try{
        const user=await Users.updateUser(userData, {where: {id}});
        return user;
        
        
    }catch(error){
        console.log('error al actualizar el usuario', err.message);
        throw error;
       
    }
}

const deleteUser = async (id) => {
  try {
    const user = await Users.destroy({where: { id }});
      return user
    }catch (error) { 
        console.log('Error al eliminar el usuario:', err.message);
        throw err;

    }
}


const login=async(email)=>{
    try{ const  user=await Users.findOne({where: {email}});
        return user

    } catch(error){
        console.log('error al iniciar sesión', err.message);
        throw err;
    }
}
const cambiarfoto=async(data, id)=>{
    try{
        const user=await Users.update({data,}, {where: {id}});
        return user;
    }catch(error){
        console.log('error al cambiar la foto', err.message);
        throw err;
    }
}
const cambiarclave=async(data, id)=>{
    try{
        const user=await Users.update({data,}, {where: {id}});
        return user;
    }catch(error){
        console.err('error al cambiar la clave', err.message);
        throw err
    }
}

module.exports={getAllUsers, getUserById, createUser, updateUser, deleteUser, login, cambiarfoto, cambiarclave}



