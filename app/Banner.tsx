"use client";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import particleConfig from "../lib/particle-config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DApp from "./DApp";
import { ContractContext } from "../context/ContractContext";

const Banner = () => {
  const { show, handleShow } = useContext(ContractContext);
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const router = useRouter();
  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {},
    []
  );

  const dapps = [
    {
      name: "The Ranch Bulls",
      description:
        "TR Bull NFTs serve as the foundation and gateway to our community, as they represent the key to gaining membership.",
      image: "/bulls.png",
      link: "/bulls",
    },
    {
      name: "Tuesday Trivia Night",
      description:
        "Weekly Trivia Night with the first question at 8 PM EST - Micro AMA’s  - Cash Prizes - Alpha Drops - NFT Giveaways - WL spots",
      image: "/trivia.jpg",
      link: "/trivia",
    },
  ];

  useEffect(() => {
    router.prefetch("/bulls");
  }, []);

  return (
    <header className="relative">
      {show ? (
        <div
          className="relative flex min-h-screen w-full flex-col items-center justify-center scrollbar-hide"
          style={{
            backgroundImage: `url(/farm.png)`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
          }}
        >
          <div
            className="absolute bottom-0 z-10 h-full w-full "
            style={{
              background: "rgba(0,0,0,0.4)",
              backgroundImage: `linear-gradient(to top, rgba(0,0,0, 4) 0, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)`,
            }}
          />
          <div className="grid md:grid-cols-2 grid-cols-1 w-full md:px-20 px-10 md:mt-0 gap-x-10 mt-32 pb-10 space-y-4 md:space-y-0 place-items-center">
            {dapps.map((dapp, i) => (
              <DApp
                key={i}
                name={dapp.name}
                description={dapp.description}
                image={dapp.image}
                link={dapp.link}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
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
                {/* <div className="absolute inset-0 z-0 bg-purple-600 blur rounded-full"></div> */}

                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  height={200}
                  className="rounded-full"
                  width={200}
                >
                  <source src="/tr.mp4" type="video/mp4" />
                </video>
                {/* <Image
                  src="/TR.gif"
                  // loading="lazy"
                  className="rounded-full relative"
                  alt=""
                  height={250}
                  width={250}
                /> */}
              </div>
              <button
                onClick={() => handleShow(true)}
                className={`button-animation mt-10 w-fit shadow-xl rounded-full text-white px-5 py-3 font-marker uppercase `}
              >
                ENTER THE RANCH
              </button>
            </div>
          </header>
        </>
      )}
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
