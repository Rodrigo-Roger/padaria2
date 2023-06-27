import Pagina from '../../components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import fornecedorsValidator from '../../validators/fornecedorsValidator'
import { mask } from 'remask'


function form() {

  const { push, query } = useRouter()
  const { register, handleSubmit, setValue,formState: { errors } } = useForm()

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

  function getAllFornecedors() {
    return JSON.parse(window.localStorage.getItem('fornecedors')) || []
  }

  useEffect(() => {
    if (query.id) {
      const fornecedors = getAllFornecedors()
      const fornecedor = fornecedors[query.id]

      for (let atributo in fornecedor) {
        setValue(atributo, fornecedor[atributo])
      }
    }
  }, [query.id])


  function salvar(dados) {
    Swal.fire({
      title: 'Salvar Alterações',
      text: 'Deseja realmente salvar as alterações?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(result => {
      if (result.isConfirmed) {
        const fornecedors = getAllFornecedors()
        fornecedors.splice(query.id, 1, dados)
        window.localStorage.setItem('fornecedors', JSON.stringify(fornecedors))
        push('/fornecedors')
      }
    });
  }
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const mascara = event.target.getAttribute('mask');
    setValue(name, mask(value, mascara));
  }

  return (
    <Pagina titulo="Editar">

<Form>
        <Row md={3}>
        <Form.Group className="mb-3 w-50" controlId="nome">
          <Form.Label><strong>Nome: </strong></Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register('nome', fornecedorsValidator.nome)} />
          {
            errors.nome &&
            <small>{errors.nome.message}</small>
          }
        </Form.Group>
          
        <Form.Group className="mb-3 w-25" controlId="cnpj">
          <Form.Label><strong>CNPJ: </strong></Form.Label>
          <Form.Control isInvalid={errors.cnpj} type="text" mask="99.999.999/9999-99" {...register('cnpj', fornecedorsValidator.cnpj)} onChange={handleChange} />
          {
            errors.cnpj &&
            <small>{errors.cnpj.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3 w-25" controlId="telefone">
          <Form.Label><strong>Telefone: </strong></Form.Label>
          <Form.Control isInvalid={errors.telefone} type="text" mask="(99) 99999-9999" {...register('telefone', fornecedorsValidator.telefone)} onChange={handleChange} />
          {
            errors.telefone &&
            <small>{errors.telefone.message}</small>
          }
        </Form.Group>

          </Row>

          <Row md={2}>

        <Form.Group className="mb-3 w-25" controlId="email">
          <Form.Label><strong>EMAIL: </strong></Form.Label>
          <Form.Control isInvalid={errors.email} type="text" {...register('email', fornecedorsValidator.email)} />
          {
            errors.email &&
            <small>{errors.email.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3 w-75" controlId="propeitario">
          <Form.Label><strong>Propeitario: </strong></Form.Label>
          <Form.Control isInvalid={errors.propeitario} type="text"  {...register('propeitario', fornecedorsValidator.propeitario)} />
          {
            errors.propeitario &&
            <small>{errors.propeitario.message}</small>
          }
        </Form.Group>
          </Row>

          <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleSubmit(salvar)}>Salvar</Button>
          < Link href={'/fornecedors'} className="ms-2 btn btn-danger">Cancelar</Link>
          </div>
      </Form>

    </Pagina>
  )
}

export default form