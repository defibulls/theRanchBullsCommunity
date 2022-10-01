import { useRouter } from 'next/router'

const Banner = () => {
  const router = useRouter()

  return (
    <header
      className="scrollbar-hide relative flex h-screen w-full flex-col items-center justify-center"
      style={{
        backgroundImage: `url(/images/farm.png)`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
      }}
    >
      <div
        className="absolute bottom-0 z-10 h-[100vh] w-full "
        style={{
          background: 'rgba(0,0,0,0.4)',
          backgroundImage: `linear-gradient(to top, rgba(0,0,0, 4) 0, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)`,
        }}
      />
      <div className="z-20 flex p-[2%]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-4 text-center font-marker text-3xl font-extrabold">
            WELCOME TO <br />
            THE RANCH BULLS <br />
            COMMUNITY
          </h1>
          <video
            controls
            autoPlay
            loop
            muted
            src="/nft1.mp4"
            className="mb-4 rounded-xl"
            width="550"
            height="300"
          ></video>
          <button
            onClick={() => router.push('/home')}
            className="w-[30%] cursor-pointer rounded-lg border-0 bg-[#8E05C2] py-3 px-4 font-marker text-base font-bold"
            type="button"
          >
            ENTER
          </button>
        </div>
      </div>
    </header>
  )
}
export default Banner
