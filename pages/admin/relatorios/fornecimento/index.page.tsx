import { NextPage } from "next";
import Head from "next/head";
import { Buttons, Container, Content, Dates, EmptyTable, GeneratePdfButton, SearchButton, TableContainer } from "./fornecimento";
import InputMask from "react-input-mask";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { pedidoService } from "../../../../services";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface PedidoProps {
  id: number;
  cliente: string;
  dataCriacao: string;
  status: string;
  dataEntrega: string;
  total: string;
}

const Fornecimento: NextPage = () => {
  const [dataInicial, setDataInicial] = useState('')
  const [dataFinal, setDataFinal] = useState('')
  const [pedidos, setPedidos] = useState<PedidoProps[]>([])
  const [valorTotal, setValorTotal] = useState(0)

  const mutation = useMutation(pedidoService.listarPedidosEntreDatas)

  const handleSearchOrders = async () => {
    const dataInicialTimestamp = new Date(dataInicial.split('/').reverse().join('-')).getTime()
    const dataFinalTimestamp = new Date(dataFinal.split('/').reverse().join('-')).getTime()

    await mutation.mutateAsync({ dataInicial: dataInicialTimestamp, dataFinal: dataFinalTimestamp }, {
      onSuccess: async (data) => {
        setPedidos(data.pedidos)
        setValorTotal(data.valorTotal)
      },
      onError: async (error) => {
        toast.error('Erro ao pesquisar os produtos nessa data.')
        console.error(error)
      }
    })
  }

  const handleCleanFields = () => {
    setDataInicial('')
    setDataFinal('')
  }

  const generateProductsPdf = async () => {
    const doc = new jsPDF()

    autoTable(doc, { html: '#pedidos' })

    let finalY = (doc as any).lastAutoTable.finalY;

    doc.text(`Valor Total: `, 14, finalY + 5)
    doc.text(`${new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(valorTotal))}`, 150, finalY + 5)

    const dataInicialFormatada = dataInicial.split('/').reverse().join('-')
    const dataFinalFormatada = dataFinal.split('/').reverse().join('-')

    doc.save(`fornecimento-${dataInicialFormatada}-a-${dataFinalFormatada}`)
  }
  
  return (
    <>
      <Head>
        <title>Relatório de Fornecimento</title>
      </Head>
      <Container>
        <Content>
          <h1>Relatório de Fornecimento</h1>
          <p>Selecione um período entre datas para ter o relatório.</p>
          <Dates>
            <div>
              <label>Data Inicial</label>
              <InputMask mask="99/99/9999" onChange={event => setDataInicial(event.target.value)} value={dataInicial} />
            </div>
            <div>
              <label>Data Final</label>
              <InputMask mask="99/99/9999" onChange={event => setDataFinal(event.target.value)} value={dataFinal} />
            </div>
            <div>
              <SearchButton type="button" onClick={() => {handleSearchOrders()}}>Pesquisar</SearchButton>
            </div>
          </Dates>
          <Buttons>
            {dataInicial.length > 0 && <SearchButton type="button" onClick={() => {handleCleanFields()}}>Limpar Campos</SearchButton>}
            {pedidos.length > 0 && <GeneratePdfButton type="button" onClick={() => {generateProductsPdf()}}>Gerar PDF</GeneratePdfButton>}
          </Buttons>
        </Content>
        {mutation.isLoading && <h1>Carregando Pedidos</h1>}

        {pedidos.length > 0 ? (
          <TableContainer>
          <table id="pedidos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Data Criacao</th>
                <th>Status</th>
                <th>Data Entrega</th>
                <th>Valor Total</th>
              </tr>
            </thead>

            <tbody>
              {pedidos.map((pedido: PedidoProps) => {
                  return (
                    <tr key={pedido.id}>
                      <td>{pedido.id}</td>
                      <td>{pedido.cliente}</td>
                      <td>{ new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'})
                                  .format(new Date(pedido.dataCriacao)) 
                              }</td>
                      <td>{pedido.status}</td>
                      <td>
                        {pedido.dataEntrega ? 
                          new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(pedido.dataEntrega)) : 
                          'Sem data'
                        }
                      </td>
                      <td>{String(Number(pedido.total)).replaceAll('.', ',')}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>

          <h1>Valor Total: {new Intl.NumberFormat(
            'pt-BR', 
            { style: 'currency', currency: 'BRL'})
            .format(Number(valorTotal))}</h1>
        </TableContainer>
        ) : (
          <EmptyTable>
            <h1>Não há pedidos entre essas datas.<br />Ou você não pesquisou ainda...</h1>
          </EmptyTable>
        )}
      </Container>
    </>
  )
}

export default Fornecimento