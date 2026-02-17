import { AxiosInstance } from 'axios'

const EstanteService = (httpClient: AxiosInstance) => ({
  listarUmaEstante: async (id: number) => {
    const response = await httpClient.get(`/api/estantes/${id}`)

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

  listarTodosAsEstantes: async () => {
    const response = await httpClient.get('/api/estantes')

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

  listarTodosAsEstantesReactQuery: async () => {
    const response = await httpClient.get('/api/estantes')

    return response.data
  },

  listarEstantesDoCliente: async (id: number) => {
    const response = await httpClient.get(`/api/cliente/${id}/estantes`)

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

  cadastrarEstante: async ({ periodo, clienteId, observacao, empresa }: 
    { periodo: string, clienteId: number, observacao: string, empresa?: number }) => {
    const dados = empresa ? { periodo, clienteId, observacao, ativa: 1, empresa } : { periodo, clienteId, observacao, ativa: 1 }

    const response = await httpClient.post(
      '/api/estantes',
      dados
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

  atualizarEstante: async ({ periodo, clienteId, observacao, empresa, id }: 
    { periodo: string, clienteId: number, observacao: string, empresa?: number, id: number }) => {
      const dados = empresa ? { periodo, clienteId, observacao, empresa, id } : { periodo, clienteId, observacao, id }
    const response = await httpClient.put(
      '/api/estantes',
      dados
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

  atualizarStatusDoProdutoNaEstante: async ({ ativo, estanteId, produtoId }: 
    { ativo: number, estanteId: number, produtoId: number }) => {
    const response = await httpClient.patch(
      '/api/estante-produto/atualizar-status-produto',
      { ativo, estanteId, produtoId }
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

  deletarEstante: async (id: number) => {
    const response = await httpClient.delete(
      `/api/estantes/${id}`
    )

    let estanteErrors = null

    if (!response.data) {
      estanteErrors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      estanteErrors
    }
  },

  alterarEstadoDaEstante: async (id: number, status: number) => {
    const response = await httpClient.patch(`/api/estantes/${id}/${status}`)

    let estanteErrors = null

    if (!response.data) {
      estanteErrors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      estanteErrors
    }
  },

  copiarProdutosEntreEstantes: async (dados: { estanteOrigemId: number; estanteDestinoId: number }) => {
    const response = await httpClient.post(`/api/estantes/copiar`, { dados })

    let estanteErrors = null

    if (!response.data) {
      estanteErrors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      estanteErrors
    }
  },
})

export default EstanteService
