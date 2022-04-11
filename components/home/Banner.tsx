import { useRouter } from 'next/router'

const Banner = () => {
  const router = useRouter()
  return (
    <header
      className="scrollbar-hide relative h-screen w-full"
      style={{
        backgroundImage: `url(/images/farm.png)`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="absolute bottom-0 z-10 h-[100vh] w-full "
        style={{
          background: 'rgba(0,0,0,0.4)',
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)`,
        }}
      />
      <div className="absolute bottom-0 left-0 z-20 flex bg-black p-[2%] md:w-[35%] lg:ml-0">
        <div className="max-w-[75%] flex-shrink-0 flex-grow-0 basis-[75%] border-b border-[#dee2e6]">
          <h1 className="sticky mb-4 text-3xl font-extrabold italic">
            WELCOME TO
            <br />
            THE RANCH BULL
            <br />
            CLUB
          </h1>
          <button
            onClick={() => router.push('/home')}
            className="m-auto mb-6 w-full cursor-pointer rounded-lg border-0 bg-purple-700 p-[5%] text-base font-bold"
            type="button"
          >
            ENTER
          </button>
        </div>
        <div className="scroll m-auto max-w-[16.667%] flex-shrink-0  flex-grow-0 basis-[16.67%] animate-pulse pr-0 text-sm font-medium italic">
          <div className=" top-[50%] left-[50%] m-auto w-max -rotate-90">
            ENTER NOW
          </div>
        </div>
      </div>
    </header>
  )
}

export default Banner
