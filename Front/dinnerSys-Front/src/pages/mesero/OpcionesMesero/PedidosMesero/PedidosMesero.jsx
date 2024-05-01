import React, { useState, useEffect } from 'react';
import { Table, InputGroup, FormControl, Button, Container, Alert } from 'react-bootstrap';
import './PedidosMesero.css'; // Archivo CSS para estilos
import { getProducts } from '../../../../API/Productos'; // Importamos la función getProducts

function PedidosMesero({ mesa }) {
  const [filtros, setFiltros] = useState({
    nombre: '',
    categoria: '',
    precio: ''
  });

  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [productosEnPedido, setProductosEnPedido] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosData = await getProducts(); // Obtenemos los productos utilizando la función getProducts
        setProductosDisponibles(productosData);
      } catch (error) {
        setErrorMensaje('Error al obtener los productos.');
      }
    };
    fetchData();
  }, []);

  const agregarProducto = (producto) => {
    // Generamos un identificador único para el producto en el pedido
    const productoConID = { ...producto, id: Date.now() };
    setProductosEnPedido([...productosEnPedido, productoConID]);
  };

  const eliminarProducto = (id) => {
    setProductosEnPedido(productosEnPedido.filter(producto => producto.id !== id));
  };

  const seleccionarProducto = (producto) => {
    agregarProducto(producto);
  };

  const crearPedido = () => {
    // Lógica para crear el pedido
    console.log("Pedido creado");
  };

  const handleQuitar = (id) => {
    eliminarProducto(id);
  };

  const handleGenerarPedido = () => {
    // Lógica para generar el recibo del pedido
  };

  const handleFiltrar = (e, campo) => {
    setFiltros({ ...filtros, [campo]: e.target.value });
  };

  const productosFiltrados = productosDisponibles.filter(producto =>
    producto.Nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) &&
    producto.Categoria.toLowerCase().includes(filtros.categoria.toLowerCase()) &&
    producto.Precio.toString().includes(filtros.precio)
  );

  return (
    <div className="pedidos-mesero-container">
      <div className="listado-productos-header">
        <h1>Crear Pedido</h1>
      </div>
      <div className="listado-productos-header">
        <h2>Pedido Mesa: {mesa}</h2>
      </div>
      <Container>
        <InputGroup className="listado-productos-input">
          <FormControl
            placeholder="Filtrar por nombre..."
            value={filtros.nombre}
            onChange={(e) => handleFiltrar(e, 'nombre')}
          />
          <FormControl
            placeholder="Filtrar por categoría..."
            value={filtros.categoria}
            onChange={(e) => handleFiltrar(e, 'categoria')}
          />
          <FormControl
            placeholder="Filtrar por precio..."
            value={filtros.precio}
            onChange={(e) => handleFiltrar(e, 'precio')}
          />
        </InputGroup>

        <div className="listado-productos-scroll-container">
          <Table striped bordered hover className="listado-productos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Pedido</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map(producto => (
                <tr key={producto.ProductoId}>
                  <td>{producto.Nombre}</td>
                  <td>{producto.Descripcion}</td>
                  <td>{producto.Categoria}</td>
                  <td>{producto.Precio}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="listado-productos-button listado-productos-button-update"
                      onClick={() => seleccionarProducto(producto)}
                    >
                      Añadir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="btn-container-crearpedido">
          <Button
            variant="success"
            className="listado-productos-button listado-productos-button-update btn-crear"
            onClick={crearPedido}
          >
            Crear Pedido
          </Button>
        </div>
      </Container>
      <Container>
        <div className="listado-productos-scroll-container">
          <Table striped bordered hover className="listado-productos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Valor</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productosEnPedido.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.Nombre}</td>
                  <td>{producto.Descripcion}</td>
                  <td>{producto.Categoria}</td>
                  <td>{producto.Precio}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="listado-productos-button listado-productos-button-update btn-quitar"
                      onClick={() => handleQuitar(producto.id)}
                    >
                      Quitar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="btn-container">
          <Button
            variant="success"
            className="listado-productos-button listado-productos-button-update btn-crear btn-modificar btn-generar" // <-- Agregamos la clase btn-generar aquí
            onClick={handleGenerarPedido}
          >
            Generar Recibo
          </Button>
        </div>

        {errorMensaje && (
          <Alert variant="danger" className="text-center mt-3">
            {errorMensaje}
          </Alert>
        )}
      </Container>
    </div>
  );
}

export default PedidosMesero;
