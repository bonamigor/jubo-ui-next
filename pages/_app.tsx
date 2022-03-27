import { GlobalStyle } from '../styles/global'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  const isUserLoggedIn: boolean = true;

  return isUserLoggedIn ? (
    <>
      <Navbar />
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  ) : (
    <>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  )
}

export default MyApp
