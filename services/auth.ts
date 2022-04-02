import { AxiosInstance } from 'axios';


const AuthService = (httpClient: AxiosInstance) => ({
  login: async({ email, senha }: { email: string, senha: string }) => {
    const response = await httpClient.post('/api/autenticacao', {
      email, senha
    })

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

export default AuthService
