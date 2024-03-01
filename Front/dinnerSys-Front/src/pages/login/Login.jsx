import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useAuth } from '../../auth/AuthProvider';
import './Login.css';
import { UserCircleIcon } from '../../iconos/UserCircleIcon';
import UserIcon from '../../iconos/UserIcon';
import LockIcon from '../../iconos/LockIcon';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export function Login() {
  const { setIsAuthenticated } = useAuth();

  const formik = useFormik({
    initialValues: {
      nombre: '',
      password: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('Debe completar este campo'),
      password: Yup.string().required('Debe completar este campo'),
    }),
    onSubmit: (formValues) => {
      console.log('Formulario enviado:', formValues);
      localStorage.setItem('User', JSON.stringify({ id: 3 }));
      setIsAuthenticated(true);
    },
  });

  return (
    <div className='user-form'>
      <UserCircleIcon />

      <div className="container-gray">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicNombre">
            <Form.Label>Nombre</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <UserIcon />
              </InputGroup.Text>
              <FormControl
                type="text"
                placeholder="Nombre"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <div className="error-message">{formik.errors.nombre}</div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <LockIcon />
              </InputGroup.Text>
              <FormControl
                type="password"
                placeholder="Contraseña"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <div className="error-message">{formik.errors.password}</div>
          </Form.Group>

          <Button variant="primary" type="submit" className="btn-primary">
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
