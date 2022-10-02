import Head from 'next/head'
import React from 'react'
import { useMoralis } from 'react-moralis'
import Header from '../components/Header'
import ContactForm from '../components/home/ContactForm'
import ConnectWallet from '../components/mint/ConnectWallet'

type Props = {}

const support = (props: Props) => {
  const { isAuthenticated } = useMoralis()
  return (
    <div className="min-h-screen bg-black text-white transition-all duration-500 ease-in-out">
      <Head>
        <title>The Ranch - Support</title>
        <link rel="icon" href="/Logo/tp-logo.png" />
      </Head>
      <Header notLanding={true} />
      <section className="pt-28">
        {isAuthenticated ? <ContactForm /> : <ConnectWallet />}
      </section>
    </div>
  )
}

export default support
