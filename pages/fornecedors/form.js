import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Pagina from '../../components/Pagina';
import fornecedorsValidator from '../../validators/fornecedorsValidator';
import { mask } from 'remask';
import Swal from 'sweetalert2';

function Formulario() {
  const { push } = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  function salvar(dados) {
    const fornecedors = JSON.parse(window.localStorage.getItem('fornecedors')) || [];

    // Verificar se os campos já existem nos fornecedors cadastrados
    const camposIguais = fornecedors.some((fornecedor) => {
      return (
        fornecedor.nome === dados.nome &&
        fornecedor.cnpj === dados.cnpj &&
        fornecedor.telefone === dados.telefone &&
        fornecedor.email === dados.email &&
        fornecedor.propeitario === dados.propeitario
      );
    });

    if (camposIguais) {
      // Campos duplicados encontrados, exiba uma mensagem de erro ou tome alguma ação adequada
      console.log('Campos duplicados encontrados. Não é possível cadastrar novamente.');
      return;
    }

    // Adicionar o novo fornecedor ao array de fornecedors
    fornecedors.push(dados);

    // Armazenar o array atualizado no localStorage
    window.localStorage.setItem('fornecedors', JSON.stringify(fornecedors));

    push('/fornecedors');
  }

  function salvar(dados) {
    Swal.fire({
      title: 'Salvar Fornecedor',
      text: 'Deseja realmente salvar o fornecedor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(result => {
      if (result.isConfirmed) {
        const fornecedors = JSON.parse(window.localStorage.getItem('fornecedors')) || [];

        // Adicionar o novo fornecedor ao array de fornecedors
        fornecedors.push(dados);

        // Armazenar o array atualizado no localStorage
        window.localStorage.setItem('fornecedors', JSON.stringify(fornecedors));

        push('/fornecedors');
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
    <Pagina titulo="Cadastrar Fornecedor">
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
          <Form.Control isInvalid={errors.propeitario} type="text" mask="AAAAAAAAAAAAAAAAAAAAAAA" {...register('propeitario', fornecedorsValidator.propeitario)} onChange={handleChange} />
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
  );
}

export default Formulario;
