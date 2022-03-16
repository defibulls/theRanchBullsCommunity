import { useContext, useEffect, useState } from 'react'
import { useChain, useMoralis } from 'react-moralis'
import Header from '../Header'
import { contractAddress, customStyles } from '../../lib/contants'
import ChainNotSupported from './ChainNotSupported'
import getWeb3 from '../../lib/getWeb3'
import Modal from 'react-modal'
import Loader from '../modals/Loader'
import { ContractContext } from '../../context/ContractContext'

Modal.setAppElement('#__next')

const NFTMint = () => {
  const { user, account, Moralis } = useMoralis()
  const { contract } = useContext(ContractContext)
  const { chainId } = useChain()
  const [count, setCount] = useState<number>(0)
  const [loading, setloading] = useState<boolean>(false)
  const [minted, setMinted] = useState<number>(0)
  const [price, setPrice] = useState<number>(250)
  const [maxMinted, setMaxMinted] = useState<number>(5)

  const mint = async () => {
    setloading(true)

    const totalnumber = await contract.methods.totalSupply().call()

    await contract.methods
      .approve(contractAddress, totalnumber + count)
      .send({ from: user?.get('ethAddress') }, (err: any) => {
        console.log(err)
        setloading(false)
      })

    await contract.methods
      .mint(count)
      .send({ from: user?.get('ethAddress') }, (err: any) => {
        console.log(err)
        setloading(false)
      })

    setloading(false)
  }

  const fetchData = async () => {
    const mintedNFTs = await contract.methods.totalSupply().call()
    setMinted(mintedNFTs)
    const mintingPrice = await contract.methods.NODEBULLS_MINT_PRICE().call()
    setPrice(mintingPrice)
    const maxMint = await contract.methods.NODEBULLS_MAX_MINTS_PER_TX().call()
    setMaxMinted(maxMint)
  }

  useEffect(() => {
    if (contract) {
      fetchData()
    }
  }, [contract])

  return (
    <div className="h-full overflow-y-scroll lg:overflow-hidden">
      <Header />
      <main className="flex flex-col justify-center ">
        <div className="flex min-h-[100vh] w-full flex-col gap-8 p-[10%] text-white md:flex-row md:py-4 md:px-[5%]">
          <div className="flex h-screen w-full flex-col justify-center overflow-hidden">
            {/* {chainId !== '0x13881' ? (
              <ChainNotSupported />
            ) : ( */}
            <div className="flex h-full w-full flex-col items-center justify-center md:flex-row">
              <iframe
                src="http://localhost:3000/Lottie/demo/data.html"
                height="400"
                width="500"
              >
                LOGO
              </iframe>

              <div className="flex h-fit w-full flex-col justify-center md:w-[40%]">
                <p className="mb-1 text-4xl font-black text-cyan-600 underline underline-offset-2">
                  MINT LIVE
                </p>

                <p className="text-4xl font-black">{minted} / 4999 </p>
                <p className="text-5xl font-black">
                  1 <span className="text-purple-600">BULL</span> COSTS {price}
                  <span className="text-purple-600"> USDC</span>
                  <br />
                  <br />
                </p>
                <p className="text-4xl font-bold text-cyan-600">
                  MAX. {maxMinted} MINTS PER TRANSACTION
                  <br />
                  <br />
                </p>
                <div className="flex w-fit flex-col items-center gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      className="rounded-lg border p-3"
                      onClick={() => {
                        if (count == 0) {
                          setCount(0)
                        } else {
                          setCount(count - 1)
                        }
                      }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 1024 1024"
                        aria-hidden="true"
                        focusable="false"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </button>
                    <p className="text-2xl font-bold text-cyan-600">{count}</p>
                    <p className="text-2xl font-bold">BULLS</p>
                    <button
                      onClick={() => {
                        if (count == 5) {
                          setCount(5)
                        } else {
                          setCount(count + 1)
                        }
                      }}
                      className="rounded-lg border p-3"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        //t="1551322312294"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        aria-hidden="true"
                        focusable="false"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs></defs>
                        <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
                        <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={mint}
                    className="w-full rounded-md bg-cyan-600 px-4 py-2"
                  >
                    MINT
                  </button>
                  <p>
                    TOTAL PRICE: <b>{count * price} USDC</b>
                  </p>
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
      </main>
      <Modal isOpen={loading} style={customStyles}>
        <Loader />
      </Modal>
    </div>
  )
}

export default NFTMint
