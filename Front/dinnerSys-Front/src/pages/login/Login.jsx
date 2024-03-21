import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../auth/AuthProvider';
import './Login.css';
import { UserCircleIcon } from '../../iconos/UserCircleIcon';
import UserIcon from '../../iconos/UserIcon';
import LockIcon from '../../iconos/LockIcon';

const Login = () => {
  const { setIsAuthenticated } = useAuth();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Ingrese solo letras')
      .required('Campo requerido'),
    password: Yup.string()
      .matches(/^[0-9]+$/, 'Ingrese solo números') // Aquí agregamos la validación para solo números
      .required('Campo requerido'),
  });

  const onSubmit = (values, { setErrors }) => {
    // Validation of the form using Yup schema
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        console.log('Formulario enviado:', values);
        localStorage.setItem("User", JSON.stringify({ id: 3 }));
        setIsAuthenticated(true);
      })
      .catch((errors) => {
        const mappedErrors = {};
        errors.inner.forEach((error) => {
          mappedErrors[error.path] = error.message;
        });
        setErrors(mappedErrors);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className='user-form'>
      <UserCircleIcon />

      <div className="container-gray">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Nombre de Usuario</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <UserIcon />
              </InputGroup.Text>
              <FormControl
                type="text"
                placeholder="Nombre de usuario"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </InputGroup>
            <div className="error-message">
              {formik.touched.username && formik.errors.username}
            </div>
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
                onBlur={formik.handleBlur}
              />
            </InputGroup>
            <div className="error-message">
              {formik.touched.password && formik.errors.password}
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="btn-primary">
            Iniciar Sesion
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
