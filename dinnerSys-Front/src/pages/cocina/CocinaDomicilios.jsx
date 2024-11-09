// import React, { useEffect, useState } from 'react';
// import { Table, Container, Spinner, Alert, Button } from 'react-bootstrap';
// import axios from 'axios';
// import './Cocina.css';

// const BACK_URL = 'http://localhost:3003'; // Ensure this URL is correct for your environment

// const CocinaDomicilios = () => {
//   const [pedidos, setPedidos] = useState([]);
//   const [domicilios, setDomicilios] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [pedidosRes, domiciliosRes] = await Promise.all([
//           axios.get(`${BACK_URL}/pedidos/getPedidosDia`),
//           axios.get(`${BACK_URL}/pedidos/getPedidosChatbotDia`)
//         ]);
//         setPedidos(pedidosRes.data || []);
//         setDomicilios(domiciliosRes.data || []);
//       } catch (error) {
//         console.error('Error al cargar los datos:', error);
//         setError('Error al cargar los pedidos y domicilios');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handlePedidoListo = async (pedidoId) => {
//     try {
//       await axios.put(`${BACK_URL}/pedidos/updatePedido/${pedidoId}`, { Finalizado: true });
//       setPedidos(pedidos.map(pedido => 
//         pedido.PedidoId === pedidoId ? { ...pedido, Finalizado: true } : pedido
//       ));
//     } catch (error) {
//       console.error('Error al actualizar el pedido:', error);
//       setError('Error al marcar el pedido como listo');
//     }
//   };

//   const handleDomicilioStatusChange = async (domicilioId, newStatus) => {
//     try {
//       await axios.put(`${BACK_URL}/pedidos/updatePedidoChatbot/${domicilioId}`, { Estado: newStatus });
//       setDomicilios(domicilios.map(domicilio => 
//         domicilio.PedidoChatbotId === domicilioId ? { ...domicilio, Estado: newStatus } : domicilio
//       ));
//     } catch (error) {
//       console.error('Error al actualizar el domicilio:', error);
//       setError('Error al actualizar el estado del domicilio');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

//   return (
//     <Container className="contenedor-principal-cocina">
//       <div className="header-cocina">
//         <h1>Pedidos y Domicilios del Día</h1>
//       </div>

//       <h2 className="mt-4 mb-3">Pedidos del Día</h2>
//       {Array.isArray(pedidos) && pedidos.length > 0 ? (
//         <div className="contenedor-pedidos-cocina">
//           {pedidos.map((pedido) => (
//             <Table striped bordered hover responsive className="mt-4" key={pedido.PedidoId}>
//               <thead>
//                 <tr>
//                   <th className='titulos-columnas'>Mesa</th>
//                   <th className='titulos-columnas'>Mesero</th>
//                   <th className='titulos-columnas'>Productos</th>
//                   <th className='titulos-columnas'>Estado Pedido</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className='contenido-pedido'>{pedido.Mesa}</td>
//                   <td className='contenido-pedido'>{pedido.Mesero}</td>
//                   <td className=''>
//                     <ul>
//                       {Array.isArray(pedido.lstProductos) && pedido.lstProductos.map((producto, index) => (
//                         <li key={index} className='contenido-pedido-productos'>
//                           {producto.Cantidad}x {producto.Producto}
//                         </li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td>
//                     {pedido.Finalizado ? (
//                       <span className="text-success">Listo</span>
//                     ) : (
//                       <Button 
//                         variant="success" 
//                         className="btn-lista"
//                         onClick={() => handlePedidoListo(pedido.PedidoId)}
//                       >
//                         Listo
//                       </Button>
//                     )}
//                   </td>
//                 </tr>
//               </tbody>
//             </Table>
//           ))}
//         </div>
//       ) : (
//         <Alert variant="info">No hay pedidos para mostrar.</Alert>
//       )}

//       <h2 className="mt-5 mb-3">Domicilios del Día</h2>
//       {Array.isArray(domicilios) && domicilios.length > 0 ? (
//         <div className="contenedor-pedidos-cocina">
//           {domicilios.map((domicilio) => (
//             <Table striped bordered hover responsive className="mt-4" key={domicilio.PedidoChatbotId}>
//               <thead>
//                 <tr>
//                   <th className='titulos-columnas'>Cliente</th>
//                   <th className='titulos-columnas'>Contacto</th>
//                   <th className='titulos-columnas'>Dirección</th>
//                   <th className='titulos-columnas'>Productos</th>
//                   <th className='titulos-columnas'>Método de Pago</th>
//                   <th className='titulos-columnas'>Estado</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className='contenido-pedido'>{domicilio.ClienteNombre}</td>
//                   <td className='contenido-pedido'>{domicilio.ClienteContacto}</td>
//                   <td className='contenido-pedido'>{domicilio.Direccion}</td>
//                   <td className=''>
//                     <ul>
//                       {Array.isArray(domicilio.lstProductos) && domicilio.lstProductos.map((producto, index) => (
//                         <li key={index} className='contenido-pedido-productos'>
//                           {producto.Cantidad}x {producto.Producto}
//                         </li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td className='contenido-pedido'>{domicilio.MetodoPago}</td>
//                   <td>
//                     <select
//                       value={domicilio.Estado}
//                       onChange={(e) => handleDomicilioStatusChange(domicilio.PedidoChatbotId, e.target.value)}
//                       className="form-select"
//                     >
//                       <option value="Pendiente">Pendiente</option>
//                       <option value="En preparación">En preparación</option>
//                       <option value="En camino">En camino</option>
//                       <option value="Entregado">Entregado</option>
//                     </select>
//                   </td>
//                 </tr>
//               </tbody>
//             </Table>
//           ))}
//         </div>
//       ) : (
//         <Alert variant="info">No hay domicilios para mostrar.</Alert>
//       )}
//     </Container>
//   );
// };

// export default CocinaDomicilios;