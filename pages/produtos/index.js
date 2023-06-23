import Pagina from '../../components/Pagina'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import Swal from 'sweetalert2'

function Index() {
  const [produtos, setProdutos] = useState([]);

  function getAll() {
    return JSON.parse(window.localStorage.getItem('produtos')) || [];
  }

  useEffect(() => {
    setProdutos(getAll());
  }, []);

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
        const produtos = getAll();
        produtos.splice(id, 1);
        window.localStorage.setItem('produtos', JSON.stringify(produtos));
        setProdutos(produtos);
        Swal.fire('Excluído!', 'O registro foi excluído com sucesso.', 'success');
      }
    });
  }

  function confirmarEdicao(id) {
    Swal.fire({
      title: 'Editar registro',
      text: 'Deseja realmente editar o registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirecionar para a página de edição do produto com o ID específico
        window.location.href = `/produtos/${id}`;
      }
    });
  }

  return (
    <Pagina titulo="Produtos">
      <Table striped bordered hover className='shadow'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>VALIDADE</th>
            <th>Preço</th>
            <th>FORNECEDOR</th>
            <th className='text-center'>
              <Link href={'/produtos/form'}>
                <IoMdAddCircleOutline className="text-dark" size={30} />
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((item, i) => (
            <tr key={i}>
              <td>{item.nome}</td>
              <td>{item.validade}</td>
              <td>R$ {item.preco}.00</td>
              <td>{item.fornecedor}</td>
              <td className='text-center mr-2'>
                <BsFillPencilFill
                  className="me-2 text-primary"
                  size={20}
                  onClick={() => confirmarEdicao(i)}
                  title="Editar"
                  style={{ cursor: 'pointer' }}
                />
                <AiOutlineDelete
                  className='text-danger'
                  size={20}
                  onClick={() => excluir(i)}
                  title="Excluir"
                  style={{ cursor: 'pointer' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}

export default Index;
