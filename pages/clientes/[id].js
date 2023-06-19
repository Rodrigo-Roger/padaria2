import Pagina from '../../components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'
import clientesValidator from '../../validators/clientesValidator'
import InputMask from 'react-input-mask'

function Formulario() {

  const { push, query } = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  function getAll() {
    return JSON.parse(window.localStorage.getItem('clientes')) || []
  }

  useEffect(() => {

    if (query.id) {
      const clientes = getAll()
      const cliente = clientes[query.id]

      for(let atributo in cliente){
        setValue(atributo, cliente[atributo])
      }
    }

  }, [query.id])

  function salvar(dados) {
    const clientes = getAll()
    //clientes.push(dados)
    clientes.splice(query.id, 1, dados)
    window.localStorage.setItem('clientes', JSON.stringify(clientes))
    push('/clientes')
  }

  return (
    <Pagina titulo="Formulário">
      <Form>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label><strong>Nome: </strong></Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register('nome', clientesValidator.nome)} />
          {errors.nome && <small>{errors.nome.message}</small>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="cpf">
          <Form.Label><strong>CPF: </strong></Form.Label>
          <InputMask
            mask="999.999.999-99"
            maskChar=""
            {...register('cpf', clientesValidator.cpf)}
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
                {...register('telefone', clientesValidator.telefone)}
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
                {...register('cep', clientesValidator.cep)}
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
              <Form.Control isInvalid={errors.endereco} type="text" {...register('endereco', clientesValidator.endereco)} />
              {errors.endereco && <small>{errors.endereco.message}</small>}
            </Form.Group>
          </Row>
        </Col>

        <div className='text-center'>
          <Button variant="primary" onClick={handleSubmit(salvar)}><AiOutlineCheck className="me-1" />Salvar</Button>
          <Link href={'/clientes'} className="ms-2 btn btn-danger"><IoMdArrowRoundBack className="me-1" />Voltar</Link>
        </div>
      </Form>
    </Pagina>
  )
}

export default Formulario;