"use client";
import { Menu, Transition } from "@headlessui/react";
import { useContext, useState, useEffect, Fragment } from "react";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { ContractContext } from "../context/ContractContext";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { customStyles } from "../lib/constants";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next/lib/hooks/auth/useAuthRequestChallengeEvm";
import ReactModal from "react-modal";
import Modaluser from "./modals/SetPartnerModal";
import EmailModal from "./modals/EmailModal";
import { usePathname } from "next/navigation";

const style = {
  wrapper: `p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex items-center justify-center`,
  nav: `flex-1 md:flex justify-center hidden items-center`,
  navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
  activeNavItem: `bg-[#20242A] rounded-3xl`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  buttonAccent: ``,
};

type props = {
  notLanding: boolean;
  setLanding?: any;
};

const Header = ({ notLanding, setLanding }: props) => {
  const [selectedNav, setSelectedNav] = useState<string>("");
  const { data, status } = useSession();
  const [show, setShow] = useState(false);
  const { setOpen, open, emailModal, setEmailModal, handleShow } =
    useContext(ContractContext);
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const pathname = usePathname();

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }
    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    /* @ts-ignore */
    const { message } = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    });

    // console.log(message);

    const signature = await signMessageAsync({ message });
    // console.log(signature);

    // redirect user after success authentication to '/user' page
    await signIn("moralis-auth", {
      message,
      signature,
      redirect: false,
    });
  };

  useEffect(() => {
    if (pathname?.includes("bulls")) {
      setShow(true);
    } else {
      setShow(false);
    }
  });

  return (
    <div
      className={`fixed top-0 z-50 h-24 w-full p-[20px] transition-all text-white duration-500 ease-in`}
    >
      <div className="flex justify-between">
        <motion.a
          initial={{
            x: -200,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className={style.headerLogo}
          href="/"
        >
          <img
            src="/logo.png"
            alt="TRB"
            className={`cursor-pointer rounded-xl object-contain h-12`}
          />
        </motion.a>
        {notLanding && (
          <motion.div
            initial={{
              y: -200,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.5,
            }}
            className={style.nav}
          >
            <div className={style.navItemsContainer}>
              <div
                // onClick={() => toast.error("Mint not live!")}
                className={`${style.navItem} text-gray-600 `}
              >
                EXCHANGE
              </div>
              <a href="/bulls/support" className={`${style.navItem}`}>
                FAQs
              </a>
              <a
                href="/bulls/mint"
                // aria-disabled={true}
                className={`${selectedNav === "mint" && style.activeNavItem}`}
              >
                <div className={style.navItem}>MINT</div>
              </a>
              <a
                href="/bulls/team"
                // target="_blank"
                className={`${selectedNav === "team" && style.activeNavItem}`}
              >
                <div className={style.navItem}>TEAM</div>
              </a>
              <a
                href="/bulls/alpha"
                // target="_blank"
                // aria-disabled={true}
                className={`${selectedNav === "team" && style.activeNavItem}`}
              >
                <div className={style.navItem}>ALPHA BULLS</div>
              </a>
              <a
                href="https://theranch.gitbook.io/"
                target="_blank"
                className={`${selectedNav === "mint" && style.activeNavItem}`}
              >
                <div className={style.navItem}>WHITEPAPER</div>
              </a>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{
            x: 200,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="flex cursor-pointer text-white items-center justify-center "
        >
          <>
            {/* <div className="mx-1 rounded-2xl bg-[#191B1F] px-2 py-1 text-[0.9rem] font-semibold">
              <div className="z-50 mx-1 flex h-8 cursor-pointer items-center rounded-2xl border-[#163256] bg-[#172A42] px-3 py-3">
                <Link
                  href="https://paper.xyz/checkout/5b49511e-a492-4cc5-ab92-5b2d44ba8195"
                  target="_blank"
                >
                  Mint with Card
                </Link>
              </div>
            </div> */}
            <div className="mx-1 flex cursor-pointer items-center justify-center rounded-2xl bg-[#191B1F] px-1 py-1 text-[0.9rem] font-semibold">
              <>
                {status == "authenticated" ? (
                  <div
                    className={`mx-2 flex cursor-pointer items-center justify-between rounded-2xl bg-[#191B1F] text-[1rem] font-semibold`}
                  >
                    <div
                      // onClick={() => router.push(`/${section}/exchange`)}
                      className={`z-50 mr-2 flex h-8 cursor-pointer items-center rounded-2xl border-[#163256] bg-[#172A42] p-2`}
                    >
                      {/* @ts-ignore */}
                      {data.user?.address.slice(0, 5)}...
                      {/* @ts-ignore */}
                      {data.user?.address.slice(-4)}
                    </div>
                    <div
                      onClick={() => signOut({ redirect: false })}
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
                ) : (
                  <div
                    onClick={() => handleAuth()}
                    className={`mx-2 flex cursor-pointer items-center rounded-2xl bg-[#191B1F] md:text-[0.9rem] font-semibold`}
                  >
                    <div
                      className={`flex h-full items-center justify-center text-sm md:text-base rounded-2xl border border-[#163256] bg-[#172A42] px-2 py-1 text-[#4F90EA] hover:border-[#234169]`}
                    >
                      Connect Wallet
                    </div>
                  </div>
                )}
              </>
            </div>
          </>
          <div className="mx-1 rounded-2xl bg-[#191B1F] px-2 py-1 text-[0.9rem] font-semibold">
            <Menu>
              <Menu.Button>
                <div className="flex items-center justify-center rounded-2xl border border-[#163256] bg-[#172A42] p-1 text-[#4F90EA] hover:border-[#234169]">
                  <Bars3Icon className="h-6" />
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95 "
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-full px-10 md:px-20 py-6 origin-top-right grid grid-cols-1 md:grid-cols-3 place-items-center bg-[#15202b] text-white mt-1 divide-gray-100 rounded-b-md ml-5 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
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
                            <a
                              href="https://forms.gle/gP56Yr3GGGsZ3yQd7"
                              className="as"
                            >
                              Partnership
                            </a>
                            <a
                              href="https://theranch.gitbook.io/the-ranch/legal/privacy-policy"
                              target="_blank"
                            >
                              Privacy Policy
                            </a>
                            <a
                              href="https://theranch.gitbook.io/"
                              target="_blank"
                            >
                              Whitepaper
                            </a>
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <div>
                          <h1 className="text-lg font-bold uppercase tracking-wider text-gray-500">
                            Connect
                          </h1>
                          <div className="ml-4 mt-4 flex flex-col space-y-2">
                            <a
                              href="https://twitter.com/0xTheRanch"
                              target="_blank"
                            >
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
                              href="https://opensea.io/collection/the-ranch-bulls-community"
                              target="_blank"
                            >
                              OpenSea
                            </a>
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <div>
                          <h1 className="text-lg font-bold uppercase tracking-wider text-gray-500">
                            Account
                          </h1>
                          <div className="ml-4 mt-4 space-y-2">
                            {show && (
                              <p
                                className="cursor-pointer"
                                onClick={() => setOpen(true)}
                              >
                                Buddy Address
                              </p>
                            )}
                            <p
                              className="cursor-pointer"
                              onClick={() => setEmailModal(true)}
                            >
                              Email
                            </p>
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </motion.div>
      </div>
      <ReactModal isOpen={open} style={customStyles}>
        <Modaluser />
      </ReactModal>
      <ReactModal isOpen={emailModal} style={customStyles}>
        <EmailModal />
      </ReactModal>
    </div>
  );
};

export default Header;
