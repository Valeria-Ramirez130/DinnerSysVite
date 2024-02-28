import { Router } from 'express';
const routerPedidos = Router();

import { createPedido, getPedidos, getPedidoXMesaId } from '../controller/Pedidos.js';

//PETICIONES GET 
routerPedidos.get('/getPedidos', getPedidos); //Traer todos los pedidos
routerPedidos.get('/getPedidosXMesaId/:MesaId', getPedidoXMesaId); //Traer todos los pedidos que se han echo en una mesa
//PETICIONES POST
routerPedidos.post('/createPedido', createPedido); //Para crear un pedido

export default routerPedidos;