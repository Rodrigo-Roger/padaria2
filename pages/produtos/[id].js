import Pagina from '../../components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'

function form() {

  const { push, query } = useRouter()
  const { register, handleSubmit, setValue } = useForm()

  function getAll() {
    return JSON.parse(window.localStorage.getItem('produtos')) || []
  }

  useEffect(() => {

    if (query.id) {
      const produtos = getAll()
      const produto = produtos[query.id]

      for(let atributo in produto){
        setValue(atributo, produto[atributo])
      }
    }

  }, [query.id])

  function salvar(dados) {
    const produtos = getAll()
    //produtos.push(dados)
    produtos.splice(query.id, 1, dados)
    window.localStorage.setItem('produtos', JSON.stringify(produtos))
    push('/produtos')
  }

  return (
    <Pagina titulo="Editar">

      <Form>
      <Row md={3}>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label><strong>Nome: </strong></Form.Label>
          <Form.Control type="text" {...register('nome')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="validade">
          <Form.Label><strong>VALIDADE: </strong></Form.Label>
          <Form.Control type="text" {...register('validade')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="preco">
          <Form.Label><strong>PREÇO: </strong></Form.Label>
          <Form.Control type="text" {...register('preco')} />
        </Form.Group>
        </Row>

        <Row md={2}>
        <Form.Group className="mb-3" controlId="fornecedor">
          <Form.Label><strong>FORNECEDOR: </strong></Form.Label>
          <Form.Control type="text" {...register('fornecedor')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="endereco">
          <Form.Label><strong>ENDEREÇO: </strong></Form.Label>
          <Form.Control type="text" {...register('endereco')} />
        </Form.Group>

        </Row>
        <div className="d-flex justify-content-end">
          <Button variant="outline-primary" onClick={handleSubmit(salvar)}>Salvar</Button>
          < Link href={'/produtos'} className="ms-2 btn btn-danger">Cancelar</Link>
          </div>
      </Form>

    </Pagina>
  )
}

export default form