import React, { useEffect, useState } from 'react';
import { Table, InputGroup, FormControl, Button, Container, Form } from 'react-bootstrap';
import './ListadoUsuarios.css';
import { deleteUser, getUsers, updateUser } from '../../../../API/Usuarios';
import Alert from '../../../../components/Alert/Alert';
import { alertaGeneral, alertaToast } from '../../../../utils/alertasGlobales';

export function ListadoUsuarios({isUserCreated}) {
  const [registros, setRegistros] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    nombres: '',
    apellidos: '',
    rol: ''
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [filtros, setFiltros] = useState({
    id: '',
    nombres: '',
    apellidos: '',
    rol: ''
  });

  useEffect(() => {
    getUsers()
      .then(res => {
        res ? setRegistros(res) : console.log("Error al obtener los usuarios");
      });
  }, [isUserCreated]);

  const handleCloseAlert = () => setShowAlert(false);

  const onHandleClickEliminar = (id) => {
    setShowAlert(true);
    setRegistroSeleccionado(id);
  };

  const confirmarEliminar = () => {
    deleteUser(registroSeleccionado)
      .then(res => {
        if (res) {
          alertaToast({ titulo: 'Usuario eliminado correctamente' });
          setRegistros(registros.filter(registro => registro.usuarioId !== registroSeleccionado));
        } else {
          alertaToast({ titulo: 'Error al eliminar el usuario', icon: 'error' });
          setAlertMessage("Error al eliminar el usuario");
        }
      })
      .catch(error => {
        console.error("Error al llamar a deleteUser:", error);
        setAlertMessage("Error al eliminar el usuario");
      });
    setShowAlert(false);
  };

  const showUpdateFormWithData = (registro) => {
    setFormData({
      id: registro.usuarioId,
      nombres: registro.Nombres,
      apellidos: registro.Apellidos,
      rol: registro.TipoUsuario
    });
    setShowUpdateForm(true);
  };

  const handleSubmitUpdate = () => {
    event.preventDefault(); //Para evitar la recarga de la página
    const { id } = formData;

    //se crea un objeto con los nombre de las propiedades tal cual como las espera el backend
    const updatedUserData = {
      Nombres: formData.nombres,
      Apellidos: formData.apellidos,
      TipoUsuario: formData.rol
    }

    console.log('Datos a actualizar:', { id, updatedUserData });

    updateUser(id, updatedUserData)
      .then(res => {
        if (res === true) {
          alertaGeneral('Usuario actualizado correctamente');
          getUsers().then(updatedUsers => {
            setRegistros(updatedUsers);
            setShowUpdateForm(false);
          });
        } else {
          alertaGeneral(res.Error, true);
          setAlertMessage("Error al actualizar el usuario");
        }
      })
      .catch(error => {
        console.error("Error al llamar a updateUser:", error);
        setAlertMessage("Error al actualizar el usuario");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const registrosFiltrados = registros.filter(registro =>
    !registro.eliminado &&
    registro.usuarioId.toString().includes(filtros.id) &&
    registro.Nombres.toLowerCase().includes(filtros.nombres.toLowerCase()) &&
    registro.Apellidos.toLowerCase().includes(filtros.apellidos.toLowerCase()) &&
    registro.TipoUsuario.toLowerCase().includes(filtros.rol.toLowerCase())
  );

  return (
    <div className="listado-usuarios-container">
      <div className="listado-usuarios-header">
        <h1>Listado Usuarios</h1>
      </div>
      <Container>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Filtrar por ID..."
            name="id"
            value={filtros.id}
            onChange={handleFilterChange}
          />
          <FormControl
            placeholder="Filtrar por nombres..."
            name="nombres"
            value={filtros.nombres}
            onChange={handleFilterChange}
          />
          <FormControl
            placeholder="Filtrar por apellidos..."
            name="apellidos"
            value={filtros.apellidos}
            onChange={handleFilterChange}
          />
          <FormControl
            placeholder="Filtrar por rol..."
            name="rol"
            value={filtros.rol}
            onChange={handleFilterChange}
          />
        </InputGroup>

        <div className="listado-usuarios-scroll-container">
          <Table striped bordered hover className="listado-usuarios-table">
            <thead>
              {/* Encabezados de tabla omitidos para mantener la brevedad */}
            </thead>
            <tbody>
              {registrosFiltrados && registrosFiltrados.map(registro => (
                <tr key={registro.usuarioId}>
                  <td>{registro.usuarioId}</td>
                  <td>{registro.Nombres}</td>
                  <td>{registro.Apellidos}</td>
                  <td>{registro.TipoUsuario}</td>
                  <td>
                    <Button
                      className="listado-usuarios-button listado-usuarios-button-update"
                      onClick={() => showUpdateFormWithData(registro)}
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
      {showAlert && (
        <div className="alert-overlay">
          <Alert message={alertMessage} onClose={handleCloseAlert} />
          <div className="confirmation-container">
            <p>¿Está seguro que desea eliminar el usuario?</p>
            <Button variant="danger" onClick={confirmarEliminar}>Si</Button>
            <Button variant="secondary" onClick={handleCloseAlert}>No</Button>
          </div>
        </div>
      )}
      {showUpdateForm && (
        <div className="update-form-overlay">
          <Form className="update-form" onSubmit={handleSubmitUpdate}>
            <Form.Group controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" name="id" value={formData.id} onChange={handleInputChange} disabled />
            </Form.Group>
            <Form.Group controlId="formNombres">
              <Form.Label>Nombres</Form.Label>
              <Form.Control type="text" name="nombres" value={formData.nombres} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formApellidos">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" name="apellidos" value={formData.apellidos} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formRol">
              <Form.Label>Rol</Form.Label>
              <Form.Control as="select" name="rol" value={formData.rol} onChange={handleInputChange}>
                <option value="Mesero">Mesero</option>
                <option value="Administrador">Administrador</option>
                <option value="Cocina">Cocina</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Actualizar
            </Button>
            {/* Botón de cerrar */}
            <Button variant="danger" onClick={() => setShowUpdateForm(false)}>
              Cerrar
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}