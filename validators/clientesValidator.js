const clientesValidator = {
    nome: {
      required: 'Este campo é obrigatório!',
      minLength: {
        value: 3,
        message: 'O nome deve ter no mínimo 3 letras!',
      },
      maxLength: {
        value: 20,
        message: 'Para facilitar, deve ter apenas nome e sobrenome!',
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
    },
  
    telefone: {
      required: 'Este campo é obrigatório!',
      maxLength: {
        value: 15,
        message: 'Insira um telefone válido incluindo o DDD!',
      },
      pattern: {
        value: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
        message: 'Insira um telefone válido no formato (99) 9999-9999',
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
    },
  
    endereco: {
      required: 'Este campo é obrigatório!',
      maxLength: {
        value: 100,
        message: 'Insira um endereço válido!',
      },
    },
  };
  
  export default clientesValidator;
  