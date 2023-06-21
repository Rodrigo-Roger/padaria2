import Pagina from '../../components/Pagina'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'

function index() {

    const [funcionarios, setFuncionarios] = useState([])

    function getAll() {
        return JSON.parse(window.localStorage.getItem('funcionarios')) || []
    }

    useEffect(() => {
        setFuncionarios(getAll())
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const funcionarios = getAll()
            funcionarios.splice(id, 1)
            window.localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
            setFuncionarios(funcionarios)
        }
    }

    return (
        <Pagina titulo="Funcionarios">

            
            <Table striped bordered hover>
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
                            <td  className='text-center mr-2'>
                                <Link href={'/funcionarios/' + i}>
                                    <BsFillPencilFill className="me-2 text-primary" size={20} />
                                </Link>
                                
                                <AiOutlineDelete className='text-danger' size={20} onClick={() => excluir(i)} Excluir/>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Pagina>
    )
}

export default index