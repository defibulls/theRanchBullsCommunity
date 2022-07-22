import Head from 'next/head'
import toast from 'react-hot-toast'
import { useMoralis } from 'react-moralis'

const ConnectWallet = () => {
  const { authenticate, isAuthenticated } = useMoralis()

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: 'Log in to THE RANCH BULL' })
        .then(function (user) {})
        .catch(function (error) {
          toast.error(error.message)
        })
    }
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center overflow-y-hidden bg-[#15202b] text-white">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Head>
          <title>The Ranch - Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <iframe src="/polygonanimation/demo/data.html" height="300" width="500">
          LOGO
        </iframe>
        <div className="mb-4 text-xl font-bold text-gray-500">
          Please connect your wallet to continue.
        </div>

        {/* <Image src={metamaskLogo} width={200} height={200} /> */}
        <div
          className="mb-10 cursor-pointer rounded-full bg-purple-600 px-6 py-4 text-2xl font-bold text-black hover:bg-purple-800"
          onClick={() => login()}
        >
          Connect Wallet
        </div>
      </div>
    </div>
  )
}

export default ConnectWallet
