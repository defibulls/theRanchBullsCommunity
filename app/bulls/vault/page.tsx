import Header from "../../Header";
import Moralis from "moralis";
import { EvmChain } from "moralis/common-evm-utils";
import ImageCard from "./ImageCard";

const getVaultNFTs = async () => {
  Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY });

  const address = "0x309fE120B00859becaC99abf87338Ab996096F61";

  const chain = EvmChain.ETHEREUM;

  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
    tokenAddresses: ["0xa8a49255026ec0ab032bbb5c4f457aaa9b138ea6"],
  });

  return response.result[0];
};
const Vault = async () => {
  const nfts = await getVaultNFTs();

  return (
    <div className="h-full w-full overflow-x-hidden pb-20">
      <Header notLanding={true} />

      <div className="min-h-full pt-32 max-w-7xl xl:px-0 px-20 w-full justify-center mx-auto items-center">
        <div className="relative flex w-full items-start">
          <div className="font-marker text-3xl font-black uppercase">
            VAULT
            <hr aria-orientation="horizontal" className="my-5" />
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <ImageCard
            // @ts-ignore
            name={nfts.metadata.name!}
            // @ts-ignore
            desc={nfts.metadata.description!}
            // @ts-ignore
            link={nfts.metadata.external_url}
            uri={nfts.tokenUri!}
          />
        </div>
      </div>
    </div>
  );
};

export default Vault;
