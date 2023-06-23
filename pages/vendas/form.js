import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Pagina from '../../components/Pagina';
import vendasValidator from '../../validators/vendasValidator';
import { mask } from 'remask';

function Formulario() {
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [quantidade, setQuantidade] = useState(0);
  const [total, setTotal] = useState(0);

  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    setClientes(getClientes());
    setFuncionarios(getFuncionarios());
    setProdutos(getAll('produtos'));
  }, []);

  function getClientes() {
    return JSON.parse(window.localStorage.getItem('clientes')) || [];
  }

  function getFuncionarios() {
    return JSON.parse(window.localStorage.getItem('funcionarios')) || [];
  }

  useEffect(() => {
    setQuantidade(Object.values(quantidades).reduce((acc, curr) => acc + curr, 0));
  }, [quantidades]);

  useEffect(() => {
    let sum = 0;
    selectedProducts.forEach(productName => {
      const product = produtos.find(item => item.nome === productName);
      if (product) {
        sum += product.preco * quantidades[productName];
      }
    });
    setTotal(sum);
  }, [selectedProducts, quantidades, produtos]);

  function getAll(key) {
    return JSON.parse(window.localStorage.getItem(key)) || [];
  }

  function salvar(dados) {
  const vendas = JSON.parse(window.localStorage.getItem('vendas')) || [];

  // Adicionar o novo venda ao array de vendas
  const venda = {
    cliente: dados.cliente,
    funcionario: dados.funcionario,
    produto: selectedProducts.join(', '), // Concatena os nomes dos produtos selecionados em uma única string
    total: total.toFixed(2) // Valor total da venda formatado com duas casas decimais
  };

  vendas.push(venda);

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

  const handleProductChange = event => {
    const productName = event.target.name;
    if (event.target.checked) {
      setSelectedProducts([...selectedProducts, productName]);
      setQuantidades({ ...quantidades, [productName]: 0 });
    } else {
      const updatedProducts = selectedProducts.filter(item => item !== productName);
      setSelectedProducts(updatedProducts);
      const { [productName]: _, ...updatedQuantidades } = quantidades;
      setQuantidades(updatedQuantidades);
    }
  };

  const handleQuantidadeChange = event => {
    const productName = event.target.name;
    const quantity = parseInt(event.target.value);
    setQuantidades({ ...quantidades, [productName]: quantity });
  };

  return (
    <Pagina titulo="Cadastrar Venda">
      <Form>
        <Row md={2}>

        <Row>
          <Col md={0}>
            <Form.Group className="mb-3">
              <Form.Label>Vendedor:</Form.Label>
              <Form.Select isInvalid={errors.funcionario} {...register('funcionario', vendasValidator.funcionario)} id="funcionario">
                {funcionarios.map(item => (
                  <option key={item.nome}>{item.nome}</option>
                  ))}
              </Form.Select>
              {errors.funcionario && <small>{errors.funcionario.message}</small>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cliente:</Form.Label>
              <Form.Select isInvalid={errors.cliente} {...register('cliente', vendasValidator.cliente)} id="cliente">
                {clientes.map(item => (
                  <option key={item.nome}>{item.nome}</option>
                ))}
              </Form.Select>
              {errors.cliente && <small>{errors.cliente.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={0}>
            <Form.Group className="mb-3" controlId="produto">
              <Form.Label><strong>Produtos:</strong></Form.Label>
              {produtos.map(product => (
                <div key={product.nome} className="d-flex align-items-center mb-2">
                  <Form.Check 
                    key={product.nome}
                    type="checkbox"
                    label={`${product.nome} (R$ ${product.preco ? product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'})`}
                    name={product.nome}
                    onChange={handleProductChange}
                  />

                  {selectedProducts.includes(product.nome) && (
                    <Form.Control 
                      type="number"
                      min="0"
                      name={product.nome}
                      value={quantidades[product.nome] || ''}
                      onChange={handleQuantidadeChange}
                      className="ms-2"
                      style={{ width: '80px' }}
                      />
                      )}
                </div>
              ))}
            </Form.Group>
          </Col>
        </Row>
              </Row>

        <div className="d-flex align-items-center justify-content-end pb-4">
          <span className="ms-2">Quantidade: {quantidade}</span>
          <span className="ms-2">Total: R$ {total.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-end">
          <Button variant="outline-primary" className="me-2">
            <Link href="/vendas">Cancelar</Link>
          </Button>
          <Button variant="primary" onClick={handleSubmit(salvar)}>
            Salvar
          </Button>
        </div>
      </Form>
    </Pagina>
  );
}

export default Formulario;
