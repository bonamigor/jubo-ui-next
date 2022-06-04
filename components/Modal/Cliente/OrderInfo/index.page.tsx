import { NextPage } from 'next';
import {  Container, OrderHeader, OrderItems } from "./orderInfo";
import Modal from 'react-modal'
import { useState, useEffect } from 'react';
import { pedidoService } from '../../../../services';
import { useRouter } from 'next/router';

interface Pedido {
  id: number;
  endereco: string;
  dataCriacao: string;
  valorTotal: number;
  nome: string;
  cidade: string;
  estado: string;
  telefone: string;
}

interface ProductsProps {
  itemPedidoId: string;
  produtoId?: string;
  nome: string;
  unidade: string;
  precoVenda: number;
  quantidade: number;
  total: number;
}

interface OrderInfoModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  pedido: Pedido;
}

const OrderInfo: NextPage<OrderInfoModalProps> = ({ isOpen, onRequestClose, pedido }) => {
  const [products, setProducts] = useState<ProductsProps[]>([])

  useEffect(() => {
    const fetchProdutosNoPedido = async () => {
      const { data, errors } = await pedidoService.listarProdutosByPedidoId(pedido.id)

      if (!errors) {
        setProducts(data.produtos)
      }
    }

    fetchProdutosNoPedido()
  }, [pedido.id])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
        <OrderHeader>
          <h1>Informações do Pedido</h1>
          <div>
            <p>ID: {pedido.id}</p> -
            <p>Colégio: {pedido.nome}</p> -
            <p>Cidade/Estado: {`${pedido.cidade}/${pedido.estado}`}</p>
          </div>
        </OrderHeader>
        <OrderItems>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Unidade</th>
                <th>Quantidade</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {
                products.map(product => {
                  return (
                    <tr key={String(product.itemPedidoId)}>
                      <td>{product.itemPedidoId}</td>
                      <td>{product.nome}</td>
                      <td>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(product.precoVenda)}
                      </td>
                      <td>{product.unidade}</td>
                      <td>{product.quantidade}</td>
                      <td>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(product.total)}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <h3>
            Valor Total: {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(pedido.valorTotal)}
          </h3>
        </OrderItems>
      </Container>
    </Modal>

  )
}

export default OrderInfo