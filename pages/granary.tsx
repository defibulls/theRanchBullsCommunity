import Head from 'next/head'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useMoralis } from 'react-moralis'
import Profile from '../components/granary/Profile'
import Header from '../components/Header'
import ConnectWallet from '../components/mint/ConnectWallet'

const Granary = () => {
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
    <div className="bg-black text-white transition-all duration-500 ease-in-out ">
      <Head>
        <title>The Ranch - Profile</title>
        <link rel="icon" href="/Logo/tp-logo.png" />
      </Head>
      <Header notLanding={true} />
      <main className="flex w-full flex-col justify-center text-white">
        {isAuthenticated ? <Profile /> : <ConnectWallet />}
      </main>
    </div>
  )
}

export default Granary
