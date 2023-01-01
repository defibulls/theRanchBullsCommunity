import { data } from "../../lib/data";

const Tokenomics = () => {
  return (
    <div
      id="tokenomics"
      className="flex h-full min-h-fit pb-36 max-w-[90rem] mx-auto text-white flex-col items-center justify-center gap-4 bg-black px-[5%]"
    >
      <div className="flex min-h-min w-full flex-col items-start justify-center lg:p-10">
        <div className="relative flex w-full flex-row items-end justify-center md:justify-start">
          <div>
            <p className="font-marker text-4xl font-black">HANDBOOK OVERVIEW</p>
            <hr aria-orientation="horizontal" className="my-5" />
          </div>
        </div>
        <div
          className={`mt-[2rem] grid h-fit w-full grid-cols-1 gap-y-0 md:gap-y-[5%] lg:grid-cols-2`}
        >
          {data.bulls.tokenomics.map((tokenomic, i) => (
            <div
              className="flex flex-col items-start gap-x-2 sm:flex-row h-fit"
              key={i}
            >
              <img
                src={tokenomic.src}
                loading="lazy"
                className="hidden w-[128px] object-contain md:block"
                alt=""
              />
              <div className="flex flex-col py-2 px-3">
                <p className="text-2xl font-bold tracking-wider text-gray-600">
                  {tokenomic.title}
                </p>
                <p className="text-md font-normal text-gray-300">
                  {tokenomic.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
