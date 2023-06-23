import Pagina from '../../components/Pagina'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'

function Index() {
  const [vendas, setVendas] = useState([]);
  const [quantidadeTotal, setQuantidadeTotal] = useState(0);

  function getAll() {
    return JSON.parse(window.localStorage.getItem('vendas')) || [];
  }

  useEffect(() => {
    setVendas(getAll());
  }, []);

  useEffect(() => {
    const total = vendas.reduce((acc, item) => acc + item.quantidade, 0);
    setQuantidadeTotal(total);
  }, [vendas]);

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const vendas = getAll();
      vendas.splice(id, 1);
      window.localStorage.setItem('vendas', JSON.stringify(vendas));
      setVendas(vendas);
    }
  }

  return (
    <Pagina titulo="Vendas">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Funcionário</th>
            <th>Total</th>
            <th className='text-center'>
              <Link href={'/vendas/form'}>
                <IoMdAddCircleOutline className="text-dark" size={30} />
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((item, i) => (
            <tr key={i}>
              <td>{item.cliente}</td>
              <td>{item.funcionario}</td>
              <td>{item.total}</td>
              <td className='text-center mr-2'>
                <Link href={'/vendas/' + i}>
                  <BsFillPencilFill className="me-2 text-primary" size={20} />
                </Link>
                <AiOutlineDelete className='text-danger' size={20} onClick={() => excluir(i)} title="Excluir" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}

export default Index;
