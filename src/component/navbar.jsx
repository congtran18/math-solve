import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" >
        <Container fluid>
          <Navbar.Brand href="/">MATH SOLVE HOMEWORK HELPER</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">SCAN</Nav.Link>
            <Nav.Link href="/calculator">CALCULATOR</Nav.Link>
            <Nav.Link href="/history">HISTORY</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;