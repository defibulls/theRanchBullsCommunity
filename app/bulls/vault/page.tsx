import Header from "../../Header";
import Moralis from "moralis";
import ImageCard from "./ImageCard";
import { EvmChain } from "moralis/common-evm-utils";

function removeDuplicates(arr: any[], prop: string) {
  const duplicates: any = {};
  const result: any[] = [];

  arr.forEach((item) => {
    const key = item[prop];

    if (!duplicates[key]) {
      duplicates[key] = 0;
    }

    duplicates[key]++;

    if (duplicates[key] === 1) {
      result.push(item);
    }
  });

  return result.map((item) => {
    return {
      ...item,
      repeated: duplicates[item[prop]] - 1,
    };
  });
}

const getVaultNFTs = async () => {
  // once();
  //@ts-ignore
  if (!Moralis.Core.isStarted) {
    await Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY });
  }

  const address = "0x309fE120B00859becaC99abf87338Ab996096F61";

  const chain = EvmChain.ETHEREUM;

  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
    tokenAddresses: ["0xa8a49255026ec0ab032bbb5c4f457aaa9b138ea6"],
  });

  const newArr = removeDuplicates(response.result, "tokenAddress");

  return newArr;
};
const Vault = async () => {
  const nfts = await getVaultNFTs();

  console.log(nfts);

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
          {nfts.map((nft) => (
            <ImageCard
              // @ts-ignore
              name={nft._data.metadata.name!}
              // @ts-ignore
              desc={nft._data.metadata.description!}
              //@ts-ignore
              link={nft._data.metadata.external_url!}
              quantity={nft.repeated}
              //@ts-ignore
              uri={nft._data.tokenUri!}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vault;
