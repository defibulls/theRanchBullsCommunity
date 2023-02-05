import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  name: string;
  description: string;
  image: string;
  link: string;
};

const DApp = ({ name, description, image, link }: Props) => {
  return (
    <div className="text-white z-20 w-fit space-y-4 flex flex-col pb-4 justify-center items-center h-fit rounded-xl bg-[#15202b]">
      <Image
        src={image}
        alt=""
        height={150}
        width={350}
        className="rounded-t-xl"
      />
      <h1 className="font-marker text-xl">{name}</h1>
      <p>{description}</p>
      <Link
        href={link}
        className="bg-purple-600 rounded-xl py-2 px-4 uppercase font-marker"
      >
        Enter
      </Link>
    </div>
  );
};

export default DApp;
