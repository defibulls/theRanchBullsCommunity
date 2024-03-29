"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ContractContext } from "../../../context/ContractContext";
import { useContext, MouseEvent, useState, useEffect } from "react";
import { mintContractAddress } from "../../../lib/constants";
import toast from "react-hot-toast";
import Web3 from "web3";
import Link from "next/link";

type Props = {
  name: string;
  price: number;
  totalSupply: number;
  points: number;
  mintWithCard: string;
};

const Card = ({ name, price, mintWithCard, totalSupply, points }: Props) => {
  const { data } = useSession();
  const { tokenContract, mintContract, handleShow } =
    useContext(ContractContext);
  const [alphaBullsMinted, setAlphaBullsMinted] = useState<number>(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [count, setCount] = useState<number>(1);

  // @ts-ignore
  const address = data?.user.address;

  useEffect(() => {
    handleShow(true);
  }, []);

  async function getGasPrice() {
    const web3 = new Web3(process.env.NEXT_PUBLIC_ALCHEMY_KEY!);
    const gasPrice = web3.eth.getGasPrice();

    return gasPrice;
  }

  const getMintedAlphaBulls = async () => {
    if (name.toLowerCase() == "gold") {
      const tokenSupply = await mintContract.methods.goldTokenSupply().call();
      setAlphaBullsMinted(Number(tokenSupply - 4990));
    } else if (name.toLowerCase() == "silver") {
      const tokenSupplySilver = await mintContract.methods
        .silverTokenSupply()
        .call();
      setAlphaBullsMinted(Number(tokenSupplySilver - 4960));
    } else {
      const tokenSupplyBronze = await mintContract.methods
        .bronzeTokenSupply()
        .call();
      setAlphaBullsMinted(Number(tokenSupplyBronze - 4900));
    }
  };

  const mint = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // @ts-ignore
    if (data == null) return toast.error("You are not authenticated!");
    if (!agreeTerms)
      return toast.error(
        "You haven't agreed to our Terms of Service and Privacy Policy"
      );

    if (mintContract == totalSupply)
      return toast.error("All Alpha bulls have been minted!");

    // @ts-ignore
    const address = data?.user.address;
    const _usdcBalance = await tokenContract.methods.balanceOf(address).call();
    const totalPrice = price * count;

    console.log(totalPrice);

    if (_usdcBalance < totalPrice) {
      return toast.error(`You don't have enough USDC`);
    }

    const gasPrice = await getGasPrice();

    const allowance = await tokenContract.methods
      .allowance(address, mintContractAddress)
      .call();

    if (allowance / 1000000 < totalPrice) {
      const notAllowed = totalPrice - allowance / 1000000;
      await tokenContract.methods
        .approve(mintContractAddress, String(totalPrice + "000000"))
        .send({ from: address }, (err: any) => {
          if (err) {
            toast.error(err.message);
            // setLoading(false);
          }
        });

      toast.success("Amount has been approved!");
    }

    if (name.toLocaleLowerCase() == "bronze") {
      await mintContract.methods.alphaBullsMintBronze(count).send(
        {
          from: address,
          gasPrice: gasPrice,
        },
        (err: any) => {
          if (err) {
            toast.error(err.message.toLocaleString());
          }
        }
      );
    } else if (name.toLocaleLowerCase() == "silver") {
      await mintContract.methods.alphaBullsMintSilver(count).send(
        {
          from: address,
          gasPrice: gasPrice,
        },
        (err: any) => {
          if (err) {
            toast.error(err.message.toLocaleString());
          }
        }
      );
    } else {
      await mintContract.methods.alphaBullsMintGold(count).send(
        {
          from: address,
          gasPrice: gasPrice,
        },
        (err: any) => {
          if (err) {
            toast.error(err.message.toLocaleString());
          }
        }
      );
    }
    toast.success(
      `You have sucessfully minted ${count} ${name} TR ${
        count > 1 ? "Bulls" : "Bull"
      }`
    );
  };

  useEffect(() => {
    if (mintContract) {
      getMintedAlphaBulls();
    }
  }, [mintContract, mint]);

  const increment = () => {
    let limit = 10;
    if (totalSupply - alphaBullsMinted <= 10) {
      limit = totalSupply - alphaBullsMinted;
    }
    if (count < limit) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="relative h-fit w-[90%]">
      <div className="absolute inset-0 bg-purple-500 blur"></div>
      <div className="text-white relative min-h-fit flex-col shadow-md shadow-purple-500 w-full flex rounded-lg items-center justify-center bg-[#15202b]">
        <Image
          src={`/images/${name.toLocaleLowerCase()}.png`}
          alt={name}
          className="rounded-t-lg"
          height={100}
          width={350}
        />
        <div className="py-5 space-y-2 w-[90%] ">
          <h1 className="uppercase font-marker  text-xl">
            The {name} TR Bulls
          </h1>
          <div className="flex justify-between w-full items-center text-gray-500">
            <span className="font-semibold text-base tracking-wider text-white uppercase">
              Minted
            </span>{" "}
            {alphaBullsMinted} / {totalSupply}
          </div>
          <div className="flex justify-between uppercase w-full items-center text-gray-500">
            <span className="font-semibold text-base tracking-wider text-white ">
              Bullion
            </span>{" "}
            {points.toLocaleString("en-US")}
          </div>
          <div className="flex justify-between uppercase flex-col w-full items-start tracking-wider text-gray-500">
            <span className="font-bold text-base text-white">PRICE</span>
            <p className="text-2xl text-white font-bold">
              {price} <span className="text-gray-500">USDC</span>
            </p>
          </div>
          <div className="flex items-center space-x-4 justify-center rounded-lg  px-6 py-4">
            <button
              className="text-gray-200 hover:text-gray-400 focus:outline-none"
              onClick={decrement}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="text-gray-400 font-semibold text-2xl">
              {count}
            </span>
            <button
              className="text-gray-200 hover:text-gray-400 focus:outline-none"
              onClick={increment}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v12M6 12h12"
                />
              </svg>
            </button>
          </div>
          <div className="flex w-full space-x-2">
            <input
              type="checkbox"
              className="focus:ring-3  h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-blue-300"
              onChange={(e: any) => setAgreeTerms(e.target.checked)}
            />

            <p className="text-gray-600 text-xs uppercase">
              By checking this box, you are agreeing to our{" "}
              <a
                href="https://theranch.gitbook.io/the-ranch/legal/terms-of-service"
                target="_blank"
                className="text-gray-200 underline underline-offset-2"
              >
                terms of service{" "}
              </a>
              and{" "}
              <a
                href="https://theranch.gitbook.io/the-ranch/legal/privacy-policy"
                target="_blank"
                className="text-gray-200 underline underline-offset-2"
              >
                privacy policy.
              </a>
            </p>
          </div>
          <button
            // @ts-ignore
            disabled={!address}
            onClick={(e) => mint(e)}
            className="bg-purple-500 w-full py-2 rounded-full shadow-md font-marker uppercase disabled:bg-gray-500"
          >
            {address ? "Mint" : "Connect Wallet"}
          </button>
          {name.toLocaleLowerCase() != "gold" && (
            <div className="border-purple-500 mt-3 border w-full py-2 rounded-full shadow-md font-marker uppercase flex justify-center">
              <Link
                href={mintWithCard}
                className="w-full text-center"
                target="_blank"
                // onClick={(e) => mint(e)}
              >
                Mint with credit card
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
