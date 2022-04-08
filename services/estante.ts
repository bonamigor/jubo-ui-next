import { AxiosInstance } from 'axios';

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
    const response = await httpClient.get('/api/estantes-cliente')

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

  cadastrarEstante: async ({ periodo, clienteId }: 
    { periodo: string, clienteId: number }) => {
    const response = await httpClient.post(
      '/api/estantes',
      { periodo, clienteId, ativa: 1 }
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

  atualizarEstante: async ({ periodo, clienteId, id }: 
    { periodo: string, clienteId: number, id: number }) => {
    const response = await httpClient.put(
      '/api/estantes',
      { periodo, clienteId, id }
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
  }
})

export default EstanteService
