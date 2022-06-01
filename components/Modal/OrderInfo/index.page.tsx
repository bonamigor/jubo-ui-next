import { NextPage } from 'next';
import { CancelSection, ConfirmSection, Container, OrderFooter, OrderHeader, OrderItems } from "./orderInfo";
import Modal from 'react-modal'
import { useState, useEffect } from 'react';
import { pedidoService } from '../../../services';
import { format } from 'date-fns'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

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

  const generatePdf = () => {
    const doc = new jsPDF('l')

    products.forEach(product => {
      delete product['produtoId'];
    })

    // const formatedPrices = products.map(produto => {
    //   produto.precoVenda = Number(new Intl.NumberFormat('pt-BR', {
    //       style: 'currency',
    //       currency: 'BRL'
    //   }).format(Number(produto.precoVenda)))
    //   return produto
    // })

    const newProdutosArray = products.map(produto => {
      return Object.values(produto)
    })

    let pageWidth = doc.internal.pageSize.getWidth()

    let pageNumber = doc.internal.pages.length - 1

    doc.text(`Pedido ${pedido.id}`, 14, 15)
    doc.text(`Pedido ${pedido.id}`, 154, 15)

    doc.setFontSize(10)
    doc.text(`Cliente: ${pedido.nome}`, 14, 20)
    doc.text(`Cliente: ${pedido.nome}`, 154, 20)

    doc.text(`Endereço: ${pedido.endereco}`, 14, 25)
    doc.text(`Endereço: ${pedido.endereco}`, 154, 25)

    doc.text(`Cidade/Estado: ${pedido.cidade} / ${pedido.estado}`, 14, 30)
    doc.text(`Cidade/Estado: ${pedido.cidade} / ${pedido.estado}`, 154, 30)

    doc.text(`Telefone: ${pedido.telefone}`, 14, 35)
    doc.text(`Telefone: ${pedido.telefone}`, 154, 35)

    autoTable(doc, {
      head: [['ID', 'Nome', 'Unidade', 'Preço', 'Quantidade', 'Valor Total']],
      body: newProdutosArray,
      startY: 40,
      tableWidth: 130,
      showHead: 'firstPage',
      margin: { right: 125 },
      styles: { overflow: 'hidden' },
      pageBreak: 'auto'
    })

    doc.setPage(pageNumber)

    autoTable(doc, {
      head: [['ID', 'Nome', 'Unidade', 'Preço', 'Quantidade', 'Valor Total']],
      body: newProdutosArray,
      startY: 40,
      tableWidth: 130,
      showHead: 'firstPage',
      margin: { left: 153 },
      styles: { overflow: 'hidden' },
      pageBreak: 'auto'
    })

    const obs = 'Comi o cu de quem ta lendo'

    doc.text(`Observação: ${obs}`, 14, 200)
    doc.text(`Observação: ${obs}`, 154, 200)

    doc.text(`Assinatura: _______________________________________________`, 14, 205)
    doc.text(`Assinatura: _______________________________________________`, 154, 205)


    doc.save(`pedido-${pedido.id}.pdf`)
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
              <button onClick={generatePdf}>Criar PDF</button>
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