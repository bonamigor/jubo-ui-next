import axios from "axios"
import { setupInterceptorsTo } from './Interceptors';
setupInterceptorsTo(axios)

import AuthService from './auth'
import ClienteService from "./cliente";
import UsuarioService from './usuario';
import ProdutoService from "./produto";
import EstanteService from "./estante";

const API_ENVS = {
  local: 'http://localhost:3001'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

httpClient.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`
    }
  }

  return config;
})

export const auth = AuthService(httpClient)
export const clienteService = ClienteService(httpClient)
export const usuarioService = UsuarioService(httpClient)
export const produtoService = ProdutoService(httpClient)
export const estanteService = EstanteService(httpClient)
