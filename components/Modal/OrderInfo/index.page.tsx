import { NextPage } from 'next';
import { CancelSection, ConfirmSection, Container, OrderFooter, OrderHeader, OrderItems, GeneratePdf, Observacao } from './orderInfo';
import Modal from 'react-modal'
import { useState, useEffect } from 'react';
import { pedidoService } from '../../../services';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import { useQuery, useQueryClient } from 'react-query';
import { Checkbox, Loading, Textarea } from '@nextui-org/react';
import { format } from 'date-fns';
import InputMask from "react-input-mask";

interface Pedido {
  id: number;
  endereco: string;
  dataCriacao: number;
  dataEntrega?: number;
  valorTotal: number;
  status: string;
  observacao: string;
  nome: string;
  cidade: string;
  estado: string;
  telefone: string;
  empresa?: number;
}

interface ProductsProps {
  itemPedidoId?: string;
  produtoId?: string;
  nome: string;
  unidade: string;
  precoVenda: string;
  quantidade: string;
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
  const [isValidConfirmar, setIsValidConfirmar] = useState(false)

  const { data, error, isLoading, isSuccess, isError } = useQuery(['produtosPedido', pedido.id], () => pedidoService.listarProdutosByPedidoId(pedido.id), { refetchOnWindowFocus: true, enabled: isOpen })

  let products: Array<ProductsProps> = [];

  if (isSuccess) {
    products = data.produtos
  }

  const confirmOrder = async () => {
    const dataFormatada = new Date(dataEntrega.split('/').reverse().join('-')).getTime()
    
    try {
      const { data: confirmarData, errors: confirmarErrors } = await pedidoService.confirmarPedidoById({ pedidoId: pedido.id, dataEntrega: dataFormatada })
      const { data: empresaData, errors: empresaErrors } = await pedidoService.setarEmpresaAoPedido(pedido.id, empresa)

      if (!confirmarErrors && !empresaErrors) {
        toast.success(confirmarData.message)
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
      delete product['itemPedidoId'];
    })

    const formatedPrices = products.map(produto => {
      produto.quantidade = new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 4
    }).format(Number(produto.quantidade))
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
    const idEmpresa = pedido.empresa ?? empresa

    doc.text(`${empresas[idEmpresa].nome}`, 14, 15)
    doc.text(`${empresas[idEmpresa].nome}`, 154, 15)

    doc.setFontSize(10)
    doc.text(`CNPJ: ${empresas[idEmpresa].cnpj}`, 14, 20)
    doc.text(`CNPJ: ${empresas[idEmpresa].cnpj}`, 154, 20)

    doc.text(`Endereço: ${empresas[idEmpresa].endereco}`, 14, 25)
    doc.text(`Endereço: ${empresas[idEmpresa].endereco}`, 154, 25)

    doc.text(`Cidade / Estado: ${empresas[idEmpresa].cidade} / ${empresas[idEmpresa].estado}`, 14, 30)
    doc.text(`Cidade / Estado: ${empresas[idEmpresa].cidade} / ${empresas[idEmpresa].estado}`, 154, 30)

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

    if (!pedido.dataEntrega) {
      doc.text(`Data de Entrega: ${dataEntrega}`, 14, 65)
      doc.text(`Data de Entrega: ${dataEntrega}`, 154, 65)
    } else {
      doc.text(`Data de Entrega: ${new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(pedido.dataEntrega))}`, 14, 65)
      doc.text(`Data de Entrega: ${new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(pedido.dataEntrega))}`, 154, 65)
    }

    let columns = [
      { header: 'Nome', dataKey: 'nome'},
      { header: 'Und', dataKey: 'unidade'},
      { header: 'Preço', dataKey: 'preco'},
      { header: 'Qtde', dataKey: 'quantidade'},
      { header: 'Total', dataKey: 'total'}
    ]

    autoTable(doc, {
      head: [['Nome', 'Und', 'Preço', 'Qtde', 'Total']],
      headStyles: { fillColor: [255,255,255], textColor: 'black '},
      columns: columns,
      body: newProdutosArray,
      theme: 'grid',
      startY: 70,
      tableWidth: 130,
      margin: { right: 125, bottom: 15 },
      showHead: 'firstPage',
      styles: { overflow: 'visible', fontSize: 8 },
      columnStyles: { 'nome': { overflow: 'ellipsize', cellWidth: 'auto' } },
      pageBreak: 'auto'
    })

    doc.setPage(pageNumber)

    autoTable(doc, {
      head: [['Nome', 'Und', 'Preço', 'Qtde', 'Total']],
      headStyles: { fillColor: [255,255,255], textColor: 'black '},
      columns: columns,
      body: newProdutosArray,
      theme: 'grid',
      startY: 70,
      tableWidth: 130,
      margin: { left: 153, bottom: 15 },
      showHead: 'firstPage',
      styles: { overflow: 'visible', fontSize: 8 },
      columnStyles: { 'nome': { overflow: 'ellipsize', cellWidth: 'auto' } },
      pageBreak: 'auto'
    })

    const numberOfPages = (doc as any).internal.getNumberOfPages();
    const pageSize = doc.internal.pageSize
    let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
    let finalY = (doc as any).lastAutoTable.finalY;
    const valorTotal = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(pedido.valorTotal))

