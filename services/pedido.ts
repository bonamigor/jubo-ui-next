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

  listarPedidosByCliente: async (clienteId: number) => {
    const response = await httpClient.get(`/api/pedidos/cliente/${clienteId}`)

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

  listarProdutosByPedidoId: async (pedidoId: number ) => {
    const response = await httpClient.get(`/api/pedidos/${pedidoId}/produtos`)

    return response.data
  },
  
  gerarRelatorioPedidos: async ({ dataInicial, dataFinal }: { dataInicial: string, dataFinal: string }) => {
    const response = await httpClient.post('/api/pedidos/relatorio-data', { dataInicial, dataFinal })

    return response.data
  },

  listarProdutosByPedidoIdOld: async (pedidoId: number ) => {
    const response = await httpClient.get(`/api/pedidos/${pedidoId}/produtos`)

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
  },


  confirmarPedidoById: async ({ pedidoId, dataEntrega }: { pedidoId: number, dataEntrega: string }) => {
    const response = await httpClient.put(`/api/pedidos/${pedidoId}/confirmar`, { dataEntrega })

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

  cancelarPedidoById: async (pedidoId: number) => {
    const response = await httpClient.put(`/api/pedidos/${pedidoId}/cancelar`)

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

  adicionarObservacao: async ({ observacao, pedidoId }: { observacao: string, pedidoId: number }) => {
    const response = await httpClient.put(`/api/pedidos/${pedidoId}/observacao`, { observacao })

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
