import { NextPage } from "next";
import Image from "next/image";
import { Container } from "./demands";
import BloomImg from '../../assets/bloom.png'
import ConfirmImg from '../../assets/confirm.png'

interface DemandsProps {
  id: number;
  colegio: string;
  cidade: string;
  estado: string;
  dataCriacao: string;
  valorTotal: number;
}

const DemandsTable: NextPage = () => {
  const demands: Array<DemandsProps> = [
    {
      id: 1,
      colegio: 'CEPI Dr. Antônio Raimundo da Frota',
      cidade: 'Goiânia',
      estado: 'GO',
      dataCriacao: '03/07/2022',
      valorTotal: 549.70
    },
    {
      id: 2,
      colegio: 'Colégio Estadual Francisco Alves',
      cidade: 'Nova Veneza',
      estado: 'GO',
      dataCriacao: '03/08/2022',
      valorTotal: 254.77
    },
    {
      id: 3,
      colegio: 'CEPI Novo Horizonte',
      cidade: 'Goiânia',
      estado: 'GO',
      dataCriacao: '03/09/2022',
      valorTotal: 315.61
    },
    {
      id: 4,
      colegio: 'Colégio EStadual Damiana da Cunha',
      cidade: 'Goiânia',
      estado: 'GO',
      dataCriacao: '03/09/2022',
      valorTotal: 445.65
    },
    {
      id: 5,
      colegio: 'Colégio Estadual do Setor Palmito',
      cidade: 'Goiânia',
      estado: 'GO',
      dataCriacao: '03/10/2022',
      valorTotal: 600.02
    }
  ]

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
          {demands.map(demand => {
            return (
              <tr key={demand.id}>
                <td>{demand.colegio}</td>
                <td>{demand.cidade} / {demand.estado}</td>
                <td>
                  { new Intl.DateTimeFormat('pt-BR')
                        .format(new Date(demand.dataCriacao)) 
                    }
                </td>
                <td>
                { new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                  }).format(demand.valorTotal)}
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

export default DemandsTable
