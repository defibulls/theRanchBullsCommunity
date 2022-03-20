import { createContext, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { contractABI, contractAddress } from '../lib/contants'
import getWeb3 from '../lib/getWeb3'

export const ContractContext = createContext()

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null)

  const loadWeb3Contract = async (web3) => {
    const web3Contract = await new web3.eth.Contract(
      contractABI,
      contractAddress
    )
    return web3Contract
  }

  useEffect(async () => {
    const web3 = await getWeb3()
    let contract = await loadWeb3Contract(web3)
    setContract(contract)
  }, [])

  console.log('contract', contract)

  return (
    <ContractContext.Provider value={{ contract }}>
      {children}
    </ContractContext.Provider>
  )
}
