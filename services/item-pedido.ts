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
  }
})

export default ItemPedidoService