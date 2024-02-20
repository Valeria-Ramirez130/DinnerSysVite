import { json } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import './Login.css';

import React, { useState } from 'react';

export const Login = () => {
  const {setIsAuthenticated} = useAuth();
   
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formulario);
    localStorage.setItem("User",JSON.stringify({id:1}))
    setIsAuthenticated(true);
  };

  return (
    <div>
      <h2>Formulario de Login en React</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formulario.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Login;

