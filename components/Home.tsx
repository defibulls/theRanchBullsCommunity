import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  return (
    <header
      id="home"
      className="flex max-h-fit min-h-[100vh] w-full grid-cols-1 flex-col place-items-center bg-cyan-600 p-[10%] md:flex-row md:py-0 md:px-[10%] lg:grid-cols-2"
    >
      <iframe
        src="http://localhost:3000/Lottie/demo/data.html"
        height="500"
        width="500"
      >
        LOGO
      </iframe>
      <div className="flex h-full w-full flex-col items-start justify-center p-5 md:w-[60%] ">
        <p className="mb-4 text-3xl font-black md:text-5xl">
          MINT LIVE 15TH OF MARCH
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