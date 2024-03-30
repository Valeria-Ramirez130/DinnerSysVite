import { BACK_URL } from '../Constants.js';
import axios from 'axios';

//Verify Loggin
export const VerifyLogginUser = async (user, clave) => { 
    try {
        const isVerify = await axios.post(`${BACK_URL}/usuarios/loggin`, {usuario: user, clave: clave});
        return isVerify.status === 200 ? isVerify.data : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

//Get all Users
export const getUsers = async () => {
    try {
        const users = await axios.get(`${BACK_URL}/usuarios/getUsuarios`);
        return users.status === 200 ? users.data : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

//Create new User
export const createUser = async (newUser) => { 
    try {
        const isCreate = await axios.post(`${BACK_URL}/usuarios/createUsuario`, newUser);
        return isCreate.status === 200 ? true : false;
    } catch (error) {
        console.log(error);
        return null;
    }
};

//Update User
export const updateUser = async (id, upUser) => { 
    try {
        const isUpdate = await axios.put(`${BACK_URL}/usuarios/updateUsuario/${id}`, upUser);
        return isUpdate.status === 200 ? true : false;
    } catch (error) {
        console.log(error);
        return null;
    }
};

//Delete User
export const deleteUser = async (id) => { 
    try {
        const isDelete = await axios.delete(`${BACK_URL}/usuarios/deleteUsuario/${id}`);
        return isDelete.status === 200 ? true : false;
    } catch (error) {
        console.log(error);
        return null;
    }
};