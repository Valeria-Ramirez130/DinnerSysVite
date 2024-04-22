import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createProduct } from '../../../../API/Productos';
import "./CrearProducto.css";

export function CrearProducto() {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
  });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(producto);
      console.log('Producto creado exitosamente');
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  return (
    <div className="contenedor-principal">
      <div className="formulario-header">
        <h1 className="header-text">Crear Producto</h1>
      </div>
      <Form className="formulario-productos" onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <div className="col">
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre de Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite los nombres"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción de Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite la descripción"
                name="descripcion"
                value={producto.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        </div>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio de Producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite el precio"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCategoria">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
          >
            <option>Seleccione una categoría</option>
            <option>Comida</option>
            <option>Bebida</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className='button-submit'>
          Crear Producto
        </Button>
      </Form>
    </div>
  );
}
