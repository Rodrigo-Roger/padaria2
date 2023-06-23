const produtosValidator = {
  nome: {
    required: 'Este campo é obrigatório!',
    minLength: {
      value: 3,
      message: 'O nome da empresa deve ter no mínimo 3 letras!',
    },
    maxLength: {
      value: 100,
      message: 'se for o caso abrevie o nome!',
    },
    
  },

  validade: {
    required: 'Este campo é obrigatório!',
    pattern: {
      value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
      message: 'Insira uma data de validade válida no formato mm/aa',
    },
  
  },

  preco: {
    required:'esté campo é obrigatorio!'
  },

  fornecedor: {
    required:'esté campo é obrigatorio!'
  }
};

export default produtosValidator;
