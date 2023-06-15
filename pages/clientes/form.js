
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Form } from 'react-bootstrap'
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

        <Form.Group className="mb-3" controlId="duracao">
          <Form.Label><strong>Duração: </strong></Form.Label>
          <Form.Control isInvalid={errors.duracao} type="text" {...register('duracao')} />
          {
            errors.duracao &&
            <small>{errors.duracao.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="modalidade">
          <Form.Label><strong>Modalidade: </strong></Form.Label>
          <Form.Control isInvalid={errors.modalidade} type="text" {...register('modalidade')} />
          {
            errors.modalidade &&
            <small>{errors.modalidade.message}</small>
          }
        </Form.Group>

        <div className='text-center'>
          <Button variant="primary" onClick={handleSubmit(salvar)}><AiOutlineCheck className="me-1"/>Salvar</Button>
          <Link href={'/clientes'} className="ms-2 btn btn-danger"><IoMdArrowRoundBack className="me-1"/>Voltar</Link>
        </div>
      </Form>

    </Pagina>
  )
}

export default form