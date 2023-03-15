"use client";
import { createContext, useEffect, useState } from "react";
import {
  mintContractAddress,
  mintContractABI,
  bullsContractABI,
  bullsContractAddress,
  CurrencyContract,
  currencyContractABI,
} from "../lib/constants";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const [landing, setLanding] = useState(true);
  const [contract, setContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("");
  const [emailModal, setEmailModal] = useState(false);
  const [addUsdcOpen, setAddUsdcOpen] = useState(false);
  const [nfts, setNfts] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [rawNfts, setRawNfts] = useState();
  const [show, handleShow] = useState(false);
  const [mintContract, setMintContract] = useState();

  useEffect(() => {
    const loadTokenContract = async () => {
      const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_KEY);
      const web3Contract = new web3.eth.Contract(
        currencyContractABI,
        CurrencyContract
      );
      setTokenContract(web3Contract);
    };

    const loadMintContract = async () => {
      const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_KEY);
      if (bullsContractAddress && bullsContractABI) {
        const web3Contract = new web3.eth.Contract(
          bullsContractABI,
          bullsContractAddress
        );
        setContract(web3Contract);
      }
    };

    const loadmintContract = async () => {
      const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_KEY);
      if (mintContractAddress && mintContractABI) {
        const web3Contract = new web3.eth.Contract(
          mintContractABI,
          mintContractAddress
        );

        setMintContract(web3Contract);
      }
    };

    loadmintContract();
    // loadMintContract();
    loadTokenContract();
  }, []);

  useEffect(() => {
    if (!rawNfts) return;

    const getNfts = async () => {
      const nftsr = [];
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      });

      rawNfts.forEach(async (nft) => {
        await Moralis.EvmApi.nft
          .getNFTMetadata({
            //@ts-ignore
            address: mintContractAddress,
            chain: EvmChain.MUMBAI,
            tokenId: nft.token_id,
          })
          .then((res) => nftsr.push(res?.result.metadata));
      });

      setNfts(nftsr);
    };

    getNfts();
  }, [rawNfts]);

  return (
    <ContractContext.Provider
      value={{
        contract,
        tokenContract,
        open,
        setOpen,
        setRawNfts,
        setMenuOpen,
        setEmailModal,
        emailModal,
        menuOpen,
        nfts,
        show,
        mintContract,
        handleShow,
        addUsdcOpen,
        setAddUsdcOpen,
        section,
        landing,
        setLanding,
        setSection,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
