import Pagina from '../../components/Pagina'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'

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

            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CNPJ</th>
                        <th>Telefone</th>
                        <th>EMAIL</th>
                        <th>Propeitario</th>
                    <th className='text-center'><Link href={'/fornecedors/form'}><IoMdAddCircleOutline className=" text-dark" size={30} /></Link></th>
                    </tr>
                </thead>
                <tbody>
                    {fornecedors.map((item, i) => (
                        <tr key={i}>
                            <td>{item.nome}</td>
                            <td>{item.cnpj}</td>
                            <td>{item.telefone}</td>
                            <td>{item.email}</td>
                            <td>{item.propeitario}</td>
                            <td  className='text-center mr-2'>
                                <Link href={'/fornecedors/' + i}>
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