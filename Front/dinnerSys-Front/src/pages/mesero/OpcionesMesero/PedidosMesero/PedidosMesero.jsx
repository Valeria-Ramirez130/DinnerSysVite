import React, { useState, useEffect } from 'react';
import { Table, InputGroup, FormControl, Button, Container, Alert } from 'react-bootstrap';
import './PedidosMesero.css';
import { getProducts } from '../../../../API/Productos';
import { createOrder } from '../../../../API/Pedidos';
import { freeTable } from '../../../../API/Mesas'; // Importamos la función freeTable

function PedidosMesero({ mesa, pedido }) {
  console.log(pedido && pedido,mesa)

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
        const productosData = await getProducts();
        setProductosDisponibles(productosData);
      } catch (error) {
        setErrorMensaje('Error al obtener los productos.');
      }
    };
    fetchData();
  }, []);

  const agregarProducto = (producto) => {
    const productoConID = { ...producto, id: Date.now() };
    setProductosEnPedido([...productosEnPedido, productoConID]);
  };

  const eliminarProducto = (id) => {
    setProductosEnPedido(productosEnPedido.filter(producto => producto.id !== id));
  };

  const seleccionarProducto = (producto) => {
    agregarProducto(producto);
  };

  const crearPedido = async () => {
    productosEnPedido.map(p=>{console.log(p)})
    try {
      const newOrder = {
        MeseroId: 1,
        MesaId: mesa,
        lstProductos: productosEnPedido.map(producto => ({ ProductoId: producto.ProductoId, Cantidad: 1 }))
      };
      const isCreated = await createOrder(newOrder);
      if (isCreated) {
        console.log("Pedido creado correctamente");
        window.location.reload();
        setProductosEnPedido([]);
        // Liberar la mesa después de crear el pedido
        //await freeTable(mesa);  QUITAR
        //console.log("Mesa liberada"); QUITAR
      } else {
        setErrorMensaje('Error al crear el pedido. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMensaje('Ya existe un pedido activo para esta mesa. Por favor, selecciona otra mesa.');
      } else {
        setErrorMensaje('Error al crear el pedido. Por favor, intenta de nuevo.');
      }
    }
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
            className="listado-productos-button listado-productos-button-update btn-crear btn-modificar btn-generar"
            onClick={async () => {
              await freeTable(mesa,pedido[0].PedidoId); // Llama a la función freeTable para liberar la mesa
            }}
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