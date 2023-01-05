import React from "react";

const Roadmap = () => {
  return (
    <div
      id="roadmap"
      className="flex h-[100vh] flex-col items-start justify-around gap-4 mb-10 max-w-[90rem] mx-auto text-left md:p-[10%]"
    >
      <div className="relative flex w-full  flex-row items-end justify-center md:justify-start">
        <div>
          <p className="font-marker text-4xl text-white font-black">ROADMAP</p>
          <hr aria-orientation="horizontal" className="my-5" />
        </div>
      </div>
      <img src="/images/roadmap.psd" alt="" />
    </div>
  );
};

export default Roadmap;
