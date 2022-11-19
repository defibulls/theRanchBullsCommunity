import React from 'react'
import { motion } from 'framer-motion'
import { useState, useEffect, useContext } from 'react'
import { ContractContext } from '../../context/ContractContext'
import { useMoralis } from 'react-moralis'
import { contractAddress } from '../../lib/constants'
import toast from 'react-hot-toast'

type Props = {
  minted: number
  maxbulls: number
  maxMintPerWallet: number
  rafflePlayers: number
  mintedByWallet: number
  setMinted: any
  setLoading: any
}

const MintSection = ({
  minted,
  mintedByWallet,
  maxbulls,
  rafflePlayers,
  maxMintPerWallet,
  setMinted,
  setLoading,
}: Props) => {
  const [count, setCount] = useState<number>(1)
  const { user, Moralis } = useMoralis()
  const [enterRaffle, setEnterRaffle] = useState<boolean>(false)
  const { contract, tokenContract } = useContext(ContractContext)
  const [price, setPrice] = useState<any>(0)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [totalPrice, setTotalPrice] = useState<number>(0)

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

    if (minted == maxbulls) return toast.error('All bulls have been minted!')

    const account = user?.get('ethAddress')
    const _usdcBalance = await tokenContract.methods.balanceOf(account).call()

    if (_usdcBalance < totalPrice) {
      return toast.error(`You don't have enough USDC.e`)
    }

    setLoading(true)

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
            setLoading(false)
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
        toast.success(`You've sucessfully minted ${minted} Bull!`)
        setLoading(false)
      })
      .catch((err: any) => {
        toast.error('Something went wrong! Please Try Again Later')
        setLoading(false)
      })
  }

  const disable = () => {
    if (Number(mintedByWallet) > Number(maxMintPerWallet)) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }

  useEffect(() => {
    if (contract) {
      disable()
    }
  }, [mintedByWallet, contract, maxMintPerWallet])

  const fetchData = async () => {
    const mintedNFTs = await contract.methods.totalSupply().call()
    setMinted(mintedNFTs)
  }

  useEffect(() => {
    if (contract) {
      fetchData()
    }
  }, [contract, mint])

  const decrement = (e: any) => {
    e.preventDefault()
    if (count == 1) return
    setCount(count - 1)
  }

  const fetchPrice = async () => {
    if (minted < 999) {
      setPrice(await contract.methods.mintingCost().call())
    } else if (minted <= 1999 && minted > 999) {
      setPrice(await contract.methods.mintingPrices(9).call())
    } else if (minted <= 2999 && minted > 1999) {
      setPrice(await contract.methods.mintingPrices(19).call())
    } else if (minted <= 3999 && minted > 2999) {
      setPrice(await contract.methods.mintingPrices(29).call())
    } else if (minted <= 4999 && minted > 3999) {
      setPrice(await contract.methods.mintingPrices(39).call())
    } else if (minted <= 5999 && minted > 4999) {
      setPrice(await contract.methods.mintingPrices(49).call())
    } else if (minted <= 6999 && minted > 5999) {
      setPrice(await contract.methods.mintingPrices(59).call())
    } else if (minted <= 7999 && minted > 6999) {
      setPrice(await contract.methods.mintingPrices(69).call())
    } else if (minted <= 8999 && minted > 7999) {
      setPrice(await contract.methods.mintingPrices(79).call())
    } else if (minted <= 10000 && minted > 8999) {
      setPrice(await contract.methods.mintingPrices(89).call())
    }
  }

  useEffect(() => {
    if (contract) {
      fetchPrice()
      calculateTotalPrice(count)
    }
  }, [contract, count])

  useEffect(() => {
    if (contract) {
      calculateTotalPrice(count)
    }
  }, [fetchPrice])

  const calculateTotalPrice = (count: number) => {
    const pricet = count * price
    setTotalPrice(pricet)
  }

  const increment = (e: any) => {
    e.preventDefault()
    if (count == 5) return
    setCount(count + 1)
  }

  const checkHandler = () => {
    setEnterRaffle(!enterRaffle)
  }

  return (
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
        MINT LIVE
      </p>

      <p className="text-4xl font-black">
        {minted} / {maxbulls}
      </p>
      <p className="text-5xl font-black">
        EACH <span className="font-marker text-purple-600">BULL</span> COSTS{' '}
        {price}
        <span className="font-marker text-purple-600"> USDC.e</span>
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
        <label htmlFor="toggleB" className="flex cursor-pointer items-center">
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
              transform: `rotate(${270 + (rafflePlayers * 180) / 100}deg)`,
            }}
            src="gauge-needle.svg"
            alt=""
          />
          <div className="absolute right-[-200px] top-6 hidden min-w-fit flex-col items-center justify-center rounded-xl rounded-tl-none bg-gray-700 p-4 text-center text-xs font-medium text-white group-hover:flex">
            <h1>Total number of Raffle Player</h1>
            {rafflePlayers} / 100
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
          <p className="text-2xl font-bold text-cyan-600">{count}</p>
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
        <button
          disabled={disabled}
          onClick={mint}
          className="w-full rounded-md bg-cyan-600 px-4 py-2 uppercase tracking-wider disabled:cursor-not-allowed disabled:bg-gray-600"
        >
          Mint
        </button>
        <p>
          TOTAL PRICE: <b>{totalPrice} USDC.e</b>
        </p>
      </div>
    </motion.div>
  )
}

export default MintSection
