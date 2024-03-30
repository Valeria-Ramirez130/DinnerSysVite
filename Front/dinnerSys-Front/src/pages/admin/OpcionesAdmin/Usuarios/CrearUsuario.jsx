import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CrearUsuario.css';
import { createUser } from '../../../../API/Usuarios';

export function CrearUsuario() {
  const formik = useFormik({
    initialValues: {
      nombres: '',
      apellidos: '',
      cedula: '',
      rol: 'Seleccione rol de usuario',
    },
    validationSchema: Yup.object({
      nombres: Yup.string().required('Digite los nombres'),
      apellidos: Yup.string().required('Digite los apellidos'),
      password: Yup.string().required('Digite la contraseña'),
      rol: Yup.string().notOneOf(['Seleccione rol de usuario'], 'Seleccione un rol válido'),
    }),
    onSubmit: (formValues) => {
      // Aquí puedes realizar la lógica de envío del formulario
      console.log('Formulario enviado:', formValues);
      const newUser = {
        Cedula: formValues.password,
        Nombres: formValues.nombres,
        Apellidos: formValues.apellidos,
        TipoUsuario: formValues.rol
      }
      createUser(newUser)
        .then(res => {
          res ? alert("Usuario creado") : alert("Error al crear el usuario");
        })
    },
  });

  return (
    <div className='contenedor-principal'>
      <div className="formulario-header">
        <h1 className="header-text">Crear Usuario</h1>
      </div>
        <Form className='formulario-usuario' onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombres de usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite los nombres"
                name="nombres"
                value={formik.values.nombres}
                onChange={formik.handleChange}
              />
              <div className="error-message">{formik.errors.nombres}</div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastname">
              <Form.Label>Apellidos de usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite los apellidos"
                name="apellidos"
                value={formik.values.apellidos}
                onChange={formik.handleChange}
              />
              <div className="error-message">{formik.errors.apellidos}</div>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="formGridPassword">
              <Form.Label>Cedula</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite la cedula"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <div className="error-message">{formik.errors.password}</div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                name="rol"
                value={formik.values.rol}
                onChange={formik.handleChange}
              >
                <option>Seleccione rol de usuario</option>
                <option>Administrador</option>
                <option>Mesero</option>
              </Form.Select>
              <div className="error-message">{formik.errors.rol}</div>
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" className='button-submit'>
            Crear Usuario
          </Button>
        </Form>
    </div>
  );
}
