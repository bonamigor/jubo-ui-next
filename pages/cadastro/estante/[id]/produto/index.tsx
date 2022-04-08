import { NextPage } from "next";
import { useRouter } from "next/router";
import { Container, Content, FormButton, FormItself, FormSubmitButton, InputFilter } from "./estanteProduto";
import { useState, useEffect, FormEvent } from 'react';
import { ProdutoProps } from '../../../produto/index';
import { produtoService } from "../../../../../services";

const EstanteProduto: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [isUpdate, setIsUpdate] = useState(false)
  const [produtos, setProdutos] = useState<ProdutoProps[]>([])
  const [filter, setFilter] = useState('')
  const [filteredProdutos, setFilteredProdutos] = useState<ProdutoProps[]>([])
  const [produtoId, setProdutoId] = useState('')

  const handleFilterProdutoList = (event: any) => {
    setFilter(event.toUpperCase())
    setFilteredProdutos(produtos.filter(produto => {
      return produto.nome.toUpperCase().includes(filter)
    }))
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, errors } = await produtoService.listarTodosOsProdutos()
      if (!errors) {
        setProdutos(data.produtos)
      }
    }
    fetchProducts()
  }, [])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log(produtoId.split('')[0])
  }

  const handleUpdate = () => {

  }
  
  return (
    <>
      <Container>
        <Content>
          <h1>Adicionar produtos na Estante</h1>
          <FormItself onSubmit={handleSubmit}>
            <input type="text" placeholder="Pesquise o Produto" 
              list="produtos" id="produto-choice" name="produto-choice"
              value={produtoId} onChange={event => {setProdutoId(event.target.value)}} />
            <datalist id="produtos">
              {produtos.map(produto => {
                return (
                <option key={produto.id} 
                  value={`${produto.id} - ${produto.nome} - ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(produto.preco)}/${produto.unidade}`}
                />)
              })}
            </datalist>
            <input type="text" placeholder="Preço" />
            <input type="text" placeholder="Quant." />
            <FormSubmitButton type="submit" isUpdate={isUpdate}>Adicionar</FormSubmitButton>
            <FormButton type="button" isUpdate={isUpdate} onClick={() => handleUpdate()}>Atualizar</FormButton>
          </FormItself>
        </Content>
      </Container>
    </>
  )
}

export default EstanteProduto
