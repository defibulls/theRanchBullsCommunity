import Image from "next/image";

const About = () => {
  return (
    <div
      id="about"
      className="flex max-h-fit w-full flex-col items-center justify-around gap-4 bg-black md:h-screen snap-center md:flex-row px-10 md:px-[10%]"
    >
      <div className="grid-template grid h-fit w-full gap-4 md:w-[30%]">
        <Image
          src="/images/1.png"
          alt=""
          height={50}
          width={50}
          unoptimized={true}
          className="h-auto w-full rounded-md object-contain"
        />
        <Image
          src="/images/2.png"
          alt=""
          height={50}
          unoptimized={true}
          width={50}
          className="h-auto w-full rounded-md object-contain"
        />
        <Image
          src="/images/3.png"
          alt=""
          unoptimized={true}
          height={50}
          width={50}
          className="h-auto w-full rounded-md object-contain"
        />
        <Image
          src="/images/4.png"
          alt=""
          unoptimized={true}
          height={50}
          width={50}
          className="h-auto w-full rounded-md object-contain"
        />
      </div>
      <div className="flex w-full text-white flex-col items-start justify-center p-5 md:w-[50%]">
        <div className="relative flex h-full w-full items-end">
          <div className="font-marker text-4xl font-black">
            <p>ABOUT</p>
            <hr aria-orientation="horizontal" className="my-5" />
          </div>
        </div>
        <p className="text-md font-normal">
          <br />
          The Ranch is a project from a group of Network and Systems Engineers
          who wholeheartedly believe in the underlying technology of the
          blockchain and the opportunities that DEFI represents. We know that
          there must be better projects and developers in the space to make DEFI
          better, and we are here for that exact reason.
          <br />
          <br />
          The BTC Bulls are here to bridge the best of both sides of the web3
          NFT spectrum; building a community and NFT collection with rarity
          rewards, club membership, promotion incentives, and tying real-world
          assets to the NFTs that hold value and generate rewards for the
          Community.
          <br />
          <br />
          Each BTC Bull gives membership into a BTC Mining Cluster Reward System
          composed of the best and most efficient BTC miners, built to be
          profitable now and thrive in the next bull market. Our BTC mining
          cluster will bolster Bitcoins' decentralized network while improving
          the environment as we help reduce greenhouse gases via an off-grid
          emissions mitigation solution converting flare gas at oil fields to
          power the operation.
        </p>
      </div>
    </div>
  );
};

export default About;
