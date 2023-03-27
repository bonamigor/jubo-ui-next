import { NextPage } from "next";
import { useState, useEffect } from 'react';

import { ButtonArea, Container, Content, Dates, EmptyTable, SearchButton, TableContainer } from './vendas';

import { useMutation } from 'react-query';
import { pedidoService } from "../../../../services";
import toast from 'react-hot-toast';

import InputMask from "react-input-mask";

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import { format } from "date-fns";
import { clienteService } from '../../../../services/index';
import Head from "next/head";
import { Checkbox, Loading } from "@nextui-org/react";

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

interface Itens {
  itemPedidoId?: number;
  produtoId?: number;
  nome: string;
  unidade: string;
  precoVenda: string;
  quantidade: string;
  total: string;
}

interface Vendas {
  id: number;
  cliente: string;
  dataCriacao: string;
  dataEntrega: string;
  total: number;
  status: string;
  itens: Array<Itens>;
}

interface ProductsProps {
  nome: string;
  unidade: string;
  precoVenda: string;
  quantidade: string;
  total: string;
}

const Vendas: NextPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [clienteId, setClienteId] = useState('')
  const [dataInicial, setDataInicial] = useState('')
  const [dataFinal, setDataFinal] = useState('')
  const [vendas, setVendas] = useState<Vendas[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAnalitico, setIsAnalitico] = useState("false")
  
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
    setIsLoading(true)
    const idCliente = Number(clienteId.split(' ')[0])
    const dataInicialTimestamp = new Date(dataInicial.split('/').reverse().join('-')).getTime()
    const dataFinalTimestamp = new Date(dataFinal.split('/').reverse().join('-')).getTime()
    const { data, errors } = await pedidoService.gerarRelatorioPedidosOld({ clienteId: idCliente, dataInicial: dataInicialTimestamp, dataFinal: dataFinalTimestamp })

    if (errors) {
      toast.error('Erro ao pesquisar os pedidos nessa data.')
      console.error(errors)
    } else {
      setVendas(data.vendas)
      setClienteId('')
      setDataInicial('')
      setDataFinal('')
      setIsLoading(false)
    }
    // await mutation.mutateAsync({ clienteId: idCliente, dataInicial: dataInicialTimestamp, dataFinal: dataFinalTimestamp }, {
    //   onSuccess: async (data) => {
    //     setVendas(data.vendas)
    //     setClienteId('')
    //     setDataInicial('')
    //     setDataFinal('')
    //   },
    //   onError: async (error) => {
    //     toast.error('Erro ao pesquisar os pedidos nessa data.')
    //     console.error(error)
    //   }
    // })
  }

  const generateProductsPdf = async () => {
    const doc = new jsPDF()

    if (isAnalitico === "true") {  
      for (let i = 0; i <= vendas.length - 1; i++) {

        let columns = [
          { header: 'Nome', dataKey: 'nome' },
          { header: 'Und', dataKey: 'unidade' },
          { header: 'Preço', dataKey: 'preco' },
          { header: 'Qtde', dataKey: 'quantidade' },
          { header: 'Total', dataKey: 'total' }
        ]

        vendas[i].itens.forEach(item => {
          delete item['produtoId'];
          delete item['itemPedidoId'];
        })

        const produtosDaVenda = vendas[i].itens.map(item => {
          item.quantidade = String(Number(item.quantidade).toFixed(4)).replaceAll('.', ',')
          item.precoVenda = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(Number(item.precoVenda))
          item.total  = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(Number(item.total))
          return Object.values(item)
        })

        if (i === 0) {
          doc.setFontSize(11)
          doc.text(`ID: ${vendas[i].id} | Cliente: ${vendas[i].cliente} | Data Entrega: ${new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(vendas[i].dataEntrega))} | Valor Total: ${new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(vendas[i].total)}`, 5, 10)

          // array com produtos      
          autoTable(doc, {
            head: [['Nome', 'Und', 'Preço', 'Qtde', 'Total']],
            headStyles: { fillColor: [255, 255, 255], textColor: 'black ' },
            columns: columns,
            body: produtosDaVenda,
            theme: 'grid',
            startY: 12,
            tableWidth: 130,
            margin: { right: -50, bottom: 15 },
            showHead: 'firstPage',
            styles: { overflow: 'visible', fontSize: 8 },
            columnStyles: { 'nome': { overflow: 'ellipsize', cellWidth: 'auto' } },
            pageBreak: 'auto'
          })
        } else {
          let finalY = (doc as any).lastAutoTable.finalY;
          const numberOfPages = (doc as any).internal.getNumberOfPages();
  
          if (finalY >= 180) {
            doc.addPage()
  
            doc.setPage(numberOfPages + 1)
  
            doc.text(`ID: ${vendas[i].id} | Cliente: ${vendas[i].cliente} | Data Entrega: ${new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(vendas[i].dataEntrega))} | Valor Total: ${new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
          }).format(vendas[i].total)}`, 5, 10)
  
            // array com produtos do pedido
            autoTable(doc, {
              head: [['Nome', 'Und', 'Preço', 'Qtde', 'Total']],
              headStyles: { fillColor: [255, 255, 255], textColor: 'black ' },
              columns: columns,
              body: produtosDaVenda,
              theme: 'grid',
              startY: 12,
              tableWidth: 130,
              margin: { right: 125, bottom: 15 },
              showHead: 'firstPage',
              styles: { overflow: 'visible', fontSize: 8 },
              columnStyles: { 'nome': { overflow: 'ellipsize', cellWidth: 'auto' } },
              pageBreak: 'auto'
            })
          } else {
            doc.text(`ID: ${vendas[i].id} | Cliente: ${vendas[i].cliente} | Data Entrega: ${new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(vendas[i].dataEntrega))} | Valor Total: ${new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
          }).format(vendas[i].total)}`, 5, finalY + 10)
  
            // array co produtos do pedido
            autoTable(doc, {
              head: [['Nome', 'Und', 'Preço', 'Qtde', 'Total']],
              headStyles: { fillColor: [255, 255, 255], textColor: 'black ' },
              columns: columns,
              body: produtosDaVenda,
              theme: 'grid',
              startY: finalY + 12,
              tableWidth: 130,
              margin: { right: 125, bottom: 15 },
              showHead: 'firstPage',
              styles: { overflow: 'visible', fontSize: 8 },
              columnStyles: { 'nome': { overflow: 'ellipsize', cellWidth: 'auto' } },
              pageBreak: 'auto'
            })
          }
        }

        
      }
    } else {
      autoTable(doc, { html: '#vendas' })

      doc.text(`Valor Total: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}`, 140, 290)
    }

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
            {/* {vendas.length > 0 && } */}
            {vendas.length > 0 && 
            <>
              <label htmlFor="isAnalitico">Analitico?</label>
              <input type="checkbox" name="isAnalitico" id="isAnalitico" value={isAnalitico} onChange={() => {isAnalitico === "false" ? setIsAnalitico("true") : setIsAnalitico("false")}} />
            </>}
          </ButtonArea>
        </Content>
        {isLoading && <div style={{ marginTop: "10px" }}><Loading color="success" size="md" type="points">Carregando vendas</Loading></div>}

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