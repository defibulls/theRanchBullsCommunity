import { createContext, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import {
  airdropContract,
  airdropContractABI,
  contractABI,
  contractAddress,
} from '../lib/constants'
import getWeb3 from '../lib/getWeb3'

export const ContractContext = createContext()

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null)
  const [airdropContracts, setAirdropContract] = useState(null)

  const loadWeb3Contract = async (web3) => {
    const web3Contract = await new web3.eth.Contract(
      contractABI,
      contractAddress
    )
    return web3Contract
  }

  const loadAirdropContract = async (web3) => {
    const web3Contract = await new web3.eth.Contract(
      airdropContractABI,
      airdropContract
    )
    return web3Contract
  }

  useEffect(async () => {
    const web3 = await getWeb3()
    let contract = await loadWeb3Contract(web3)
    let airdropContract = await loadAirdropContract(web3)
    setAirdropContract(airdropContract)
    setContract(contract)
  }, [])

  return (
    <ContractContext.Provider value={{ contract, airdropContracts }}>
      {children}
    </ContractContext.Provider>
  )
}
