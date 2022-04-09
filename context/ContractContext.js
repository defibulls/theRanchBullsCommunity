import { createContext, useEffect, useState } from 'react'
import {
  airdropContractAddress,
  airdropContractABI,
  contractABI,
  contractAddress,
} from '../lib/constants'
import getWeb3 from '../lib/getWeb3'

export const ContractContext = createContext()

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null)
  const [airdropContract, setAirdropContract] = useState(null)

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
      airdropContractAddress
    )
    return web3Contract
  }

  useEffect(async () => {
    const web3 = await getWeb3()
    let contract = await loadWeb3Contract(web3)
    setContract(contract)
  }, [])

  useEffect(async () => {
    const web3 = await getWeb3()
    let airdropContract = await loadAirdropContract(web3)
    setAirdropContract(airdropContract)
  }, [])

  return (
    <ContractContext.Provider value={{ contract, airdropContract }}>
      {children}
    </ContractContext.Provider>
  )
}
