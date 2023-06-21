import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Pagina from '../../components/Pagina';
import funcionariosValidator from '../../validators/funcionariosValidator';
import { mask } from 'remask';

function Formulario() {
  const { push } = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  function salvar(dados) {
    const funcionarios = JSON.parse(window.localStorage.getItem('funcionarios')) || [];

    // Verificar se os campos já existem nos funcionarios cadastrados
    const camposIguais = funcionarios.some((funcionario) => {
      return (
        funcionario.nome === dados.nome &&
        funcionario.cpf === dados.cpf &&
        funcionario.telefone === dados.telefone &&
        funcionario.cep === dados.cep &&
        funcionario.endereco === dados.endereco
      );
    });

    if (camposIguais) {
      // Campos duplicados encontrados, exiba uma mensagem de erro ou tome alguma ação adequada
      console.log('Campos duplicados encontrados. Não é possível cadastrar novamente.');
      return;
    }

    // Adicionar o novo funcionario ao array de funcionarios
    funcionarios.push(dados);

    // Armazenar o array atualizado no localStorage
    window.localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

    push('/funcionarios');
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const mascara = event.target.getAttribute('mask');
    setValue(name, mask(value, mascara));
  }

  return (
    <Pagina titulo="Cadastrar Funcionario">
      <Form>
        <Row md={3}>
        <Form.Group className="mb-3 w-50" controlId="nome">
          <Form.Label><strong>Nome: </strong></Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" {...register('nome', funcionariosValidator.nome)} />
          {
            errors.nome &&
            <small>{errors.nome.message}</small>
          }
        </Form.Group>
          
        <Form.Group className="mb-3 w-25" controlId="cpf">
          <Form.Label><strong>CPF: </strong></Form.Label>
          <Form.Control isInvalid={errors.cpf} type="text" mask="999.999.999-99" {...register('cpf', funcionariosValidator.cpf)} onChange={handleChange} />
          {
            errors.cpf &&
            <small>{errors.cpf.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3 w-25" controlId="telefone">
          <Form.Label><strong>Telefone: </strong></Form.Label>
          <Form.Control isInvalid={errors.telefone} type="text" mask="(99) 99999-9999" {...register('telefone', funcionariosValidator.telefone)} onChange={handleChange} />
          {
            errors.telefone &&
            <small>{errors.telefone.message}</small>
          }
        </Form.Group>

          </Row>

          <Row md={2}>

        <Form.Group className="mb-3 w-25" controlId="cep">
          <Form.Label><strong>CEP: </strong></Form.Label>
          <Form.Control isInvalid={errors.cep} type="text" mask="99999-999" {...register('cep', funcionariosValidator.cep)} onChange={handleChange} />
          {
            errors.cep &&
            <small>{errors.cep.message}</small>
          }
        </Form.Group>

        <Form.Group className="mb-3 w-75" controlId="endereco">
          <Form.Label><strong>ENDEREÇO: </strong></Form.Label>
          <Form.Control isInvalid={errors.endereco} type="text" mask="AAAAAAAAAAAAAAAAAAAAAAA" {...register('endereco', funcionariosValidator.endereco)} onChange={handleChange} />
          {
            errors.endereco &&
            <small>{errors.endereco.message}</small>
          }
        </Form.Group>
          </Row>

          <div className="d-flex justify-content-end">
          <Button variant="outline-primary" onClick={handleSubmit(salvar)}>Salvar</Button>
          < Link href={'/funcionarios'} className="ms-2 btn btn-danger">Cancelar</Link>
          </div>
      </Form>
    </Pagina>
  );
}

export default Formulario;
