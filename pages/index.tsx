import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/home/Banner'
import Header from '../components/Header'

const home: NextPage = () => {
  return (
    <div className="scrollbar-hide h-full overflow-y-scroll bg-black text-white transition-all duration-500 ease-in-out">
      <Head>
        <title>The Ranch Bulls</title>
        <link rel="icon" href="/Logo/tp-white.png" />
      </Head>

      <Header />
      <main className="flex flex-col justify-center">
        <Banner />
      </main>
    </div>
  )
}

export default home
