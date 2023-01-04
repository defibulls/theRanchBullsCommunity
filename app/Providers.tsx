"use client";

import React from "react";

import { createClient, configureChains, WagmiConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { ContractProvider } from "../context/ContractContext";

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

const Providers = ({ children, session }: any) => {
  return (
    <ContractProvider>
      <WagmiConfig client={client}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </WagmiConfig>
    </ContractProvider>
  );
};

export default Providers;
