import { AxiosInstance } from "axios";

const ItemPedidoService = (httpClient: AxiosInstance) => ({
  adicionarProdutoNoPedido: async (
    { estanteId, produtoId, quantidade, pedidoId }: 
    { estanteId: string, produtoId: string, quantidade: number, pedidoId: string }) => {
    const response = await httpClient.post(
      `/api/pedido/${pedidoId}/adicionar`, 
      { estanteId, produtoId, quantidade }
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

  deletarProdutoDoPedidoById: async (itemPedidoId: number) => {
    const response = await httpClient.delete(`/api/pedido/item-pedido/${itemPedidoId}`)

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
