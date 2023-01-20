import React, { memo } from "react";
import Link from "next/link";

const Banner = () => {
  return (
    <header
      className="relative flex h-screen w-full flex-col items-center justify-center scrollbar-hide"
      style={{
        backgroundImage: `url(/farm.png)`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
    >
      <div
        className="absolute bottom-0 z-10 h-[100vh] w-full "
        style={{
          background: "rgba(0,0,0,0.4)",
          backgroundImage: `linear-gradient(to top, rgba(0,0,0, 4) 0, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)`,
        }}
      />

      <header className="relative z-20 flex h-screen w-full items-center justify-center scrollbar-hide md:h-screen">
        <div className="flex h-full w-full flex-col items-center justify-center text-center">
          <h1 className="mb-10 text-center font-marker text-white text-3xl font-light">
            WELCOME TO THE RANCH
          </h1>
          <video
            controls
            autoPlay
            loop
            muted
            src="/nft1.mp4"
            className="rounded-xl"
            width="550"
            height="300"
          ></video>
          <Link
            href="/bulls"
            className="mt-10 w-fit shadow-xl rounded-full text-white bg-purple-500 px-5 py-3 font-marker uppercase transition-all duration-200 ease-in hover:bg-white hover:text-purple-500"
          >
            ENTER THE RANCH
          </Link>
        </div>
      </header>
    </header>
  );
};

export default memo(Banner);
