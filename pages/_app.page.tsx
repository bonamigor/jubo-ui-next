import { GlobalStyle } from '../styles/global'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar/index.page'
import { UserProvider, useUser } from '../hooks/useUser';
import toast, { Toaster } from 'react-hot-toast';
import { ClienteProvider } from '../hooks/useClientes';
import { PedidoProvider } from '../hooks/usePedido'
import Modal from 'react-modal'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

Modal.setAppElement('#__next')

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const router = useRouter()
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
      window.localStorage.clear()
      window.sessionStorage.clear()
    }

  }, [router.pathname])

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default MyApp
