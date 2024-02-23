import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useAuth } from '../../auth/AuthProvider';
import './Login.css';
import { UserCircleIcon } from '../../iconos/UserCircleIcon';
import UserIcon from '../../iconos/UserIcon';
import LockIcon from '../../iconos/LockIcon';

export function Login() {
  const { setIsAuthenticated } = useAuth();

  const [formulario, setFormulario] = useState({
    email: '',
    password: '',
  });

  const [errores, setErrores] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrores((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación del correo electrónico
    if (!formulario.email.includes('@')) {
      setErrores((prevState) => ({
        ...prevState,
        email: 'Correo no es válido',
      }));
      return;
    }

    // Validación de la contraseña
    if (formulario.password.trim() === '') {
      setErrores((prevState) => ({
        ...prevState,
        password: 'Debe completar este campo',
      }));
      return;
    }

    console.log('Formulario enviado:', formulario);
    localStorage.setItem("User", JSON.stringify({ id: 3 }));
    setIsAuthenticated(true);
  };

  return (
    <div className='user-form'>
      <UserCircleIcon />

      <div className="container-gray">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo electronico</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <UserIcon />
              </InputGroup.Text>
              <FormControl
                type="text"
                placeholder="Correo electronico"
                name="email"
                value={formulario.email}
                onChange={handleChange}
              />
            </InputGroup>
            <div className="error-message">{errores.email}</div>
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
                value={formulario.password}
                onChange={handleChange}
              />
            </InputGroup>
            <div className="error-message">{errores.password}</div>
          </Form.Group>

          <Button variant="primary" type="submit" className="btn-primary">
            Iniciar Sesion
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
