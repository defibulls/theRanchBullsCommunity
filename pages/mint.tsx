import Head from 'next/head'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useMoralis } from 'react-moralis'
import ConnectWallet from '../components/mint/ConnectWallet'
import NFTMint from '../components/mint/NFTMint'

const Mint = () => {
  const { isAuthenticated, authError, userError } = useMoralis()

  useEffect(() => {
    if (!isAuthenticated) return

    toast.success('You have successfully logged in!')
  }, [isAuthenticated])

  useEffect(() => {
    if (!authError) return

    toast.error(authError.message)
  }, [authError])

  useEffect(() => {
    if (!userError) return

    toast.error(userError.message)
  }, [userError])

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
