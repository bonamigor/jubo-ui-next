import { NextPage } from "next";
import { useRouter } from "next/router";
import { Container, Content, FormContent, FormHeader, PedidoData, PedidoForm, TableContainer } from "./produtos";
import { useState, useEffect, FormEvent } from 'react';
import { produtoEstanteService, itemPedidoService, clienteService, pedidoService } from '../../../../../../../services/index';
import Image from "next/image";
import EditImg from '../../../../../../../assets/edit.png'
import DeleteImg from '../../../../../../../assets/delete.png'
import toast from "react-hot-toast";

interface ProdutoNaEstanteProps {
  produtoId: number;
  nome: string;
  precoCusto?: number;
  unidade: string;
  precoVenda: number;
  quantidade: number;
  total: number;
}

const PedidoProdutos: NextPage = () => {
  // const { pedido, setPedidoData } = usePedido()
  // const { cliente, setClienteData } = useClientes()
  const router = useRouter()
  const { pedidoId, estanteId } = router.query

  const [produtoNaEstante, setProdutosNaEstante] = useState<ProdutoNaEstanteProps[]>([])
  const [produtoId, setProdutoId] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [cliente, setCliente] = useState({ 
    id: 0,
    nome: '',
    cnpj: '',
    endereco: '',
    cep: '',
    email: '',
    cidade: '',
    estado: '',
    telefone: '',
    ativo: ''}
  )
  const [pedido, setPedido] = useState({ id: 0, status: '', dataCriacao: '', dataConfirmacao: '', dataCancelamento: '', dataEntrega: '', valorTotal: 0, clienteId: 0});
  const [produtos, setProdutos] = useState<ProdutoNaEstanteProps[]>([])
  const [valorTotal, setValorTotal] = useState(0)

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, errors } = await produtoEstanteService.listarProdutosNaEstante(Number(estanteId))

      if (!errors) {
        setProdutosNaEstante(data.estante.produtos)
      }
    }

    const fetchCliente = async () => {
      const { data, errors } = await clienteService.listarUmCliente(Number(window.sessionStorage.getItem('userClientId')))

      if (!errors) {
        setCliente(data.cliente)
      }
    }

    const fetchPedido = async () => {
      const { data, errors } = await pedidoService.listarPedidoById(Number(pedidoId))

      if (!errors) {
        setPedido(data.pedido[0])
      }
    }

    const fetchProdutosNoPedido = async () => {
      const { data, errors } = await pedidoService.listarProdutosByPedidoId(Number(pedidoId))

      if (!errors) {
        setProdutos(data.produtos)
      }
    }

    const fetchValorTotal = async () => {
      const { data, errors } = await pedidoService.valorTotalPedidoByPedidoId(Number(pedidoId))

      if (!errors) {
        setValorTotal(data.totalPedido)
      }
    }

    fetchProdutos()
    fetchCliente()
    fetchPedido()
    fetchProdutosNoPedido()
    fetchValorTotal()
  }, [estanteId, pedidoId, produtos])
  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {

      console.log(produtoId.split(' '))
      const { data, errors } = await itemPedidoService.adicionarProdutoNoPedido({
        estanteId: String(estanteId),
        produtoId: String(produtoId.split(' ')[0]),
        quantidade: Number(quantidade),
        pedidoId: String(pedidoId)
      })

      if (!errors) {
        
        toast.success('Produto adicionado no pedido!')
        const newProduto: ProdutoNaEstanteProps = {
          produtoId: Number(produtoId.split(' ')[0]),
          nome: produtoId.split(' ')[1],
          unidade: produtoId.split(' ')[5],
          precoVenda: Number(produtoId.split(' ')[3].substring(3).replaceAll(',', '.')),
          quantidade: Number(quantidade),
          total: (Number(produtoId.split(' ')[3].substring(3).replaceAll(',', '.')) * Number(quantidade))
        }
        setProdutos([...produtos, newProduto])
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
                    value={`${produto.produtoId} ${produto.nome} - ${new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                  }).format(produto.precoVenda)} / ${produto.unidade}`}
                  />)
                })}
              </datalist>
            </div>
            <input type="text" placeholder="Quantidade" value={quantidade} onChange={event => {setQuantidade(event.target.value)}} />
            <button type="submit">Adicionar</button>
          </FormContent>
        </PedidoForm>
        <TableContainer>
          {produtos.length < 1 ? (
            <div>
              <h1>Não há produtos nesse pedido (ainda...!)</h1>
            </div>
          ) : (
            <>
              <h2>Produtos adicionados ao Pedido</h2>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Unidade</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {produtos.map(produto => {
                      return (
                        <tr key={produto.produtoId}>
                          <td>{produto.nome}</td>
                          <td>
                          { new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(produto.precoVenda)}
                          </td>
                          <td>{produto.unidade}</td>
                          <td>{produto.quantidade}</td>
                          <td>
                          { new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(produto.total)}
                          </td>
                          <td>
                            <a><Image onClick={() => {}} src={EditImg} alt="Visualizar" width={30} height={30} /></a>
                            <a><Image onClick={() => {}} src={DeleteImg} alt="Confirmar" width={30} height={30} /></a>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
                <h4>
                  Valor Total: {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(valorTotal)}
                </h4>
              </table>
            </>
          )}
          
        </TableContainer>
      </Content>
    </Container>
  )
}

export default PedidoProdutos
