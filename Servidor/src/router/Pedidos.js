import { Router } from 'express';
const routerPedidos = Router();

import { agregarNuevosProductosAlPedido, createPedido, deletePedido, getPedidos, getPedidoXMesaId, getTotalPedido, updatePedido } from '../controller/Pedidos.js';

//PETICIONES GET 
routerPedidos.get('/getPedidos', getPedidos); //Traer todos los pedidos con el precio, el mesero, la hora, y los productos
routerPedidos.get('/getPedidoXMesaId/:MesaId', getPedidoXMesaId); //Traer todos los pedidos que se han echo en una mesa
routerPedidos.get('/getTotalPedido/:pedidoId', getTotalPedido); //Trae el precio, el mesero, la hora, y los productos de del pedido
//PETICIONES POST
routerPedidos.post('/createPedido', createPedido); //Para crear un pedido
routerPedidos.post('/agregarAlPedido/:pedidoId', agregarNuevosProductosAlPedido); //Para agregar un producto a un pedido
//PETICIONES PUT
routerPedidos.put('/updatePedido/:PedidoId', updatePedido); //Para actualizar un pedido
//PETICIONES DELETE
routerPedidos.delete('/deletePedido/:pedidoId', deletePedido); //Para eliminar un pedido

export default routerPedidos;
