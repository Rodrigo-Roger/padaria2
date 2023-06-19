import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'
import InputMask from 'react-input-mask'

import Pagina from '../../components/Pagina'
import fornecedorsValidator from '../../validators/fornecedorsValidator'

function Formulario() {
  const { push } = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm()

  function salvar(dados) {
    const fornecedors = JSON.parse(window.localStorage.getItem('fornecedors')) || []
    fornecedors.push(dados)
    window.localStorage.setItem('fornecedors', JSON.stringify(fornecedors))
    push('/fornecedors')
  }

  return (
    <Pagina titulo="Cadastro de Fornecedors">
      <Form>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label><strong>Nome: </strong></Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register('nome', fornecedorsValidator.nome)} />
          {errors.nome && <small>{errors.nome.message}</small>}
        </Form.Group>


        <Col>
          <Row md={2}>
        <Form.Group className="mb-3" controlId="cnpj">
          <Form.Label><strong>CNPJ: </strong></Form.Label>
          <InputMask
            mask="999.999.999-99"
            maskChar=""
            {...register('cnpj', fornecedorsValidator.cnpj)}
          >
            {(inputProps) => (
              <Form.Control
                isInvalid={errors.cnpj}
                type="text"
                {...inputProps}
              />
            )}
          </InputMask>
          {errors.cnpj && <small>{errors.cnpj.message}</small>}
        </Form.Group>
            <Form.Group className="mb-3 w-25" controlId="email">
              <Form.Label><strong>EMAIL: </strong></Form.Label>
              <InputMask
                mask="99999-999"
                maskChar=""
                {...register('email', fornecedorsValidator.email)}
              >
                {(inputProps) => (
                  <Form.Control
                    isInvalid={errors.email}
                    type="text"
                    {...inputProps}
                  />
                )}
              </InputMask>
              {errors.email && <small>{errors.email.message}</small>}
            </Form.Group>
            <Form.Group className="mb-3 w-25" controlId="telefone">
              <Form.Label><strong>Telefone: </strong></Form.Label>
              <InputMask
                mask="(99) 99999-9999"
                maskChar=""
                {...register('telefone', fornecedorsValidator.telefone)}
              >
                {(inputProps) => (
                  <Form.Control
                    isInvalid={errors.telefone}
                    type="text"
                    {...inputProps}
                  />
                )}
              </InputMask>
              {errors.telefone && <small>{errors.telefone.message}</small>}
            </Form.Group>


      
          </Row>
        </Col>

        <div className='text-center'>
          <Button variant="primary" onClick={handleSubmit(salvar)}><AiOutlineCheck className="me-1" />Salvar</Button>
          <Link href={'/fornecedors'} className="ms-2 btn btn-danger"><IoMdArrowRoundBack className="me-1" />Voltar</Link>
        </div>
      </Form>
    </Pagina>
  )
}

export default Formulario;
