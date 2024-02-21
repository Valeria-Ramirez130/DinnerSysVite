// import { json } from 'react-router-dom';
// import { useAuth } from '../../auth/AuthProvider';
// import './Login.css';

// import React, { useState } from 'react';

// export const Login = () => {
//   const {setIsAuthenticated} = useAuth();

//   const [formulario, setFormulario] = useState({
//     nombre: '',
//     email: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormulario(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Formulario enviado:', formulario);
//     localStorage.setItem("User",JSON.stringify({id:2}))
//     setIsAuthenticated(true);
//   };

//   return (
//     <div>
//       <h2>Formulario de Login en React</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="nombre">Nombre:</label>
//         <input
//           type="text"
//           id="nombre"
//           name="nombre"
//           value={formulario.nombre}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formulario.email}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Enviar</button>
//       </form>
//     </div>
//   );
// };

// export default Login;



// Login.js
import React from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';;


export function Login() {
  return (
    <div>

<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="84" height="84" viewBox="0 0 24 24" stroke-width="1.5" stroke="#7f5345" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
</svg>

    <div className="container-gray">
        
      
      <Form>
      
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#7f5345" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </InputGroup.Text>
            <FormControl type="email" placeholder="Enter email" />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#7f5345" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
              </svg>
            </InputGroup.Text>
            <FormControl type="password" placeholder="Contraseña" />
          </InputGroup>
        </Form.Group>

       

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </div>
    </div>
  );
}

export default Login;

