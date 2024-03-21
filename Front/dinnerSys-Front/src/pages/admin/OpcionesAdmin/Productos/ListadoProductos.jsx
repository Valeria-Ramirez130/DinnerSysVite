import React, { useState } from 'react';
import { Table, InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import './ListadoProductos.css';

export function ListadoProductos() {
  const [filtros, setFiltros] = useState({
    id: '',
    nombre: '',
    categoria: '',
    precio: ''
  });

  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Producto 1', descripcion: 'Descripción 1', categoria: 'Categoría 1', precio: '10' },
    { id: 2, nombre: 'Producto 2', descripcion: 'Descripción 2', categoria: 'Categoría 2', precio: '20' },
    { id: 3, nombre: 'Producto 3', descripcion: 'Descripción 3', categoria: 'Categoría 3', precio: '30' },
    { id: 4, nombre: 'Producto 4', descripcion: 'Descripción 4', categoria: 'Categoría 4', precio: '40' },
    { id: 5, nombre: 'Producto 5', descripcion: 'Descripción 5', categoria: 'Categoría 5', precio: '50' },
    // Agrega más productos según tus necesidades
  ]);

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarFormularioEdicion, setMostrarFormularioEdicion] = useState(false);

  const productosFiltrados = productos.filter(producto =>
    producto.id.toString().includes(filtros.id) &&
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
      const nuevosProductos = productos.map(p =>
        p.id === producto.id ? { ...p, eliminado: true } : p
      );
      setProductos(nuevosProductos.filter(p => !p.eliminado)); // Eliminar realmente el producto
      setProductoSeleccionado(null);
    }
  };

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  return (
    <div className="listado-productos-container">
      <div className="listado-productos-header">
        <h1>Listado de Productos</h1>
      </div>
      <Container>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Filtrar por ID..."
            value={filtros.id}
            onChange={(e) => setFiltros({ ...filtros, id: e.target.value })}
          />
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
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map(producto => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.precio}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => seleccionarProducto(producto)}
                    >
                      Actualizar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => eliminarProducto(producto)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}
