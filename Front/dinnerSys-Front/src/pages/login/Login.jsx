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
    username: Yup.string().required('Campo requerido'),
    cedula: Yup.string().required('Campo requerido'),
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
      cedula: '',
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
            <Form.Label>Cedula</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <LockIcon />
              </InputGroup.Text>
              <FormControl
                type="password"
                placeholder="Cedula"
                name="cedula"
                value={formik.values.cedula}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </InputGroup>
            <div className="error-message">
              {formik.touched.cedula && formik.errors.cedula}
            </div>
          </Form.Group>

          {error && <div className="error-message">{error}</div>}

          <Button variant="primary" type="submit" className="btn-primary">
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;