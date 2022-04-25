import { GlobalStyle } from '../styles/global'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { UserProvider, useUser } from '../hooks/useUser';
import toast, { Toaster } from 'react-hot-toast';
import { ClienteProvider } from '../hooks/useClientes';
import { PedidoProvider } from '../hooks/usePedido'
import Modal from 'react-modal'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

Modal.setAppElement('#__next')

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  // const { user, logoutUser } = useUser()
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    const userId = window.sessionStorage.getItem('userId')
    const clienteId = window.sessionStorage.getItem('userClientId')

    if (!userId) {
      setIsUserLoggedIn(false)
    } else {
      setIsUserLoggedIn(true)
    }

    if (!router.pathname.includes('cliente') && clienteId) {
      toast.error('Você não possui acesso para esta página! Te redirecionamos para a página de Login')
      router.push('/')
      setTimeout(() => {
        window.localStorage.clear()
        window.sessionStorage.clear()
      }, 1000)
    }

  }, [router.pathname])

  return (
    <UserProvider>
      <ClienteProvider>
        <PedidoProvider>
          <Navbar isUserLoggedIn={isUserLoggedIn} />
          <Toaster
            position="top-right"
            reverseOrder={false}/>
          <Component {...pageProps} />
          <GlobalStyle />
        </PedidoProvider>
      </ClienteProvider>
    </UserProvider>
  )
}

export default MyApp
