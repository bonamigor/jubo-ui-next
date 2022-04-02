import { GlobalStyle } from '../styles/global'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { UserProvider } from '../hooks/useUser';
import { Toaster } from 'react-hot-toast';
import { ClienteProvider } from '../hooks/useClientes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ClienteProvider>
        <Navbar />
        <Toaster
          position="top-right"
          reverseOrder={false}/>
        <Component {...pageProps} />
        <GlobalStyle />
      </ClienteProvider>
    </UserProvider>
  )
}

export default MyApp
