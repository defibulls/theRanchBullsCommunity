import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import Head from "next/head";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";

const ConnectWallet = () => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }
    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    /* @ts-ignore */
    const { message } = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    });

    // console.log(message);

    const signature = await signMessageAsync({ message });
    // console.log(signature);

    // redirect user after success authentication to '/user' page
    await signIn("moralis-auth", {
      message,
      signature,
      redirect: false,
    });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center overflow-y-hidden bg-[#15202b] text-white">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Head>
          <title>The Ranch - Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <iframe src="/bulls/demo/data.html" height="300" width="500">
          LOGO
        </iframe>
        <div className="mb-4 text-xl font-bold text-gray-500">
          Please connect your wallet to continue.
        </div>

        <div
          className="mb-10 cursor-pointer rounded-full bg-purple-600 px-6 py-4 text-2xl font-bold text-black hover:bg-purple-800"
          onClick={() => handleAuth()}
        >
          Connect Wallet
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
