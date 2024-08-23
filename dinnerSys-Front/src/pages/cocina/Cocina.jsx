import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';
import { getOrders } from '../../API/Pedidos'; // Asegúrate de que la ruta sea correcta
import './Cocina.css';

export function Cocina() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getOrders();
        if (result) {
          setOrders(result);
        } else {
          setError('No se pudieron cargar los pedidos');
        }
      } catch (error) {
        setError('Error al cargar los pedidos');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container className="contenedor-principal-cocina">
      <div className="header-cocina">
        <h1>Pedidos del Día</h1>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : orders.length > 0 ? (
        <div className='contenedor-pedidos-cocina'>
          <div className='tabla-cocina'>
        <Table striped bordered hover responsive className="mt-4" >
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Fecha</th>
              <th>Mesa</th>
              <th>Mesero</th>
              <th>Productos</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.PedidoId}>
                <td>{order.PedidoId}</td>
                <td>{new Date(order.Fecha).toLocaleString()}</td>
                <td>{order.Mesa}</td>
                <td>{order.Mesero}</td>
                <td>
                  <ul>
                    {order.lstProductos.map((product, index) => (
                      <li key={index}>
                        {product.Cantidad}x {product.Producto} - ${product.PrecioUnitario}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.PrecioTotalPedido.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
        </div>
      ) : (
        <Alert variant="info">No hay pedidos para mostrar.</Alert>
      )}
    </Container>
  );
}

export default Cocina;
