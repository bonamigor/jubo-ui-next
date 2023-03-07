import { NextPage } from "next";
import { useState, useEffect } from 'react';

import { ButtonArea, Container, Content, Dates, EmptyTable, SearchButton, TableContainer } from './vendas';

import { useMutation } from 'react-query';
import { pedidoService, produtoService } from "../../../../services";
import toast from 'react-hot-toast';

import InputMask from "react-input-mask";

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { format } from "date-fns";
import { clienteService } from '../../../../services/index';
import Head from "next/head";

interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
  endereco: string;
  cep: string;
  email: string;
  cidade: string;
  estado: string;
  telefone: string;
  ativo: string;
}

interface Vendas {
  id: number;
  cliente: string;
  dataCriacao: string;
  dataEntrega: string;
  total: number;
}

const Vendas: NextPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [clienteId, setClienteId] = useState('')
  const [dataInicial, setDataInicial] = useState('')
  const [dataFinal, setDataFinal] = useState('')
  const [vendas, setVendas] = useState<Vendas[]>([])
  
  useEffect(() => {
    const fetchClientes = async () => {
      const { data, errors } = await clienteService.listarTodosOsClientes()

      if (!errors) {
        setClientes(data.clientes)
      }
    }
    fetchClientes()
  }, [])

  const mutation = useMutation(pedidoService.gerarRelatorioPedidos)

  const total = vendas.reduce((acumulador, numero) => {
    return acumulador += numero.total
  }, 0)

  const gerarRelatorio = async () => {
    const idCliente = Number(clienteId.split(' ')[0])
    const dataInicialTimestamp = new Date(dataInicial.split('/').reverse().join('-')).getTime()
    const dataFinalTimestamp = new Date(dataFinal.split('/').reverse().join('-')).getTime()
    await mutation.mutateAsync({ clienteId: idCliente, dataInicial: dataInicialTimestamp, dataFinal: dataFinalTimestamp }, {
      onSuccess: async (data) => {
        setVendas(data.vendas)
        setClienteId('')
        setDataInicial('')
        setDataFinal('')
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

    doc.text(`Valor Total: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}`, 140, 290)

    const data = format(new Date(), 'dd-MM-yyyy')

    doc.save(`vendas-${data}`)
  }

  return (
    <>
      <Head>
        <title>Relatório de Vendas</title>
      </Head>
      <Container>
        <Content>
          <h1>Relatório de Vendas</h1>
          <p>Selecione um período entre datas para ter o relatório.</p>
          <div>
            <input required type="text" placeholder="Pesquise o Cliente" 
                list="clientes" id="cliente-choice" name="cliente-choice" autoComplete="off"
                value={clienteId} onChange={event => {setClienteId(event.target.value)}} />
            <datalist id="clientes">
              {clientes.map(cliente => {
                return (<option key={cliente.id} value={`${cliente.id} - ${cliente.nome}`} />)
              })}
            </datalist>
          </div>
          <Dates>
            <div>
              <label>Data Inicial</label>
              <InputMask required mask="99/99/9999" onChange={event => setDataInicial(event.target.value)} value={dataInicial} />
            </div>
            <div>
              <label>Data Final</label>
              <InputMask required mask="99/99/9999" onChange={event => setDataFinal(event.target.value)} value={dataFinal} />
            </div>
          </Dates>
          <ButtonArea>
            <SearchButton type="button" onClick={() => {gerarRelatorio()}}>Pesquisar</SearchButton>
            {vendas.length > 0 && <SearchButton type="button" onClick={() => {generateProductsPdf()}}>Gerar PDF</SearchButton>}
          </ButtonArea>
        </Content>
        {mutation.isLoading && <h1>Carregando pedidos...</h1>}

        {vendas.length > 0 ? (
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
            <h1>Valor Total: { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total) }</h1>
          </>
        ) : (
          <EmptyTable>
            <h1>Não há pedidos nessa data.<br />Ou você não pesquisou ainda...</h1>
          </EmptyTable>
        )}
      </Container>
    </>
  )
}

export default Vendas