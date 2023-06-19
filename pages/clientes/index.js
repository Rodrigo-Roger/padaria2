
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import Pagina from '../../components/Pagina'


function index() {

    const [clientes, setClientes] = useState([])

    function getAll() {
        return JSON.parse(window.localStorage.getItem('clientes')) || []
    }

    useEffect(() => {
        setClientes(getAll())
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const clientes = getAll()
            clientes.splice(id, 1)
            window.localStorage.setItem('clientes', JSON.stringify(clientes))
            setClientes(clientes)
        }
    }

    return (
        <Pagina titulo="Clientes">

            <Link href={'/clientes/form'}><Button variant="primary" className='m-1'>Novo</Button></Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>CEP</th>
                        <th>Endereço</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <Link href={'/clientes/' + i}>
                                    <BsFillPencilFill className="me-2 text-primary" />
                                </Link>
                                <AiOutlineDelete onClick={() => excluir(i)} />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.cpf}</td>
                            <td>{item.telefone}</td>
                            <td>{item.cep}</td>
                            <td>{item.endereco}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Pagina>
    )
}

export default index