/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next';
import { TableContainer, TableFooter, TableTitle } from './productsInDemand';
import Image from "next/image";
import EditImg from '../../assets/edit.png'
import DeleteImg from '../../assets/delete.png'
import { useState, useEffect } from 'react';
import { pedidoService } from '../../services';
import DeleteModal from '../Modal/Delete/index.page';
import { useRouter } from 'next/router';

interface ProductsProps {
  itemPedidoId: string;
  produtoId: string;
  nome: string;
  unidade: string;
  precoVenda: number;
  quantidade: number;
  total: number;
}

interface ProductsInDemandProps {
  prepareUpdate: (product: ProductsProps) => void;
}

const ProductsInDemandTable: NextPage<ProductsInDemandProps> = ({ prepareUpdate }: ProductsInDemandProps) => {
  const router = useRouter()
  const { pedidoId, estanteId } = router.query
  const [products, setProducts] = useState<ProductsProps[]>([])
  const [valorTotal, setValorTotal] = useState(0)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [id, setId] = useState('')

  useEffect(() => {
    const fetchProdutosNoPedido = async () => {
      const { data, errors } = await pedidoService.listarProdutosByPedidoId(Number(pedidoId))

      if (!errors) {
        setProducts(data.produtos)
      }
    }

    const fetchValorTotal = async () => {
      const { data, errors } = await pedidoService.valorTotalPedidoByPedidoId(Number(pedidoId))

      if (!errors) {
        setValorTotal(data.totalPedido)
      }
    }

    fetchProdutosNoPedido()
    fetchValorTotal()
  }, [products])

  const handleDeleteItemPedido = (product: ProductsProps) => {
    setId(product.itemPedidoId)
    setIsDeleteModalOpen(true)
  }

  const onRequestClose = () => {
    setIsDeleteModalOpen(false)
  }
  
  return (
    <>
      {products.length < 1 ? (
        <div>
            <h1>Não há products nesse pedido (ainda...!)</h1>
        </div>
      ) : (
        <>
          <TableTitle>
            <h2><b>Produtos adicionados ao pedido:</b></h2>
          </TableTitle>
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Unidade</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {
                  products.map(product => {
                    return (
                      <tr key={String(product.itemPedidoId)}>
                        <td>{product.itemPedidoId}</td>
                        <td>{product.nome}</td>
                        <td>
                          {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                          }).format(product.precoVenda)}
                        </td>
                        <td>{product.unidade}</td>
                        <td>{product.quantidade}</td>
                        <td>
                          {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                          }).format(product.total)}
                        </td>
                        <td>
                          <a><Image onClick={() => prepareUpdate(product)} src={EditImg} alt="Visualizar" width={30} height={30} /></a>
                          <a><Image onClick={() => handleDeleteItemPedido(product)} src={DeleteImg} alt="Confirmar" width={30} height={30} /></a>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </TableContainer>
          <TableFooter>
            <h4>
              Valor Total: {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(valorTotal)}
            </h4>
          </TableFooter>
          <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={onRequestClose} entity='ItemPedido' id={Number(id)} />
        </>
      )}
    </>
  )
}

export default ProductsInDemandTable
