import { NextPage } from "next";
import Image from "next/image";
import { Container, Content, FormItself, InputFilter, TableContainer } from "./produto";
import BloomImg from '../../../assets/bloom.png'
import ConfirmImg from '../../../assets/confirm.png'
import { useState } from 'react';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  unity: string;
}

const CadastroProduto: NextPage = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [unity, setUnity] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([])
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
    }
  ]

  const handleFilterProductList = (event: any) => {
    setFilter(event.toUpperCase())
    setFilteredProducts(products.filter(product => {
      return product.name.toUpperCase().includes(filter)
    }))
  }

  const handleUpdateProduct = async (product: ProductProps) => {
    setName(product.name)
    setPrice(product.price)
    setUnity(product.unity)
  }

  return (
    <>
      <Container>
        <Content>
          <h1>Cadastro de Produto</h1>
          <FormItself>
            <div>
              <input type="text" id="name" value={name} onChange={event => setName(event.target.value)} placeholder="Nome" />
              <input type="text" id="price" value={price} onChange={event => setPrice(Number(event.target.value))} placeholder="Preço" />
              <input type="text" id="unity" value={unity} onChange={event => setUnity(event.target.value)}  placeholder="Und Medida" />
            </div>
            <button type="submit" id="button">Cadastrar</button>
          </FormItself>
        </Content>
        <InputFilter>
          <input type="text" placeholder="Filtre pelo nome do produto" onChange={event => handleFilterProductList(event.target.value)} />
        </InputFilter>
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
              {filter.length > 1 ? (
                filteredProducts.map(product => {
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
                        <a onClick={() => handleUpdateProduct(product)}><Image src={BloomImg} alt="Visualizar" width={30} height={30} /></a>
                        <a><Image onClick={() => {}} src={ConfirmImg} alt="Confirmar" width={30} height={30} /></a>
                      </td>
                    </tr>
                  )
                })
              ) : (
                products.map(product => {
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
                        <a onClick={() => handleUpdateProduct(product)}><Image src={BloomImg} alt="Visualizar" width={30} height={30} /></a>
                        <a><Image onClick={() => {}} src={ConfirmImg} alt="Confirmar" width={30} height={30} /></a>
                      </td>
                    </tr>
                  )
                })
              )}
              
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  )
}

export default CadastroProduto
