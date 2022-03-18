import Head from 'next/head'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useMoralis } from 'react-moralis'
import Header from '../components/Header'
import ConnectWallet from '../components/mint/ConnectWallet'
import Profile from '../components/myBulls/Profile'

const Mybulls = () => {
  const { isAuthenticated, userError, authError } = useMoralis()

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
        <title>The Ranch - Profile</title>
      </Head>
      ]
      <Header />
      {isAuthenticated ? <Profile /> : <ConnectWallet />}
    </div>
  )
}

export default Mybulls
