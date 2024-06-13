import React, { useState, useEffect } from 'react';
import { Table, InputGroup, FormControl, Button, Container, Alert } from 'react-bootstrap';
import './PedidosMesero.css';
import { getProducts } from '../../../../API/Productos';
import { createOrder, getOrderXTableId, updateOrder } from '../../../../API/Pedidos';
import { freeTable } from '../../../../API/Mesas';
import { useAuth } from '../../../../auth/AuthProvider';

function PedidosMesero({ mesa, pedido }) {
  const { UserId } = useAuth();

  const [filtros, setFiltros] = useState({
    nombre: '',
    categoria: '',
    precio: ''
  });

  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [productosEnPedido, setProductosEnPedido] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState('');
  const [errorActualizarPedido, setErrorActualizarPedido] = useState(false); // Nuevo estado para controlar error de actualización

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

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem(`productosEnPedidoMesa${mesa}`)) || [];
    setProductosEnPedido(productosGuardados);
  }, [mesa]);

  useEffect(() => {
    if (pedido && pedido.length > 0 && pedido[0].productos) {
      const productosExistentes = pedido[0].productos.map(p => ({
        ...p,
        id: Date.now() + Math.random(),
        cantidad: p.cantidad || 1
      }));
      setProductosEnPedido(productosExistentes);
      localStorage.setItem(`productosEnPedidoMesa${mesa}`, JSON.stringify(productosExistentes));
    }
  }, [pedido, mesa]);

  const agregarProducto = (producto) => {
    const productoExistente = productosEnPedido.find(p => p.ProductoId === producto.ProductoId);
    if (productoExistente) {
      const nuevosProductosEnPedido = productosEnPedido.map(p =>
        p.ProductoId === producto.ProductoId ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      setProductosEnPedido(nuevosProductosEnPedido);
      localStorage.setItem(`productosEnPedidoMesa${mesa}`, JSON.stringify(nuevosProductosEnPedido));
    } else {
      const productoConID = { ...producto, id: Date.now(), cantidad: 1 };
      const nuevosProductosEnPedido = [...productosEnPedido, productoConID];
      setProductosEnPedido(nuevosProductosEnPedido);
      localStorage.setItem(`productosEnPedidoMesa${mesa}`, JSON.stringify(nuevosProductosEnPedido));
    }
  };

  const eliminarProducto = async (id) => {
    const nuevosProductosEnPedido = productosEnPedido.filter(producto => producto.id !== id);
    setProductosEnPedido(nuevosProductosEnPedido);
    localStorage.setItem(`productosEnPedidoMesa${mesa}`, JSON.stringify(nuevosProductosEnPedido));

    // Actualizar pedido en el servidor solo si ya se ha creado
    if (pedido && pedido.length > 0) {
      const pedidoActualizado = {
        MeseroId: UserId,
        MesaId: mesa,
        lstProductos: nuevosProductosEnPedido.map(producto => ({ ProductoId: producto.ProductoId, Cantidad: producto.cantidad }))
      };

      try {
        const isUpdate = await updateOrder(pedido[0].PedidoId, pedidoActualizado);
        if (!isUpdate) {
          setErrorActualizarPedido(true); // Mostrar error específico para la actualización
        } else {
          setErrorActualizarPedido(false); // Restablecer el estado de error de actualización
        }
      } catch (error) {
        setErrorActualizarPedido(true); // Mostrar error específico para la actualización
      }
    }
  };

  const actualizarCantidadProducto = (id, cantidad) => {
    const nuevosProductosEnPedido = productosEnPedido.map(producto =>
      producto.id === id ? { ...producto, cantidad: cantidad } : producto
    );
    setProductosEnPedido(nuevosProductosEnPedido);
    localStorage.setItem(`productosEnPedidoMesa${mesa}`, JSON.stringify(nuevosProductosEnPedido));
  };

  const crearPedido = async () => {
    try {
      const newOrder = {
        MeseroId: UserId,
        MesaId: mesa,
        lstProductos: productosEnPedido.map(producto => ({ ProductoId: producto.ProductoId, Cantidad: producto.cantidad }))
      };
      const isCreated = await createOrder(newOrder);
      if (isCreated) {
        console.log("Pedido creado correctamente");
        setErrorMensaje('');
        window.location.reload();
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

  const handleFiltrar = (e, campo) => {
    setFiltros({ ...filtros, [campo]: e.target.value });
  };

  const productosFiltrados = productosDisponibles.filter(producto =>
    producto.Nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) &&
    producto.Categoria.toLowerCase().includes(filtros.categoria.toLowerCase()) &&
    producto.Precio.toString().includes(filtros.precio)
  );

  const liberarMesa = async () => {
    await freeTable(mesa, pedido[0].PedidoId);
    localStorage.removeItem(`productosEnPedidoMesa${mesa}`);
    setProductosEnPedido([]);
    window.location.reload();
  };

  const calcularTotal = () => {
    return productosEnPedido.reduce((total, producto) => total + (producto.Precio * producto.cantidad), 0);
  };

  return (
    <div className="pedidos-mesero-container">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d8f15d16adde697e7cabe622692e4ca74b39a1ef
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
<<<<<<< HEAD
=======

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
                      onClick={() => agregarProducto(producto)}
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
                <th>Cantidad</th>
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
                    <FormControl
                      type="number"
                      value={producto.cantidad}
                      onChange={(e) => actualizarCantidadProducto(producto.id, parseInt(e.target.value))}
                      min="1"
                    />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-quitar"
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
        <div className="text-center mt-3">
          <Button
            variant="primary"
            className="btn-liberar"
            onClick={liberarMesa}
          >
            Liberar Mesa
          </Button>
        </div>
        <div className="total-container">
          <h3>Total: ${calcularTotal().toLocaleString('es-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2  // Máximo 2 decimales
          })}</h3>
        </div>
        {errorMensaje && <Alert variant="danger" className="mt-3 text-center">{errorMensaje}</Alert>}
      </Container>
=======
    <div className="listado-productos-header">
      <h1>Crear Pedido</h1>
>>>>>>> c2ea6f1941ba2f2288d983adf70db8c12dc1c1af
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
>>>>>>> d8f15d16adde697e7cabe622692e4ca74b39a1ef

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
                      onClick={() => agregarProducto(producto)}
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
                <th>Cantidad</th>
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
                    <FormControl
                      type="number"
                      value={producto.cantidad}
                      onChange={(e) => actualizarCantidadProducto(producto.id, parseInt(e.target.value))}
                      min="1"
                    />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-quitar"
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
        <div className="text-center mt-3">
          <Button
            variant="primary"
            className="btn-liberar"
            onClick={liberarMesa}
          >
            Liberar Mesa
          </Button>
        </div>
        <div className="total-container">
          <h3>Total: ${calcularTotal().toLocaleString('es-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2  // Máximo 2 decimales
          })}</h3>
        </div>
        {errorMensaje && <Alert variant="danger" className="mt-3 text-center">{errorMensaje}</Alert>}
      </Container>
    </div>
  );
}

export default PedidosMesero;