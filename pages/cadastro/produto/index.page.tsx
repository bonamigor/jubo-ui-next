import { NextPage } from "next";
import Image from "next/image";
import { Container, Content, FormButton, FormItself, FormSubmitButton, InputFilter, TableContainer } from "./produto";
import EditImg from '../../../assets/edit.png'
import DeleteImg from '../../../assets/delete.png'
import { useState, FormEvent } from 'react';
import { produtoService } from '../../../services/index';
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import DeleteModal from "../../../components/Modal/Delete/index.page";
import { useQuery } from "react-query";
import { Loading } from '@nextui-org/react';
import Head from "next/head";

export interface ProdutoProps {
  id: number;
  nome: string;
  preco: string;
  unidade: string;
}

const CadastroProduto: NextPage = () => {
  const router = useRouter()
  const [isUpdate, setIsUpdate] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [id, setId] = useState(0)
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [unidade, setUnidade] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredprodutos, setFilteredprodutos] = useState<ProdutoProps[]>([])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const { errors } = await produtoService.cadastrarProduto({
        nome: nome,
        precoCusto: String(preco),
        unidadeMedida: unidade
      })
      if (!errors) {
        toast.success('Produto cadastrado com sucesso!')
        router.reload()
      }
    } catch (error) {
      toast.error('Erro ao cadastra produto.')
      console.error(error)
    }
  }

  const { data, isLoading, isSuccess, isError } = useQuery('produtos', produtoService.listarTodosOsProdutos, { staleTime: Infinity })

  let produtos: any;

  if (data) {
    produtos = data.produtos
  }

  const handleFilterProdutoList = (event: any) => {
    setFilter(event.toUpperCase())
    setFilteredprodutos(produtos.filter((produto: ProdutoProps) => {
      return produto.nome.toUpperCase().includes(filter)
    }))
  }

  const prepareUpdate = async (produto: ProdutoProps) => {
    setId(produto.id)
    setNome(produto.nome)
    setPreco(String(produto.preco))
    setUnidade(produto.unidade)
    setIsUpdate(true)
  }

  const handleUpdate = async () => {
    try {
      const { errors } = await produtoService.atualizarProduto({
        nome: nome,
        precoCusto: String(preco),
        unidadeMedida: unidade,
        id: id
      })
      if (!errors) {
        toast.success('Produto atualizado com sucesso!')
        router.reload()
      }
    } catch (error) {
      toast.error('Erro ao cadastra produto.')
      console.error(error)
    }
  }

  const handleDeleteProduto = (produto: ProdutoProps) => {
    setId(produto.id)
    setIsDeleteModalOpen(true)
  }

  const onRequestClose = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      <Head>
        <title>Cadastro de Produto</title>
      </Head>
      <Container>
        <Content>
          <h1>Cadastro de Produto</h1>
          <FormItself onSubmit={handleSubmit}>
            <div>
              <input type="text" id="name" value={nome} onChange={event => setNome(event.target.value)} placeholder="Nome" />
              <input type="text" id="price" value={preco} onChange={(event: { target: { value: any; }; }) => setPreco(event.target.value)} placeholder="Preço" />
              <select name="unities" id="unity" value={unidade} onChange={event => setUnidade(event.target.value)}>
                <option value="">Und Medida</option>
                <option value="KG">KG</option>
                <option value="PCT">PCT</option>
                <option value="UND">UND</option>
                <option value="LT">LT</option>
                <option value="L">L</option>
                <option value="MÇ">MÇ</option>
                <option value="BDJ">BDJ</option>
                <option value="CX">CX</option>
                <option value="PLT">PLT</option>
              </select>
            </div>
            <FormSubmitButton type="submit" isUpdate={isUpdate}>Cadastrar</FormSubmitButton>
            <FormButton type="button" isUpdate={isUpdate} onClick={() => handleUpdate()}>Atualizar</FormButton>
          </FormItself>
        </Content>
        <InputFilter>
          <input type="text" placeholder="Filtre pelo nome do produto" onChange={event => handleFilterProdutoList(event.target.value)} />
        </InputFilter>
        <TableContainer>
          {isError && <div><Loading color="success" size="lg">Erro ao carregar os Produtos.</Loading></div>}
          {isLoading && <div><Loading color="success" size="lg">Carregando Produtos</Loading></div>}
          {isSuccess && (
            <table id="products-table">
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
                  filteredprodutos.map(produto => {
                    return (
                      <tr key={produto.id}>
                        <td>{produto.nome}</td>
                        <td>
                        { new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                          }).format(Number(produto.preco))}
                        </td>
                        <td>{produto.unidade}</td>
                        <td>
                          <a><Image onClick={() => prepareUpdate(produto)} src={EditImg} alt="Visualizar" width={30} height={30} /></a>
                          <a><Image onClick={() => handleDeleteProduto(produto)} src={DeleteImg} alt="Confirmar" width={30} height={30} /></a>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  produtos.map((produto: ProdutoProps) => {
                    return (
                      <tr key={produto.id}>
                        <td>{produto.nome}</td>
                        <td>
                        { new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                          }).format(Number(produto.preco))}
                        </td>
                        <td>{produto.unidade}</td>
                        <td>
                          <a><Image onClick={() => prepareUpdate(produto)} src={EditImg} alt="Visualizar" width={30} height={30} /></a>
                          <a><Image onClick={() => handleDeleteProduto(produto)} src={DeleteImg} alt="Confirmar" width={30} height={30} /></a>
                        </td>
                      </tr>
                    )
                  })
                )}
                
              </tbody>
            </table>
          )}
        </TableContainer>
        <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={onRequestClose} entity='Produto' id={id} />
      </Container>
    </>
  )
}

export default CadastroProduto
