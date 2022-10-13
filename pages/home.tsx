import Head from 'next/head'
import Home from '../components/home/Home'
import About from '../components/home/About'
import Tokenomics from '../components/home/Tokenomics'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useMoralis } from 'react-moralis'

const home = () => {
  const { user } = useMoralis()
  return (
    <div className="text-white transition-all duration-500  ease-in-out">
      <Head>
        <title>The Ranch Bulls</title>
        <link rel="icon" href="/Logo/tp-logo.png" />
      </Head>

      <Header notLanding={true} />
      <main className="bg-black pb-10">
        <Home />
        <About />
        <Tokenomics />
      </main>
      <Footer />
    </div>
  )
}

export default home
