import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

function Cabecalho() {
  return (
    <div>
      <Navbar style={{backgroundColor: '#CAAA8D'}} className='shadow'>
        <Container>
          <Navbar.Brand href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>
          SaborDoPão
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/clientes/" style={{ fontSize: '18px', marginRight: '10px', color: 'black' }}>
              Clientes
            </Nav.Link>
            <Nav.Link href="/funcionarios" style={{ fontSize: '18px', marginRight: '10px', color: 'black' }}>
              Funcionarios
            </Nav.Link>
            <Nav.Link href="/fornecedors" style={{ fontSize: '18px', marginRight: '10px', color: 'black' }}>
              Fornecedores
            </Nav.Link>
            <Nav.Link href="/produtos" style={{ fontSize: '18px', marginRight: '10px', color: 'black' }}>
              Podutos
            </Nav.Link>
            <Nav.Link href="/vendas" style={{ fontSize: '18px', marginRight: '10px', color: 'black' }}>
              Vendas
            </Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Cabecalho;
