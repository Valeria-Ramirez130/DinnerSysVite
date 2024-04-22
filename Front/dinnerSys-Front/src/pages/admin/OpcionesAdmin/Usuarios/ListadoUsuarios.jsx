// En ListadoUsuarios.jsx

import React, { useEffect, useState } from 'react';
import { Table, InputGroup, FormControl, Button, Container, Form } from 'react-bootstrap';
import './ListadoUsuarios.css';
import { deleteUser, getUsers, updateUser } from '../../../../API/Usuarios';
import Alert from '../../../../components/Alert/Alert';

export function ListadoUsuarios() {
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
  }, []);

  const handleCloseAlert = () => setShowAlert(false);

  const onHandleClickEliminar = (id) => {
    setShowAlert(true);
    setRegistroSeleccionado(id);
  };

  const confirmarEliminar = () => {
    deleteUser(registroSeleccionado)
      .then(res => {
        if (res) {
          setRegistros(registros.filter(registro => registro.usuarioId !== registroSeleccionado));
        } else {
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
    const { id, ...updatedUserData } = formData;
    console.log('Datos a actualizar:', updatedUserData);
    updateUser(id, updatedUserData)
      .then(res => {
        console.log('Respuesta del backend:', res);
        if (res) {
          getUsers().then(updatedUsers => {
            setRegistros(updatedUsers);
            setShowUpdateForm(false);
          });
        } else {
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
          {/* Código de filtro omitido para mantener la brevedad */}
        </InputGroup>

        <div className="listado-usuarios-scroll-container">
          <Table striped bordered hover className="listado-usuarios-table">
            <thead>
              {/* Encabezados de tabla omitidos para mantener la brevedad */}
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
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Actualizar
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}
