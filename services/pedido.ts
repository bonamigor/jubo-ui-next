import { AxiosInstance } from 'axios';

const PedidoService = (httpClient: AxiosInstance) => ({
  criarPedido: async (clienteId: number) => {
    const response = await httpClient.post(
      '/api/pedidos',
      { clienteId })

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

  listarPedidoById: async (pedidoId: number) => {
    const response = await httpClient.get(`/api/pedidos/${pedidoId}`)

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

export default PedidoService
