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
    return JSON.parse(window.localStorage.getItem('fornecedors')) || []
  }

  useEffect(() => {

    if (query.id) {
      const fornecedors = getAll()
      const fornecedor = fornecedors[query.id]

      for(let atributo in fornecedor){
        setValue(atributo, fornecedor[atributo])
      }
    }

  }, [query.id])

  function salvar(dados) {
    const fornecedors = getAll()
    //fornecedors.push(dados)
    fornecedors.splice(query.id, 1, dados)
    window.localStorage.setItem('fornecedors', JSON.stringify(fornecedors))
    push('/fornecedors')
  }

  return (
    <Pagina titulo="Editar">

      <Form>
      <Row md={3}>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label><strong>Nome: </strong></Form.Label>
          <Form.Control type="text" {...register('nome')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="cnpj">
          <Form.Label><strong>CNPJ: </strong></Form.Label>
          <Form.Control type="text" {...register('cnpj')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="telefone">
          <Form.Label><strong>TELEFONE: </strong></Form.Label>
          <Form.Control type="text" {...register('telefone')} />
        </Form.Group>
        </Row>

        <Row md={2}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label><strong>EMAIL: </strong></Form.Label>
          <Form.Control type="text" {...register('email')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="propeitario">
          <Form.Label><strong>ENDEREÇO: </strong></Form.Label>
          <Form.Control type="text" {...register('propeitario')} />
        </Form.Group>

        </Row>
        <div className="d-flex justify-content-end">
          <Button variant="outline-primary" onClick={handleSubmit(salvar)}>Salvar</Button>
          < Link href={'/fornecedors'} className="ms-2 btn btn-danger">Cancelar</Link>
          </div>
      </Form>

    </Pagina>
  )
}

export default form