import Pagina from '../../components/Pagina'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'
import Swal from 'sweetalert2'

function index() {

    const [clientes, setClientes] = useState([])

    function getAll() {
        return JSON.parse(window.localStorage.getItem('clientes')) || []
    }

    useEffect(() => {
        setClientes(getAll())
    }, [])

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
            const clientes = getAll();
            clientes.splice(id, 1);
            window.localStorage.setItem('clientes', JSON.stringify(clientes));
            setClientes(clientes);
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
            // Redirecionar para a página de edição do cliente com o ID específico
            window.location.href = `/clientes/${id}`;
          }
        });
      }


    return (
        <Pagina titulo="Clientes">

            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>CEP</th>
                        <th>Endereço</th>
                    <th className='text-center'><Link href={'/clientes/form'}><IoMdAddCircleOutline className=" text-dark" size={30} /></Link></th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((item, i) => (
                        <tr key={i}>
                            <td>{item.nome}</td>
                            <td>{item.cpf}</td>
                            <td>{item.telefone}</td>
                            <td>{item.cep}</td>
                            <td>{item.endereco}</td>
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
    )
}

export default index