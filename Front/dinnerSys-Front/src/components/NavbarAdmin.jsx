import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export function NavbarAdmin() {
  return (
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">DinnerSys</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* Opciones de Usuarios */}
              <NavDropdown title="Usuarios" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Crear Usuario</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2"> Listado de Usuarios</NavDropdown.Item>
              </NavDropdown>
              {/* Opciones de Productos */}
              <NavDropdown title="Productos" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Crear Producto</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">Listado de Productos</NavDropdown.Item>
              </NavDropdown>
              {/* Opciones de Ventas */}
              <NavDropdown title="Ventas" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Listado de Ventas</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Perfil</Nav.Link>
              <Nav.Link href="#deets">Cerrar Sesion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

export default NavbarAdmin;