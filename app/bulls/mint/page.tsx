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
  const [show, setShow] = useState(true);

  const getIfBuddyIsUpdated = async () => {
    const _isUpdated = await mintContract.methods
      .buddyAlreadyUpdated(
        // @ts-ignore
        data?.user?.address
      )
      .call();

    if (_isUpdated == true || window.location.href.split("=")[1]) {
      setUpdated(true);
    } else {
      setUpdated(false);
      setShow(false);
    }
  };

  useEffect(() => {
    if (mintContract) {
      getIfBuddyIsUpdated();
    }
    //@ts-ignore
  }, [data?.user.address, mintContract]);

  return (
    <div>
      <Header notLanding={true} />
      {!updated && <ShepherdAlert setOpen={setOpen} setShow={setShow} />}
      <main>{status == "authenticated" ? <NFTMint /> : <ConnectWallet />}</main>
    </div>
  );
};

export default Mint;
