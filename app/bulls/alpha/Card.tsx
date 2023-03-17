"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ContractContext } from "../../../context/ContractContext";
import { useContext, MouseEvent, useState, useEffect } from "react";
import { mintContractAddress } from "../../../lib/constants";
import toast from "react-hot-toast";

type Props = {
  name: string;
  price: number;
  totalSupply: number;
  points: number;
};

const Card = ({ name, price, totalSupply, points }: Props) => {
  const { data } = useSession();
  const { tokenContract, mintContract, handleShow } =
    useContext(ContractContext);
  const [alphaBullsMinted, setAlphaBullsMinted] = useState<number>(0);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // @ts-ignore
  const address = data?.user.address;

  useEffect(() => {
    handleShow(true);
  }, []);

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

    if (_usdcBalance < price) {
      return toast.error(`You don't have enough USDC`);
    }

    const allowance = await tokenContract.methods
      .allowance(address, mintContractAddress)
      .call();

    if (allowance / 1000000 < price) {
      const notAllowed = price - allowance / 1000000;
      await tokenContract.methods
        .approve(mintContractAddress, String(notAllowed + "000000"))
        .send({ from: address }, (err: any) => {
          if (err) {
            toast.error(err.message);
            // setLoading(false);
          }
        });

      toast.success("Amount has been approved!");
    }

    await mintContract.methods.alphaBullsMint(name.toLocaleLowerCase()).send(
      {
        from: address,
      },
      (err: any) => {
        if (err) {
          toast.error(err.message.toLocaleString());
        }
      }
    );

    toast.success(`You have sucessfully minted a ${name} TR Bull`);
  };

  useEffect(() => {
    if (mintContract) {
      getMintedAlphaBulls();
    }
  }, [mintContract, mint]);

  return (
    <div className="relative h-fit w-[85%]">
      <div className="absolute inset-0 bg-purple-500 blur"></div>
      <div className="text-white relative min-h-fit flex-col shadow-md shadow-purple-500 w-full flex rounded-lg items-center justify-center bg-[#15202b]">
        <Image
          src={`/images/${name.toLocaleLowerCase()}.png`}
          alt={name}
          className="rounded-t-lg"
          height={100}
          width={320}
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
        </div>
      </div>
    </div>
  );
};

export default Card;
