import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/home/Banner'
import Header from '../components/Header'
import Video from '../components/home/Video'

const home: NextPage = () => {
  return (
    <div className="scrollbar-hide h-full overflow-y-scroll bg-black text-white transition-all duration-500 ease-in-out">
      <Head>
        <title>The Ranch Bulls</title>
        <link rel="icon" href="/Logo/tp-white.png" />
      </Head>

      <Header notLanding={false} />
      <main className="flex snap-y snap-mandatory flex-col justify-center">
        <Banner />
        <Video />
      </main>
    </div>
  )
}

export default home
