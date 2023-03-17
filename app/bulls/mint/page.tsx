"use client";
import { useSession } from "next-auth/react";
import Header from "../../Header";
import ConnectWallet from "./ConnectWallet";

type Props = {};

const Mint = (props: Props) => {
  const { status } = useSession();

  return (
    <div>
      <Header notLanding={true} />
      {status == "authenticated" ? <div /> : <ConnectWallet />}
    </div>
  );
};

export default Mint;
