import { NextPage } from "next";
import Image from "next/image";
import { Container, Content, FormItself, TableContainer } from "./estante";
import BloomImg from '../../../assets/bloom.png'
import ConfirmImg from '../../../assets/confirm.png'

interface EstanteProps {
  id: number;
  client: string;
  period: string;
}

const CadastroEstante: NextPage = () => {
  const estantes: Array<EstanteProps> = [
    {
      id: 1,
      client: 'CEPI Dr. Antônio R. G. da Frota',
      period: '2022/01'
    },
    {
      id: 2,
      client: 'CEPI Damiana da Cunha',
      period: '2022/01'
    },
    {
      id: 3,
      client: 'Colégio Estadual Novo Horizonte',
      period: '2022/01'
    },
    {
      id: 4,
      client: 'Colégio Estadual do Setor Palmito',
      period: '2022/01'
    }
  ]

  return (
    <>
      <Container>
        <Content>
          <h1>Cadastro de Estante</h1>
          <FormItself>
            <div>
              <input type="text" id="name" placeholder="Cliente" />
              <input type="text" id="price" placeholder="Período" />
            </div>
            <button type="submit" id="button">Cadastrar</button>
          </FormItself>
        </Content>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Período</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {estantes.map(estante => {
                return (
                  <tr key={estante.id}>
                    <td>{estante.client}</td>
                    <td>{estante.period}</td>
                    <td>
                      <a><Image onClick={() => {}} src={BloomImg} alt="Visualizar" width={30} height={30} /></a>
                      <a><Image onClick={() => {}} src={ConfirmImg} alt="Confirmar" width={30} height={30} /></a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  )
}

export default CadastroEstante
