import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import { ContractProvider } from '../context/ContractContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID!}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL!}
    >
      <ContractProvider>
        <Component {...pageProps} />
      </ContractProvider>
    </MoralisProvider>
  )
}

export default MyApp
