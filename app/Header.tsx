import React from "react";
import Image from "next/image";
import { Bars3Icon } from "@heroicons/react/24/solid";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex items-center z-50 justify-center max-w-[90rem] mx-auto">
      <div className="flex items-center z-50 fixed top-0 justify-between py-5 w-full px-10 ">
        <Image src="/logo.png" alt="" height={60} width={170} />
        <Bars3Icon className="h-8 text-white cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
