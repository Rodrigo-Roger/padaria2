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
        return 'Nome já cadastrado!';
      }

      return true;
    },
  },

  validade: {
    required: 'Este campo é obrigatório!',
    pattern: {
      value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
      message: 'Insira uma data de validade válida no formato mm/aa',
    },
  
    validate: (value) => {
      const clientes = JSON.parse(window.localStorage.getItem('clientes')) || [];

      const duplicado = clientes.some((cliente) => cliente.validade === value);

      if (duplicado) {
        return 'VALIDADE já cadastrado!';
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
        return 'Telefone já cadastrado!';
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
        return 'CEP já cadastrado!';
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
        return 'Endereço já cadastrado!';
      }

      return true;
    },
  },
};

export default clientesValidator;
