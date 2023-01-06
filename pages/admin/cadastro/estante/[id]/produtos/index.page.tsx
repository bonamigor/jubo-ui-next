import { NextPage } from "next";
import { useRouter } from "next/router";
import { Container, Content, FormButton, FormItself, FormSubmitButton, InputFilter, TableContainer } from "./estanteProduto";
import { useState, useEffect, FormEvent } from 'react';
import { ProdutoProps } from '../../../produto/index.page';
import { produtoService } from "../../../../../../services";
import toast from "react-hot-toast";
import { produtoEstanteService } from '../../../../../../services/index';
import Image from "next/image";
import EditImg from '../../../../../../assets/edit.png'
import DeleteImg from '../../../../../../assets/delete.png'
import DeleteModal from "../../../../../../components/Modal/Delete/index.page";
import { useQuery } from "react-query";
import Head from "next/head";

interface EstanteProdutoProps {
  produtoId: number;
  nome: string;
  precoCusto: number;
  unidade: string;
  precoVenda: number;
  quantidade: number;
}

const EstanteProduto: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [isUpdate, setIsUpdate] = useState(false)
  
  const [filter, setFilter] = useState('')
  const [filteredProdutosNaEstante, setFilteredProdutosNaEstante] = useState<EstanteProdutoProps[]>([])
  const [produtosNaEstante, setProdutosNaEstante] = useState<EstanteProdutoProps[]>([])
  const [produtoId, setProdutoId] = useState('')
  const [estanteId, setEstanteId] = useState(id)
  const [precoVenda, setPrecoVenda] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [qtdProdutosEstante, setQtdProdutosEstante] = useState(0)

  const [produtoNaEstanteId, setProdutoNaEstanteId] = useState<number[]>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleFilterProdutoList = (event: any) => {
    setFilter(event.toUpperCase())
    setFilteredProdutosNaEstante(produtosNaEstante.filter(produto => {
      return produto.nome.toUpperCase().includes(filter)
    }))
  }

  useEffect(() => {
    const fetchProductsNaEstante = async () => {
      const { data, errors } = await produtoEstanteService.listarProdutosNaEstante(Number(id))
      if (!errors) {
        setProdutosNaEstante(data.estante.produtos)
      }
    }

    fetchProductsNaEstante()
  }, [id, qtdProdutosEstante])

  let produtos: Array<ProdutoProps> = [];
  const produtosQuery = useQuery('produtos', produtoService.listarTodosOsProdutos)

  // if (produtosQuery.isLoading) {
  //   return <div>Carregando Produtos...</div>
  // }

  if (produtosQuery.isSuccess) {
    produtos = produtosQuery.data.produtos
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const { errors } = await produtoEstanteService.cadastrarProdutoNaEstante({
        idEstante: Number(id),
        idProduto: Number(produtoId.split(' ')[0]),
        precoVenda: precoVenda,
        quantidade: quantidade
      })

      if (!errors) {
        toast.success('Produto adicionado com sucesso!')
        setQtdProdutosEstante(qtdProdutosEstante + 1)
      }
    } catch (error) {
      toast.error('Erro ao adicionar o produto na estante.')
      console.error(error)
    }
  }

  const prepareUpdate = (produto: EstanteProdutoProps) => {
    const produtoId = `${produto.produtoId} - ${produto.nome} - ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(produto.precoVenda)}/${produto.unidade}`
    setProdutoId(produtoId)
    setPrecoVenda(String(produto.precoVenda))
    setQuantidade(String(produto.quantidade))
    setIsUpdate(true)
  }

  const handleUpdate = async () => {
    try {
      console.log(estanteId)
      const { errors } = await produtoEstanteService.atualizarProdutoNaEstante({
        idEstante: Number(id),
        idProduto: Number(produtoId.split(' ')[0]),
        precoVenda: precoVenda,
        quantidade: quantidade
      })

      if (!errors) {
        toast.success('Produto atualizado com sucesso!')
        router.reload()
      }
    } catch (error) {
      toast.error('Erro ao atualizar o produto na estante.')
      console.error(error)
    }
  }

  const handleDeleteProdutoNaEstante = (produto: EstanteProdutoProps) => {
    const ids = [Number(id), Number(produto.produtoId)]
    setProdutoNaEstanteId(ids)
    console.log(produtoNaEstanteId)
    setIsDeleteModalOpen(true)
  }

  const onRequestClose = () => {
    setIsDeleteModalOpen(false)
  }
  
  return (
    <>
      <Head>
        <title>Produtos na Estante</title>
      </Head>
      <Container>
        <Content>
          <h1>Adicionar produtos na Estante</h1>
          <FormItself onSubmit={handleSubmit}>
            {produtosQuery.isLoading && <input type="text" placeholder="Carregando produtos..." />}
            {produtosQuery.isSuccess && (
              <>
              <input type="text" placeholder="Pesquise o Produto" 
                list="produtos" id="produto-choice" name="produto-choice" autoComplete="off"
                value={produtoId} onChange={event => {setProdutoId(event.target.value)}} />
              <datalist id="produtos">
                {produtos.map(produto => {
                  return (
                  <option key={produto.id} 
                    value={`${produto.id} - ${produto.nome} - ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(Number(produto.preco))}/${produto.unidade}`}
                  />)
                })}
              </datalist>
              </>
            )}
            <input type="text" placeholder="Preço" value={precoVenda} onChange={event => {setPrecoVenda(event.target.value)}} />
            <input type="text" placeholder="Quant." value={quantidade} onChange={event => {setQuantidade(event.target.value)}} />
            <FormSubmitButton type="submit" isUpdate={isUpdate}>Adicionar</FormSubmitButton>
            <FormButton type="button" isUpdate={isUpdate} onClick={() => handleUpdate()}>Atualizar</FormButton>
          </FormItself>
        </Content>
        {produtosNaEstante.length < 1 ? (
          <h2>Não há produtos nessa estante (...ainda!)</h2>
        ) : (
          <TableContainer>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço Custo</th>
                <th>Unidade</th>
                <th>Preço Venda</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {filter.length > 1 ? (
                filteredProdutosNaEstante.map(produto => {
                  return (
                    <tr key={produto.produtoId}>
                      <td>{produto.produtoId}</td>
                      <td>{produto.nome}</td>
                      <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(produto.precoCusto)}</td>
                      <td>{produto.unidade}</td>
                      <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(produto.precoVenda)}</td>
                      <td>{produto.quantidade}</td>
                      <td>
                        <a><Image onClick={() => {prepareUpdate(produto)}} src={EditImg} alt="Visualizar" width={30} height={30} /></a>
                        <a><Image onClick={() => {handleDeleteProdutoNaEstante(produto)}} src={DeleteImg} alt="Deletear" width={30} height={30} /></a>
                      </td>
                    </tr>
                  )
                })
              ) : (
                produtosNaEstante.map(produto => {
                  return (
                    <tr key={produto.produtoId}>
                      <td>{produto.produtoId}</td>
                      <td>{produto.nome}</td>
                      <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(produto.precoCusto)}</td>
                      <td>{produto.unidade}</td>
                      <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(produto.precoVenda)}</td>
                      <td>{produto.quantidade}</td>
                      <td>
                        <a><Image onClick={() => {prepareUpdate(produto)}} src={EditImg} alt="Visualizar" width={30} height={30} /></a>
                        <a><Image onClick={() => {handleDeleteProdutoNaEstante(produto)}} src={DeleteImg} alt="Deletear" width={30} height={30} /></a>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </TableContainer>
        )}
        
        <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={onRequestClose} entity='ProdutoEstante' idArray={produtoNaEstanteId} />
      </Container>
    </>
  )
}

export default EstanteProduto
