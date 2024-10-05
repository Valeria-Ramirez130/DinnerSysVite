import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createProduct } from "../../../../API/Productos";
import { getCategorias } from "../../../../API/Categorias";
import "./CrearProducto.css";
import { ListadoProductos } from "./ListadoProductos";
import { alertaGeneral } from '../../../../utils/alertasGlobales'; // Asegúrate de importar la función correctamente

export function CrearProducto() {
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data || []);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    cargarCategorias();
  }, []);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(producto);

    createProduct({
      Nombre: producto.nombre,
      Descripcion: producto.descripcion,
      Categoria: producto.categoria,
      Precio: producto.precio,
    })
      .then((res) => {
        alertaGeneral("Producto creado correctamente");
        console.log("Producto creado");
        setIsProductCreated(!isProductCreated);

        setProducto({
          nombre: "",
          descripcion: "",
          precio: "",
          categoria: "",
        });
      })

      .catch(() => {
        alertaGeneral("Error al crear el producto", true);
        console.log("Error al crear el producto");
      });
  };

  return (
    <>
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
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.CategoriaId}
                  value={categoria.NombreCategoria}
                >
                  {categoria.NombreCategoria}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" className="button-submit">
            Crear Producto
          </Button>
        </Form>
      </div>
      <div>
        <ListadoProductos isProductCreated={isProductCreated} />
      </div>
    </>
  );
}
