import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Pagina from '../../components/Pagina';
import vendasValidator from '../../validators/vendasValidator';
import { mask } from 'remask';

function Formulario() {
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
    setProdutos(getAll('produtos'));
  }, []);

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
  }, [selectedProducts, quantidades]);

  function getAll(key) {
    return JSON.parse(window.localStorage.getItem(key)) || [];
  }

  function salvar(dados) {
    const vendas = JSON.parse(window.localStorage.getItem('vendas')) || [];

    // Verificar se os campos já existem nos vendas cadastrados
    const camposIguais = vendas.some(venda => {
      return (
        venda.valor === dados.valor &&
        venda.data === dados.data &&
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
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="valor">
              <Form.Label><strong>Valor: </strong></Form.Label>
              <Form.Control isInvalid={errors.valor} type="text" {...register('valor', vendasValidator.valor)} />
              {errors.valor && <small>{errors.valor.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
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

        <div className="d-flex align-items-center">
          
          <span className="ms-2">Quantidade: {quantidade}</span>
          <span className="ms-2">Total: R$ {total.toFixed(2)}</span>
        </div>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="cep">
              <Form.Label><strong>CEP: </strong></Form.Label>
              <Form.Control isInvalid={errors.cep} type="text" mask="99999-999" {...register('cep', vendasValidator.cep)} onChange={handleChange} />
              {errors.cep && <small>{errors.cep.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="endereco">
              <Form.Label><strong>ENDEREÇO: </strong></Form.Label>
              <Form.Control isInvalid={errors.endereco} type="text" mask="AAAAAAAAAAAAAAAAAAAAAAA" {...register('endereco', vendasValidator.endereco)} onChange={handleChange} />
              {errors.endereco && <small>{errors.endereco.message}</small>}
            </Form.Group>
          </Col>
        </Row>

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
