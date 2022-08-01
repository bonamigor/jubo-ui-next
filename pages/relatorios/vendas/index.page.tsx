import { NextPage } from "next";
import { useState } from "react";

import { Container, Content, Dates, EmptyTable, GeneratePdfButton, SearchButton, TableContainer } from './vendas';

import { useMutation } from 'react-query';
import { pedidoService, produtoService } from "../../../services";
import toast from 'react-hot-toast';

import InputMask from "react-input-mask";

import { registerLocale } from  "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
registerLocale('pt-BR', ptBR)

import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { format } from "date-fns";

interface Vendas {
  id: number;
  cliente: string;
  dataCriacao: string;
  dataEntrega: string;
  total: number;
}

const Vendas: NextPage = () => {
  const [dataInicial, setDataInicial] = useState('')
  const [dataFinal, setDataFinal] = useState('')
  const [valorTotal, setValorTotal] = useState(0)
  const [vendas, setVendas] = useState<Vendas[]>([])

  const mutation = useMutation(pedidoService.gerarRelatorioPedidos)

  const gerarRelatorio = async () => {
    const dataInicialFormatada: string = `${dataInicial.split('/')[2]}-${dataInicial.split('/')[1]}-${dataInicial.split('/')[0]}`
    const dataFinalFormatada: string = `${dataFinal.split('/')[2]}-${dataFinal.split('/')[1]}-${dataFinal.split('/')[0]}`
    await mutation.mutateAsync({ dataInicial: dataInicialFormatada, dataFinal: dataFinalFormatada }, {
      onSuccess: async (data) => {
        setValorTotal(0)
        setVendas(data.vendas)
        setDataInicial('')
        setDataFinal('')
        const total = vendas.reduce((acumulador, numero, indice, original) => {
          return acumulador += numero.total
        }, 0)
        setValorTotal(total)
      },
      onError: async (error) => {
        toast.error('Erro ao pesquisar os pedidos nessa data.')
        console.error(error)
      }
    })
  }

  const generateProductsPdf = async () => {
    const doc = new jsPDF()

    autoTable(doc, { html: '#vendas' })

    doc.text(`Valor Total: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal)}`, 140, 290)

    const data = format(new Date(), 'dd-MM-yyyy')

    doc.save(`vendas-${data}`)
  }

  return (
    <Container>
      <Content>
        <h1>Relatório de Vendas</h1>
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
        </Dates>
        <SearchButton type="button" onClick={() => {gerarRelatorio()}}>Pesquisar</SearchButton>
        {vendas.length > 1 && <GeneratePdfButton type="button" onClick={() => {generateProductsPdf()}}>Gerar PDF</GeneratePdfButton>}
      </Content>
      {mutation.isLoading && <h1>Carregando pedidos...</h1>}

      {vendas.length > 1 ? (
        <>
          <TableContainer>
            <table id="vendas">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Cliente</th>
                  <th>Data Criação</th>
                  <th>Data Entrega</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {vendas.map(venda => {
                    return (
                      <tr key={venda.id}>
                        <td>{venda.id}</td>
                        <td>{venda.cliente}</td>
                        <td>{venda.dataCriacao ? new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(venda.dataCriacao)) : 'Sem Data'}</td>
                        <td>{venda.dataEntrega ? new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(venda.dataEntrega)) : 'Sem Data'}</td>
                        <td>{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(venda.total) }</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </TableContainer>
          <h1>Valor Total: { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal) }</h1>
        </>
      ) : (
        <EmptyTable>
          <h1>Não há pedidos nessa data.<br />Ou você não pesquisou ainda...</h1>
        </EmptyTable>
      )}
    </Container>
  )
}

export default Vendas