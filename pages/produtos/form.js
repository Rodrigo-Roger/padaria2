import React, { useEffect } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Pagina from '../../components/Pagina';
import produtosValidator from '../../validators/produtosValidator';
import { mask } from 'remask';
import Swal from 'sweetalert2';

function Formulario() {

  const [fornecedors, setFornecedors] = useState([])

  const { push } = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    setFornecedors(getAllFornecedors())
  }, [])

  function getAllFornecedors() {
    return JSON.parse(window.localStorage.getItem('fornecedors')) || []
  }

  function salvar(dados) {
    Swal.fire({
      title: 'Salvar Produto',
      text: 'Deseja realmente salvar o produto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(result => {
      if (result.isConfirmed) {
        const produtos = JSON.parse(window.localStorage.getItem('produtos')) || [];

        // Adicionar o novo produto ao array de produtos
        produtos.push(dados);

        // Armazenar o array atualizado no localStorage
        window.localStorage.setItem('produtos', JSON.stringify(produtos));

        push('/produtos');
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
    <Pagina titulo="Cadastrar Produto">
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
              {fornecedors.map(item => (
                <option key={item.id} value={item.nome}>{item.nome}</option>
              ))}
            </Form.Select>
            {errors.fornecedor && <small>{errors.fornecedor.message}</small>}
          </Form.Group>
        </Row>

        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleSubmit(salvar)}>Salvar</Button>
          <Link href={'/produtos'} className="ms-2 btn btn-danger">Cancelar</Link>
        </div>
      </Form>
    </Pagina>
  );
}

export default Formulario;