    if (finalY <= 180) {
      doc.text(`Valor Total: `, 14, finalY + 5)
      doc.text(`${valorTotal}`, 125, finalY + 5)
  
      doc.text(`Valor Total: `, 154, finalY + 5)
      doc.text(`${valorTotal}`, 264, finalY + 5)
  
      doc.text('____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________', 0, finalY + 8)

      const linhas1: Array<string> = [];
  
      if (pedido.observacao) {
        if (pedido.observacao.length > 58) {
          let contadorInicial: number = 0;
          let contadorFinal: number = 58;
          const numeroDeLinhas = pedido.observacao.length / 58;
          for (let i = 0; i <= numeroDeLinhas; i++) {
            linhas1.push(pedido.observacao.substring(contadorInicial, contadorFinal))
            contadorInicial = contadorInicial + 58
            contadorFinal = contadorFinal + 58
          }
          doc.text('Observação: ', 14, finalY + 15)
          doc.text('Observação: ', 154, finalY + 15)
          doc.text(linhas1, 35, finalY + 15)
          doc.text(linhas1, 175, finalY + 15)
        } else {
          doc.text(`Observação: ${pedido.observacao ?? '_______________________________________________________'}`, 14, finalY + 20)
          doc.text(`Observação: ${pedido.observacao ?? '_______________________________________________________'}`, 154, finalY + 20)
        }
      } else {
        doc.text(`Observação: ${pedido.observacao ?? '_______________________________________________________'}`, 14, finalY + 20)
        doc.text(`Observação: ${pedido.observacao ?? '_______________________________________________________'}`, 154, finalY + 20)
      }

      doc.text(`Assinatura: ________________________________________________________`, 14, finalY + 30)
      doc.text(`Assinatura: ________________________________________________________`, 154, finalY + 30)

      let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
      doc.text(pedido.nome, pageWidth / 4, finalY + 35, { align: 'center' })
      doc.text(pedido.nome, pageWidth - (pageWidth / 4), finalY + 35, { align: 'center' })
    }

    if (finalY >= 180) {
      doc.addPage()

      doc.setPage(numberOfPages + 1)  

      doc.text(`Valor Total: `, 14, 20)
      doc.text(`${valorTotal}`, 125, 20)
  
      doc.text(`Valor Total: `, 154, 20)
      doc.text(`${valorTotal}`, 265, 20)
  
      doc.text('____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________', 0, 23)

      const linhas1: Array<string> = [];
  
      if (pedido.observacao) {
        if (pedido.observacao.length > 58) {
          let contadorInicial: number = 0;
          let contadorFinal: number = 58;
          const numeroDeLinhas = pedido.observacao.length / 58;
          for (let i = 0; i <= numeroDeLinhas; i++) {
            linhas1.push(pedido.observacao.substring(contadorInicial, contadorFinal))
            contadorInicial = contadorInicial + 58
            contadorFinal = contadorFinal + 58
          }
          doc.text('Observação: ', 14, 30)
          doc.text('Observação: ', 154, 30)
          doc.text(linhas1, 35, 30)
          doc.text(linhas1, 175, 30)
        } else {
          doc.text(`Observação: ${pedido.observacao ?? '_______________________________________________________'}`, 14, 35)
          doc.text(`Observação: ${pedido.observacao ?? '_______________________________________________________'}`, 154, 35)
        }
      } else {
        doc.text(`Observação: ${pedido.observacao ?? '_______________________________________________________'}`, 14, 35)
        doc.text(`Observação: ${pedido.observacao ?? '_______________________________________________________'}`, 154, 35)
      }

      doc.text(`Assinatura: ________________________________________________________`, 14, 45)
      doc.text(`Assinatura: ________________________________________________________`, 154, 45)

      let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
      doc.text(pedido.nome, pageWidth / 4, finalY + 45, { align: 'center' })
      doc.text(pedido.nome, pageWidth - (pageWidth / 4), finalY + 45, { align: 'center' })
    }

    const numberOfPagesAtt = (doc as any).internal.getNumberOfPages();

    for (let i = 1; i <= numberOfPagesAtt; i++){
      doc.setPage(i);
      if (i > 1) {
        doc.text(`Pedido ${pedido.id}`, 14, 10)
        doc.text(`Pedido ${pedido.id}`, 154, 10)
      }
      doc.text(`Pagina ${i}/${numberOfPagesAtt}`, 127, 10)
      doc.text(`Pagina ${i}/${numberOfPagesAtt}`, 266, 10)
    }

    doc.save(`pedido-${pedido.id}.pdf`)
  }

  const handleOptionEmpresa = (event: any) => {
    setEmpresa(event.target.value)
  }

  const validateConfirmar = () => dataEntrega.length > 0
  
  useEffect(() => {
    const isValid = validateConfirmar();
    setIsValidConfirmar(isValid);
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
        <OrderItems showScrollBar={products.length > 6}>
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
              {isSuccess && (
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
                      <td>{product.quantidade.replaceAll('.', ',')}</td>
                      <td>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(Number(product.total))}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
          <h3>
            Valor Total: {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(pedido.valorTotal)}
          </h3>
          <Observacao>
            <Textarea initialValue={pedido.observacao ?? 'Sem observação'} readOnly css={{ mt: "1.5rem", w: "900px" }} />
          </Observacao>
        </OrderItems>
        <OrderFooter>
          {pedido.status === 'CRIADO' || pedido.status === 'CONFIRMADO' ? (
            <>
              <ConfirmSection>
                <h2>Deseja {pedido.status === 'CRIADO' ? 'confirmar?' : 'gerar PDF?'}</h2>
                {pedido.status === 'CRIADO' &&
                  <div>
                    <InputMask mask="99/99/9999" placeholder='Data de Entrega' onChange={event => {setDataEntrega(event.target.value)}} />
                    {pedido.status === 'CRIADO' && <button onClick={confirmOrder} disabled={!isValidConfirmar}>Confirmar Pedido</button>}
                  </div>
                }
                <div>
                  <button onClick={generatePdf}>Criar PDF</button>
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
                <button onClick={cancelOrder} disabled={!(pedido.status === 'CRIADO')}>Cancelar Pedido</button>
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
