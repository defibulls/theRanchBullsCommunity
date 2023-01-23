import React from "react";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";

type Props = {
  name: string;
  designation: string;
  about: string;
  image: any;
  linkedIn: string;
};

const Member = ({ name, designation, image, about, linkedIn }: Props) => {
  return (
    <div className="relative h-fit flex w-full mb-20 rounded-xl px-20 transition-all duration-500 ease-in-out">
      {/* <div
        className="absolute inset-0 z-10 h-full w-full rounded-xl"
        style={{
          background: "rgba(0,0,0,0.4)",
          backgroundImage: `linear-gradient(to top, rgba(0,0,0, 0.4) 0, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)`,
        }}
      /> */}
      {/* <div> */}
      <Image
        //@ts-ignore
        src={image}
        alt={name}
        height={300}
        width={300}
        // layout=""
        loading="eager"
        objectFit="contain"
        className="rounded-full h-60 w-60 object-contain"
      />
      {/* </div> */}
      <div className=" z-20 flex flex-col space-y-5 justify-center text-left px-10 items-start">
        <h1 className="text-2xl text-left  font-semibold uppercase tracking-widest">
          {name}
        </h1>
        <h2 className="text-gray-300 text-lg uppercase italic font-bold mt-2 tracking-wider">
          {designation}
        </h2>
        <p className=" text-md mt-2">{about}</p>
        <SocialIcon
          target="_blank"
          url={linkedIn}
          fgColor="white"
          className="h-8 w-8 pt-4"
        />
      </div>
    </div>
  );
};

export default Member;
