import Pagina from '../../components/Pagina';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsFillExclamationTriangleFill, BsFillPencilFill } from 'react-icons/bs';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Swal from 'sweetalert2';

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

  function editar(id) {
    if (vendas[id].total > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Não é possível editar',
        text: 'Não é possível editar um registro com valor total maior que zero.',
        confirmButtonText: 'Ok'
      });
    } else {
      router.push('/vendas/form?id=' + id);
    }
  }

  function excluir(id) {
    Swal.fire({
      title: 'Excluir registro',
      text: 'Deseja realmente excluir o registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        const vendas = getAll();
        vendas.splice(id, 1);
        window.localStorage.setItem('vendas', JSON.stringify(vendas));
        setVendas(vendas);
        Swal.fire('Excluído!', 'O registro foi excluído com sucesso.', 'success');
      }
    });
  }

  return (
    <Pagina titulo="Vendas">
      <div className="shadow">
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
                <td>R$ {item.total}</td>
                <td className='text-center mr-2'>
                  <BsFillExclamationTriangleFill className="me-2 text-warning" size={20} onClick={() => editar(i)} />
                  <AiOutlineDelete className='text-danger' size={20} onClick={() => excluir(i)} title="Excluir" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Pagina>
  );
}

export default Index;
