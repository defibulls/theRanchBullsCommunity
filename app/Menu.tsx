"use client";
import { ContractContext } from "../context/ContractContext";
import { motion } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import ReactModal from "react-modal";
import { customStyles } from "../lib/constants";
// import EmailModal from './modals/EmailModal'
// import Modaluser from './modals/SetPartnerModal'
import { useRouter } from "next/navigation";

type Props = {};

const Menu = (props: Props) => {
  const router = useRouter();
  const { setOpen, open, emailModal, setEmailModal } =
    useContext(ContractContext);
  const [show, setShow] = useState(false);

  return (
    <div className="z-50 grid h-fit w-screen grid-cols-1 flex-col place-content-center place-items-center rounded-3xl bg-[#15202b] p-10 text-white md:grid-cols-2 lg:grid-cols-3">
      <div>
        <h1 className="text-lg font-bold uppercase tracking-wider text-gray-500">
          Information
        </h1>
        <div className="ml-4 mt-4 flex flex-col space-y-2">
          <a
            target="_blank"
            href="https://theranch.gitbook.io/the-ranch/legal/privacy-policy"
            className="as"
          >
            Terms of Service
          </a>
          <a href="https://forms.gle/gP56Yr3GGGsZ3yQd7" className="as">
            Partnership
          </a>
          <a
            href="https://theranch.gitbook.io/the-ranch/legal/privacy-policy"
            target="_blank"
          >
            Privacy Policy
          </a>
          <a href="https://theranch.gitbook.io/" target="_blank">
            Whitepaper
          </a>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-bold uppercase tracking-wider text-gray-500">
          Connect
        </h1>
        <div className="ml-4 mt-4 flex flex-col space-y-2">
          <a href="https://twitter.com/0xTheRanch" target="_blank">
            Twitter
          </a>
          <a
            href="https://discord.gg/5UTKa8z8zh"
            target="_blank"
            className="as"
          >
            Discord
          </a>
          <a
            href="https://opensea.io/collection/theranch-btc-bulls-community"
            target="_blank"
          >
            OpenSea
          </a>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-bold uppercase tracking-wider text-gray-500">
          Account
        </h1>
        <div className="ml-4 mt-4 space-y-2">
          {show && (
            <p className="cursor-pointer" onClick={() => setOpen(true)}>
              Buddy Address
            </p>
          )}
          <p className="cursor-pointer" onClick={() => setEmailModal(true)}>
            Email
          </p>
        </div>
      </div>

      <ReactModal isOpen={open} style={customStyles}>
        {/* <Modaluser /> */}
      </ReactModal>
      <ReactModal isOpen={emailModal} style={customStyles}>
        {/* <EmailModal /> */}
      </ReactModal>
    </div>
  );
};

export default Menu;
