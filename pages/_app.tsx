import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import { ContractProvider } from '../context/ContractContext'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID!}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL!}
    >
      <ContractProvider>
        <Component {...pageProps} />
        <Toaster
          toastOptions={{
            style: {
              background: '#9E23A3',
              borderRadius: '25px',
              color: '#fff',
            },
          }}
        />
      </ContractProvider>
    </MoralisProvider>
  )
}

export default MyApp
