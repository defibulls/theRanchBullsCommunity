import { XCircleIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import React, { useState, useContext } from 'react'
import toast from 'react-hot-toast'
import { ContractContext } from '../../context/ContractContext'

type Props = {
  nftOwned: number
}

const style = {
  wrapper: `h-[20rem] z-50 w-[35rem] text-white bg-[#15202b] rounded-3xl p-10 flex flex-col items-center justify-center`,
  title: `font-semibold text-xl mb-6`,
}

const AddUSDC = ({ nftOwned }: Props) => {
  const [addUsdc, setAddUsdc] = useState(100)
  const { contract, setAddUsdcOpen, tokenContract, contractAddress } =
    useContext(ContractContext)
  const [updating, setUpdating] = useState(false)
  const { data } = useSession()
  //@ts-ignore
  const account = data?.user.address

  const addUsdcToWallet = async () => {
    if (addUsdc == 0) return toast.error('Enter amount of USDC.e to be added')
    if (nftOwned == 0) return toast.error("You don't own a NFT!")
    setUpdating(true)
    const approvedAmount = await tokenContract.methods
      .allowance(account, contractAddress)
      .call()
    if (approvedAmount / 1000000 < addUsdc) {
      await tokenContract.methods
        .approve(contractAddress, String(addUsdc + '000000'))
        .send({
          from: account,
        })
    }

    await contract.methods
      .depositIntoHostingReserve(String(addUsdc + '000000'))
      .send({ from: account })
    setUpdating(false)
    setAddUsdcOpen(false)
    setAddUsdc(0)
  }

  return (
    <div className={style.wrapper}>
      <div className="text-xl font-semibold uppercase tracking-widest text-gray-400">
        ADD usdc
      </div>

      <div className="mt-10 w-2/3 space-y-4">
        <label htmlFor="price" className="font-bold text-gray-500">
          ${addUsdc}
        </label>
        <input
          value={addUsdc}
          onChange={(e: any) => setAddUsdc(e.target.value)}
          type="range"
          min={0}
          max={1000}
          className="h-2 w-full rounded-xl accent-purple-500"
        />
      </div>

      <button
        disabled={addUsdc == 0}
        onClick={() => addUsdcToWallet()}
        className="mt-10 inline-flex w-1/2 justify-center rounded-md bg-cyan-500 px-4 py-2 text-base font-medium uppercase tracking-wide text-white shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-600 sm:text-sm"
      >
        {updating ? 'Adding...' : 'Add'}
      </button>

      <div
        onClick={() => setAddUsdcOpen(false)}
        className="absolute right-8 top-5 cursor-pointer"
      >
        <XCircleIcon className="h-5 text-red-500" />
      </div>
    </div>
  )
}

export default AddUSDC
