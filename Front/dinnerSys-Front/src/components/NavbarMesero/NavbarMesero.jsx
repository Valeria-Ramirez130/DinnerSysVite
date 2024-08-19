// NavbarMesero.js
import { useState } from 'react';
import { Container, Nav, Navbar, Modal, Form, Button } from 'react-bootstrap';
import logoprincipal from '../../img/logoprincipal.svg';
import './NavbarMesero.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider'; 

export function NavbarMesero() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const { setIsAuthenticated, Nombre, Apellido, Rol } = useAuth(); 
  console.log(Rol);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleProfileClick = () => {
      setUserData({ Nombre, Rol, Apellido });
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
          <Navbar.Brand className="navbar-brand" as={Link} to="/mesero">DinnerSys</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* Utiliza 'as' para renderizar como un componente diferente */}
            </Nav>
            <Nav>
              <Nav.Link className="nav-perfil" onClick={handleProfileClick}>Perfil</Nav.Link>
              <Nav.Link className="nav-loguot" onClick={handleLogout}>Cerrar Sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showProfileModal} onHide={handleCloseProfileModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="centered-modal-title">Perfil de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userData && (
            <Form>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" value={userData.Nombre} readOnly />
              </Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" value={userData.Apellido} readOnly />
              <Form.Group className="mb-3" controlId="formRol">
                <Form.Label>Rol</Form.Label>
                <Form.Control type="text" value={userData.Rol} readOnly />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default NavbarMesero;
