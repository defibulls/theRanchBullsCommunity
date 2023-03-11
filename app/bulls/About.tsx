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
          At The Ranch, we are committed to building a remarkable DeFi
          ecosystem, and our native point metric, Bullion, drives the direction
          we take. Our goal is to create a community of like-minded individuals
          who share our passion for maximizing the value of Bullion. As a TR
          Bull holder, you play a pivotal role in determining the direction of
          our project. Our core members embody our bullish spirit, and we
          prioritize investments that provide tangible benefits and significant
          returns, aligning with our values of real utility, real yield, real
          rewards, and real relationships. We are dedicated to generating
          meaningful value for our members and aligning with our community's
          core principles, with Bullion at the center of our ecosystem.
          Together, we can create a new standard for what DeFi should be. Be a
          TR Bull holder, and let's get Bullish!
        </p>
      </div>
    </div>
  );
};

export default About;
