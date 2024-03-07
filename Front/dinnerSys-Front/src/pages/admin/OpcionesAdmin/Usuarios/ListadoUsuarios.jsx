import React, { useState } from 'react';
import { Table, InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import './ListadoUsuarios.css';

export function ListadoUsuarios() {
  const [filtros, setFiltros] = useState({
    id: '',
    nombres: '',
    apellidos: '',
    rol: ''
  });

  const [registros, setRegistros] = useState([
    { id: 1, nombres: 'Registro 1', apellidos: 'Registro 1', rol: 'Registro 1' },
    { id: 2, nombres: 'Registro 2', apellidos: 'Registro 2', rol: 'Registro 2' },
    { id: 3, nombres: 'Registro 3', apellidos: 'Registro 3', rol: 'Registro 3' },
    { id: 4, nombres: 'Registro 4', apellidos: 'Registro 4', rol: 'Registro 4' },
    { id: 5, nombres: 'Registro 5', apellidos: 'Registro 5', rol: 'Registro 5' },
    // Agrega más registros según tus necesidades
  ]);

  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [mostrarFormularioActualizacion, setMostrarFormularioActualizacion] = useState(false);

  const registrosFiltrados = registros.filter(registro =>
    !registro.eliminado &&
    registro.id.toString().includes(filtros.id) &&
    registro.nombres.toLowerCase().includes(filtros.nombres.toLowerCase()) &&
    registro.apellidos.toLowerCase().includes(filtros.apellidos.toLowerCase()) &&
    registro.rol.toLowerCase().includes(filtros.rol.toLowerCase())
  );

  const agregarRegistro = () => {
    const nuevoRegistro = {
      id: registros.length + 1,
      nombres: `Registro ${registros.length + 1}`,
      apellidos: `Registro ${registros.length + 1}`,
      rol: `Registro ${registros.length + 1}`,
      eliminado: false
    };
    setRegistros([...registros, nuevoRegistro]);
    setRegistroSeleccionado(null);
  };

  const eliminarRegistro = (registro) => {
    if (registro) {
      const nuevosRegistros = registros.map(r =>
        r.id === registro.id ? { ...r, eliminado: true } : r
      );
      setRegistros(nuevosRegistros);
      setRegistroSeleccionado(null);
    }
  };

  const seleccionarRegistro = (registro) => {
    setRegistroSeleccionado(registro);
  };

  return (
    <div className="listado-usuarios-container">
      <div className="listado-usuarios-header">
        <h1>Listado Usuarios</h1>
      </div>
      <Container>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Filtrar por ID..."
            value={filtros.id}
            onChange={(e) => setFiltros({ ...filtros, id: e.target.value })}
          />
          <FormControl
            placeholder="Filtrar por nombre..."
            value={filtros.nombres}
            onChange={(e) => setFiltros({ ...filtros, nombres: e.target.value })}
          />
          <FormControl
            placeholder="Filtrar por apellidos..."
            value={filtros.apellidos}
            onChange={(e) => setFiltros({ ...filtros, apellidos: e.target.value })}
          />
          <FormControl
            placeholder="Filtrar por rol..."
            value={filtros.rol}
            onChange={(e) => setFiltros({ ...filtros, rol: e.target.value })}
          />
        </InputGroup>

        <div className="listado-usuarios-scroll-container">
          <Table striped bordered hover className="listado-usuarios-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.map(registro => (
                <tr key={registro.id}>
                  <td>{registro.id}</td>
                  <td>{registro.nombres}</td>
                  <td>{registro.apellidos}</td>
                  <td>{registro.rol}</td>
                  <td>
                    <Button
                      className="listado-usuarios-button listado-usuarios-button-update"
                      onClick={() => seleccionarRegistro(registro)}
                    >
                      Actualizar
                    </Button>
                    <Button
                      className="listado-usuarios-button listado-usuarios-button-delete"
                      onClick={() => eliminarRegistro(registro)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}
