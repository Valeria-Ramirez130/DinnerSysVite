import React, { useState } from 'react';
import { Table, InputGroup, FormControl, Button, Container, Alert } from 'react-bootstrap';
import './PedidosMesero.css'; // Archivo CSS para estilos

function PedidosMesero({ mesa }) {
  const [filtros, setFiltros] = useState({
    nombre: '',
    categoria: '',
    precio: ''
  });

  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Producto 1', descripcion: 'Descripción 1', categoria: 'Categoría 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', descripcion: 'Descripción 2', categoria: 'Categoría 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', descripcion: 'Descripción 3', categoria: 'Categoría 3', precio: 30 },
    { id: 4, nombre: 'Producto 4', descripcion: 'Descripción 4', categoria: 'Categoría 4', precio: 40 },
    { id: 5, nombre: 'Producto 5', descripcion: 'Descripción 5', categoria: 'Categoría 5', precio: 50 },
    // Agrega más productos según tus necesidades
  ]);

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) &&
    producto.categoria.toLowerCase().includes(filtros.categoria.toLowerCase()) &&
    producto.precio.toString().includes(filtros.precio)
  );

  const agregarProducto = () => {
    const nuevoProducto = {
      id: productos.length + 1,
      nombre: `Producto ${productos.length + 1}`,
      descripcion: `Descripción ${productos.length + 1}`,
      categoria: `Categoría ${productos.length + 1}`,
      precio: (productos.length + 1) * 10
    };
    setProductos([...productos, nuevoProducto]);
    setProductoSeleccionado(null);
  };

  const eliminarProducto = (producto) => {
    if (producto) {
      const nuevosProductos = productos.filter(p => p.id !== producto.id);
      setProductos(nuevosProductos);
      setProductoSeleccionado(null);
    }
  };

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  const crearPedido = () => {
    // Lógica para crear el pedido
    console.log("Pedido creado");
  };

  // Datos para la tabla de pedidos
  const [pedidos, setPedidos] = useState([
    { id: 1, nombre: 'Plato 1', descripcion: 'Descripción del Plato 1', categoria: 'Entrada', valor: '$10.99' },
    { id: 2, nombre: 'Plato 2', descripcion: 'Descripción del Plato 2', categoria: 'Plato Principal', valor: '$15.99' },
    { id: 3, nombre: 'Plato 3', descripcion: 'Descripción del Plato 3', categoria: 'Postre', valor: '$7.99' },
  ]);

  const [pedidoAModificar, setPedidoAModificar] = useState(null);
  const [errorMensaje, setErrorMensaje] = useState('');

  const handleQuitar = (id) => {
    if (pedidoAModificar === null) {
      setErrorMensaje('Por favor, selecciona un pedido para modificar antes de quitarlo.');
      return;
    }

    const updatedPedidos = pedidos.filter((pedido) => pedido.id !== id);
    setPedidos(updatedPedidos);
    setErrorMensaje('');
  };

  const handleModificar = (id) => {
    setPedidoAModificar(id);
    setErrorMensaje('');
  };

  const handleGenerarPedido = () => {
    // Lógica para generar un nuevo pedido
  };

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
            onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
          />
          <FormControl
            placeholder="Filtrar por categoría..."
            value={filtros.categoria}
            onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
          />
          <FormControl
            placeholder="Filtrar por precio..."
            value={filtros.precio}
            onChange={(e) => setFiltros({ ...filtros, precio: e.target.value })}
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
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.precio}</td>
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
              {pedidos.map((pedido, index) => (
                <tr key={index}>
                  <td>{pedido.nombre}</td>
                  <td>{pedido.descripcion}</td>
                  <td>{pedido.categoria}</td>
                  <td>{pedido.valor}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="listado-productos-button listado-productos-button-update btn-quitar"
                      onClick={() => handleQuitar(pedido.id)}
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
            variant="primary"
            className="btn btn-primary btn-sm btn-modificar"
            onClick={() => handleModificar(1)}
          >
            Modificar
          </Button>
          <Button
            variant="success"
            className="btn btn-success btn-sm btn-generar"
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