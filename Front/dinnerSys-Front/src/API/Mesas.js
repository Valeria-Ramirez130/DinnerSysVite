import { BACK_URL } from "../Constants";
import axios from 'axios';

//Get all Tables
export const getTables = async () => {
    try {
        const tables = await axios.get(`${BACK_URL}/mesas/getMesas`);
        return tables.status === 200 ? tables.data : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

//Create new Table
export const createTable = async () => {
    try {
        const isCreate = await axios.post(`${BACK_URL}/mesas/createMesa`);
        return isCreate.status === 200 ? true : false;
    } catch (error) {
        console.log(error);
        return null;
    }
};

//Free Table
export const freeTable = async (MesaId, PedidoId) => {
  try {
    const response = await axios.put(`${BACK_URL}/mesas/liberarMesa/${MesaId}/${PedidoId}`);
    return response.status === 201; // Cambiamos a 201 porque es lo que devuelve el servidor en caso de éxito
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 409) {
      throw new Error('Conflict: La mesa no puede ser liberada.');
    }
    throw new Error('Error al liberar la mesa.');
  }
};

//Delete Table
export const deleteTable = async (id) => {
    try {
        const isDelete = await axios.delete(`${BACK_URL}/mesas/deleteMesa/${id}`);
        return isDelete.status === 200 ? true : false;
    } catch (error) {
        console.log(error);
        return null;
    }
};