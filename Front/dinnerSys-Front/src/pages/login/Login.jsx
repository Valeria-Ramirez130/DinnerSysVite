import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../auth/AuthProvider';
import './Login.css';
import { UserCircleIcon } from '../../iconos/UserCircleIcon';
import UserIcon from '../../iconos/UserIcon';
import LockIcon from '../../iconos/LockIcon';
import { VerifyLogginUser } from '../../API/Usuarios';

const Login = () => {
  const { setIsAuthenticated, Rol } = useAuth(); 
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Campo requerido'),
    cedula: Yup.string().required('Campo requerido'),
  });

  const onSubmit = async (values, { setErrors }) => {
    try {
      const userData = await VerifyLogginUser(values.username, values.cedula);
      
      console.log(userData);

      if (userData) {
        localStorage.setItem("User", JSON.stringify(userData));
        setIsAuthenticated(true);

        const userRole = userData.rol.toLowerCase();
        if (userRole === "administrador") {
          navigate("/admin");
        } else if (userRole === "mesero") {
          navigate("/mesero");
        } else {
          console.error("Rol de usuario desconocido:", userRole);
        }
      } else {
        setError("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión");
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      cedula: '',
    },
    validationSchema,
    onSubmit,
  });


  if (Rol === 'administrador') {
    return <Navigate to="/admin" />;
  } else if (Rol === 'mesero') {
    return <Navigate to="/mesero" />;
  } else{

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
}
};

export default Login;
