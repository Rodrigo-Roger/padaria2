import Pagina from '../../components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'


function form() {

  const { push, query } = useRouter()
  const { register, handleSubmit, setValue } = useForm()

  function getAllClientes() {
    return JSON.parse(window.localStorage.getItem('clientes')) || []
  }

  useEffect(() => {
    if (query.id) {
      const clientes = getAllClientes()
      const cliente = clientes[query.id]

      for (let atributo in cliente) {
        setValue(atributo, cliente[atributo])
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
        const clientes = getAllClientes()
        clientes.splice(query.id, 1, dados)
        window.localStorage.setItem('clientes', JSON.stringify(clientes))
        push('/clientes')
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
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label><strong>Nome: </strong></Form.Label>
          <Form.Control type="text" {...register('nome')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="cpf">
          <Form.Label><strong>CPF: </strong></Form.Label>
          <Form.Control type="text" {...register('cpf')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="telefone">
          <Form.Label><strong>TELEFONE: </strong></Form.Label>
          <Form.Control type="text" {...register('telefone')} />
        </Form.Group>
        </Row>

        <Row md={2}>
        <Form.Group className="mb-3" controlId="cep">
          <Form.Label><strong>CEP: </strong></Form.Label>
          <Form.Control type="text" {...register('cep')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="endereco">
          <Form.Label><strong>ENDEREÇO: </strong></Form.Label>
          <Form.Control type="text" {...register('endereco')} />
        </Form.Group>

        </Row>
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleSubmit(salvar)}>Salvar</Button>
          <Link href="/clientes" className="ms-2 btn btn-danger">Cancelar</Link>
        </div>
      </Form>

    </Pagina>
  )
}

export default form