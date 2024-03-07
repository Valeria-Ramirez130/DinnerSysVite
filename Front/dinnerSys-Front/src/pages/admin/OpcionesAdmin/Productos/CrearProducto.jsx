import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CrearProducto.css'

export function CrearProducto() {
  const formik = useFormik({
    initialValues: {
      codigoProducto: '',
      nombreProducto: '',
      categoria: '',
      precio: '',
    },
    validationSchema: Yup.object({
      codigoProducto: Yup.string().required('Digite el código del producto'),
      nombreProducto: Yup.string().required('Digite el nombre del producto'),
      categoria: Yup.string().required('Digite la categoría del producto'),
      precio: Yup.number().required('Digite el precio del producto'),
    }),
    onSubmit: (formValues) => {
      // Aquí puedes realizar la lógica de envío del formulario
      console.log('Formulario enviado:', formValues);
    },
  });

  return (
    <div className='contenedor-principal'>
      <div className="formulario-header">
        <h1 className="header-text">Crear Producto</h1>
      </div>
        <Form className='formulario-productos' onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCodigoProducto">
              <Form.Label>Código del Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite el código del producto"
                name="codigoProducto"
                value={formik.values.codigoProducto}
                onChange={formik.handleChange}
              />
              <div className="error-message">{formik.errors.codigoProducto}</div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridNombreProducto">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite el nombre del producto"
                name="nombreProducto"
                value={formik.values.nombreProducto}
                onChange={formik.handleChange}
              />
              <div className="error-message">{formik.errors.nombreProducto}</div>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCategoria">
              <Form.Label>Categoría del Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite la categoría del producto"
                name="categoria"
                value={formik.values.categoria}
                onChange={formik.handleChange}
              />
              <div className="error-message">{formik.errors.categoria}</div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPrecio">
              <Form.Label>Precio del Producto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite el precio del producto"
                name="precio"
                value={formik.values.precio}
                onChange={formik.handleChange}
              />
              <div className="error-message">{formik.errors.precio}</div>
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" className='button-submit'>
            Crear Producto
          </Button>
        </Form>
    </div>
  );
}