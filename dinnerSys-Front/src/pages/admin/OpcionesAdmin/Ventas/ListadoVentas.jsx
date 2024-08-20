import React, { useState, useEffect } from 'react';
import { Table, Container, Alert } from 'react-bootstrap';
import './ListadoVentas.css';
import { getOrders } from '../../../../API/Pedidos';

export function ListadoVentas() {
  const [pedidos, setPedidos] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState('');

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const pedidosData = await getOrders();
        if (pedidosData) {
          const pedidosConPrecioTotal = pedidosData.map(pedido => ({
            ...pedido,
            PrecioTotal: pedido.lstProductos.reduce((total, producto) => total + producto.PrecioTotal, 0)
          }));
          setPedidos(pedidosConPrecioTotal);
        } else {
          setErrorMensaje('Error al obtener los pedidos.');
        }
      } catch (error) {
        setErrorMensaje('Error al obtener los pedidos.');
      }
    };
    fetchPedidos();
  }, []);

  return (
    <div className="listado-ventas-container"> {/* Modificado a div para incluir clase */}
      <div className="listado-ventas-header"> {/* Modificado a div para incluir clase */}
        <h1>Listado de Ventas</h1>
      </div>
      <Container>
        {errorMensaje && (
          <Alert variant="danger" className="text-center mt-3">
            {errorMensaje}
          </Alert>
        )}
        <Table striped bordered hover className="listado-ventas-table">
          <thead>
            <tr>
              <th>Número de Mesa</th>
              <th>Nombre del Mesero</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <React.Fragment key={pedido.PedidoId}>
                {pedido.lstProductos.map((producto, index) => (
                  <tr key={`${pedido.PedidoId}-${index}`}>
                    {index === 0 && (
                      <>
                        <td rowSpan={pedido.lstProductos.length}>{pedido.Mesa}</td>
                        <td rowSpan={pedido.lstProductos.length}>{pedido.Mesero}</td>
                      </>
                    )}
                    <td>{producto.Producto}</td>
                    <td>{producto.Cantidad}</td>
                    {index === 0 && <td rowSpan={pedido.lstProductos.length}>{pedido.PrecioTotal}</td>}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default ListadoVentas;
