import { GlobalStyle } from '../styles/global'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar/index.page'
import { UserProvider } from '../hooks/useUser';
import toast, { Toaster } from 'react-hot-toast';
import { PedidoProvider } from '../hooks/usePedido'
import Modal from 'react-modal'
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import Head from 'next/head';

Modal.setAppElement('#__next')

const queryClient = new QueryClient()

const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_ID: 'userId',
  USER_ADMIN: 'userAdmin',
  USER_CLIENT_ID: 'userClientId'
} as const;

const REDIRECT_DELAY = 2000;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const userId = window.sessionStorage.getItem('userId');
    const userAdmin = window.sessionStorage.getItem('userAdmin');

    const noToken: boolean = token === null || token === undefined
    const noUserId: boolean = userId === null || userId === undefined
    const noUserAdmin: boolean = userAdmin === null || userAdmin === undefined
    const noAuthParams: boolean = noToken || noUserId || noUserAdmin
    
    if (noAuthParams && router.pathname !== '/') {
      toast.error('Você foi redirecionado para a tela de login.')
      toast.error('Você não possui as credenciais para acessar o sistema.');
      
      window.localStorage.clear();
      window.sessionStorage.clear();
      
      router.push('/')
      return;
    }

    setIsUserLoggedIn(Boolean(userId));

    if (window.sessionStorage.getItem('userClientId') && router.pathname.includes('admin')) {
      toast.error('Você não possui acesso para esta página!');
      window.localStorage.clear();
      window.sessionStorage.clear();
      router.push('/');
    }
  }, [router.pathname]);

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <UserProvider>
        <PedidoProvider>
          {router.pathname.includes('retrospectiva') ? (<></>) : (<Navbar isUserLoggedIn={isUserLoggedIn} />)}
          <Toaster
            position="top-right"
            reverseOrder={false}/>
          <Component {...pageProps} />
          <GlobalStyle />
        </PedidoProvider>
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
