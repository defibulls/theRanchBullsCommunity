"use client";
import { useSession } from "next-auth/react";
import Header from "../../Header";
import ConnectWallet from "./ConnectWallet";
import NFTMint from "./NFTMint";

const Mint = () => {
  const { status } = useSession();

  return (
    <div>
      <Header notLanding={true} />
      <main>{status == "authenticated" ? <NFTMint /> : <ConnectWallet />}</main>
    </div>
  );
};

export default Mint;
