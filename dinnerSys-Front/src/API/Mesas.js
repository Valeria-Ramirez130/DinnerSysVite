import { BACK_URL } from "../utils/Constants";
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
export const freeTable = async (MesaId,PedidoId) => {
    try {
        const isFree = await axios.put(`${BACK_URL}/mesas/liberarMesa/${MesaId}/${PedidoId}`);
        return isFree.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
        return null;
    }
};
