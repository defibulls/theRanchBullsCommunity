import Head from 'next/head'
import { useMoralis } from 'react-moralis'
import ConnectWallet from '../components/mint/ConnectWallet'
import NFTMint from '../components/mint/NFTMint'

const Mint = () => {
  const { isAuthenticated } = useMoralis()

  return (
    <div className="h-screen bg-black text-white transition-all duration-500 ease-in-out">
      <Head>
        <title>The Ranch - Mint</title>
      </Head>
      {isAuthenticated ? <NFTMint /> : <ConnectWallet />}
    </div>
  )
}

export default Mint
