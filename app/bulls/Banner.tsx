"use client";

import React, { Suspense } from "react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div
      style={{
        backgroundImage: `url(/farm.png)`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
      className="text-white min-h-fit md:h-screen w-screen overflow-x-hidden flex flex-col md:flex-row items-center justify-center md:justify-between py-32 relative md:py-0"
    >
      <div
        className="absolute bottom-0 z-0 h-[100vh] w-full "
        style={{
          background: "rgba(0,0,0,0.4)",
          backgroundImage: `linear-gradient(to top, rgba(0,0,0, 4) 0, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%)`,
        }}
      />
      <Suspense>
        <iframe
          src="/bulls/demo/data.html"
          height="auto"
          className="z-10 h-52 md:h-[40%] md:w-[50%]"
          width="auto"
        ></iframe>
      </Suspense>

      <div className="w-full  p-5 md:w-[50%] mt-10">
        <div className="flex h-full md:max-w-fit text-center flex-col items-center  justify-center ">
          <p className="z-10 mb-4 md:w-fit font-marker w-full text-center text-3xl font-bold uppercase md:text-5xl">
            Phase 1 Presale
          </p>
          <hr className="z-10 mb-2 w-full border-gray-400" />
          <p className="z-10 mb-4 w-full text-center text-xl font-light md:text-4xl">
            MARCH 30 @ 7 PM EST
          </p>
          {/* <button
            type="button"
            // onClick={() => toast.error("Mint not live!")}
            className="z-10 rounded-lg bg-purple-600 hover:bg-white hover:text-purple-600 transition-all duration-200 ease-in py-2 px-12 font-marker font-light"
          >
            MINT
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
