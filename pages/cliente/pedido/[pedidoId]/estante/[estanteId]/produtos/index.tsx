import { NextPage } from "next";
import { useRouter } from "next/router";
import { Container, Content, FormContent, FormHeader, PedidoData, PedidoForm, TableContainer } from "./produtos";
import { useState, useEffect } from 'react';
import { produtoEstanteService } from '../../../../../../../services/index';
import Image from "next/image";
import EditImg from '../../../../../assets/edit.png'
import DeleteImg from '../../../../../assets/delete.png'
import { usePedido } from '../../../../../../../hooks/usePedido';
import { useClientes } from '../../../../../../../hooks/useClientes';

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

  return (
    <Container>
      <Content>
        <PedidoForm>
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
                    value={`${produto.produtoId} - ${produto.nome}`}
                  />)
                })}
              </datalist>
            </div>
            <input type="text" placeholder="Quantidade" />
            <button type="submit">Adicionar</button>
          </FormContent>
        </PedidoForm>
      </Content>
    </Container>
  )
}

export default PedidoProdutos
