// NavbarMesero.js

import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logoprincipal from '../../img/logoprincipal.svg';
import './NavbarMesero.css';
import { Link } from 'react-router-dom';

export function NavbarMesero() {
  return (
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
            <Nav.Link className="nav-perfil" href="#deets">Perfil</Nav.Link>
            <Nav.Link className="nav-loguot" href="#deets">Cerrar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
