import React, { useEffect, useState } from 'react';
import { Table, InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import './ListadoUsuarios.css';
import { deleteUser, getUsers } from '../../../../API/Usuarios';

export function ListadoUsuarios() {

  const [registros, setRegistros] = useState([]);

  useEffect(()=>{ //Esta es la estructura para hacer un get
    getUsers()
      .then(res => {
        res ? setRegistros(res) : console.log("Error al obtener los usuarios");
      })
  }, [])

  //Para una funcion como por ejemplo delete se necesita nomas llamarla y pasarle los datos, asi:
  /* const onHandleClickEliminar = (usuarioId) => {
    deleteUser(usuarioId)
      .then(res => {
        res ? alert("Usuario eliminado") : alert("Error al eliminar el usuario");
      })
      Todas estas funciones estan ya en la API, solo es llamarlas
  } */

  const [filtros, setFiltros] = useState({
    id: '',
    nombres: '',
    apellidos: '',
    rol: ''
  });


  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [mostrarFormularioActualizacion, setMostrarFormularioActualizacion] = useState(false);

  const registrosFiltrados = registros.filter(registro =>
    !registro.eliminado &&
    registro.usuarioId.toString().includes(filtros.id) &&
    registro.Nombres.toLowerCase().includes(filtros.nombres.toLowerCase()) &&
    registro.Apellidos.toLowerCase().includes(filtros.apellidos.toLowerCase()) &&
    registro.TipoUsuario.toLowerCase().includes(filtros.rol.toLowerCase())
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

  const onHandleClickEliminar = (id) => {
    const opcion = prompt("¿Está seguro que desea eliminar el usuario?").toLowerCase();
    if(opcion.includes("si")){
      deleteUser(id)
        .then(res => {
          if(res){
            alert("Usuario eliminado");
            setRegistros(registros.filter(registro => registro.usuarioId !== id))
          }else{
            alert("Error al eliminar el usuario");
          }
        })
    }else{
      console.log("No se eliminará el usuario");
    }
  }
  // IMPORTANTE LEER ESTO
  //En cuanto a la funcion actualizar no se como porque no puedo pasarle los datos al componente crear entonces no sé como es

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
                <tr key={registro.usuarioId}>
                  <td>{registro.usuarioId}</td>
                  <td>{registro.Nombres}</td>
                  <td>{registro.Apellidos}</td>
                  <td>{registro.TipoUsuario}</td>
                  <td>
                    <Button
                      className="listado-usuarios-button listado-usuarios-button-update"
                      onClick={() => seleccionarRegistro(registro)}
                    >
                      Actualizar
                    </Button>
                    <Button
                      className="listado-usuarios-button listado-usuarios-button-delete"
                      onClick={() => onHandleClickEliminar(registro.usuarioId)}
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
