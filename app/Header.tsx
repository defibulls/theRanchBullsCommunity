"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
// import { useMoralis } from "react-moralis";
import { itemVar, parentVar } from "../animations/headerVariant";
// import Avatar from "./Avatar";
// import ChangeProfile from "./ChangeProfile";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const [hover, setHover] = useState(false);
  const [direction, setDirection] = useState(0);

  return (
    <motion.div
      drag="y"
      draggable={true}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.01}
      onDragEnd={(_, info) => {
        if (info.offset.y > 20) {
          setDirection(0);
          setIsActive(true);
        }
        if (info.offset.y < -25) {
          setIsActive(false);
          setDirection(0);
        }
      }}
      onDrag={(_, info) => {
        if (info.offset.y > 2) {
          setDirection(-1);
        }
        if (info.offset.y < -2) {
          setDirection(2);
        }
      }}
    >
      <motion.div
        variants={parentVar}
        className="h-full w-full flex justify-center"
      >
        <motion.div
          animate={{ y: isActive ? -10 : "calc(-100% + 5rem)" }}
          transition={{ stiffness: 150, damping: 10 }}
          className="fixed top-0 py-5 px-10 w-[98%] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 rounded-xl shadow-2xl z-40 text-purple-500 border-b-2 border-purple-500 rounded-b-2"
        >
          <motion.div
            variants={parentVar}
            initial="from"
            animate="to"
            exit="exit"
            className="relative grid grid-cols-5 lg:grid-cols-6  "
          >
            <motion.div
              variants={itemVar}
              className="relative h-full flex justify-center items-center z-40 mx-auto"
            >
              <img
                alt=""
                src="/logo.png"
                className="rounded-full object-contain h-12"
              />
            </motion.div>

            <div className="col-span-4 flex w-full h-full justify-center space-x-20">
              <motion.div variants={itemVar} className="text-left text-white">
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
              </motion.div>

              <motion.div variants={itemVar} className="text-left  text-white">
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
              </motion.div>
              <motion.div variants={itemVar} className="text-left text-white">
                <h1 className="text-lg font-bold uppercase tracking-wider text-gray-500">
                  Account
                </h1>
                <div className="ml-4 mt-4 space-y-2">
                  {/* {show && ( */}
                  <p
                    className="cursor-pointer"
                    // onClick={() => setOpen(true)}
                  >
                    Buddy Address
                  </p>
                  {/* )} */}
                  <p
                    className="cursor-pointer"
                    // onClick={() => setEmailModal(true)}
                  >
                    Email
                  </p>
                </div>
              </motion.div>
            </div>
            <motion.div variants={itemVar} className="text-left text-white">
              {/* {status == "authenticated" ? ( */}
              {/* <div
                  className={`mx-2 flex cursor-pointer items-center justify-between rounded-2xl bg-[#191B1F] text-[1rem] font-semibold`}
                >
                  <div
                    // onClick={() => router.push(`/${section}/exchange`)}
                    className={`z-50 mr-2 flex h-8 cursor-pointer items-center rounded-2xl border-[#163256] bg-[#172A42] p-2`}
                  >
                     @ts-ignore
                    {data.user?.address.slice(0, 5)}...
                    @ts-ignore
                    {data.user?.address.slice(-4)}
                  </div>
                  <div
                    // onClick={() => signOut({ redirect: false })}
                    className="flex items-center justify-center rounded-2xl border border-[#163256] bg-[#172A42] p-1 text-[#4F90EA] hover:border-[#234169]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                </div>
              ) : ( */}
              <div
                className={`flex items-center justify-center py-2 px-2 bg-cyan-400 rounded-full text-white cursor-pointer uppercase tracking-widest font-semibold`}
              >
                Connect Wallet
              </div>
              {/* )} */}
            </motion.div>
          </motion.div>

          <div
            className={`flex items-center px-10 ${
              isActive ? "mt-6 justify-center" : "justify-between mt-8"
            }`}
          >
            {!isActive && (
              <img
                src="/logo.png"
                alt="TRB"
                className={` cursor-pointer rounded-xl object-contain h-12 `}
              />
            )}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ rotate: 0, x: 0 }}
                animate={{
                  rotate: direction > 0 ? -40 : direction < 0 ? 40 : 0,
                  x: direction > 0 ? 6 : direction < 0 ? 6 : 0,
                }}
                className="w-6 h-2 bg-white rounded-l-full"
              />
              <motion.div
                animate={{
                  rotate: direction > 0 ? 40 : direction < 0 ? -40 : 0,
                  x: direction > 0 ? -6 : direction < 0 ? -6 : 0,
                }}
                className="w-6 h-2 bg-white rounded-r-full"
              />
            </div>

            {!isActive && (
              <>
                {/* {status == "authenticated" ? (
                  {/* <div
                    className={`mx-2 flex cursor-pointer items-center justify-between rounded-2xl bg-[#191B1F] text-[1rem] font-semibold`}
                  >
                    <div
                      // onClick={() => router.push(`/${section}/exchange`)}
                      className={`z-50 mr-2 flex h-8 cursor-pointer items-center rounded-2xl border-[#163256] bg-[#172A42] p-2`}
                    >
                      {data.user?.address.slice(0, 5)}...
                      {data.user?.address.slice(-4)}
                    </div>
                    <div
                      // onClick={() => signOut({ redirect: false })}
                      className="flex items-center justify-center rounded-2xl border border-[#163256] bg-[#172A42] p-1 text-[#4F90EA] hover:border-[#234169]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </div>
                  </div>
                ) : ( */}
                <div
                  className={`flex  items-center justify-center py-2 px-4 bg-cyan-400 rounded-full text-white cursor-pointer uppercase tracking-widest font-semibold`}
                >
                  Connect Wallet
                </div>
                {/* // )} */}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Header;
