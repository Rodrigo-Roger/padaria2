import Pagina from '../../components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import clientesValidator from '../../validators/clientesValidator'


function form() {

  const { push, query } = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

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
          <Form.Group className="mb-3 w-50" controlId="nome">
            <Form.Label><strong>Nome: </strong></Form.Label>
            <Form.Control isInvalid={errors.nome} type="text" {...register('nome', clientesValidator.nome)} />
            {errors.nome && <small>{errors.nome.message}</small>}
          </Form.Group>

          <Form.Group className="mb-3 w-25" controlId="cpf">
            <Form.Label><strong>CPF: </strong></Form.Label>
            <Form.Control isInvalid={errors.cpf} type="text" mask='999.999.999-99' {...register('cpf', clientesValidator.cpf)} onChange={handleChange} />
            {errors.cpf && <small>{errors.cpf.message}</small>}
          </Form.Group>

          <Form.Group className="mb-3 w-25" controlId="telefone">
            <Form.Label><strong>Telefone: </strong></Form.Label>
            <Form.Control isInvalid={errors.telefone} type="text" mask='(99) 99999-9999'{...register('telefone', clientesValidator.telefone)} onChange={handleChange} />
            {errors.telefone && <small>{errors.telefone.message}</small>}
          </Form.Group>
        </Row>

        <Row md={2}>
          <Form.Group className="mb-3 w-25" controlId="cep">
            <Form.Label><strong>CEP: </strong></Form.Label>
            <Form.Control isInvalid={errors.cep} type="text" mask='99999-999' {...register('cep', clientesValidator.cep)} onChange={handleChange} />
            {errors.cep && <small>{errors.cep.message}</small>}
          </Form.Group>

          <Form.Group className="mb-3 w-75" controlId="endereco">
            <Form.Label><strong>Endereço: </strong></Form.Label>
            <Form.Control isInvalid={errors.endereco} type="text"{...register('endereco', clientesValidator.endereco)} />
            {errors.endereco && <small>{errors.endereco.message}</small>}
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