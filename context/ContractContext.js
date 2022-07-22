import { createContext, useEffect, useState } from 'react'
import {
  contractABI,
  contractAddress,
  CurrencyContract,
  currencyContractABI,
} from '../lib/constants'
import getWeb3 from '../lib/getWeb3'

export const ContractContext = createContext()

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null)
  const [tokenContract, setTokenContract] = useState(null)

  const loadTokenContract = async (web3) => {
    const web3Contract = await new web3.eth.Contract(
      currencyContractABI,
      CurrencyContract
    )
    return web3Contract
  }

  const loadMintContract = async (web3) => {
    const web3Contract = await new web3.eth.Contract(
      contractABI,
      contractAddress
    )
    return web3Contract
  }

  useEffect(async () => {
    const web3 = await getWeb3()
    let contract = await loadMintContract(web3)
    let tokenContract = await loadTokenContract(web3)
    setTokenContract(tokenContract)
    setContract(contract)
  }, [])

  return (
    <ContractContext.Provider value={{ contract, tokenContract }}>
      {children}
    </ContractContext.Provider>
  )
}
