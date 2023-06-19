
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import Pagina from '../../components/Pagina'


function index() {

    const [fornecedors, setFornecedors] = useState([])

    function getAll() {
        return JSON.parse(window.localStorage.getItem('fornecedors')) || []
    }

    useEffect(() => {
        setFornecedors(getAll())
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const fornecedors = getAll()
            fornecedors.splice(id, 1)
            window.localStorage.setItem('fornecedors', JSON.stringify(fornecedors))
            setFornecedors(fornecedors)
        }
    }

    return (
        <Pagina titulo="Fornecedors">

            <Link href={'/fornecedors/form'}><Button variant="primary" className='m-1'>Novo</Button></Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>CNPJ</th>
                        <th>Telefone</th>
                        <th>EMAIL</th>
                        <th>Endereço</th>
                    </tr>
                </thead>
                <tbody>
                    {fornecedors.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <Link href={'/fornecedors/' + i}>
                                    <BsFillPencilFill className="me-2 text-primary" />
                                </Link>
                                <AiOutlineDelete onClick={() => excluir(i)} />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.cnpj}</td>
                            <td>{item.telefone}</td>
                            <td>{item.email}</td>
                            <td>{item.endereco}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Pagina>
    )
}

export default index