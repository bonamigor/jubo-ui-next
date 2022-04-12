import { AxiosInstance } from 'axios';

const ProdutoEstanteService = (httpClient: AxiosInstance) => ({
  cadastrarProdutoNaEstante: async ({ idEstante, idProduto, precoVenda, quantidade }:
    { idEstante: Number, idProduto: Number, precoVenda: string, quantidade: string }) => {
      const response = await httpClient.post(
        `/api/estantes/${idEstante}/produtos/${idProduto}/preco-quantidade`,
        { precoVenda, quantidade }
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

    listarProdutosNaEstante: async (idEstante: number) => {
      const response = await httpClient.get(`api/estantes/${idEstante}/produtos/preco-quantidade`)

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

export default ProdutoEstanteService
