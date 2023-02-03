import { NextPage } from 'next';
import Image from 'next/image';
import { Container, Filter, InputFilter, LeftPanel, LoadingDiv, NoContent, RightPanel, TableContainer } from './dashboard';
import AlertImg from '../../../assets/alert.png'
import TruckImg from '../../../assets/truck.png'
import BloomImg from '../../../assets/bloom.png'
import { useState } from 'react';
import { pedidoService } from '../../../services';
import Head from 'next/head';
import { useQuery } from 'react-query';
import OrderInfo from '../../../components/Modal/OrderInfo/index.page';
import { PedidosObject, PedidosProps } from '../../../services/pedido';
import { Loading } from '@nextui-org/react';

const Dashboard: NextPage = () => {
  const [pedido, setPedido] = useState<PedidosProps>({ id: 0, dataCriacao: 0, dataEntrega: 0, valorTotal: 0, status: '', observacao: '', nome: '', endereco: '', cidade: '', estado: '', telefone: '' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [filteredPedidos, setFilteredPedidos] = useState<PedidosProps[]>([])

  const onRequestClose = async () => {
    setIsModalOpen(false)
  }

  const viewOrderInfo = async (pedido: PedidosProps) => {
    setPedido(pedido)
    setIsModalOpen(true)
  }

  const { data: pedidosObject, isLoading: isPedidosObjectLoading, isSuccess, isFetching } = useQuery<PedidosObject, Error>('getPedidosForDashboard', pedidoService.listarPedidos, { staleTime: 1000 * 60 * 15, refetchOnWindowFocus: true })
  const { data: tomorrowPedidosObject } = useQuery<PedidosObject, Error>('getTomorrowPedidosForDashboard', pedidoService.listarPedidosDeAmanha, { staleTime: 1000 * 60 * 15 })
  
  const handleFilterPedidosByCliente = (event: any) => {
    setFilter(event.toUpperCase())
    setFilteredPedidos(pedidosObject!.pedidos.filter((pedido: PedidosProps) => {
      return pedido.nome.toUpperCase().includes(filter)
    }))
  }

  const handleFilterPedidosByData = (event: any) => {
    setFilter(event.toUpperCase())
    setFilteredPedidos(pedidosObject!.pedidos.filter((pedido: PedidosProps) => {
      return pedido.dataCriacao
    }))
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Container>
        <div>
          <LeftPanel>
            <div>
              <Image src={AlertImg} alt="Alerta" width={'96px'} height={'96px'}/>
            </div>
            <div>
              <h2>Novos Pedidos</h2>
              <p>Você possui {pedidosObject?.pedidos.length} novos pedidos!</p>
              <p>Clique <a>aqui</a> para ver-los<br/> Ou interaja com a tabela abaixo!</p>
            </div>
          </LeftPanel>
          <RightPanel>
          <div>
              <Image src={TruckImg} alt="Alerta" width={'96px'} height={'96px'}/>
            </div>
            <div>
              <h2>Pedidos para amanhã</h2>
              <p>Estão agendados para amanhã<br/> a entrega de {tomorrowPedidosObject?.pedidos.length} pedidos.</p>
              <p>Visualize-os clicando <a>aqui.</a></p>
            </div>
          </RightPanel>
        </div>
        <Filter>
          <InputFilter>
            <input type="text" placeholder="Filtre pelo nome do Cliente" onChange={event => handleFilterPedidosByCliente(event.target.value)} />
          </InputFilter>
          <InputFilter>
            <input type="text" placeholder="Filtre pela Data de Criação" onChange={event => handleFilterPedidosByData(event.target.value)} />
          </InputFilter>
        </Filter>
        {isPedidosObjectLoading && 
          <LoadingDiv>
            <Loading>Carregando novos pedidos...</Loading>
          </LoadingDiv>
        }
        {isSuccess && pedidosObject?.pedidos.length >= 1 ? (
          <>
            <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th>Colégio</th>
                    <th>Cidade/Estado</th>
                    <th>Data Criação</th>
                    <th>Valor Total</th>
                    <th>Ações</th>
                  </tr>
                </thead>
      
                <tbody>
                  {filter.length > 1 ? (
                    filteredPedidos.map(pedido => {
                      return (
                        <tr key={pedido.id.toString()}>
                          <td>{pedido.nome}</td>
                          <td>{pedido.cidade} / {pedido.estado}</td>
                          <td>
                            { new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'})
                                  .format(new Date(pedido.dataCriacao)) 
                              }
                          </td>
                          <td>
                          { new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(pedido.valorTotal)}
                          </td>
                          <td>
                            <a><Image onClick={() => {viewOrderInfo(pedido)}} src={BloomImg} alt="Visualizar" width={30} height={30} /></a>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    pedidosObject?.pedidos?.map(pedido => {
                      return (
                        <tr key={pedido.id}>
                          <td>{pedido.nome}</td>
                          <td>{pedido.cidade} / {pedido.estado}</td>
                          <td>
                            { new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'})
                                  .format(new Date(pedido.dataCriacao)) 
                              }
                          </td>
                          <td>
                          { new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(pedido.valorTotal)}
                          </td>
                          <td>
                            <a><Image onClick={() => {viewOrderInfo(pedido)}} src={BloomImg} alt="Visualizar" width={30} height={30} /></a>
                          </td>
                        </tr>
                      )
                    })
                  )}
                  
                </tbody>
              </table>
            </TableContainer>
            <OrderInfo isOpen={isModalOpen} onRequestClose={onRequestClose} pedido={pedido}/>
          </> ) : 
          (
            <NoContent>
              <div>
                <h1>Não há novos pedidos.</h1>
                <p>Quando houverem novos pedidos, eles aparecerão listados bem aqui.</p>
              </div> 
            </NoContent> 
          )
        }
      </Container>
    </>
  )
}

export default Dashboard
