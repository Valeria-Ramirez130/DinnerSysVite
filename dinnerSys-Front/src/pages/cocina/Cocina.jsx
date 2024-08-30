import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';
import { getOrdersOfDay } from '../../API/Pedidos'; // Asegúrate de que la ruta sea correcta
import './Cocina.css';

export function Cocina() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   getOrdersOfDay()
      .then((result) => {
        setOrders(result);
      })
      .catch((error) => { 
        setError('Error al cargar los pedidos');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
        <div className="contenedor-pedidos-cocina">
          {orders.map((order) => (
            <Table striped bordered hover responsive className="mt-4" key={order.PedidoId}>
              <thead>
                <tr>
                  <th>Mesa</th>
                  <th>Mesero</th>
                  <th>Productos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.Mesa}</td>
                  <td>{order.Mesero}</td>
                  <td>
                    <ul>
                      {order.lstProductos.map((product, index) => (
                        <li key={index}>
                          {product.Cantidad}x {product.Producto} - ${product.PrecioUnitario.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </Table>
          ))}
        </div>
      ) : (
        <Alert variant="info">No hay pedidos para mostrar.</Alert>
      )}
    </Container>
  );
}

export default Cocina;
