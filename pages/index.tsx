import type { NextPage } from 'next'
import Head from 'next/head'
import Home from '../components/Home'
import Header from '../components/Header'
import About from '../components/About'
import Tokenomics from '../components/Tokenomics'
import Roadmap from '../components/Roadmap'
import Giveaway from '../components/Giveaway'
import Treasury from '../components/Treasury'
import { useMoralis } from 'react-moralis'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const home: NextPage = () => {
  const { isAuthenticated, authError, userError } = useMoralis()

  useEffect(() => {
    if (!isAuthenticated) return

    toast.success('You have entered the Metaverse!')
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
    <div className="h-screen overflow-y-scroll bg-black text-white transition-all duration-500 ease-in-out">
      <Head>
        <title>The Ranch Bulls</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="mt-[5%] flex flex-col justify-center">
        <Home />
        <About />
        <Tokenomics />
        {/* <Roadmap /> */}
        <Giveaway />
        <Treasury />
      </main>
    </div>
  )
}

export default home
