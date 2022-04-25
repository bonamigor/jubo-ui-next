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

  listarPedidos: async () => {
    const response = await httpClient.get('/api/pedidos')

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

  listarPedidosDeAmanha: async () => {
    const response = await httpClient.get('/api/pedidos/amanha')

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
  },

  listarUltimoPedidoByCliente: async (clienteId: number) => {
    const response = await httpClient.get(`/api/pedidos/ultimo/${clienteId}`)

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

  listarProdutosByPedidoId: async ({ estanteId, pedidoId }: { estanteId: number, pedidoId: number }) => {
    const response = await httpClient.get(`/api/pedidos/${pedidoId}/estante/${estanteId}/produtos`)

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

  valorTotalPedidoByPedidoId: async (pedidoId: number) => {
    const response = await httpClient.get(`/api/pedidos/${pedidoId}/valorTotal`)

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

  deletarPedidoById: async (pedidoId: number) => {
    const response = await httpClient.delete(`/api/pedidos/${pedidoId}`)

    let pedidoErrors = null

    if (!response.data) {
      pedidoErrors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      pedidoErrors
    }
  }
  
})

export default PedidoService
