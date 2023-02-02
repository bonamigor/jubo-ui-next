import { AxiosInstance } from "axios";

const ItemPedidoService = (httpClient: AxiosInstance) => ({
  adicionarProdutoNoPedido: async (
    { estanteId, produtoId, precoVenda, quantidade, pedidoId }: 
    { estanteId: string, produtoId: string, precoVenda: number, quantidade: number, pedidoId: string }) => {
    const response = await httpClient.post(
      `/api/pedido/${pedidoId}/adicionar`, 
      { estanteId, produtoId, precoVenda, quantidade }
    )

    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  },

  atualizarItemDoPedido: async (
    { estanteId, produtoId, pedidoId, itemPedidoId, precoVenda, quantidade }:
    { estanteId: number, produtoId: number, pedidoId: number, itemPedidoId: number, precoVenda: number, quantidade: number }) => {

    const response = await httpClient.put(
      `/api/pedido/${pedidoId}/atualizar/${itemPedidoId}`,
      { estanteId, produtoId, precoVenda, quantidade })

    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  },

  deletarProdutoDoPedidoById: async (id: string) => {
    const response = await httpClient.delete(`/api/pedido/${id.split(' ')[1]}/item-pedido/${id.split(' ')[0]}`)

    let itemPedidoErrors = null

    if (!response.data) {
      itemPedidoErrors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      itemPedidoErrors
    }
  }
})

export default ItemPedidoService
