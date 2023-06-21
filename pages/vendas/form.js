import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Pagina from '../../components/Pagina';
import vendasValidator from '../../validators/vendasValidator';
import { mask } from 'remask';

function Formulario() {
  const { push } = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

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
          
        <Form.Group className="mb-3 w-25" controlId="data">
          <Form.Label><strong>DATA: </strong></Form.Label>
          <Form.Control isInvalid={errors.data} type="text" mask="999.999.999-99" {...register('data', vendasValidator.data)} onChange={handleChange} />
          {
            errors.data&&
            <small>{errors.data.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3 w-25" controlId="telefone">
          <Form.Label><strong>Telefone: </strong></Form.Label>
          <Form.Control isInvalid={errors.telefone} type="text" mask="(99) 99999-9999" {...register('telefone', vendasValidator.telefone)} onChange={handleChange} />
          {
            errors.telefone &&
            <small>{errors.telefone.message}</small>
          }
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
