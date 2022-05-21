import { NextPage } from "next";
import { Container, Content, TableContainer } from "./inicial";
import { useState, useEffect } from 'react';
import { pedidoService } from '../../../services/index';

interface LastOrderProps {
  id: number;
  dataCriacao: string;
  total: number;
  status: string;
}

const Inicial: NextPage = () => {
  const [lastOrder, setLastOrder] = useState<LastOrderProps>({ id: 0, dataCriacao: '', total: 0, status: '' })

  useEffect(() => {
    const fetchLastOrder = async () => {
      try {
        const clienteId = window.sessionStorage.getItem('userClientId')
        const { data, errors } = await pedidoService.listarUltimoPedidoByCliente(Number(clienteId))

        console.log(data)

        if (!errors) {
          setLastOrder(data.pedido)
        }
      } catch (error) {
        
      }
    }

    fetchLastOrder()
  }, [])

  return (
    <Container>
      <Content>
        <h1>Último pedido feito!</h1>
        <p>Estes são os dados do seu último pedido, clique em + para mais detalhes!</p>

        <TableContainer>
          {lastOrder ? 
          <>
            <table>
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Data Criação</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{lastOrder.id}</td>
                  <td>
                    {lastOrder.dataCriacao === '' ? '' : new Intl.DateTimeFormat('pt-BR')
                          .format(new Date(lastOrder.dataCriacao))}
                  </td>
                  <td>
                    { new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(lastOrder.total)}
                  </td>
                  <td>{lastOrder.status}</td>
                  <td>+</td>
                </tr>
              </tbody>
            </table>
          </> : 
          <>
            <h1>Não existem pedidos feitos por você. Clique em Realizar Pedido!</h1>
          </>}
        </TableContainer>
      </Content>
    </Container>
  )
}

export default Inicial
