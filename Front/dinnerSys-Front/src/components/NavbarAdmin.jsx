import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoprincipal from '../img/logoprincipal.svg'; 
import './NavbarAdmin.css';

export function NavbarAdmin() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <div>
        <img src={logoprincipal} alt="logoprincipal" className="navbar-logo" />
        </div>
        <Navbar.Brand className="navbar-brand" href="#home">DinnerSys</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Usuarios" id="usuarios" className="nav-dropdown">
              <NavDropdown.Item className="nav-dropdown-item" href="#action/3.1">Crear Usuario</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="nav-dropdown-item" href="#action/3.2">Listado de Usuarios</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Productos" id="productos" className="nav-dropdown">
              <NavDropdown.Item className="nav-dropdown-item" href="#action/3.1">Crear Producto</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="nav-dropdown-item" href="#action/3.2">Listado de Productos</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Ventas" id="ventas" className="nav-dropdown">
              <NavDropdown.Item className="nav-dropdown-item" href="#action/3.1">Listado de Ventas</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link className="nav-perfil" href="#deets">Perfil</Nav.Link>
            <Nav.Link className="nav-loguot" href="#deets">Cerrar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarAdmin;
