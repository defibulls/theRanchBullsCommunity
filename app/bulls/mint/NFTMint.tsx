import { useContext, useEffect, useState } from "react";
import ChainNotSupported from "./ChainNotSupported";
import Modal from "react-modal";
import { motion } from "framer-motion";
import PublicSale from "./PublicSale";
import MintSection from "./MintSection";
import { ContractContext } from "../../../context/ContractContext";
import Loader from "../../modals/Loader";
import { customStyles } from "../../../lib/constants";

const NFTMint = () => {
  const [loading, setloading] = useState<boolean>(false);
  const [minted, setMinted] = useState<number>(0);
  const [price, setPrice] = useState<any>(150);
  const { mintContract } = useContext(ContractContext);
  const [publicSale, setPublicSale] = useState<boolean>(false);
  const [maxBulls, setMaxBulls] = useState<number>(0);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const getChainId = async () => {
        try {
          //@ts-ignore
          const chainId = await window.ethereum.request({
            method: "eth_chainId",
          });
          //@ts-ignore
          setChainId(chainId);
          // console.log(chainId);
        } catch (error) {
          console.error(error);
        }
      };
      getChainId();
    }
  }, [chainId]);

  const fetchData = async () => {
    const mintedNFTs = await mintContract.methods.normalTokenSupply().call();
    setMinted(mintedNFTs);
    const _publicLiveSale = await mintContract.methods.publicSaleLive().call();
    setPublicSale(_publicLiveSale);
    const _totalBulls = await mintContract.methods
      .normalMintStoppingPoint()
      .call();
    setMaxBulls(_totalBulls);
  };

  const renderSection = () => {
    if (!publicSale) {
      return <PublicSale maxbulls={maxBulls} minted={minted} price={price} />;
    } else {
      return (
        <MintSection
          setMinted={setMinted}
          maxbulls={maxBulls}
          minted={minted}
          setLoading={setloading}
        />
      );
    }
  };

  useEffect(() => {
    if (mintContract) {
      fetchData();
    }
  }, [mintContract]);

  return (
    <div className="h-full overflow-y-scroll lg:overflow-hidden">
      <main className="flex flex-col justify-center items-center">
        <div className="flex min-h-[100vh] w-full flex-col gap-8 p-[10%] text-white md:flex-row md:py-0 md:px-[5%]">
          <div className="flex h-screen w-full flex-col justify-center items-center overflow-hidden">
            {chainId !== "0x89" ? (
              <ChainNotSupported />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center lg:flex-row">
                <motion.div
                  initial={{
                    x: -200,
                    opacity: 0,
                  }}
                  viewport={{ once: true }}
                  whileInView={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.5,
                  }}
                  className="flex w-full h-full items-center justify-center lg:h-[50%] lg:w-[50%]"
                >
                  <iframe
                    src={`/bulls/demo/data.html`}
                    height="50%"
                    width="100%"
                  >
                    LOGO
                  </iframe>
                </motion.div>

                {renderSection()}
              </div>
            )}
          </div>
        </div>
      </main>
      <Modal isOpen={loading} style={customStyles}>
        <Loader />
      </Modal>
    </div>
  );
};

export default NFTMint;
