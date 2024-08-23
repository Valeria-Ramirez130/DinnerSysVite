import { Router } from 'express';
const routerPedidos = Router();

import { agregarNuevosProductosAlPedido, createPedido, deletePedido, getPedidos, getPedidoActivoXMesaId, getTotalPedido, updatePedido, getPedidosDelDia } from '../controller/Pedidos.js';

//PETICIONES GET 
routerPedidos.get('/getPedidos', getPedidos); //Traer todos los pedidos con el precio, el mesero, la hora, y los productos
routerPedidos.get('/getPedidoXMesaId/:MesaId', getPedidoActivoXMesaId); //Traer el pedido activo que se hizo en esa mesa
routerPedidos.get('/getPedidosDia', getPedidosDelDia); //Trae los pedidos del dia
//PETICIONES POST
routerPedidos.post('/createPedido', createPedido); //Para crear un pedido
//PETICIONES PUT
routerPedidos.put('/updatePedido/:PedidoId', updatePedido); //Para actualizar un pedido
//PETICIONES DELETE
routerPedidos.delete('/deletePedido/:pedidoId', deletePedido); //Para eliminar un pedido

export default routerPedidos;
