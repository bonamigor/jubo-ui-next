import { GlobalStyle } from '../styles/global'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { UserProvider, useUser } from '../hooks/useUser';
import { Toaster } from 'react-hot-toast';
import { ClienteProvider } from '../hooks/useClientes';
import { PedidoProvider } from '../hooks/usePedido'
import Modal from 'react-modal'

Modal.setAppElement('#__next')

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ClienteProvider>
        <PedidoProvider>
          <Navbar />
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
