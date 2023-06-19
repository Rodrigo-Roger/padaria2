import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'
import InputMask from 'react-input-mask'

import Pagina from '../../components/Pagina'
import funcionariosValidator from '../../validators/funcionariosValidator'

function Formulario() {
  const { push } = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm()

  function salvar(dados) {
    const funcionarios = JSON.parse(window.localStorage.getItem('funcionarios')) || []
    funcionarios.push(dados)
    window.localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    push('/funcionarios')
  }

  return (
    <Pagina titulo="Cadastro de Funcionarios">
      <Form>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label><strong>Nome: </strong></Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register('nome', funcionariosValidator.nome)} />
          {errors.nome && <small>{errors.nome.message}</small>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="cpf">
          <Form.Label><strong>CPF: </strong></Form.Label>
          <InputMask
            mask="999.999.999-99"
            maskChar=""
            {...register('cpf', funcionariosValidator.cpf)}
          >
            {(inputProps) => (
              <Form.Control
                isInvalid={errors.cpf}
                type="text"
                {...inputProps}
              />
            )}
          </InputMask>
          {errors.cpf && <small>{errors.cpf.message}</small>}
        </Form.Group>

        <Col>
          <Row md={2}>
            <Form.Group className="mb-3 w-25" controlId="telefone">
              <Form.Label><strong>Telefone: </strong></Form.Label>
              <InputMask
                mask="(99) 99999-9999"
                maskChar=""
                {...register('telefone', funcionariosValidator.telefone)}
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

            <Form.Group className="mb-3 w-25" controlId="cep">
              <Form.Label><strong>CEP: </strong></Form.Label>
              <InputMask
                mask="99999-999"
                maskChar=""
                {...register('cep', funcionariosValidator.cep)}
              >
                {(inputProps) => (
                  <Form.Control
                    isInvalid={errors.cep}
                    type="text"
                    {...inputProps}
                  />
                )}
              </InputMask>
              {errors.cep && <small>{errors.cep.message}</small>}
            </Form.Group>

            <Form.Group className="mb-3 w-50" controlId="endereco">
              <Form.Label><strong>Endereço: </strong></Form.Label>
              <Form.Control isInvalid={errors.endereco} type="text" {...register('endereco', funcionariosValidator.endereco)} />
              {errors.endereco && <small>{errors.endereco.message}</small>}
            </Form.Group>
          </Row>
        </Col>

        <div className='text-center'>
          <Button variant="primary" onClick={handleSubmit(salvar)}><AiOutlineCheck className="me-1" />Salvar</Button>
          <Link href={'/funcionarios'} className="ms-2 btn btn-danger"><IoMdArrowRoundBack className="me-1" />Voltar</Link>
        </div>
      </Form>
    </Pagina>
  )
}

export default Formulario;
