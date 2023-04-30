import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { ContractContext } from "../../../context/ContractContext";
import { mintContractAddress } from "../../../lib/constants";
import Link from "next/link";
import Web3 from "web3";

type Props = {
  minted: number;
  maxbulls: number;
  setMinted: any;
  setLoading: any;
};

const MintSection = ({ minted, maxbulls, setMinted, setLoading }: Props) => {
  const [count, setCount] = useState<number>(1);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { mintContract, tokenContract } = useContext(ContractContext);
  const [price, setPrice] = useState<any>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { data } = useSession();
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [bonusNFTs, setBonusNFTs] = useState<number>(0);
  const [phase, setPhase] = useState(1);
  const [totalBulls, setTotalBulls] = useState(0);
  const [mintedinTier, setMintedInTier] = useState(0);
  //@ts-ignore
  const account = data?.user.address;

  async function getGasPrice() {
    const web3 = new Web3(process.env.NEXT_PUBLIC_ALCHEMY_KEY!);
    const gasPrice = web3.eth.getGasPrice();

    return gasPrice;
  }

  const mint = async () => {
    if (!agreeTerms)
      return toast.error(
        "You haven't agreed to our Terms of Service and Privacy Policy"
      );

    if (count === 0) return toast.error("Please enter a valid amount");
    if (count > 10)
      return toast.error("You can only mint up to 10 NFTs at a time");

    if (minted == maxbulls) return toast.error("All bulls have been minted!");

    // @ts-ignore
    const account = data?.user.address;

    const _usdcBalance = await tokenContract.methods.balanceOf(account).call();

    if (_usdcBalance < totalPrice) {
      return toast.error(`You don't have enough USDC.e`);
    }

    setLoading(true);

    const allowance = await tokenContract.methods
      .allowance(account, mintContractAddress)
      .call();

    const gasPrice = await getGasPrice();

    if (allowance / 1000000 < totalPrice) {
      await tokenContract.methods
        .approve(mintContractAddress, String(totalPrice + "000000"))
        .send({ from: account, gasPrice: gasPrice }, (err: any) => {
          if (err) {
            toast.error(err.message);
            setLoading(false);
          }
        });

      toast.success("Amount has been approved!");
    }

    await mintContract.methods
      .mint(count)
      .send({
        from: account,
        gasPrice: gasPrice,
      })
      .then(() => {
        const minted = count;
        toast.success(
          `You've sucessfully minted ${minted + bonusNFTs} ${
            minted > 1 ? "bulls" : "bull"
          }!`
        );
        setLoading(false);
      })
      .catch((err: any) => {
        toast.error("Something went wrong! Please Try Again Later");
        // console.log(err);
        setLoading(false);
      });
  };

  const fetchData = async () => {
    const mintedNFTs = await mintContract.methods.normalTokenSupply().call();
    setMinted(mintedNFTs);

    const _whitelistedAdress = await mintContract.methods
      .whitelistMintAddresses(account)
      .call();
    setIsWhitelisted(_whitelistedAdress);
  };

  const getPhase = () => {
    if (maxbulls == 250) {
      setPhase(1);
      setTotalBulls(maxbulls);
      setMintedInTier(minted);
      setPrice(150);
    } else if (maxbulls == 650 && maxbulls > 250) {
      setPhase(2);
      setTotalBulls(maxbulls - 250);
      setMintedInTier(minted - 250);
      setPrice(160);
    } else if (maxbulls == 1200) {
      setPhase(3);
      setTotalBulls(maxbulls - 650);
      setMintedInTier(minted - 650);
      setPrice(170);
    } else if (maxbulls == 4893) {
      setPhase(4);
      setTotalBulls(maxbulls - 1200);
      setMintedInTier(minted - 1200);
      setPrice(180);
    }
  };

  useEffect(() => {
    if (mintContract) {
      fetchData();
      getPhase();
    }
  }, [mintContract, mint, account]);

  const fetchBonusNFTs = async () => {
    if (isWhitelisted) {
      const _noOfBonusNFTs = await mintContract.methods
        .whitelistBonusAmount(count)
        .call();

      setBonusNFTs(_noOfBonusNFTs);
    }
  };

  const decrement = (e: any) => {
    e.preventDefault();
    if (count == 1) return;
    setCount(count - 1);
  };

  useEffect(() => {
    if (mintContract && account) {
      calculateTotalPrice(count, account);
    }
  }, [count, mintContract, account]);

  useEffect(() => {
    if (mintContract) {
      fetchBonusNFTs();
    }
  }, [count, mintContract]);

  const calculateTotalPrice = async (count: number, account: any) => {
    const _price = await mintContract.methods
      //@ts-ignore
      .getCostAndMintEligibility(account, count)
      .call();
    setTotalPrice(_price / 1000000);
  };

  const increment = (e: any) => {
    e.preventDefault();
    let limit = 10;
    if (totalBulls - mintedinTier <= 10) {
      limit = totalBulls - mintedinTier;
    }
    if (count == limit) return;
    setCount(count + 1);
  };

  return (
    <motion.div
      initial={{
        x: 200,
        opacity: 0,
      }}
      viewport={{ once: true }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      className="flex w-full flex-col justify-center lg:w-[50%]"
    >
      <p className="mb-1 text-4xl font-black text-cyan-600 underline underline-offset-2">
        MINT LIVE
      </p>

      <p className="font-marker text-3xl text-orange-400">
        {phase == 4 ? "Public Phase" : `Phase ${phase}`}
      </p>

      <p className="text-4xl font-black">
        {mintedinTier} / {totalBulls}
      </p>
      <p className="pb-4 text-5xl font-bold leading-[1.2]">
        EACH <span className="font-marker text-purple-600">BULL </span> COSTS{" "}
        {price}
        <span className="font-marker text-purple-600"> USDC</span>
        <br />
      </p>

      <div className={` text-lg font-normal text-cyan-600`}>
        <p className="font-marker uppercase tracking-widest">
          Max 10 Bulls per transaction
        </p>
        <br />
      </div>

      <div className="mb-8 flex h-full w-fit items-center space-x-2">
        <input
          type="checkbox"
          className="focus:ring-3  h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-blue-300"
          onChange={(e: any) => setAgreeTerms(e.target.checked)}
        />

        <div className="h-full w-full text-base font-semibold uppercase text-gray-500">
          <div className="flex items-center space-x-1">
            <p>By checking this box, you are agreeing to our</p>
            <a
              href="https://theranch.gitbook.io/the-ranch/legal/terms-of-service"
              target="_blank"
              className="text-gray-200 underline underline-offset-2"
            >
              terms of service
            </a>
          </div>

          <div className="flex space-x-1">
            <p>and</p>
            <a
              href="https://theranch.gitbook.io/the-ranch/legal/privacy-policy"
              target="_blank"
              className="text-gray-200 underline underline-offset-2"
            >
              privacy policy.
            </a>
          </div>
        </div>
      </div>

      <div className="flex w-fit flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            className="rounded-lg border p-2 "
            onClick={(e) => decrement(e)}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              focusable="false"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
            </svg>
          </button>
          <p className="text-2xl font-bold text-cyan-600">{count}</p>
          <p className="font-marker text-2xl font-bold">BULLS</p>
          <button
            onClick={(e) => increment(e)}
            className="rounded-lg border p-2"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              //t="1551322312294"
              viewBox="0 0 1024 1024"
              version="1.1"
              aria-hidden="true"
              focusable="false"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs></defs>
              <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
              <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
            </svg>
          </button>
          {bonusNFTs > 0 && (
            <p className="text-lg text-green-400 tracking-widest font-bold">
              +{bonusNFTs} BONUS {bonusNFTs > 1 ? "NFTs" : "NFT"}
            </p>
          )}
        </div>
        <button
          onClick={mint}
          className="w-full rounded-md bg-cyan-600 px-4 py-2 uppercase tracking-wider disabled:cursor-not-allowed disabled:bg-gray-600"
        >
          Mint
        </button>
        <div
          className="border-cyan-600 mt-3 border w-full py-2 px-2 rounded-md
          shadow-md font-marker uppercase flex justify-center"
        >
          <Link
            href="https://withpaper.com/checkout/aecc7ea9-9af0-44aa-8eae-83ffd2b3dc3c"
            className="w-full text-center"
            target="_blank"
            // onClick={(e) => mint(e)}
          >
            Mint with credit card
          </Link>
        </div>
        <p>
          TOTAL PRICE: <b>{totalPrice} USDC</b>
        </p>
      </div>
    </motion.div>
  );
};

export default MintSection;
