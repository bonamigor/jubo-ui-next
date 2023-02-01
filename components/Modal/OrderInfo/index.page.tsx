import { NextPage } from 'next';
import { CancelSection, ConfirmSection, Container, OrderFooter, OrderHeader, OrderItems, GeneratePdf } from './orderInfo';
import Modal from 'react-modal'
import { useState, useEffect } from 'react';
import { pedidoService } from '../../../services';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { useQuery, useQueryClient } from 'react-query';
import { Loading, Textarea } from '@nextui-org/react';
import { Tooltip } from '@chakra-ui/react'

interface Pedido {
  id: number;
  endereco: string;
  dataCriacao: string;
  valorTotal: number;
  status: string;
  observacao: string;
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
  precoVenda: string;
  quantidade: number;
  total: string;
}

interface OrderInfoModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  pedido: Pedido;
}

interface EmpresaProps {
  nome: string;
  cnpj: string;
  endereco: string;
  cidade: string;
  estado: string;
}

const empresas: Array<EmpresaProps> = [
  {
    nome: 'Comercial Mendes',
    cnpj: '26.669.899/0001-23',
    endereco: 'Rua Pinheiro Chagas, Vila Nova Canaã',
    cidade: 'Goiânia',
    estado: 'Goiás'
  },
  {
    nome: 'COPERAL',
    cnpj: '46.258.870/0001-66',
    endereco: 'Rua 26 de setembro, nº 21, lt. 23, Setor Estrela Dalva',
    cidade: 'Goiânia',
    estado: 'Goiás'
  },
  {
    nome: 'COOPASSEN',
    cnpj: '36.070.538/0001-10',
    endereco: 'R. Padre Alcides Spolidoro, S/N, Q. I4 L. 11/12, Dist Ind Santa Edwiges',
    cidade: 'Senador Canedo',
    estado: 'Goiás'
  },
  {
    nome: 'COOPACO',
    cnpj: '33.507.873/0001-44',
    endereco: 'Rua 03, QD. 07, LT. 13, Sala 03, Recanto das Emboabas',
    cidade: 'Aparecida de Goiânia',
    estado: 'Goiás'
  },
  {
    nome: 'COMPAF',
    cnpj: '29.119.413/0001-71',
    endereco: 'ROD GO-320 KM 10.5 n 100, LT. 11 QD. 03, RES BOA ESPERANCA',
    cidade: 'Goiatuba',
    estado: 'Goiás'
  },
]

