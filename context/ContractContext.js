import { createContext, useEffect, useState } from 'react'
import {
  contractABI,
  contractAddress,
  CurrencyContract,
  currencyContractABI,
} from '../lib/constants'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'

export const ContractContext = createContext()

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null)
  const [tokenContract, setTokenContract] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const loadTokenContract = async () => {
      const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_KEY)
      const web3Contract = await new web3.eth.Contract(
        currencyContractABI,
        CurrencyContract
      )
      setTokenContract(web3Contract)
    }

    const loadMintContract = async () => {
      const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_KEY)
      const web3Contract = await new web3.eth.Contract(
        contractABI,
        contractAddress
      )
      setContract(web3Contract)
    }

    return () => {
      loadMintContract()
      loadTokenContract()
    }
  }, [])

  console.log(contract)

  return (
    <ContractContext.Provider
      value={{ contract, tokenContract, open, setOpen }}
    >
      {children}
    </ContractContext.Provider>
  )
}
