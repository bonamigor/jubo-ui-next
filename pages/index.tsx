import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Box, HomeStyle, LeftContent, LoginForm, RightContent } from './home';
import { auth } from '../services/index';
import { useUser } from '../hooks/useUser';
import toast from 'react-hot-toast';

const Home: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { receiveUser } = useUser()
  const router = useRouter()

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    try {
      const { data, errors } = await auth.login({ email: email, senha: password })

      if (!errors) {
        if (data.user.admin === 1) {
          window.localStorage.setItem('token', data.token)
          window.sessionStorage.setItem('userId', data.user.id)
          window.sessionStorage.setItem('userName', data.user.nome)
          window.sessionStorage.setItem('userEmail', data.user.email)
          window.sessionStorage.setItem('userAdmin', data.user.admin)
          receiveUser({ id: data.user.id, name: data.user.nome, email: data.user.email, admin: data.user.admin })
          toast.success('Logado com sucesso!')
          router.push('/dashboard')
        } else {
          window.localStorage.setItem('token', data.token)
          window.sessionStorage.setItem('userId', data.user.id)
          window.sessionStorage.setItem('userName', data.user.nome)
          window.sessionStorage.setItem('userEmail', data.user.email)
          window.sessionStorage.setItem('userAdmin', data.user.admin)
          window.sessionStorage.setItem('userClientId', data.user.clienteId)
          receiveUser({ id: data.user.id, name: data.user.nome, email: data.user.email, admin: data.user.admin, clienteId: data.user.clienteId })
          toast.success('Logado com sucesso!')
          router.push('/cliente/inicial')
        }
        
      }

      if (errors?.status === 404) {
        toast.error('Usuário não encontrado com os dados digitados.')
      }
      
      if (errors?.status === 401) {
        toast.error('E-mail/senha inválidos.')
      }

      if (errors?.status === 400) {
        toast.error('Ocorreu um erro ao fazer o Login. Pintos')
      }
      
    } catch (error) {
      toast.error('Erro ao realizar o login')
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Jubo Notas</title>
        <meta name="description" content="Jubo Notas p/ Merenda Escolar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeStyle>
        <Box>
          <LeftContent>
            <div>
              <h1>
                Realize os pedidos<br />
                da sua escola<br />
                com segurança<br />
                e tranquilidade.
              </h1>
              <h2>
                Faça já o login {'>'}
              </h2>
            </div>
            <footer>
              <p>Dúvidas?</p>
              <p>(62) 99155-4437 / (62) 3091-5471</p>
              <p><a href="mailto:mendesalimentos@hotmail.com">mendesalimentos@hotmail.com</a></p>
            </footer>
          </LeftContent>
          <RightContent>
            <LoginForm onSubmit={handleLogin}>
              <h1>Login</h1>
              <input type="text" placeholder="E-mail" value={email} onChange={event => {setEmail(event.target.value)}} />
              <input type="password" placeholder="Senha" value={password} onChange={event => {setPassword(event.target.value)}} />
              <button type="submit">Entrar</button>
            </LoginForm>
          </RightContent>
        </Box>
      </HomeStyle>
    </>
  )
}

export default Home
