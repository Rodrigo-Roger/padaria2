const fornecedorsValidator = {
  nome: {
    required: 'Este campo é obrigatório!',
    minLength: {
      value: 3,
      message: 'O nome deve ter no mínimo 3 letras!',
    },
    maxLength: {
      value: 100,
      message: 'se caso precisar abrevie p nome de sua empresa',
    },
  },

  cnpj: {
    required: 'Este campo é obrigatório!',
  maxLength: {
    value: 18,
    message: 'Insira um CNPJ válido!',
  },
  minLength: {
    value: 18,
    message: 'Lembrando que o campo CNPJ deve conter 14 números!',
  },
  pattern: {
    value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    message: 'Insira um CNPJ válido no formato 99.999.999/9999-99',
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

  email: {
    required: 'Este campo é obrigatório!',
    maxLength: {
      value: 100,
      message: 'Insira um EMAIL válido!',
    },
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message: 'Insira um EMAIL válido no formato exemplo@dominio.com',
    },
  

  
    validate: (value) => {
      const clientes = JSON.parse(window.localStorage.getItem('clientes')) || [];

      const duplicado = clientes.some((cliente) => cliente.email === value);

      if (duplicado) {
        return 'EMAIL já cadastrado!';
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

export default fornecedorsValidator;
