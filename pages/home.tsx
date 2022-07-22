import Head from 'next/head'
import Home from '../components/home/Home'
import About from '../components/home/About'
import Tokenomics from '../components/home/Tokenomics'
import Footer from '../components/Footer'
import Header from '../components/Header'

const home = () => {
  return (
    <div className="scrollbar-hide h-full overflow-y-scroll text-white transition-all duration-500 ease-in-out">
      <Head>
        <title>The Ranch Bulls</title>
        <link rel="icon" href="/Logo/tp-white.png" />
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
