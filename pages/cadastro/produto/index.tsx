import { NextPage } from "next";
import Image from "next/image";
import { Container, Content, FormItself, TableContainer } from "./produto";
import BloomImg from '../../../assets/bloom.png'
import ConfirmImg from '../../../assets/confirm.png'

interface ProductProps {
  id: number;
  name: string;
  price: number;
  unity: string;
}

const CadastroProduto: NextPage = () => {
  const products: Array<ProductProps> = [
    {
      id: 1,
      name: 'Arroz',
      price: 9.99,
      unity: 'PCT'
    },
    {
      id: 2,
      name: 'Feijão',
      price: 8.99,
      unity: 'PCT'
    },
    {
      id: 3,
      name: 'Macarrão',
      price: 1.99,
      unity: 'PCT'
    },
    {
      id: 4,
      name: 'Molho de Tomate',
      price: 0.99,
      unity: 'UND'
    },
  ]

  return (
    <>
      <Container>
        <Content>
          <h1>Cadastro de Produto</h1>
          <FormItself>
            <div>
              <input type="text" id="name" placeholder="Nome" />
              <input type="text" id="price" placeholder="Preço" />
              <input type="text" id="unity" placeholder="Und Medida" />
            </div>
            <button type="submit" id="button">Cadastrar</button>
          </FormItself>
        </Content>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço</th>
                <th>Unidade</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {products.map(product => {
                return (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                    { new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                      }).format(product.price)}
                    </td>
                    <td>{product.unity}</td>
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

export default CadastroProduto
