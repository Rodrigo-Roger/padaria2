import React, { useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Pagina from '../../components/Pagina';
import vendasValidator from '../../validators/vendasValidator';
import { mask } from 'remask';

function Formulario() {
  const [produtos, setProdutos] = useState([])

  const { push } = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  useEffect(() => {
    setProdutos(getAll)
  }, [])

  function getAll() {
    return JSON.parse(window.localStorage.getItem('produtos')) || []
  }

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    setClientes(getAll)
  }, [])

  function getAll() {
    return JSON.parse(window.localStorage.getItem('clientes')) || []
  }

  const [funcionarios, setFuncionarios] = useState([])

  useEffect(() => {
    setFuncionarios(getAll)
  }, [])

  function getAll() {
    return JSON.parse(window.localStorage.getItem('funcionarios')) || []
  }

  function salvar(dados) {
    const vendas = JSON.parse(window.localStorage.getItem('vendas')) || [];

    // Verificar se os campos já existem nos vendas cadastrados
    const camposIguais = vendas.some((venda) => {
      return (
        venda.valor === dados.valor &&
        venda.data=== dados.data&&
        venda.telefone === dados.telefone &&
        venda.cep === dados.cep &&
        venda.endereco === dados.endereco
      );
    });

    if (camposIguais) {
      // Campos duplicados encontrados, exiba uma mensagem de erro ou tome alguma ação adequada
      console.log('Campos duplicados encontrados. Não é possível cadastrar novamente.');
      return;
    }

    // Adicionar o novo venda ao array de vendas
    vendas.push(dados);

    // Armazenar o array atualizado no localStorage
    window.localStorage.setItem('vendas', JSON.stringify(vendas));

    push('/vendas');
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const mascara = event.target.getAttribute('mask');
    setValue(name, mask(value, mascara));
  }

  return (
    <Pagina titulo="Cadastrar Venda">
      <Form>
        <Row md={3}>
        <Form.Group className="mb-3 w-50" controlId="valor">
          <Form.Label><strong>Valor: </strong></Form.Label>
          <Form.Control isInvalid={errors.valor} type="text" {...register('valor', vendasValidator.valor)} />
          {
            errors.valor &&
            <small>{errors.valor.message}</small>
          }
        </Form.Group>
          
        <Form.Group className="mb-3">
            <Form.Label >Produto:</Form.Label>
            <Form.Select isInvalid={true}  {...register('produto', vendasValidator.produto)} id="produto">
              {produtos.map(item => (
                <option>{item.nome}</option>
              ))}
              {
                errors.produto &&
                <small>{errors.produto.message}</small>
              }
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label >Vendedor:</Form.Label>
            <Form.Select isInvalid={true}  {...register('funcionario', vendasValidator.funcionario)} id="funcionario">
              {funcionarios.map(item => (
                <option>{item.nome}</option>
              ))}
              {
                errors.funcionario &&
                <small>{errors.funcionario.message}</small>
              }
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label >Cliente:</Form.Label>
            <Form.Select isInvalid={true}  {...register('cliente', vendasValidator.cliente)} id="cliente">
              {clientes.map(item => (
                <option>{item.nome}</option>
              ))}
              {
                errors.cliente &&
                <small>{errors.cliente.message}</small>
              }
            </Form.Select>
          </Form.Group>


          </Row>

          <Row md={2}>

        <Form.Group className="mb-3 w-25" controlId="cep">
          <Form.Label><strong>CEP: </strong></Form.Label>
          <Form.Control isInvalid={errors.cep} type="text" mask="99999-999" {...register('cep', vendasValidator.cep)} onChange={handleChange} />
          {
            errors.cep &&
            <small>{errors.cep.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3 w-75" controlId="endereco">
          <Form.Label><strong>ENDEREÇO: </strong></Form.Label>
          <Form.Control isInvalid={errors.endereco} type="text" mask="AAAAAAAAAAAAAAAAAAAAAAA" {...register('endereco', vendasValidator.endereco)} onChange={handleChange} />
          {
            errors.endereco &&
            <small>{errors.endereco.message}</small>
          }
        </Form.Group>
          </Row>

          <div className="d-flex justify-content-end">
          <Button variant="outline-primary" onClick={handleSubmit(salvar)}>Salvar</Button>
          < Link href={'/vendas'} className="ms-2 btn btn-danger">Cancelar</Link>
          </div>
      </Form>
    </Pagina>
  );
}

export default Formulario;
