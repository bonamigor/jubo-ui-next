import { NextPage } from "next";
import Image from "next/image";
import { Container } from "./demands";
import BloomImg from '../../assets/bloom.png'
import ConfirmImg from '../../assets/confirm.png'
import { useEffect, useState } from 'react';
import { pedidoService } from '../../services/index';
import toast from "react-hot-toast";
import { useRouter } from 'next/router';
import OrderInfo from "../Modal/OrderInfo/index.page";

interface PedidosProps {
  id: number;
  dataCriacao: string;
  valorTotal: number;
  status: string;
  observacao: string;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone: string;
}

interface DemandsProps {
  pedidos: PedidosProps[];
}

const PedidosTable: NextPage<DemandsProps> = ({ pedidos }) => {
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pedido, setPedido] = useState<PedidosProps>({ id: 0, dataCriacao: '', valorTotal: 0, status: '', observacao: '', nome: '', endereco: '', cidade: '', estado: '', telefone: '' })

  const onRequestClose = async () => {
    setIsModalOpen(false)
  }
  
  const viewOrderInfo = async (pedido: PedidosProps) => {
    setPedido(pedido)
    setIsModalOpen(true)
  }

  const confirmOrder = async (pedidoId: number) => {

  }

  return (
    <>
      <Container>
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
            {pedidos.map(pedido => {
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
                    <a><Image onClick={() => {confirmOrder(pedido.id)}} src={ConfirmImg} alt="Confirmar" width={30} height={30} /></a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Container>
      <OrderInfo isOpen={isModalOpen} onRequestClose={onRequestClose} pedido={pedido}/>
    </>
  )
}

export default PedidosTable
