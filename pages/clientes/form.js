import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Pagina from '../../components/Pagina';
import clientesValidator from '../../validators/clientesValidator';
import { mask } from 'remask';

function Formulario() {
  const { push } = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  function salvar(dados) {
    const clientes = JSON.parse(window.localStorage.getItem('clientes')) || [];

    // Verificar se os campos já existem nos clientes cadastrados
    const camposIguais = clientes.some((cliente) => {
      return (
        cliente.nome === dados.nome &&
        cliente.cpf === dados.cpf &&
        cliente.telefone === dados.telefone &&
        cliente.cep === dados.cep &&
        cliente.endereco === dados.endereco
      );
    });

    if (camposIguais) {
      // Campos duplicados encontrados, exiba uma mensagem de erro ou tome alguma ação adequada
      console.log('Campos duplicados encontrados. Não é possível cadastrar novamente.');
      return;
    }

    // Adicionar o novo cliente ao array de clientes
    clientes.push(dados);

    // Armazenar o array atualizado no localStorage
    window.localStorage.setItem('clientes', JSON.stringify(clientes));

    push('/clientes');
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const mascara = event.target.getAttribute('mask');
    setValue(name, mask(value, mascara));
  }

  return (
    <Pagina titulo="Cadastrar Cliente">
      <Form>
        <Row md={3}>
        <Form.Group className="mb-3 w-50" controlId="nome">
          <Form.Label><strong>Nome: </strong></Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register('nome', clientesValidator.nome)} />
          {
            errors.nome &&
            <small>{errors.nome.message}</small>
          }
        </Form.Group>
          
        <Form.Group className="mb-3 w-25" controlId="cpf">
          <Form.Label><strong>CPF: </strong></Form.Label>
          <Form.Control isInvalid={errors.cpf} type="text" mask="999.999.999-99" {...register('cpf', clientesValidator.cpf)} onChange={handleChange} />
          {
            errors.cpf &&
            <small>{errors.cpf.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3 w-25" controlId="telefone">
          <Form.Label><strong>Telefone: </strong></Form.Label>
          <Form.Control isInvalid={errors.telefone} type="text" mask="(99) 99999-9999" {...register('telefone', clientesValidator.telefone)} onChange={handleChange} />
          {
            errors.telefone &&
            <small>{errors.telefone.message}</small>
          }
        </Form.Group>

          </Row>

          <Row md={2}>

        <Form.Group className="mb-3 w-25" controlId="cep">
          <Form.Label><strong>CEP: </strong></Form.Label>
          <Form.Control isInvalid={errors.cep} type="text" mask="99999-999" {...register('cep', clientesValidator.cep)} onChange={handleChange} />
          {
            errors.cep &&
            <small>{errors.cep.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3 w-75" controlId="endereco">
          <Form.Label><strong>ENDEREÇO: </strong></Form.Label>
          <Form.Control isInvalid={errors.endereco} type="text" {...register('endereco', clientesValidator.endereco)}  />
          {
            errors.endereco &&
            <small>{errors.endereco.message}</small>
          }
        </Form.Group>
          </Row>

          <div className="d-flex justify-content-end">
          <Button variant="outline-primary" onClick={handleSubmit(salvar)}>Salvar</Button>
          < Link href={'/clientes'} className="ms-2 btn btn-danger">Cancelar</Link>
          </div>
      </Form>
    </Pagina>
  );
}

export default Formulario;
