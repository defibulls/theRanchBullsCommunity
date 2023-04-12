"use client";

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import { createClient, configureChains, WagmiConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { ContractProvider } from "../context/ContractContext";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

export function Providers({ children, session }: Props) {
  return (
    <ContractProvider>
      <WagmiConfig client={client}>
        <Provider session={session} refetchInterval={0}>
          {children}
        </Provider>
      </WagmiConfig>
    </ContractProvider>
  );
}
