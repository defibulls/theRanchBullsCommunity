import Image from "next/image";

const About = () => {
  return (
    <div
      id="about"
      className="flex max-h-fit w-full max-w-[90rem] mx-auto flex-col items-center justify-around gap-4 bg-black md:h-screen snap-center md:flex-row px-10 md:px-[10%]"
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
          Welcome to The Ranch, where we are building a revolutionary DeFi
          ecosystem anchored by our native point metric, Bullion. Our goal is to
          foster a vibrant community of like-minded individuals who share our
          passion for maximizing the value of Bullion. Unlike the unsustainable
          P2E (Play To Earn) gaming model, we believe in the P2I (Play To
          Increase) approach, where our treasury is built on a sustainable model
          that doesn't rely on new players to add liquidity. Through carefully
          curated partnerships, such as with AlpharShares, we are developing a
          diversified portfolio that maximizes profits for our Bullion holders
          over the long term. As a TR Bull holder, you play a crucial role in
          our DAO that helps guide the direction of our project. Our core team
          embodies a bullish spirit, prioritizing investments that offer
          tangible benefits and significant returns while aligning with our
          values of real utility, yield, rewards, and relationships. We are
          committed to creating real value for our members and staying true to
          our community's principles, with Bullion at the heart of our
          ecosystem. Together, let's set a new standard for what DeFi can be.
          Join us as a TR Bull holder and let's get Bullish!
        </p>
      </div>
    </div>
  );
};

export default About;
