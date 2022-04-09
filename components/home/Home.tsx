import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  return (
    <div
      id="home"
      className="flex max-h-[100vh] min-h-[100vh] w-full snap-start flex-col items-center justify-center bg-cyan-600 p-[10%] md:flex-row  md:py-0 md:px-[10%]"
    >
      <div className="h-screen w-full md:w-[60%]">
        <iframe src="/08/demo/data.html" height="100%" width="100%">
          LOGO
        </iframe>
      </div>
      <div className="flex h-full w-full flex-col items-start justify-center p-5 md:w-[70%] ">
        <p className="mb-4 text-3xl font-black md:text-5xl">
          <span className="">MINT LIVE</span> 1ST OF APRIL
        </p>
        <hr className="mb-2 w-full border-gray-400" />
        <p className="mb-4 text-2xl font-light md:text-4xl">
          <b>4999 NFTs</b> available for 250 USD
        </p>
        <button
          type="button"
          onClick={() => router.push('/mint')}
          className="rounded-lg bg-green-600 py-2 px-12"
        >
          MINT
        </button>
      </div>
    </div>
  )
}

export default Home
