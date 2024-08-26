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

//Get allá orders of the day
export const getOrdersOfDay = async () => { 
    try {
        const lstPedidosDia = await axios.get(`${BACK_URL}/pedidos/getPedidosDia`);
        return lstPedidosDia.status === 200 ? lstPedidosDia.data : null;
    } catch (error) {
        console.log(error);
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

export const getOrderXTableId = async (MesaId) =>{
    try{
        const pedido = await axios.get(`${BACK_URL}/pedidos/getPedidoXMesaId/${MesaId}`);
        return pedido.status === 200 ? pedido.data : null;
    } catch (error){
        console.log(error);
        return null;
    }
};

//Update Order
export const updateOrder = async (pedidoId, data) => {
    console.log("\n\nFuncion updateOrder():");
    try {
        const { EstadoFinalizado } = data;
        if (pedidoId && EstadoFinalizado !== undefined) {
            const isUpdate = await pool.query('UPDATE Pedidos SET Finalizado = ? WHERE PedidoId = ?', [EstadoFinalizado, pedidoId]);
            if (isUpdate.affectedRows === 1) {
                console.log("Pedido actualizado correctamente");
                return { success: true };
            } else {
                console.log("No se pudo actualizar el pedido");
                return { success: false };
            }
        } else {
            return { success: false, message: 'Datos incompletos' };
        }
    } catch (error) {
        console.error('Error en la actualización del pedido:', error);
        return { success: false, message: 'Error del servidor' };
    }
}
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