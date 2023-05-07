"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../../context/ContractContext";
import Header from "../../Header";
import ConnectWallet from "./ConnectWallet";
import NFTMint from "./NFTMint";
import ShepherdAlert from "./ReffererAlert";

type Props = {};

const Mint = (props: Props) => {
  const { status, data } = useSession();
  const { mintContract, setOpen } = useContext(ContractContext);
  const [updated, setUpdated] = useState(false);

  const getIfBuddyIsUpdated = async () => {
    const _shepherdAddress = await mintContract.methods.myShepherd(
      // @ts-ignore
      data?.user.address
    );
    if (_shepherdAddress != "0x0000000000000000000000000000000000000000") {
      setUpdated(true);
    } else {
      setUpdated(false);
    }

    if (
      _shepherdAddress != "0x0000000000000000000000000000000000000000" ||
      window.location.href.split("=")[1]
    ) {
      setUpdated(true);
    } else {
      setUpdated(false);
    }
  };

  useEffect(() => {
    //@ts-ignore
    if (mintContract && data?.user.address != undefined) {
      getIfBuddyIsUpdated();
    }

    if (window.location.href.split("=")[1] && updated == false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    //@ts-ignore
  }, [data?.user.address, mintContract]);

  return (
    <div>
      <Header notLanding={true} />
      {!updated && <ShepherdAlert setOpen={setOpen} />}
      <main>{status == "authenticated" ? <NFTMint /> : <ConnectWallet />}</main>
    </div>
  );
};

export default Mint;
