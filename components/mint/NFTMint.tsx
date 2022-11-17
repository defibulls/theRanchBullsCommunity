import { useContext, useEffect, useState } from 'react'
import { useChain, useMoralis } from 'react-moralis'
import Header from '../Header'
import {
  contractAddress,
  CurrencyContract,
  customStyles,
} from '../../lib/constants'
import ChainNotSupported from './ChainNotSupported'
import Modal from 'react-modal'
import Loader from '../modals/Loader'
import { ContractContext } from '../../context/ContractContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

Modal.setAppElement('#__next')

const NFTMint = () => {
  const { user, Moralis } = useMoralis()
  const { contract, tokenContract } = useContext(ContractContext)
  const { chainId } = useChain()
  const [count, setCount] = useState<number>(1)
  const [loading, setloading] = useState<boolean>(false)
  const [minted, setMinted] = useState<number>(0)
  const [price, setPrice] = useState<any>(0)
  const [mintedByWallet, setMintedByWallet] = useState<number>(0)
  const [maxMintPerWallet, setMaxMintPerWallet] = useState<number>(0)
  const [paused, setPaused] = useState<boolean>(false)
  const [publicSale, setPublicSale] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [totalPrice, setTotalPrice] = useState<number>()
  const [maxBulls, setMaxBulls] = useState<number>(0)
  const [enterRaffle, setEnterRaffle] = useState<boolean>(false)
  const [rafflePlayers, setRafflePlayers] = useState<number>(0)
  const [raffleLive, setRaffleLive] = useState<boolean>(false)

  const getGasPrice = async () => {
    const web3Provider = await Moralis.enableWeb3() // Get ethers.js web3Provider
    const gasPrice = await web3Provider.getGasPrice()

    return gasPrice
  }

  const mint = async () => {
    if (count === 0) return toast.error('Please enter a valid amount')
    if (count > 5)
      return toast.error('You can only mint up to 5 NFTs at a time')
    const totalQuantity = Number(count) + Number(mintedByWallet)
    if (totalQuantity > maxMintPerWallet)
      return toast.error(
        `You can only mint up to ${maxMintPerWallet} NFTs per Wallet Address`
      )

    const account = user?.get('ethAddress')
    const _usdcBalance = await Moralis.Web3API.account.getTokenBalances({
      chain: 'mumbai',
      token_addresses: [CurrencyContract],
      address: user?.get('ethaddress'),
    })

    //@ts-ignore
    if (_usdcBalance[0].balance / 1000000 < totalPrice) {
      return toast.error(`You don't have enough USDC.e`)
    }
    setloading(true)

    const gasPrice = await getGasPrice()

    await tokenContract.methods
      .approve(contractAddress, String(totalPrice + '000000'))
      .send(
        {
          from: account,
        },
        (err: any) => {
          if (err) {
            toast.error(err.message.toLocaleString())
            setloading(false)
          }
        }
      )
      .then(async () => {
        await contract.methods.mint(count, enterRaffle).send({
          from: account,
          gasPrice: gasPrice,
        })
      })
      .then(() => {
        const minted = count
        toast.success(`BTC Bulls minted: ${minted}`)
        setloading(false)
      })
      .catch((err: any) => {
        toast.error('Something went wrong! Please Try Again Later')
        setloading(false)
      })
  }

  const fetchPrice = async () => {
    setPrice(await contract.methods.mintingCost().call())
  }

  const fetchData = async () => {
    const mintedNFTs = await contract.methods.totalSupply().call()
    setMinted(mintedNFTs)
    const account = user?.get('ethAddress')
    const _mintedByWallet = await contract.methods
      .addressMintCount(account)
      .call()
    setMintedByWallet(_mintedByWallet)
    const _maxMintByWallet = await contract.methods.nftPerAddressLimit().call()
    setMaxMintPerWallet(_maxMintByWallet)
    const _mintLive = await contract.methods.paused().call()
    setPaused(_mintLive)
    const _publicLiveSale = await contract.methods.publicSaleLive().call()
    setPublicSale(_publicLiveSale)
    const _totalBulls = await contract.methods.maxSupply().call()
    setMaxBulls(_totalBulls)
    const _rafflePlayers = await contract.methods
      .getNumberOfRafflePlayers()
      .call()
    setRafflePlayers(_rafflePlayers)
    const _raffleLive = await contract.methods.raffleLive().call()
    setRaffleLive(_raffleLive)
  }

  const disable = () => {
    if (
      Number(mintedByWallet) > Number(maxMintPerWallet) ||
      raffleLive == true
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }

  useEffect(() => {
    if (contract) {
      fetchData()
    }
  }, [contract, mint])

  useEffect(() => {
    if (contract) {
      fetchPrice()
      calculateTotalPrice(count)
    }
  }, [contract, count, fetchPrice])

  useEffect(() => {
    if (contract) {
      calculateTotalPrice(count)
    }
  }, [fetchPrice])

  useEffect(() => {
    setCount(1)
  }, [])

  const calculateTotalPrice = (count: number) => {
    const pricet = count * price
    setTotalPrice(pricet)
  }

  const decrement = (e: any) => {
    e.preventDefault()
    if (count == 1) return
    setCount(count - 1)
  }

  const increment = (e: any) => {
    e.preventDefault()
    if (count == 5) return
    setCount(count + 1)
  }

  const checkHandler = () => {
    setEnterRaffle(!enterRaffle)
  }

  useEffect(() => {
    if (contract) {
      disable()
    }
  }, [mintedByWallet, contract, maxMintPerWallet])

  return (
    <div className="h-full overflow-y-scroll lg:overflow-hidden">
      <Header notLanding={true} />
      <main className="flex flex-col justify-center ">
        <div className="flex min-h-[100vh] w-full flex-col gap-8 p-[10%] text-white md:flex-row md:py-4 md:px-[5%]">
          <div className="flex h-screen w-full flex-col justify-center overflow-hidden">
            {chainId !== '0x13881' ? (
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
                  className="flex h-full w-full items-center justify-center lg:h-[60%] lg:w-[60%] "
                >
                  <iframe
                    src="/polygonanimation/demo/data.html"
                    height="60%"
                    width="100%"
                  >
                    LOGO
                  </iframe>
                </motion.div>

                {paused ? (
                  <div>
                    <p className="mb-1 font-marker text-4xl font-black text-cyan-600 underline underline-offset-2">
                      CONTRACT PAUSED
                    </p>
                    <p className="mt-4 text-xl font-bold ">
                      Contract Paused. Please Check Discord.
                      <br />
                      <br />
                    </p>
                    <a
                      href="https://discord.gg/URMH4bSAht"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className=" font-sansw-full rounded-md bg-cyan-600 px-4 py-2 font-bold ">
                        CLICK HERE TO JOIN DISCORD
                      </button>
                    </a>
                  </div>
                ) : (
                  <motion.div
                    initial={{
                      x: 200,
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
                    className="flex w-full flex-col justify-center lg:w-[60%]"
                  >
                    <p className="mb-1 text-4xl font-black text-cyan-600 underline underline-offset-2">
                      {publicSale ? 'MINT LIVE' : 'PUBLIC SALE NOT LIVE'}
                    </p>

                    <p className="text-4xl font-black">
                      {minted} / {maxBulls}
                    </p>
                    <p className="text-5xl font-black">
                      EACH{' '}
                      <span className="font-marker text-purple-600">BULL</span>{' '}
                      COSTS {price}
                      <span className="font-marker text-purple-600">
                        {' '}
                        USDC.e
                      </span>
                      <br />
                      <br />
                    </p>
                    <div
                      className={`pb-4 text-lg font-normal text-cyan-600 ${
                        disabled && 'text-red-500'
                      }`}
                    >
                      {disabled ? (
                        `You can only mint upto ${maxMintPerWallet} NFTs per Wallet Address!`
                      ) : (
                        <p className="font-marker uppercase tracking-widest">
                          Max. 5 bulls per transaction
                        </p>
                      )}
                      <br />
                    </div>
                    <div className="mb-8 flex h-full w-full items-center">
                      <label
                        htmlFor="toggleB"
                        className="flex cursor-pointer items-center"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="toggleB"
                            className="sr-only"
                            checked={enterRaffle}
                            onChange={checkHandler}
                          />
                          <div
                            style={{}}
                            className="block h-8 w-14 rounded-full bg-gray-600"
                          ></div>
                          <div className="dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition"></div>
                        </div>
                        <div className="ml-3 text-lg font-bold tracking-widest text-gray-600">
                          MINTING RAFFLE
                        </div>
                      </label>
                      <div className="group relative m-auto ml-2 flex h-12 w-12 cursor-pointer">
                        <svg className="h-full w-full rotate-180">
                          <circle
                            className=""
                            stroke="rgb(147, 51, 234)"
                            strokeWidth="4"
                            strokeDasharray="62, 943"
                            r="20"
                            cx="50%"
                            cy="50%"
                            fill="none"
                          ></circle>
                          <circle
                            id="avg"
                            r="20"
                            cx="50%"
                            cy="50%"
                            stroke="#7CCCE5"
                            strokeWidth="4"
                            strokeDasharray="41, 943"
                            fill="none"
                          ></circle>
                          <circle
                            id="high"
                            r="20"
                            cx="50%"
                            cy="50%"
                            stroke="#E04644"
                            strokeWidth="4"
                            strokeDasharray="20, 943"
                            fill="none"
                          ></circle>
                        </svg>
                        <img
                          className="transform-origin absolute left-0 right-0 top-[10%] m-auto h-[40%]"
                          style={{
                            transform: `rotate(${
                              270 + (rafflePlayers * 180) / 5
                            }deg)`,
                          }}
                          src="gauge-needle.svg"
                          alt=""
                        />
                        <div className="absolute right-[-200px] top-6 hidden min-w-fit flex-col items-center justify-center rounded-xl rounded-tl-none bg-gray-700 p-4 text-center text-xs font-medium text-white group-hover:flex">
                          <h1>Total number of Raffle Entries</h1>
                          {rafflePlayers}/5
                        </div>
                      </div>
                    </div>

                    <div className="flex w-fit flex-col items-center gap-4">
                      <div className="flex items-center gap-4">
                        <button
                          disabled={disabled}
                          className="rounded-lg border p-2 "
                          onClick={(e) => decrement(e)}
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
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
                        <p className="text-2xl font-bold text-cyan-600">
                          {count}
                        </p>
                        <p className="font-marker text-2xl font-bold">BULLS</p>
                        <button
                          disabled={disabled}
                          onClick={(e) => increment(e)}
                          className="rounded-lg border p-2"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
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
                      {publicSale && (
                        <>
                          <button
                            disabled={disabled}
                            onClick={mint}
                            className="w-full rounded-md bg-cyan-600 px-4 py-2 uppercase tracking-wider disabled:cursor-not-allowed disabled:bg-gray-600"
                          >
                            {raffleLive ? 'Raffle is Live' : 'Mint'}
                          </button>
                          <p>
                            TOTAL PRICE: <b>{totalPrice} USDC.e</b>
                          </p>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
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
