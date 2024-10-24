import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CrearUsuario.css';
import { createUser } from '../../../../API/Usuarios'; // Se asume que esta función hace la solicitud POST al servidor
import { ListadoUsuarios } from './ListadoUsuarios';
import { alertaGeneral } from '../../../../utils/alertasGlobales';

export function CrearUsuario() {

  const [isUserCreated, setIsUserCreated] = useState(false);

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
      cedula: Yup.string().required('Digite la cédula'),
      rol: Yup.string().notOneOf(['Seleccione rol de usuario'], 'Seleccione un rol válido'),
    }),
    onSubmit: async (formValues) => {

      const newUser = {
        Nombres: formValues.nombres,
        Apellidos: formValues.apellidos,
        Cedula: formValues.cedula,
        TipoUsuario: formValues.rol
      };
      //Create Usuario
      createUser(newUser)
        .then((res) => {
          console.log(res);
          if (res === true) {
            setIsUserCreated(!isUserCreated);
            alertaGeneral('Usuario creado correctamente');
          }else{
            alertaGeneral(res.Error, true);
          }
        })
        .catch((error) => {
          console.error("Error al llamar a createUser:", error);
          alert(error);
        })
    }
  });

  return (
    <>
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
            <Form.Group className="mb-3" controlId="formGridCedula">
              <Form.Label>Cédula</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite la cédula"
                name="cedula"
                value={formik.values.cedula}
                onChange={formik.handleChange}
              />
              <div className="error-message">{formik.errors.cedula}</div>
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
                <option>Cocina</option> {/* Nueva opción agregada */}
              </Form.Select>
              <div className="error-message">{formik.errors.rol}</div>
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" className='button-submit'>
            Crear Usuario
          </Button>
        </Form>
      </div>
      <div>
        <ListadoUsuarios isUserCreated={isUserCreated} />
      </div>
    </>
  );
}
