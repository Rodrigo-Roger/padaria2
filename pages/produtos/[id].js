import Pagina from '../../components/Pagina'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import produtosValidator from '../../validators/produtosValidator'
import { mask } from 'remask'
import Swal from 'sweetalert2'

function Formulario() {

  const [fornecedors, setFornecedors] = useState([])
  const { push, query } = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  useEffect(() => {
    setFornecedors(getAllFornecedors())
  }, [])

  function getAllFornecedors() {
    return JSON.parse(window.localStorage.getItem('fornecedors')) || []
  }

  function getAllProdutos() {
    return JSON.parse(window.localStorage.getItem('produtos')) || []
  }

  useEffect(() => {
    if (query.id) {
      const produtos = getAllProdutos()
      const produto = produtos[query.id]

      for (let atributo in produto) {
        setValue(atributo, produto[atributo])
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
        const produtos = getAllProdutos()
        produtos.splice(query.id, 1, dados)
        window.localStorage.setItem('produtos', JSON.stringify(produtos))
        push('/produtos')
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
    <Pagina titulo="Editar Produto">
      <Form>
        <Row md={3}>
          <Form.Group className="mb-3 w-50" controlId="nome">
            <Form.Label><strong>Nome:</strong></Form.Label>
            <Form.Control isInvalid={errors.nome} type="text" {...register('nome', produtosValidator.nome)} />
            {errors.nome && <small>{errors.nome.message}</small>}
          </Form.Group>

          <Form.Group className="mb-3 w-25" controlId="validade">
            <Form.Label><strong>Validade:</strong></Form.Label>
            <Form.Control isInvalid={errors.validade} type="text" mask="99/99" {...register('validade', produtosValidator.validade)} onChange={handleChange} />
            {errors.validade && <small>{errors.validade.message}</small>}
          </Form.Group>

          <Form.Group className="mb-3 w-25" controlId="preco">
            <Form.Label><strong>Preço:</strong></Form.Label>
            <Form.Control isInvalid={errors.preco} type="text" mask='999999999999' {...register('preco', produtosValidator.preco)} onChange={handleChange} />
            {errors.preco && <small>{errors.preco.message}</small>}
          </Form.Group>
        </Row>

        <Row md={2}>
          <Form.Group className="mb-3">
            <Form.Label>Fornecedor:</Form.Label>
            <Form.Select isInvalid={errors.fornecedor} {...register('fornecedor', produtosValidator.fornecedor)} id="fornecedor">
              {fornecedors.map((item, index) => (
                <option key={index} value={item.nome}>{item.nome}</option>
              ))}
            </Form.Select>
            {errors.fornecedor && <small>{errors.fornecedor.message}</small>}
          </Form.Group>
        </Row>

        <div className="d-flex justify-content-end">
          <Button variant="outline-primary" onClick={handleSubmit(salvar)}>Salvar</Button>
          <Link href="/produtos" className="ms-2 btn btn-danger">Cancelar</Link>
        </div>
      </Form>
    </Pagina>
  )
}

export default Formulario
