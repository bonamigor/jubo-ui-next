import axios from "axios"
import { setupInterceptorsTo } from './Interceptors';
setupInterceptorsTo(axios)

import AuthService from './auth'
import ClienteService from "./cliente";

const API_ENVS = {
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

axios.interceptors.request.use(() => {
  const token = window.localStorage.getItem('token')

  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
})

export const auth = AuthService(httpClient)
export const cliente = ClienteService(httpClient)
