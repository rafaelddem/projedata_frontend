import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function TopNavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-menu" />
        <Navbar.Collapse id="main-menu">
          <Nav className="me-auto">
            <NavDropdown title="Cadastros" id="submenu-servicos">
              <NavDropdown.Item as={Link} to="/materia-prima">
                Matéria-prima
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/produto">
                Produto
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavBar;
