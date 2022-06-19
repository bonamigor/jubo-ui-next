import { NextPage } from 'next';
import { CancelSection, ConfirmSection, Container, OrderFooter, OrderHeader, OrderItems, GeneratePdf } from './orderInfo';
import Modal from 'react-modal'
import { useState, useEffect } from 'react';
import { pedidoService } from '../../../services';
import { format } from 'date-fns'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { useQuery } from 'react-query';
import { Loading } from '@nextui-org/react';

interface Pedido {
  id: number;
  endereco: string;
  dataCriacao: string;
  valorTotal: number;
  status: string;
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
  const [dataEntrega, setDataEntrega] = useState('')

  const { data, error, isLoading, isSuccess, isError } = useQuery(['produtosPedido', pedido.id], () => pedidoService.listarProdutosByPedidoId(pedido.id))

  let products: Array<ProductsProps> = [];

  if (isSuccess) {
    products = data.produtos
  }

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

    const data = dataEntrega.split('/')
    const novaData = new Date(Number(data[2]), (Number(data[1]) - 1), Number(data[0]))
    const dataFormatada = format(novaData, 'dd/MM/yyyy')

    products.forEach(product => {
      delete product['produtoId'];
    })

    // const formatedPrices = products.map(produto => {
    //   produto.precoVenda = Number(new Intl.NumberFormat('pt-BR', {
    //       style: 'currency',
    //       currency: 'BRL'
    //   }).format(Number(produto.precoVenda)))
    //   produto.total = Number(new Intl.NumberFormat('pt-BR', {
    //     style: 'currency',
    //     currency: 'BRL'
    // }).format(Number(produto.total)))
    //   return produto
    // })

    const newProdutosArray = products.map(produto => {
      return Object.values(produto)
    })

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

    doc.text(`Data de Entrega: ${dataFormatada}`, 14, 40)
    doc.text(`Data de Entrega: ${dataFormatada}`, 154, 40)

    autoTable(doc, {
      head: [['ID', 'Nome', 'Unidade', 'Preço', 'Quantidade', 'Valor Total']],
      body: newProdutosArray,
      startY: 45,
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
      startY: 45,
      tableWidth: 130,
      showHead: 'firstPage',
      margin: { left: 153 },
      styles: { overflow: 'hidden' },
      pageBreak: 'auto'
    })

    doc.text(`Observação: ____________________________________________________`, 14, 190)
    doc.text(`Observação: ____________________________________________________`, 154, 190)

    doc.text(`Assinatura: _____________________________________________________`, 14, 200)
    doc.text(`Assinatura: _____________________________________________________`, 154, 200)


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
              {isLoading && (<div><Loading type='points'>Carregando produtos...</Loading></div>)}
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
          {pedido.status === 'CRIADO' ? (
            <>
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
            </>
          ) : (
            <GeneratePdf>
              <div>
                <button onClick={generatePdf}>Criar PDF</button>
              </div>
            </GeneratePdf>
          )}
        </OrderFooter>
      </Container>
    </Modal>

  )
}

export default OrderInfo