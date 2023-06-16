
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'

import Pagina from '../../components/Pagina'

function form() {

  const { push } = useRouter()
  const { register, handleSubmit, formState: {errors} } = useForm()

  function salvar(dados) {
    const clientes = JSON.parse(window.localStorage.getItem('clientes')) || []
    clientes.push(dados)
    window.localStorage.setItem('clientes', JSON.stringify(clientes))
    push('/clientes')
  }

  return (
    <Pagina titulo="Formulário">

      <Form>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label><strong>Nome: </strong></Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register('nome')} />
          {
            errors.nome &&
            <small>{errors.nome.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="cpf">
          <Form.Label><strong>CPF: </strong></Form.Label>
          <Form.Control isInvalid={errors.cpf} type="text" {...register('cpf')} />
          {
            errors.cpf &&
            <small>{errors.duracao.message}</small>
          }
        </Form.Group>

        

          <Col>

            <Row md={2}>

            <Form.Group className="mb-3 w-30" controlId="telefone">
          <Form.Label><strong>Telefone: </strong></Form.Label>
          <Form.Control isInvalid={errors.telefone} type="text" {...register('telefone')} />
          {
            errors.telefone &&
            <small>{errors.telefone.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3 w-20" controlId="cep" >
          <Form.Label><strong>CEP: </strong></Form.Label>
          <Form.Control isInvalid={errors.cep} type="text" {...register('cep')} />
          {
            errors.cep &&
            <small>{errors.cep.message}</small>
          }

          
        </Form.Group>

        <Form.Group className="mb-3 w-50" controlId="endereco">
          <Form.Label><strong>Endereço: </strong></Form.Label>
          <Form.Control isInvalid={errors.endereco} type="text" {...register('endereco')} />
          {
            errors.endereco &&
            <small>{errors.endereco.message}</small>
          }
        </Form.Group>
        </Row>
        </Col>
        

        <div className='text-center'>
          <Button variant="primary" onClick={handleSubmit(salvar)}><AiOutlineCheck className="me-1"/>Salvar</Button>
          <Link href={'/clientes'} className="ms-2 btn btn-danger"><IoMdArrowRoundBack className="me-1"/>Voltar</Link>
        </div>
      </Form>

    </Pagina>
  )
}

export default form