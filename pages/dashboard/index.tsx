import { NextPage } from 'next';
import Image from 'next/image';
import { Container, LeftPanel, RightPanel, Table } from './dashboard';
import AlertImg from '../../assets/alert.png'
import TruckImg from '../../assets/truck.png'
import DemandsTable from '../../components/DemandsTable';

const Dashboard: NextPage = () => {
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
              <p>Você possui 15 novos pedidos!</p>
              <p>Clique <a>aqui</a> para ver-los<br/> Ou intereja com a tabela abaixo!</p>
            </div>
          </LeftPanel>
          <RightPanel>
          <div>
              <Image src={TruckImg} alt="Alerta" width={'96px'} height={'96px'}/>
            </div>
            <div>
              <h2>Pedidos para amanhã</h2>
              <p>Estão agendados para amanhã<br/> a entrega de 56 pedidos.</p>
              <p>Visualize-os clicando <a>aqui.</a></p>
            </div>
          </RightPanel>
        </div>
        <Table>
          <DemandsTable />
        </Table>
      </Container>
    </>
  )
}

export default Dashboard
