import { NextPage } from "next";
import { useRouter } from "next/router";
import { Container, Content, FormContent, FormHeader, PedidoData, PedidoForm, TableContainer } from "./produtos";
import { useState, useEffect, FormEvent } from 'react';
import { produtoEstanteService, itemPedidoService } from '../../../../../../../services/index';
import Image from "next/image";
import EditImg from '../../../../../assets/edit.png'
import DeleteImg from '../../../../../assets/delete.png'
import { usePedido } from '../../../../../../../hooks/usePedido';
import { useClientes } from '../../../../../../../hooks/useClientes';
import toast from "react-hot-toast";

interface ProdutoNaEstanteProps {
  produtoId: number;
  nome: string;
  precoCusto: number;
  unidade: string;
  precoVenda: number;
  quantidade: number;
}

const PedidoProdutos: NextPage = () => {
  const { pedido, setPedidoData } = usePedido()
  const { cliente, setClienteData } = useClientes()
  const router = useRouter()
  const { pedidoId, estanteId } = router.query

  const [produtoNaEstante, setProdutosNaEstante] = useState<ProdutoNaEstanteProps[]>([])
  const [produtoId, setProdutoId] = useState('')
  const [quantidade, setQuantidade] = useState('')

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, errors } = await produtoEstanteService.listarProdutosNaEstante(Number(estanteId))

      if (!errors) {
        setProdutosNaEstante(data.estante.produtos)
      }
    }
    fetchProdutos()
    console.log(router.query)
  }, [estanteId])

  useEffect(() => {
    setClienteData(Number(window.sessionStorage.getItem('userClientId')))
    setPedidoData(Number(pedidoId))
  }, [pedidoId, setClienteData, setPedidoData])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const newProdutoId = produtoId.split(' ')[0]

      const { data, errors } = await itemPedidoService.adicionarProdutoNoPedido({
        estanteId: String(estanteId),
        produtoId: String(produtoId),
        quantidade: Number(quantidade),
        pedidoId: String(pedidoId)
      })

      if (!errors) {
        toast.success('Produto adicionado no pedido!')
      }
    } catch (error) {
      toast.error('Erro ao adicionar o produto no pedido.')
      console.error(error)
    }
  }

  return (
    <Container>
      <Content>
        <PedidoForm onSubmit={handleSubmit}> 
          <FormHeader>
            <h1>Adicionar Produtos no Pedido</h1>
            <PedidoData>
              <label>ID</label>
              <input type="text" disabled defaultValue={pedidoId} />
              Id: {pedidoId} | 
              Colégio: {cliente.nome} | 
              Data Criação: {new Intl.DateTimeFormat('pt-BR').format(new Date())} | 
              Status: {pedido.status}
            </PedidoData>
            <h2>Selecione os produtos, digite a quantidade desejada e clique em Adicionar!</h2>
          </FormHeader>
          <FormContent>
            <div>
              <input type="text" placeholder="Pesquise o Produto" 
                  list="produtos" id="produto-choice" name="produto-choice" autoComplete="off"
                  value={produtoId} onChange={event => {setProdutoId(event.target.value)}} />
              <datalist id="produtos">
                {produtoNaEstante.map(produto => {
                  return (
                  <option key={produto.produtoId} 
                    value={`${produto.produtoId} - ${produto.nome} - R$ ${produto.precoVenda}`}
                  />)
                })}
              </datalist>
            </div>
            <input type="text" placeholder="Quantidade" />
            <button type="submit">Adicionar</button>
          </FormContent>
        </PedidoForm>
        {/* <TableContainer>
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
                filteredprodutos.map(produto => {
                  return (
                    <tr key={produto.id}>
                      <td>{produto.nome}</td>
                      <td>
                      { new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(produto.preco)}
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
                produtos.map(produto => {
                  return (
                    <tr key={produto.id}>
                      <td>{produto.nome}</td>
                      <td>
                      { new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(produto.preco)}
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
        </TableContainer> */}
      </Content>
    </Container>
  )
}

export default PedidoProdutos
