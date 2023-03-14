import React from "react";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";

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
      <div className=" z-20 flex flex-col space-y-5 justify-center text-left px-10 items-start">
        <h1 className="text-2xl text-left  font-semibold uppercase tracking-widest">
          {name}
        </h1>
        <h2 className="text-gray-300 text-lg uppercase italic font-bold mt-2 tracking-wider">
          {designation}
        </h2>
        <p className=" text-md mt-2">{about}</p>
        <Link href={linkedIn} target="_blank">
          <img
            src="https://logos-download.com/wp-content/uploads/2016/03/LinkedIn_Logo_2019-1536x384.png"
            alt=""
            className="h-6 object-contain"
          />
        </Link>
      </div>
    </div>
  );
};

export default Member;
