import Pagina from '../../components/Pagina'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'

function index() {

    const [produtos, setProdutos] = useState([])

    function getAll() {
        return JSON.parse(window.localStorage.getItem('produtos')) || []
    }

    useEffect(() => {
        setProdutos(getAll())
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const produtos = getAll()
            produtos.splice(id, 1)
            window.localStorage.setItem('produtos', JSON.stringify(produtos))
            setProdutos(produtos)
        }
    }

    return (
        <Pagina titulo="Produtos">

            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>VALIDADE</th>
                        <th>Preço</th>
                        <th>FORNECEDOR</th>
                    <th className='text-center'><Link href={'/produtos/form'}><IoMdAddCircleOutline className=" text-dark" size={30} /></Link></th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((item, i) => (
                        <tr key={i}>
                            <td>{item.nome}</td>
                            <td>{item.validade}</td>
                            <td>{item.preco}</td>
                            <td>{item.fornecedors }</td>
                            <td className='text-center'>
                  <Card.Img style={{ width: '10rem' }} src={item.foto} ></Card.Img>
                </td>
                            <td  className='text-center mr-2'>
                                <Link href={'/produtos/' + i}>
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