import { NextPage } from "next";
import { useRouter } from "next/router";
import { CancelButton, ConfirmButton, Container, Content, DecideButtons, FormContent, FormHeader, PedidoData, PedidoForm, TableBorder, TableContainer, TableFooter, TableTitle } from "./produtos";
import { useState, useEffect, FormEvent } from 'react';
import { produtoEstanteService, itemPedidoService, clienteService, pedidoService } from '../../../../../../../services/index';
import Image from "next/image";
import EditImg from '../../../../../../../assets/edit.png'
import DeleteImg from '../../../../../../../assets/delete.png'
import toast from "react-hot-toast";
import ProductsInDemandTable from "../../../../../../../components/ProducstInDemandTable";
import DeleteModal from "../../../../../../../components/Modal/Delete";

interface ProdutoNaEstanteProps {
  produtoId: number;
  nome: string;
  precoCusto?: number;
  unidade: string;
  precoVenda: number;
  quantidade: number;
  total: number;
}

interface ProdutoNoPedidoProps {
  id: string;
  nome: string;
  unidade: string;
  precoVenda: number;
  quantidade: number;
  total: number;
}

const PedidoProdutos: NextPage = () => {
  const router = useRouter()
  const { pedidoId, estanteId } = router.query
  const [produtoNaEstante, setProdutosNaEstante] = useState<ProdutoNaEstanteProps[]>([])
  const [produtos, setProdutos] = useState<ProdutoNoPedidoProps[]>([])
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [id, setId] = useState(0)

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

    fetchProdutos()
    fetchCliente()
    fetchPedido()
  }, [estanteId, pedidoId, produtos])
  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const { errors } = await itemPedidoService.adicionarProdutoNoPedido({
        estanteId: String(estanteId),
        produtoId: produtoId.split(' ')[0],
        quantidade: Number(quantidade),
        pedidoId: String(pedidoId)
      })

      if (!errors) {
        setProdutoId('')
        setQuantidade('')

        const newProduto: ProdutoNoPedidoProps = {
          id: produtoId.split(' ')[0],
          nome: produtoId.split(' ')[1],
          unidade: produtoId.split(' ')[5],
          precoVenda: Number(produtoId.split(' ')[3].substring(3).replaceAll(',', '.')),
          quantidade: Number(quantidade),
          total: (Number(produtoId.split(' ')[3].substring(3).replaceAll(',', '.')) * Number(quantidade))
        }
        setProdutos([...produtos, newProduto])

        toast.success('Produto adicionado no pedido!')
      }
    } catch (error) {
      toast.error('Erro ao adicionar o produto no pedido.')
      console.error(error)
    }
  }

  const prepareUpdate = async (produto: ProdutoNoPedidoProps) => {
    setProdutoId(`${produto.id} ${produto.nome} - R$ ${produto.precoVenda}/${produto.unidade}`)
    setQuantidade(String(produto.quantidade))
  }

  const handleFecharPedido = () => {
    toast.success('Pedido fechado!')
    router.push('/cliente/inicial')
  }

  const handleDeletePedido = () => {
    setId(Number(pedidoId))
    setIsDeleteModalOpen(true)
  }

  const onRequestClose = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <Container>
      <Content>
        <FormHeader>
          <h1>Adicione Produtos ao Pedido!</h1>
          <PedidoData>
            <h2>Dados Pedido N° {pedidoId}</h2>
            <div>
              <p><span>Colégio:</span> {cliente.nome}</p>
              <p><span>Data Criação:</span> {new Intl.DateTimeFormat('pt-BR').format(new Date())}</p>
              <p><span>Status:</span> {pedido.status}</p>
            </div>
          </PedidoData>
        </FormHeader>
        <h2>Selecione os produtos, digite a quantidade desejada e clique em Adicionar!</h2>
          <PedidoForm onSubmit={handleSubmit}> 
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
          <ProductsInDemandTable prepareUpdate={prepareUpdate} />
        <DecideButtons>
          <ConfirmButton onClick={handleFecharPedido}>Fechar Pedido</ConfirmButton>
          <CancelButton onClick={handleDeletePedido}>Cancelar Pedido</CancelButton>
        </DecideButtons>
        <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={onRequestClose} entity='Pedido' id={id} />
      </Content>
    </Container>
  )
}

export default PedidoProdutos
