import Link from "next/link";
import React from "react";

type Props = {
  name: string;
  uri: string;
  desc: string;
  link: string;
};

const ImageCard = ({ name, uri, desc, link }: Props) => {
  return (
    <div className="dark:bg-gray-800 rounded-lg flex w-full h-fit shadow-md overflow-hidden">
      <img
        src={"https://media.graphassets.com/PundPRNBTUKamL4kanmA"}
        alt={name}
        className="h-48 object-contain"
      />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-200 dark:text-white">
          {name}
        </h2>
        <p className="text-gray-200 dark:text-gray-400 text-base mb-2">
          {desc}
        </p>
        <p className="text-gray-300 mb-4">
          <span className="uppercase tracking-widest font-semibold text-white">
            Quantity:
          </span>{" "}
          9
        </p>
        <Link
          target="_blank"
          className="px-2 py-2 rounded-lg mt-5 bg-purple-600"
          href={link}
        >
          Visit Website
        </Link>
      </div>
    </div>
  );
};

export default ImageCard;
