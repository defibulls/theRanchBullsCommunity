import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  return (
    <header
      id="home"
      className="flex max-h-[100vh] min-h-[100vh] w-full grid-cols-1 flex-col place-items-center bg-cyan-600 p-[10%] md:flex-row md:py-0 md:px-[10%] lg:grid-cols-2"
    >
      <div className="h-screen w-full md:w-[50%]">
        <iframe src="/08/demo/data.html" height="100%" width="100%">
          LOGO
        </iframe>
      </div>
      <div className="flex h-full w-full flex-col items-start justify-center p-5 md:w-[60%] ">
        <p className="mb-4 text-3xl font-black md:text-5xl">
          MINT LIVE 1ST OF APRIL
        </p>
        <hr className="mb-2 w-full border-gray-400" />
        <p className="mb-4 text-2xl font-light md:text-4xl">
          <b>4999 NFTs</b> available for 250 USDC
        </p>
        <button
          type="button"
          onClick={() => router.push('/mint')}
          className="rounded-lg bg-green-600 py-2 px-12"
        >
          MINT
        </button>
      </div>
    </header>
  )
}

export default Home
