import { NextPage } from 'next';
import Image from 'next/image';
import { Container, LeftPanel, RightPanel, Table } from './dashboard';
import AlertImg from '../../assets/alert.png'
import TruckImg from '../../assets/truck.png'
import DemandsTable from '../../components/DemandsTable/index.page';
import { useEffect, useState } from 'react';
import { pedidoService } from '../../services';

interface PedidosProps {
  id: number;
  dataCriacao: string;
  valorTotal: number;
  status: string;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone: string;
}

const Dashboard: NextPage = () => {
  const [pedidos, setPedidos] = useState<PedidosProps[]>([])
  const [pedidosAmanha, setPedidosAmanha] = useState<PedidosProps[]>([])

  useEffect(() => {
    const fetchPedidos = async () => {
      const { data, errors } = await pedidoService.listarPedidos()

      if (!errors) {
        setPedidos(data.pedidos)
      }
    }

    const fetchPedidosAmanha = async () => {
      const { data, errors } = await pedidoService.listarPedidosDeAmanha()

      if (!errors) {
        setPedidosAmanha(data.pedidos)
      }
    }

    fetchPedidos()
    fetchPedidosAmanha()
  }, [])

  return (
    <>
      <Container>
        <div>
          <LeftPanel>
            <div>
              <Image src={AlertImg} alt="Alerta" width={'96px'} height={'96px'}/>
            </div>
            <div>
              <h2>Novos Pedidos</h2>
              <p>Você possui {pedidos.length} novos pedidos!</p>
              <p>Clique <a>aqui</a> para ver-los<br/> Ou interaja com a tabela abaixo!</p>
            </div>
          </LeftPanel>
          <RightPanel>
          <div>
              <Image src={TruckImg} alt="Alerta" width={'96px'} height={'96px'}/>
            </div>
            <div>
              <h2>Pedidos para amanhã</h2>
              <p>Estão agendados para amanhã<br/> a entrega de {pedidosAmanha.length} pedidos.</p>
              <p>Visualize-os clicando <a>aqui.</a></p>
            </div>
          </RightPanel>
        </div>
        <Table>
          {pedidos.length < 1 ? 
            (
              <>
                <div>
                  <h1>Não há novos pedidos.</h1>
                  <p>Quando houverem novos pedidos, eles aparecerão listados bem aqui.</p>
                </div>
              </>
            ) : 
            (
              <DemandsTable pedidos={pedidos} />
            )
          }
        </Table>
      </Container>
    </>
  )
}

export default Dashboard
