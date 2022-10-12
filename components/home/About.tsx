const About = () => {
  return (
    <div
      id="about"
      className="flex max-h-fit w-full flex-col items-center justify-around gap-4 bg-black p-[10%] md:max-h-[100vh] md:flex-row  md:px-[10%]"
    >
      <div className="grid-template grid h-fit w-full gap-4 md:w-[30%]">
        <img
          src="/images/31.png"
          alt=""
          loading="lazy"
          className="h-auto w-full rounded-md object-contain"
        />
        <img
          src="/images/212.png"
          alt=""
          loading="lazy"
          className="h-auto w-full rounded-md object-contain"
        />
        <img
          src="/images/112.png"
          alt=""
          loading="lazy"
          className="h-auto w-full rounded-md object-contain"
        />
        <img
          src="/images/132.png"
          alt=""
          loading="lazy"
          className="h-auto w-full rounded-md object-contain"
        />
      </div>
      <div className="flex h-full w-full flex-col items-start justify-center p-5 md:w-[50%] ">
        <div className="relative flex h-full w-full items-end">
          <p className="font-marker text-4xl font-black">
            ABOUT
            <hr aria-orientation="horizontal" className="my-5" />
            <img
              src="/images/transparentBg/416bgt.png"
              alt=""
              className="absolute left-[320px] top-[-122px] hidden w-[200px] object-contain lg:block"
            />
          </p>
        </div>
        <p className="text-xl font-light">
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
        </p>
      </div>
    </div>
  )
}

export default About
