import Pagina from '../../components/Pagina'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'
import Swal from 'sweetalert2'

function index() {

    const [funcionarios, setFuncionarios] = useState([])

    function getAll() {
        return JSON.parse(window.localStorage.getItem('funcionarios')) || []
    }

    useEffect(() => {
        setFuncionarios(getAll());
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
            const funcionarios = getAll();
            funcionarios.splice(id, 1);
            window.localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
            setFuncionarios(funcionarios);
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
            // Redirecionar para a página de edição do funcionario com o ID específico
            window.location.href = `/funcionarios/${id}`;
          }
        });
      }



    return (
        <Pagina titulo="Funcionarios">

            
            <Table striped bordered hover className='shadow'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>CEP</th>
                        <th>Endereço</th>
                    <th className='text-center'><Link href={'/funcionarios/form'}><IoMdAddCircleOutline className=" text-dark" size={30} /></Link></th>
                    </tr>
                </thead>
                <tbody>
                    {funcionarios.map((item, i) => (
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