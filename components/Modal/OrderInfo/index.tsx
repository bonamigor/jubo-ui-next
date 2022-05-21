import { NextPage } from 'next';
import { CancelSection, ConfirmSection, Container, OrderFooter, OrderHeader, OrderItems } from "./orderInfo";
import Modal from 'react-modal'
import { useState, useEffect } from 'react';
import { pedidoService } from '../../../services';
import { format } from 'date-fns'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

interface Pedido {
  id: number;
  dataCriacao: string;
  valorTotal: number;
  nome: string;
  cidade: string;
  estado: string;
}

interface ProductsProps {
  itemPedidoId: string;
  produtoId: string;
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
  const router = useRouter()
  const [products, setProducts] = useState<ProductsProps[]>([])
  const [dataEntrega, setDataEntrega] = useState('')

  useEffect(() => {
    const fetchProdutosNoPedido = async () => {
      const { data, errors } = await pedidoService.listarProdutosByPedidoId(pedido.id)

      if (!errors) {
        setProducts(data.produtos)
      }
    }

    fetchProdutosNoPedido()
  }, [pedido.id])

  const confirmOrder = async () => {
    const data = dataEntrega.split('/')
    const novaData = new Date(Number(data[2]), (Number(data[1]) - 1), Number(data[0]))
    const dataFormatada = format(novaData, 'yyyy-MM-dd')
    try {
      const { data, errors } = await pedidoService.confirmarPedidoById({ pedidoId: pedido.id, dataEntrega: dataFormatada })

      if (!errors) {
        toast.success(data.message)
        onRequestClose()
        router.reload()
      } else {
        toast.error('Não foi possível confirmar o pedido, verifique!')
      }
    } catch (error) {
      toast.error('Erro ao confirmar o pedido.')
      console.error(error)
    }
  }

  const cancelOrder = async () => {
    try {
      const { data, errors } = await pedidoService.cancelarPedidoById(pedido.id)

      if (!errors) {
        toast.success(data.message)
        onRequestClose()
        router.reload()
      } else {
        toast.error('Não foi possível cancelar o pedido, verifique!')
      }
    } catch (error) {
      toast.error('Erro ao cancelar o pedido.')
      console.error(error)
    }
  }

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
        <OrderFooter>
          <ConfirmSection>
            <h2>Deseja confirmar?</h2>
            <div>
              <input type="text"  placeholder='Data de Entrega' value={dataEntrega} onChange={event => {setDataEntrega(event.target.value)}} />
              <button onClick={confirmOrder}>Confirmar Pedido</button>
            </div>
          </ConfirmSection>
          <CancelSection>
            <h2>Ou, deseja cancelar o pedido?</h2>
            <button onClick={cancelOrder}>Cancelar Pedido</button>
          </CancelSection>
        </OrderFooter>
      </Container>
    </Modal>

  )
}

export default OrderInfo