import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Banner = () => {
  const router = useRouter()

  return (
    <header
      className="relative flex h-screen w-full flex-col items-center justify-center scrollbar-hide"
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
          <motion.h1
            initial={{
              y: -200,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.5,
            }}
            className="mb-4 text-center font-marker text-3xl font-extrabold"
          >
            WELCOME TO <br />
            THE RANCH BULLS <br />
            COMMUNITY
          </motion.h1>
          <motion.video
            initial={{
              x: -200,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.5,
            }}
            controls
            autoPlay
            loop
            muted
            src="/nft1.mp4"
            className="mb-4 rounded-xl"
            width="550"
            height="300"
          ></motion.video>
          <motion.button
            initial={{
              y: 200,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.5,
            }}
            onClick={() => router.push('/home')}
            className="w-[30%] cursor-pointer rounded-lg border-0 bg-[#8E05C2] py-3 px-4 font-marker text-base font-bold"
            type="button"
          >
            ENTER
          </motion.button>
        </div>
      </div>
    </header>
  )
}
export default Banner
