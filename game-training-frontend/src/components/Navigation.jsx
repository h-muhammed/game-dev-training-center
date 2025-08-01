import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand 
          className="fw-bold text-gradient" 
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          GameDev Academy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/courses')}>Courses</Nav.Link>
            <Nav.Link onClick={() => navigate('/about')}>About Us</Nav.Link>
            <Nav.Link onClick={() => navigate('/registration')}>Registration</Nav.Link>
            <Nav.Link onClick={() => navigate('/contact')}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;