"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ContractContext } from "../../../context/ContractContext";
import { useContext, MouseEvent, useState, useEffect } from "react";
import { alphaBullsContractAddress } from "../../../lib/constants";
import toast from "react-hot-toast";

type Props = {
  name: string;
  price: number;
  totalSupply: number;
  points: number;
};

const Card = ({ name, price, totalSupply, points }: Props) => {
  const { data } = useSession();
  const { tokenContract, alphaBullsContract } = useContext(ContractContext);
  const [alphaBullsMinted, setAlphaBullsMinted] = useState<number>(0);

  const getMintedAlphaBulls = async () => {
    if (name.toLowerCase() == "gold") {
      const tokenSupply = await alphaBullsContract.methods
        .goldTokenSupply()
        .call();
      setAlphaBullsMinted(Number(tokenSupply - 4990));
    } else if (name.toLowerCase() == "silver") {
      const tokenSupplySilver = await alphaBullsContract.methods
        .silverTokenSupply()
        .call();
      setAlphaBullsMinted(Number(tokenSupplySilver - 4960));
    } else {
      const tokenSupplyBronze = await alphaBullsContract.methods
        .bronzeTokenSupply()
        .call();
      setAlphaBullsMinted(Number(tokenSupplyBronze - 4900));
    }
  };

  // console.log(alphaBullsContract);s
  const mint = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // @ts-ignore
    const address = data?.user.address;
    const _usdcBalance = await tokenContract.methods.balanceOf(address).call();

    if (_usdcBalance < price) {
      return toast.error(`You don't have enough USDC.e`);
    }

    const allowance = await tokenContract.methods
      .allowance(address, alphaBullsContractAddress)
      .call();

    if (allowance / 1000000 < price) {
      const notAllowed = price - allowance / 1000000;
      await tokenContract.methods
        .approve(alphaBullsContractAddress, String(notAllowed + "000000"))
        .send({ from: address }, (err: any) => {
          if (err) {
            toast.error(err.message);
            // setLoading(false);
          }
        });

      toast.success("Amount has been approved!");
    }

    await alphaBullsContract.methods
      .alphaBullsMint(name.toLocaleLowerCase())
      .send(
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
    if (alphaBullsContract) {
      getMintedAlphaBulls();
    }
  }, [alphaBullsContract, mint]);

  return (
    <div className="relative h-fit">
      <div className="absolute inset-0 bg-purple-500 blur"></div>
      <div className="text-white relative min-h-fit flex-col shadow-md shadow-purple-500 w-fit flex rounded-lg items-center justify-center bg-[#15202b]">
        <Image
          src={`/images/${name.toLocaleLowerCase()}.png`}
          alt={name}
          className="rounded-t-lg"
          height={100}
          width={300}
        />
        <div className="py-5 space-y-2 ">
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
          <button
            onClick={(e) => mint(e)}
            className="bg-purple-500 w-full py-2 rounded-full  font-marker uppercase"
          >
            Mint
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
