"use client";
import Link from "next/link";
import React, { memo, useCallback } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import particleConfig from "../lib/particle-config";
import Image from "next/image";

const Banner = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      // await console.log(container);
      // container?.loadTheme("neu-dark");
      // await container?.addPath("Hexagons");
    },
    []
  );
  return (
    <header className="relative">
      <Particles
        id="tsparticles"
        className="h-screen"
        // url="http://foo.bar/particles.json"
        //@ts-ignore
        options={particleConfig}
        init={particlesInit}
        loaded={particlesLoaded}
      />

      <header className="absolute inset-0 z-20 flex h-full w-full items-center justify-center scrollbar-hide md:h-full">
        <div className="flex h-full w-full flex-col items-center justify-center text-center">
          <div className="relative">
            <div className="absolute inset-0 z-0 bg-purple-600 blur rounded-full"></div>

            <Image
              src="/images/bulls/34.png"
              loading="lazy"
              className="rounded-full relative"
              alt=""
              height={250}
              width={250}
            />
          </div>
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

{
  /* <header
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
    </header> */
}
