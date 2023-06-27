import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from './Cabecalho';
import { Container } from 'react-bootstrap';

function Pagina(props) {
  return (
    <div>
      <Cabecalho />
      <div className=" py-3 text-black text-center mb-3 shadow" style={{backgroundColor:'#E4CDB8'}}>
        <Container>
          <h1 className="display-4">{props.titulo}</h1>
          
        </Container>
      </div>
      <Container className="mb-5 pb-4" >
        
        
        {props.children}
      </Container>
    </div>
  );
}

export default Pagina;
