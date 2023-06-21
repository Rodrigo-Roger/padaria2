import React from 'react';
import Pagina from '../components/Pagina';
import { Link } from 'react-router-dom';

const Inicial = () => {
  return (
    <Pagina>
      <div className="central-menu">
        <Link to="/clientes">Clientes</Link>
        <Link to="/funcionarios">Funcionários</Link>
        <Link to="/fornecedores">Fornecedores</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/vendas">Vendas</Link>
      </div>
    </Pagina>
  );
}

export default Inicial;
