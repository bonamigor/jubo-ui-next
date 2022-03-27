import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { Box, HomeStyle, LeftContent, LoginForm, RightContent } from './home';

const Home: NextPage = () => {
  const router = useRouter()
  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    router.push('/usuario/cadastro')
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
              <p>mendesalimentos@hotmail.com</p>
            </footer>
          </LeftContent>
          <RightContent>
            <LoginForm onSubmit={handleLogin}>
              <h1>Login</h1>
              <input type="text" placeholder="E-mail" />
              <input type="password" placeholder="Senha" />
              <button type="submit">Entrar</button>
            </LoginForm>
          </RightContent>
        </Box>
      </HomeStyle>
    </>
  )
}

export default Home
