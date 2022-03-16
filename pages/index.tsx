import type { NextPage } from 'next'
import Head from 'next/head'
import Home from '../components/Home'
import Header from '../components/Header'
import About from '../components/About'
import Tokenomics from '../components/Tokenomics'
import Roadmap from '../components/Roadmap'
import Giveaway from '../components/Giveaway'
import Treasury from '../components/Treasury'

const home: NextPage = () => {
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