const OrderInfo: NextPage<OrderInfoModalProps> = ({ isOpen, onRequestClose, pedido }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [dataEntrega, setDataEntrega] = useState('')
  const [empresa, setEmpresa] = useState(0)
  const [isValid, setIsValid] = useState(false)

  const { data, error, isLoading, isSuccess, isError } = useQuery(['produtosPedido', pedido.id], () => pedidoService.listarProdutosByPedidoId(pedido.id), { staleTime: 60 * 10 * 10, refetchOnWindowFocus: false, enabled: isOpen })

  let products: Array<ProductsProps> = [];

  if (isSuccess) {
    products = data.produtos
  }

  const confirmOrder = async () => {
    const data = dataEntrega.split('/')
    const dataFormatada = data.reverse().join('-')
    
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
        queryClient.setQueryData('getPedidosForDashboard', { pedidos: [] })
        queryClient.invalidateQueries('getPedidosForDashboard')
        toast.success(data.message)
        onRequestClose()
        // router.reload()
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

    const formatedPrices = products.map(produto => {
      produto.precoVenda = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
      }).format(Number(produto.precoVenda))
      produto.total = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(Number(produto.total))
      return produto
    })

    const newProdutosArray = formatedPrices.map(produto => {
      return Object.values(produto)
    })

    let pageNumber = doc.internal.pages.length - 1

    doc.text(`${empresas[empresa].nome}`, 14, 15)
    doc.text(`${empresas[empresa].nome}`, 154, 15)

    doc.setFontSize(10)
    doc.text(`Empresa: ${empresas[empresa].cnpj}`, 14, 20)
    doc.text(`Empresa: ${empresas[empresa].cnpj}`, 154, 20)

    doc.text(`Endereço: ${empresas[empresa].endereco}`, 14, 25)
    doc.text(`Endereço: ${empresas[empresa].endereco}`, 154, 25)

    doc.text(`Cidade / Estado: ${empresas[empresa].cidade} / ${empresas[empresa].estado}`, 14, 30)
    doc.text(`Cidade / Estado: ${empresas[empresa].cidade} / ${empresas[empresa].estado}`, 154, 30)

    doc.text('____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________', 0, 32.5)

    doc.text(`Pedido ${pedido.id}`, 14, 40)
    doc.text(`Pedido ${pedido.id}`, 154, 40)

    doc.setFontSize(10)
    doc.text(`Cliente: ${pedido.nome}`, 14, 45)
    doc.text(`Cliente: ${pedido.nome}`, 154, 45)

    doc.text(`Endereço: ${pedido.endereco}`, 14, 50)
    doc.text(`Endereço: ${pedido.endereco}`, 154, 50)

    doc.text(`Cidade/Estado: ${pedido.cidade} / ${pedido.estado}`, 14, 55)
    doc.text(`Cidade/Estado: ${pedido.cidade} / ${pedido.estado}`, 154, 55)

    doc.text(`Telefone: ${pedido.telefone}`, 14, 60)
    doc.text(`Telefone: ${pedido.telefone}`, 154, 60)

    doc.text(`Data de Entrega: ${dataEntrega}`, 14, 65)
    doc.text(`Data de Entrega: ${dataEntrega}`, 154, 65)

    autoTable(doc, {
      head: [['ID', 'Nome', 'Unidade', 'Preço', 'Quantidade', 'Valor Total']],
      body: newProdutosArray,
      startY: 70,
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
      startY: 70,
      tableWidth: 130,
      showHead: 'firstPage',
      margin: { left: 153 },
      styles: { overflow: 'hidden' },
      pageBreak: 'auto'
    })

    const valorTotal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(Number(pedido.valorTotal))

    doc.text(`Valor Total: `, 14, 165)
    doc.text(`${valorTotal}`, 125, 165)

    doc.text(`Valor Total: `, 154, 165)
    doc.text(`${valorTotal}`, 265, 165)

    doc.text('____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________', 0, 170)

    
    const linhas1: Array<string> = [];

    if (pedido.observacao) {
      if (pedido.observacao.length > 65) {
        let contadorInicial: number = 0;
        let contadorFinal: number = 65;
        const numeroDeLinhas = pedido.observacao.length / 65;
        for (let i = 0; i <= numeroDeLinhas; i++) {
          linhas1.push(pedido.observacao.substring(contadorInicial, contadorFinal))
          contadorInicial = contadorInicial + 65
          contadorFinal = contadorFinal + 65
        }
        doc.text('Observação: ', 14, 180)
        doc.text('Observação: ', 154, 180)
        doc.text(linhas1, 35, 180)
        doc.text(linhas1, 175, 180)
      } else {
        doc.text(`Observação: ${pedido.observacao ?? '_______________________________________________________'}`, 14, 190)
        doc.text(`Observação: ${pedido.observacao ?? '_______________________________________________________'}`, 154, 190)
      }
    } else {
      doc.text(`Observação: ${pedido.observacao ?? '_______________________________________________________'}`, 14, 190)
      doc.text(`Observação: ${pedido.observacao ?? '_______________________________________________________'}`, 154, 190)
    }
    
    doc.text(`Assinatura: ________________________________________________________`, 14, 205)
    doc.text(`Assinatura: ________________________________________________________`, 154, 205)

    doc.save(`pedido-${pedido.id}.pdf`)
  }

  const handleOptionEmpresa = (event: any) => {
    setEmpresa(event.target.value)
  }

  const validate = () => dataEntrega.length > 0
  
  useEffect(() => {
    const isValid = validate();
    setIsValid(isValid);
  }, [dataEntrega])

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
                        }).format(Number(product.precoVenda))}
                      </td>
                      <td>{product.unidade}</td>
                      <td>{product.quantidade}</td>
                      <td>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(Number(product.total))}
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
          <Textarea readOnly initialValue={pedido.observacao ?? 'Sem observação'} css={{ mt: "1.5rem", w: "900px" }} />
        </OrderItems>
        <OrderFooter>
          {pedido.status === 'CRIADO' ? (
            <>
              <ConfirmSection>
                <h2>Deseja confirmar?</h2>
                <div>
                  <input type="text"  placeholder='Data de Entrega' value={dataEntrega} onChange={event => {setDataEntrega(event.target.value)}} />
                  <button onClick={confirmOrder} disabled={!isValid}>Confirmar Pedido</button>
                  <button onClick={generatePdf} disabled={!isValid}>Criar PDF</button>
                </div>
                <div id='empresa'>
                  <label htmlFor="mendes">
                    <input type="radio" name="mendes" id="mendes"  value="0" onChange={handleOptionEmpresa} />
                    Mendes
                  </label>
                  <label htmlFor="coperal">
                    <input type="radio" name="coperal" id="coperal" value="1" onChange={handleOptionEmpresa}/>
                    COPERAL
                  </label>
                  <label htmlFor="coopassen">
                    <input type="radio" name="coopassen" id="coopassen" value="2" onChange={handleOptionEmpresa}/>
                    COOPASSEN
                  </label>
                  <label htmlFor="coopaco">
                    <input type="radio" name="coopaco" id="coopaco" value="3" onChange={handleOptionEmpresa}/>
                    COOPACO
                  </label>
                  <label htmlFor="compaf">
                    <input type="radio" name="compaf" id="compaf" value="4" onChange={handleOptionEmpresa}/>
                    COMPAF
                  </label>
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
