import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

const Header = () => {
  const { isAuthenticated, logout } = useMoralis()

  return (
    <div
      className={`fixed top-0 z-40 h-24 w-full border-b bg-black p-[20px] transition-all duration-500 ease-in`}
    >
      <div className="flex justify-between">
        <div className="flex items-center ">
          <a
            href="/#home"
            className="flex items-center rounded-xl bg-purple-900 py-1 px-2"
          >
            <img
              src="/images/logo-pixelated.png"
              alt="TRB"
              className="mr-2 h-12 cursor-pointer rounded-xl object-contain"
            />
            <p className=" text-lg font-bold">THE RANCH BULLS</p>
          </a>
          <div className="ml-12 hidden justify-evenly space-x-10 lg:flex ">
            <a className="navBtn" href="/#about">
              ABOUT
            </a>
            <a href="/#tokenomics" className="navBtn">
              TOKENOMICS
            </a>
            {/* <a href="#roadmap" className="navBtn">
              ROADMAP
            </a> */}
            <a className="navBtn" href="#giveaway">
              GIVEAWAY
            </a>
            <a href="/#treasury" className="navBtn">
              TREASURY
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          {isAuthenticated ? (
            <div
              onClick={() => logout()}
              className="cursor-pointer rounded-md bg-purple-800 py-3 px-4 font-bold"
            >
              Logout
            </div>
          ) : (
            <a
              href="https://medium.com/@defibulls/theranch-bulls-d327210fd68"
              className="block rounded-md border bg-black px-2 py-1 font-mono font-bold text-white"
            >
              WHITEPAPER
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
