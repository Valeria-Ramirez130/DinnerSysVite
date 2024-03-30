import { BACK_URL } from "../Constants";
import axios from 'axios';

//Get all Orders
export const getOrders = async () => {
    try {
        const orders = await axios.get(`${BACK_URL}/pedidos/getPedidos`);
        /* Object Structure:  
            {
                PedidoId: x,
                Fecha: x,
                Mesa: x,
                Mesero: x,
                lstProductos: [
                    {
                        Producto: x,
                        PrecioUnitario: x,
                        Cantidad: x
                        PrecioTotal
                    }
                ]
            }
        */
        return orders.status === 200 ? orders.data : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

//Create new Order
export const createOrder = async (newOrder) => { 
    /* Object Structure:
        {
            MeseroId: x,
            MesaId: x,
            lstProductos: [
                {
                    ProductoId: x,
                    Cantidad: x
                }
            ]
        }
    */
    try {
        const isCreate = await axios.post(`${BACK_URL}/pedidos/createPedido`, newOrder);
        return isCreate.status === 200 ? true : false;
    } catch (error) {
        console.log(error);
        return null;
    }
};

//Update Order
export const updateOrder = async (id, upOrder) => { 
    /* Object Structure:
        {
            MeseroId: x,
            MesaId: x,
            lstProductos: [
                {
                    ProductoId: x,
                    Cantidad: x
                }
            ]
        }
    */
    try {
        const isUpdate = await axios.put(`${BACK_URL}/pedidos/updatePedido/${id}`, upOrder);
        return isUpdate.status === 200 ? true : false;
    } catch (error) {
        console.log(error);
        return null;
    }
};

//Delete order
export const deleteOrder = async (id) => { 
    try {
        const isDelete = await axios.delete(`${BACK_URL}/pedidos/deletePedido/${id}`);
        return isDelete.status === 200 ? true : false;
    } catch (error) {
        console.log(error);
        return null;
    }
};