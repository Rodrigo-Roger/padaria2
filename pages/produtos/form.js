import React, { useEffect } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Pagina from '../../components/Pagina';
import produtosValidator from '../../validators/produtosValidator';
import { mask } from 'remask';

function Formulario() {

  const [fornecedors, setFornecedors] = useState([])

  const { push } = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    setFornecedors(getAll)
  }, [])

  function getAll() {
    return JSON.parse(window.localStorage.getItem('fornecedors')) || []
  }

  function salvar(dados) {
    const produtos = JSON.parse(window.localStorage.getItem('produtos')) || [];

    // Verificar se os campos já existem nos produtos cadastrados
    const camposIguais = produtos.some((produto) => {
      return (
        produto.nome === dados.nome &&
        produto.fornecedors === dados.fornecedors &&
        produto.endereco === dados.endereco
      );
    });

    if (camposIguais) {
      // Campos duplicados encontrados, exiba uma mensagem de erro ou tome alguma ação adequada
      console.log('Campos duplicados encontrados. Não é possível cadastrar novamente.');
      return;
    }

    // Adicionar o novo produto ao array de produtos
    produtos.push(dados);

    // Armazenar o array atualizado no localStorage
    window.localStorage.setItem('produtos', JSON.stringify(produtos));

    push('/produtos');
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
          <Form.Label><strong>Nome: </strong></Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register('nome', produtosValidator.nome)} />
          {
            errors.nome &&
            <small>{errors.nome.message}</small>
          }
        </Form.Group>
          
        <Form.Group className="mb-3 w-25" controlId="validade">
          <Form.Label><strong>VALIDADE: </strong></Form.Label>
          <Form.Control isInvalid={errors.validade} type="text" mask="99/99" {...register('validade', produtosValidator.validade)} onChange={handleChange} />
          {
            errors.validade &&
            <small>{errors.validade.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3 w-25" controlId="preco">
          <Form.Label><strong>Preço: </strong></Form.Label>
          <Form.Control isInvalid={errors.preco} type="text" mask="R$ 99,99" {...register('preco', produtosValidator.preco)} onChange={handleChange} />
          {
            errors.preco &&
            <small>{errors.preco.message}</small>
          }
        </Form.Group>

          </Row>

          <Row md={2}>

          <Form.Group className="mb-3">
            <Form.Label >Fornecedor:</Form.Label>
            <Form.Select isInvalid={true}  {...register('fornecedor', produtosValidator.fornecedor)} id="fornecedor">
              {fornecedors.map(item => (
                <option>{item.nome}</option>
              ))}
              {
                errors.fornecedor &&
                <small>{errors.fornecedor.message}</small>
              }
            </Form.Select>
          </Form.Group>

        <Form.Group className="mb-3 w-75" controlId="endereco">
          <Form.Label><strong>ENDEREÇO: </strong></Form.Label>
          <Form.Control isInvalid={errors.endereco} type="text" mask="AAAAAAAAAAAAAAAAAAAAAAA" {...register('endereco', produtosValidator.endereco)} onChange={handleChange} />
          {
            errors.endereco &&
            <small>{errors.endereco.message}</small>
          }
        </Form.Group>
          </Row>

          <div className="d-flex justify-content-end">
          <Button variant="outline-primary" onClick={handleSubmit(salvar)}>Salvar</Button>
          < Link href={'/produtos'} className="ms-2 btn btn-danger">Cancelar</Link>
          </div>
      </Form>
    </Pagina>
  );
}

export default Formulario;
