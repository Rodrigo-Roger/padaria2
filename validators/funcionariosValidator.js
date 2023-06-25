import { notification } from 'antd';

const clientesValidator = {
  nome: {
    required: 'Este campo é obrigatório!',
    minLength: {
      value: 3,
      message: 'O nome deve ter no mínimo 3 letras!',
    },
    maxLength: {
      value: 100,
      message: 'Para facilitar, deve ter apenas nome e sobrenome!',
    },
    validate: (value) => {
      const clientes = JSON.parse(window.localStorage.getItem('clientes')) || [];

      const duplicado = clientes.some((cliente) => cliente.nome === value);

      if (duplicado) {
        notification.error({
          message: 'Erro',
          description: 'Nome já cadastrado!',
        });
        return false;
      }

      return true;
    },
  },

  cpf: {
    required: 'Este campo é obrigatório!',
    maxLength: {
      value: 14,
      message: 'Insira um CPF válido!',
    },
    min: {
      value: 14,
      message: 'Lembrando que o campo CPF deve conter 11 números!',
    },
    pattern: {
      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      message: 'Insira um CPF válido no formato 999.999.999-99',
    },
    validate: (value) => {
      const clientes = JSON.parse(window.localStorage.getItem('clientes')) || [];

      const duplicado = clientes.some((cliente) => cliente.cpf === value);

      if (duplicado) {
        notification.error({
          message: 'Erro',
          description: 'CPF já cadastrado!',
        });
        return false;
      }

      return true;
    },
  },

  telefone: {
    required: 'Este campo é obrigatório!',
    pattern: {
      value: /^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/,
      message: 'Digite um número de telefone válido',
    },
    validate: (value) => {
      const clientes = JSON.parse(window.localStorage.getItem('clientes')) || [];

      const duplicado = clientes.some((cliente) => cliente.telefone === value);

      if (duplicado) {
        notification.error({
          message: 'Erro',
          description: 'Telefone já cadastrado!',
        });
        return false;
      }

      return true;
    },
  },

  cep: {
    required: 'Este campo é obrigatório!',
    maxLength: {
      value: 9,
      message: 'Insira um CEP válido!',
    },
    pattern: {
      value: /^\d{5}-\d{3}$/,
      message: 'Insira um CEP válido no formato 99999-999',
    },
    validate: (value) => {
      const clientes = JSON.parse(window.localStorage.getItem('clientes')) || [];

      const duplicado = clientes.some((cliente) => cliente.cep === value);

      if (duplicado) {
        notification.error({
          message: 'Erro',
          description: 'CEP já cadastrado!',
        });
        return false;
      }

      return true;
    },
  },

  endereco: {
    required: 'Este campo é obrigatório!',
    maxLength: {
      value: 100,
      message: 'Insira um endereço válido!',
    },
    validate: (value) => {
      const clientes = JSON.parse(window.localStorage.getItem('clientes')) || [];

      const duplicado = clientes.some((cliente) => cliente.endereco === value);

      if (duplicado) {
        notification.error({
          message: 'Erro',
          description: 'Endereço já cadastrado!',
        });
        return false;
      }

      return true;
    },
  },
};

export default clientesValidator;
