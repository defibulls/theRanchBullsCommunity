import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  return (
    <div
      id="home"
      style={{
        backgroundImage: `url(/images/farm.png)`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
      }}
      className="z-20 flex max-h-[100vh] min-h-[100vh] w-full flex-col items-center justify-center px-[10%] md:flex-row  md:py-0 md:px-[10%]"
    >
      <div
        className="absolute bottom-0 z-0 h-[100vh] w-full "
        style={{
          background: 'rgba(0,0,0,0.4)',
          backgroundImage: `linear-gradient(to top, rgba(0,0,0, 4) 0, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)`,
        }}
      />
      <div className="z-10 flex h-screen w-full items-center justify-center md:w-[60%]">
        <iframe
          src="/polygonanimation/demo/data.html"
          height="40%"
          width="100%"
        >
          LOGO
        </iframe>
      </div>
      <div className="flex h-full w-full flex-col items-start justify-center p-5 md:w-[70%] ">
        <p className="z-40 mb-4 text-3xl font-black md:text-5xl">
          <span className="">MINT LIVE</span> 1ST OF APRIL
        </p>
        <hr className="z-40 mb-2 w-full border-gray-400" />
        <p className="z-40 mb-4 text-2xl font-light md:text-4xl">
          <b>4999 NFTs</b> available for 250 USD
        </p>
        <button
          type="button"
          onClick={() => router.push('/mint')}
          className="z-40 rounded-lg bg-purple-600 py-2 px-12 font-marker"
        >
          MINT
        </button>
      </div>
    </div>
  )
}

export default Home
