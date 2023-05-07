"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../../context/ContractContext";
import Header from "../../Header";
import Card from "./Card";
import ShepherdAlert from "../mint/ReffererAlert";

type Props = {};

const datas = [
  {
    name: "Bronze",
    price: 350,
    totalSupply: 60,
    points: 52500,
    description: "",
    mintWithCard:
      "https://withpaper.com/checkout/9e7b7cf8-cc03-4e5b-b26f-b5b321927839",
  },
  {
    name: "Silver",
    price: 1000,
    totalSupply: 30,
    points: 175000,
    description: "",
    mintWithCard:
      "https://withpaper.com/checkout/169edea8-f90c-42da-be7c-e414bf2934cc",
  },
  {
    name: "Gold",
    price: 5000,
    totalSupply: 10,
    points: 1000000,
    description: "",
    mintWithCard: "",
  },
];

const Home = (props: Props) => {
  const { status, data } = useSession();
  const { mintContract, setOpen } = useContext(ContractContext);
  const [updated, setUpdated] = useState(false);
  const getIfBuddyIsUpdated = async () => {
    const _shepherdAddress = await mintContract.methods.myShepherd(
      // @ts-ignore
      data?.user.address
    );
    if (_shepherdAddress == "0x0000000000000000000000000000000000000000") {
      setUpdated(false);
    } else {
      setUpdated(true);
    }

    if (updated == true || window.location.href.split("=")[1]) {
      setUpdated(true);
    } else {
      setUpdated(false);
    }
  };

  useEffect(() => {
    if (mintContract) {
      getIfBuddyIsUpdated();
    }
    //@ts-ignore
  }, [data?.user.address, mintContract]);
  return (
    <div className="pb-20 md:pb-0 flex flex-col items-center justify-center">
      <Header notLanding={true} />
      {!updated && <ShepherdAlert setOpen={setOpen} />}

      <main className="min-h-screen md:mt-28 pb-10 mt-20 max-w-7xl mx-auto grid md:grid-cols-3 grid-cols-1 w-full sm:grid-cols-2 px-10 md:place-content-start place-content-start items-start place-items-center gap-10">
        {datas.map((nft, i) => (
          <Card
            key={i}
            name={nft.name}
            points={nft.points}
            price={nft.price}
            totalSupply={nft.totalSupply}
            mintWithCard={nft.mintWithCard}
          />
        ))}
      </main>

      <div className="flex flex-col  max-w-7xl mx-auto pb-10">
        <div className="flex w-full text-white flex-col items-start justify-center px-10">
          <div className="relative flex h-full w-full items-end">
            <div className="font-marker text-4xl font-black">
              <p>ABOUT</p>
              <hr aria-orientation="horizontal" className="my-5" />
            </div>
          </div>
          <p className="text-md font-normal">
            The Alpha TR Bulls were created to provide an opportunity for anyone
            to be a part of the project at its core level, regardless of their
            personal connections. Our team understands that exclusive access to
            key project aspects can be discouraging for those who feel left out.
            With this in mind, we designed Alpha Bulls as a way for anyone who
            shares our values to contribute to the project's growth.
            <br />
            <br />
            One of the benefits of becoming an Alpha Bull is increased Bullion
            Production. Additionally, Alpha Bulls are the recipients of
            secondary sale royalties for the project. This means that as the
            project grows and gains value, Alpha Bulls will benefit from their
            early participation. We welcome anyone who believes in our vision to
            join us by purchasing an Alpha Bull, whether you are a friend,
            family member, or simply someone who shares our passion for this
            project
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mb-10 ">
        <div className="bg-gray-800 rounded-lg">
          <Image
            src="/alphaBulls.svg"
            alt=""
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
