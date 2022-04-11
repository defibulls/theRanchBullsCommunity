import { useContext, useEffect, useState } from 'react'
import { useChain, useMoralis } from 'react-moralis'
import Header from '../Header'
import { contractAddress, customStyles } from '../../lib/constants'
import ChainNotSupported from './ChainNotSupported'
import Modal from 'react-modal'
import Loader from '../modals/Loader'
import { ContractContext } from '../../context/ContractContext'
import toast from 'react-hot-toast'

Modal.setAppElement('#__next')

const NFTMint = () => {
  const { user } = useMoralis()
  const { contract } = useContext(ContractContext)
  const { chainId } = useChain()
  const [count, setCount] = useState<number>(1)
  const [loading, setloading] = useState<boolean>(false)
  const [minted, setMinted] = useState<number>(0)
  const [price, setPrice] = useState<any>(0)
  const [mintedByWallet, setMintedByWallet] = useState<number>(0)
  const [maxMintPerWallet, setMaxMintPerWallet] = useState<number>(100)
  const [paused, setPaused] = useState<boolean>(false)
  const [publicSale, setPublicSale] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [superBull, setsuperBull] = useState<boolean>(false)
  const [superMaxMint, setSuperMaxMint] = useState<number>(10)
  const [superBullMintedByWallet, setSuperBullMintedByWallet] =
    useState<number>(0)
  const [superBullMinted, setSuperBullMinted] = useState<number>(0)
  const [superBullPrice, setSuperBullPrice] = useState<number>(220)
  const [totalPrice, setTotalPrice] = useState<number>()
  const [mintPrice, setMintPrice] = useState()
  const [commonBullMax, setCommonBullMax] = useState<number>(4999)
  const [superBullMax, setSuperBullMax] = useState<number>(1000)

  const mint = async () => {
    if (count === 0) return toast.error('Please enter a valid amount')
    if (count > 11)
      return toast.error('You can only mint up to 11 NFTs at a time')

    const totalQuantity = Number(count) + Number(mintedByWallet)

    if (totalQuantity > maxMintPerWallet)
      return toast.error(
        `You can only mint up to ${maxMintPerWallet} NFTs per Wallet Address`
      )

    setloading(true)

    setMintPrice(await contract.methods.getMintPrice(totalPrice).call())

    if (superBull) {
      await contract.methods.superBullsMint(count).send(
        {
          from: user?.get('ethAddress'),
          value: mintPrice,
        },
        (err: any) => {
          if (err) {
            toast.error(err.message.toLocaleString())
            setloading(false)
          }
        }
      )
    } else {
      await contract.methods.commonBullsMint(count).send(
        {
          from: user?.get('ethAddress'),
          value: mintPrice,
        },
        (err: any) => {
          if (err) {
            toast.error(err.message.toLocaleString())
            setloading(false)
          }
        }
      )
    }

    if (superBull) {
      toast.success(`You've sucessfully minted ${count} Super Bull!`)
    } else {
      toast.success(`You've sucessfully minted ${count} Bull!`)
    }

    setloading(false)
  }

  const fetchPrice = async (count: number) => {
    setPrice(await contract.methods.mintingCost(count).call())
  }

  const fetchData = async () => {
    const mintedNFTs = await contract.methods.tokenCountCommonBulls().call()
    setMinted(mintedNFTs)
    const _mintedByWallet = await contract.methods
      .addressPurchasesCommonBulls(user?.get('ethAddress'))
      .call()
    setMintedByWallet(_mintedByWallet)

    const _maxMintByWallet = await contract.methods
      .COMMON_BULLS_MAX_MINTS_TOTAL_PER_WALLET()
      .call()
    setMaxMintPerWallet(_maxMintByWallet)
    const _mintLive = await contract.methods.paused().call()
    setPaused(_mintLive)

    const _publicLiveSale = await contract.methods.publicSaleLive().call()
    setPublicSale(_publicLiveSale)

    const _superMaxMint = await contract.methods
      .SUPER_BULL_MAX_MINTS_TOTAL_PER_WALLET()
      .call()
    setSuperMaxMint(_superMaxMint)
    const _superBullMintedByWallet = await contract.methods
      .addressPurchasesSuperBulls(user?.get('ethAddress'))
      .call()
    setSuperBullMintedByWallet(_superBullMintedByWallet)

    const _superBullPrice = await contract.methods.SUPER_BULL_COST().call()
    setSuperBullPrice(_superBullPrice)

    const _commmonBullsMax = await contract.methods.COMMON_BULLS_MAX().call()
    setCommonBullMax(_commmonBullsMax)

    const _superBullMax = await contract.methods.SUPER_BULL_MAX().call()
    setSuperBullMax(_superBullMax - 4999)

    const _superBullMinted = await contract.methods
      .tokenCountSuperBulls()
      .call()
    setSuperBullMinted(_superBullMinted - 5000)
  }

  console.log(contract)

  const disable = (a: number, b: number) => {
    if (a == b) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }

  const checkHandler = () => {
    setsuperBull(!superBull)
  }

  useEffect(() => {
    if (contract) {
      fetchData()
    }
  }, [contract, mint])

  useEffect(() => {
    if (contract) {
      fetchPrice(count)
      calculateTotalPrice(count)
    }
  }, [contract, count, superBull, fetchPrice])

  useEffect(() => {
    if (contract) {
      calculateTotalPrice(count)
    }
  }, [superBull, fetchPrice])

  useEffect(() => {
    setCount(1)
  }, [superBull])

  const calculateTotalPrice = (count: number) => {
    const commonBullPricet = count * price

    const superBullPricet = count * superBullPrice
    if (superBull) {
      setTotalPrice(superBullPricet)
    } else {
      setTotalPrice(commonBullPricet)
    }
  }

  const decrement = (e: any) => {
    e.preventDefault()
    if (count == 1) return
    if (superBull) {
      setCount(count - 1)
    } else {
      if (count == 2) {
        setCount(count - 1)
      } else if (count == 3) {
        setCount(count - 1)
      } else if (count == 5) {
        setCount(count - 2)
      } else if (count == 7) {
        setCount(count - 2)
      } else if (count == 11) {
        setCount(count - 4)
      }
    }
  }

  const increment = (e: any) => {
    e.preventDefault()
    if (count == 11) return
    if (superBull) {
      if (count == 5) return
      setCount(count + 1)
    } else {
      if (count == 1) {
        setCount(count + 1)
      } else if (count == 2) {
        setCount(count + 1)
      } else if (count == 3) {
        setCount(count + 2)
      } else if (count == 5) {
        setCount(count + 2)
      } else if (count == 7) {
        setCount(count + 4)
      }
    }
  }

  useEffect(() => {
    if (contract) {
      if (superBull) {
        disable(superMaxMint, superBullMintedByWallet)
      } else {
        disable(maxMintPerWallet, mintedByWallet)
      }
    }
  }, [contract, mintedByWallet, maxMintPerWallet])

  return (
    <div className="h-full overflow-y-scroll lg:overflow-hidden">
      <Header />
      <main className="flex flex-col justify-center ">
        <div className="flex min-h-[100vh] w-full flex-col gap-8 p-[10%] text-white md:flex-row md:py-4 md:px-[5%]">
          <div className="flex h-screen w-full flex-col justify-center overflow-hidden">
            {chainId !== '0x13881' ? (
              <ChainNotSupported />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center lg:flex-row">
                <div className="flex h-full w-full lg:h-[60%] lg:w-[60%] ">
                  <iframe src="/08/demo/data.html" height="100%" width="100%">
                    LOGO
                  </iframe>
                </div>

                {paused ? (
                  <div>
                    <p className="mb-1 text-4xl font-black text-cyan-600 underline underline-offset-2">
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
                  <div className="flex w-full flex-col justify-center lg:w-[60%]">
                    <p className="mb-1 text-4xl font-black text-cyan-600 underline underline-offset-2">
                      {publicSale ? 'MINT LIVE' : 'PUBLIC SALE NOT LIVE'}
                    </p>

                    <p className="text-4xl font-black">
                      {superBull
                        ? `${superBullMinted} / ${superBullMax}`
                        : `${minted} / ${commonBullMax}`}
                    </p>
                    <p className="text-5xl font-black">
                      EACH{' '}
                      <span className="text-purple-600">
                        {!superBull ? 'BULL' : 'SUPER BULL'}
                      </span>{' '}
                      COSTS {!superBull ? price : superBullPrice}
                      <span className="text-purple-600"> USD</span>
                      <br />
                      <br />
                    </p>
                    <p
                      className={`text-lg font-normal text-cyan-600 ${
                        disabled && 'text-red-500'
                      }`}
                    >
                      {disabled ? (
                        `You can only mint upto ${maxMintPerWallet} NFTs per Wallet Address!`
                      ) : (
                        <p>
                          {!superBull ? (
                            <>
                              BUY A SINGLE BULL OR GET A PRIME NUMBER BUNDLE{' '}
                              <br />
                              DISCOUNT WITH 2, 3, 5, 7 OR 11 BULLS.
                            </>
                          ) : (
                            <>
                              MAX {superMaxMint} SUPER BULLS CAN BE MINTED PER
                              WALLET ADDRESS! <br /> (5 SUPER BULLS PER
                              TRANSACTION)
                            </>
                          )}
                        </p>
                      )}
                      <br />
                    </p>
                    <div className="mb-8 flex w-full items-center">
                      <label
                        htmlFor="toggleB"
                        className="flex cursor-pointer items-center"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="toggleB"
                            className="sr-only"
                            checked={superBull}
                            onChange={checkHandler}
                          />
                          <div className="block h-8 w-14 rounded-full bg-gray-600"></div>
                          <div className="dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition"></div>
                        </div>
                        <div className="ml-3 text-lg font-medium text-gray-700">
                          SUPER BULL
                        </div>
                      </label>
                    </div>
                    <div className="flex w-fit flex-col items-center gap-4">
                      <div className="flex items-center gap-4">
                        <button
                          disabled={disabled}
                          className="rounded-lg border p-3 "
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
                        <p className="text-2xl font-bold">BULLS</p>
                        <button
                          disabled={disabled}
                          onClick={(e) => increment(e)}
                          className="rounded-lg border p-3"
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
                            className="w-full rounded-md bg-cyan-600 px-4 py-2 disabled:cursor-not-allowed disabled:bg-gray-600"
                          >
                            MINT
                          </button>
                          <p>
                            TOTAL PRICE: <b>{totalPrice} USD</b>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
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
