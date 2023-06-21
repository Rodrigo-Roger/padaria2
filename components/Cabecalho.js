import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

function Cabecalho() {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
          SaborDoPão
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/clientes/" style={{ fontSize: '18px', marginRight: '10px', color: '#fff' }}>
              Clientes
            </Nav.Link>
            <Nav.Link href="/funcionarios" style={{ fontSize: '18px', marginRight: '10px', color: '#fff' }}>
              Funcionarios
            </Nav.Link>
            <Nav.Link href="/fornecedors" style={{ fontSize: '18px', marginRight: '10px', color: '#fff' }}>
              Fornecedores
            </Nav.Link>
            <Nav.Link href="/produtos" style={{ fontSize: '18px', marginRight: '10px', color: '#fff' }}>
              Podutos
            </Nav.Link>
            <Nav.Link href="/salas" style={{ fontSize: '18px', marginRight: '10px', color: '#fff' }}>
              Salas
            </Nav.Link>
            <Nav.Link href="/semestres" style={{ fontSize: '18px', marginRight: '10px', color: '#fff' }}>
              Semestres
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Cabecalho;
