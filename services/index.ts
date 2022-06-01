import axios from "axios"

import AuthService from './auth'
import ClienteService from "./cliente";
import UsuarioService from './usuario';
import ProdutoService from "./produto";
import EstanteService from "./estante";
import ProdutoEstanteService from "./produtoEstante";
import PedidoService from './pedido'
import ItemPedidoService from './item-pedido'

const API_ENVS = {
  local: 'http://localhost:3001',
  production: 'https://jubo-api.herokuapp.com'
}

const httpClient = axios.create({
  baseURL: API_ENVS.production
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
export const produtoEstanteService = ProdutoEstanteService(httpClient)
export const pedidoService = PedidoService(httpClient)
export const itemPedidoService = ItemPedidoService(httpClient)
