import Head from 'next/head'
import Home from '../components/home/Home'
import About from '../components/home/About'
import Tokenomics from '../components/home/Tokenomics'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ContactForm from '../components/home/ContactForm'
import { useMoralis } from 'react-moralis'

const home = () => {
  const { user } = useMoralis()
  return (
    <div className="scrollbar-hide h-full snap-mandatory overflow-y-scroll text-white transition-all duration-500 ease-in-out">
      <Head>
        <title>The Ranch Bulls</title>
        <link rel="icon" href="/Logo/tp-logo.png" />
      </Head>

      <Header notLanding={true} />
      <main className="flex flex-col justify-center">
        <Home />
        <About />
        <Tokenomics />
      </main>
      <Footer />
    </div>
  )
}

export default home
