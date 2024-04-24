import React, { useState } from 'react';
import { Container, Nav, Navbar, Modal, Form, Button } from 'react-bootstrap';
import logoprincipal from '../../img/logoprincipal.svg';
import './NavbarAdmin.css';
import { Link } from 'react-router-dom';
import { getUsers } from '../../API/Usuarios'; // Importamos la función para obtener usuarios

export function NavbarAdmin() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    // Lógica para cerrar sesión, por ejemplo, eliminar token de autenticación, limpiar cookies, etc.
    // Después de cerrar sesión, redirigir al usuario a la página de inicio de sesión.
    window.location.href = "/"; // Redirige al usuario a la página de inicio de sesión
  };

  const handleProfileClick = async () => {
    const users = await getUsers(); // Obtenemos la lista de usuarios
    // Aquí puedes filtrar los datos del usuario actual, supongamos que está en la primera posición del array
    const currentUserData = users ? users[0] : null;
    setUserData(currentUserData);
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <div>
            <img src={logoprincipal} alt="logoprincipal" className="navbar-logo" />
          </div>
          <Navbar.Brand className="navbar-brand" as={Link} to="/admin">DinnerSys</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin/usuarios" className="nav-perfil no-link-style">Usuarios</Nav.Link>
              <Nav.Link as={Link} to="/admin/productos" className="nav-perfil no-link-style">Productos</Nav.Link>
              <Nav.Link as={Link} to="/admin/ventas" className="nav-perfil no-link-style">Ventas</Nav.Link>
              <Nav.Link as={Link} to="/admin/mesas" className="nav-perfil no-link-style">Mesas</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className="nav-perfil" onClick={handleProfileClick}>Perfil</Nav.Link>
              <Nav.Link className="nav-loguot" onClick={handleLogout}>Cerrar Sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal para mostrar el perfil del usuario */}
      <Modal show={showProfileModal} onHide={handleCloseProfileModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Perfil de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userData && (
            <Form>
              <Form.Group className="mb-3" controlId="formCedula">
                <Form.Label>Cédula</Form.Label>
                <Form.Control type="text" value={userData.Cedula} readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNombres">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" value={userData.Nombres} readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formApellidos">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" value={userData.Apellidos} readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTipoUsuario">
                <Form.Label>Tipo de Usuario</Form.Label>
                <Form.Control type="text" value={userData.TipoUsuario} readOnly />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarAdmin;
