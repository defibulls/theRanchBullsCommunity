import type { NextPage } from 'next'
import Head from 'next/head'
import Home from '../components/Home'
import Header from '../components/Header'
import About from '../components/About'
import Tokenomics from '../components/Tokenomics'
import Giveaway from '../components/Giveaway'
import Footer from '../components/Footer'

const home: NextPage = () => {
  return (
    <div className="h-screen overflow-y-scroll bg-black text-white transition-all duration-500 ease-in-out">
      <Head>
        <title>The Ranch Bulls</title>
        <link rel="icon" href="/Logo/tp-white.png" />
      </Head>

      <Header />
      <main className="mt-[5%] flex flex-col justify-center">
        <Home />
        <About />
        <Tokenomics />
        {/* <Roadmap /> */}
        {/* <Giveaway /> */}
        {/* <Treasury /> */}
        <Footer />
      </main>
    </div>
  )
}

export default home
