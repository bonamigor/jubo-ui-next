import { NextPage } from "next";
import Image from "next/image";
import { Container } from "./demands";
import BloomImg from '../../assets/bloom.png'
import ConfirmImg from '../../assets/confirm.png'
import { useEffect, useState } from 'react';
import { pedidoService } from '../../services/index';

interface PedidosProps {
  id: number;
  dataCriacao: string;
  valorTotal: number;
  nome: string;
  cidade: string;
  estado: string;
}

interface DemandsProps {
  pedidos: PedidosProps[]
}

const PedidosTable: NextPage<DemandsProps> = ({pedidos}) => {
  return (
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
                  { new Intl.DateTimeFormat('pt-BR')
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
                  <a><Image onClick={() => {}} src={BloomImg} alt="Visualizar" width={30} height={30} /></a>
                  <a><Image onClick={() => {}} src={ConfirmImg} alt="Confirmar" width={30} height={30} /></a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  )
}

export default PedidosTable
