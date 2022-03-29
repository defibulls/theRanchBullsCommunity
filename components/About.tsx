const About = () => {
  return (
    <div
      id="about"
      className="flex max-h-fit min-h-[100vh] w-full flex-col items-center justify-around gap-4 bg-teal-500 p-[10%] md:max-h-[100vh] md:flex-row md:p-0 md:px-[10%]"
    >
      <div className="grid-template grid h-fit w-full md:w-[30%]">
        <img
          src="/images/31.png"
          alt=""
          loading="lazy"
          className="h-auto w-full object-contain "
        />
        <img
          src="/images/212.png"
          alt=""
          loading="lazy"
          className="h-auto w-full object-contain "
        />
        <img
          src="/images/112.png"
          alt=""
          loading="lazy"
          className="h-auto w-full object-contain "
        />
        <img
          src="/images/132.png"
          alt=""
          loading="lazy"
          className="h-auto w-full object-contain "
        />
      </div>
      <div className="flex h-full w-full flex-col items-start justify-center p-5 md:w-[50%] ">
        <div className="relative flex h-full w-full items-end">
          <p className="text-4xl font-black">
            ABOUT
            <hr aria-orientation="horizontal" className="my-5" />
            <img
              src="/images/transparentBg/416bgt.png"
              alt=""
              className="absolute left-[320px] top-[-122px] hidden w-[200px] object-contain lg:block"
            />
          </p>
        </div>
        <p className="text-2xl font-light">
          <br />
          4999 The Ranch Bulls NFT have been created on the Polygon Blockchain.
          There will never be an addition to this number.
          <br />
          <br />
          Each bull comes with different traits and thus gives them different
          levels of rarity.
          <br />
          <br />
          On The Ranch, each bull is seen through the same lens and will have an
          equal opportunity for success and profit. Each NFT can be minted for
          $250 and paid in USDC.
        </p>
      </div>
    </div>
  )
}

export default About
