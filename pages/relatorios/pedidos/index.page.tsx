import { NextPage } from 'next';
import { useQuery } from 'react-query';
import { clienteService } from '../../../services';
import { Container, Content, Orderless, TableContainer, LoadingOrders } from './pedidos';
import { useState } from 'react';
import { pedidoService } from '../../../services/index';
import toast from 'react-hot-toast';
import { Loading } from '@nextui-org/react';
import Image from "next/image";
import BloomImg from '../../../assets/bloom.png'
import OrderInfo from '../../../components/Modal/OrderInfo/index.page';
import Head from 'next/head';

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
  ativo: boolean;
}

interface Pedido {
  id: number;
  dataCriacao: string;
  dataEntrega: string;
  valorTotal: number;
  status: string;
  observacao: string;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone: string;
}

const Pedidos: NextPage = () => {
  const [clienteId, setClienteId] = useState('')
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [isOrdersLoading, setIsOrdersLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pedido, setPedido] = useState<Pedido>({ id: 0, dataCriacao: '', dataEntrega: '', valorTotal: 0, status: '', observacao: '', nome: '', endereco: '', cidade: '', estado: '', telefone: '' })


  let clientes: Array<Cliente> = [];

  const { data, isLoading, isSuccess, isError } = useQuery('clientes', clienteService.listarTodosOsClientesNew, { staleTime: Infinity })

  if (isSuccess) {
    clientes = data.clientes
  }

  const handleClientSelection = async () => {
    setIsOrdersLoading(true)

    const idCliente: number = Number(clienteId.split(' ')[0])
    
    const { data, errors } = await pedidoService.listarPedidosByCliente(idCliente)

    if (!errors) {
      setIsOrdersLoading(false)
      setPedidos(data.pedidos)
      setClienteId('')
    } else {
      toast.error('Erro ao listar os pedidos.')
    }
  }

  const onRequestClose = async () => {
    setIsModalOpen(false)
  }

  const viewOrderInfo = async (pedido: Pedido) => {
    setPedido(pedido)
    setIsModalOpen(true)
  }

  return (
    <>
      <Head>
        <title>Pedidos por Cliente</title>
      </Head>
      <Container>
        <Content>
          <header>
            <h1>Pedidos por Cliente</h1>
            <p>Selecione o Cliente para ver os seus pedidos.</p>
          </header>
          <section>
            {isLoading && <input disabled placeholder='Carregando os clientes'></input>}
            {isError && <h1>Erro ao carregar os Clientes</h1>}
            {isSuccess && 
              <>
                <input type="text" placeholder="Pesquise o Cliente" 
                  list="clientes" id="cliente-choice" name="cliente-choice" autoComplete="off"
                  value={clienteId} onChange={event => {setClienteId(event.target.value)}} 
                />
                <datalist id="clientes">
                  {clientes.map(cliente => {
                    return (<option key={cliente.id} value={`${cliente.id} - ${cliente.nome}`} />)
                  })}
                </datalist>
                <button onClick={handleClientSelection}>
                  Selecionar
                </button>
              </>
            }
          </section>
        </Content>
        {isOrdersLoading && (
          <>
            <LoadingOrders>
              <Loading type='points'>Carregando produtos</Loading> 
            </LoadingOrders>          
          </>
        )}
        {!isOrdersLoading && pedidos.length < 1 ? (
          <>
            <Orderless>
              <h1>Não há pedidos para exibir aqui.</h1>  
            </Orderless>          
          </>
        ) : (
          <>
            <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Data Criação</th>
                    <th>Status</th>
                    <th>Data Entrega</th>
                    <th>Valor Total</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {pedidos.map(pedido => {
                    return (
                      <tr key={pedido.id}>
                        <td>{pedido.id}</td>
                        <td>{pedido.nome}</td>
                        <td>{new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(pedido.dataCriacao))}</td>
                        <td>{pedido.status}</td>
                        <td>{pedido.dataEntrega ? new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(pedido.dataEntrega)) : 'Sem Data'}</td>
                        <td>{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(pedido.valorTotal)}</td>
                        <td>
                          <a><Image onClick={() => {viewOrderInfo(pedido)}} src={BloomImg} alt="Visualizar" width={30} height={30} /></a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </TableContainer>
          </>
        )}
      </Container>
      <OrderInfo isOpen={isModalOpen} onRequestClose={onRequestClose} pedido={pedido}/>
    </>
  )
}

export default Pedidos