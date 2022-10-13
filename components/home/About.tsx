import { motion } from 'framer-motion'

const About = () => {
  return (
    <div
      id="about"
      className="flex max-h-fit w-full flex-col items-center justify-around gap-4 bg-black p-[10%] md:max-h-[100vh] md:flex-row  md:px-[10%]"
    >
      <div className="grid-template grid h-fit w-full gap-4 md:w-[30%]">
        <motion.img
          initial={{
            x: -100,
            y: -100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            y: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
          }}
          src="/images/31.png"
          alt=""
          loading="lazy"
          className="h-auto w-full rounded-md object-contain"
        />
        <motion.img
          initial={{
            x: 100,
            y: -100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            y: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
          }}
          src="/images/212.png"
          alt=""
          loading="lazy"
          className="h-auto w-full rounded-md object-contain"
        />
        <motion.img
          initial={{
            x: -100,
            y: 100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            y: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
          }}
          src="/images/112.png"
          alt=""
          loading="lazy"
          className="h-auto w-full rounded-md object-contain"
        />
        <motion.img
          initial={{
            x: 100,
            y: 100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            y: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
          }}
          src="/images/132.png"
          alt=""
          loading="lazy"
          className="h-auto w-full rounded-md object-contain"
        />
      </div>
      <div className="flex h-full w-full flex-col items-start justify-center p-5 md:w-[50%] ">
        <div className="relative flex h-full w-full items-end">
          <div className="font-marker text-4xl font-black">
            <motion.p
              initial={{
                x: 200,
                opacity: 0,
              }}
              viewport={{ once: true }}
              whileInView={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1.5,
              }}
            >
              ABOUT
            </motion.p>
            <motion.hr
              initial={{
                x: 200,
                opacity: 0,
              }}
              whileInView={{
                x: 0,
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
              }}
              aria-orientation="horizontal"
              className="my-5"
            />
            <motion.img
              initial={{
                y: -100,
                opacity: 0,
              }}
              viewport={{ once: true }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1.5,
              }}
              src="/images/transparentBg/416bgt.png"
              alt=""
              className="absolute left-[320px] top-[-122px] hidden w-[200px] object-contain lg:block"
            />
          </div>
        </div>
        <motion.p
          viewport={{ once: true }}
          initial={{
            x: 200,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="text-xl font-light"
        >
          <br />
          The BTC Bulls community is built around Bitcoin Mining. This project
          is a hybrid of a MAAS (mining-as-a-service) and a club.
          <br />
          <br />
          The Ranch itself is a community-driven ecosystem, each member is
          expected to pull their own weight for the betterment of the community
          as a whole. The key point of the BTC Bulls is buying an NFT which are
          means of buying into a fractionalized BTC mining cluster.
          <br />
          <br />
          The BTC Bulls will serve as the central focus of The Ranch ecosystem.
          Other animals will join The Ranch and the reward system of those NFTs
          tie back to the ownership of the BTC Bulls themselves.
          <br />
        </motion.p>
      </div>
    </div>
  )
}

export default About
