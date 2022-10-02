import { XCircleIcon } from '@heroicons/react/24/solid'
import { useState, useContext } from 'react'
import { useMoralis } from 'react-moralis'
import { ContractContext } from '../../context/ContractContext'

function Modaluser() {
  const [buddyAddress, setBuddyAddress] = useState('')
  const { contract, setOpen } = useContext(ContractContext)
  const [updating, setUpdating] = useState(false)
  const { user, Moralis } = useMoralis()

  const getGasPrice = async () => {
    const web3Provider = await Moralis.enableWeb3() // Get ethers.js web3Provider
    const gasPrice = await web3Provider.getGasPrice()

    return gasPrice
  }

  const updateBuddyAddress = async () => {
    setUpdating(true)
    await contract.methods
      .setPartnerAddress(buddyAddress)
      .send({ from: user?.get('ethAddress'), gasPrice: await getGasPrice() })
    setBuddyAddress('')
    setOpen(false)
    setUpdating(false)
  }

  const style = {
    wrapper: `h-[20rem] z-50 w-[35rem] relative space-y-5 text-white bg-[#000] rounded-3xl p-10 flex flex-col items-center justify-center`,
    title: `font-semibold text-xl mb-6`,
  }

  return (
    <div className={style.wrapper}>
      <div className="text-xl font-semibold uppercase tracking-widest text-gray-400">
        Update Buddy Address
      </div>
      <input
        value={buddyAddress}
        onChange={(e) => setBuddyAddress(e.target.value)}
        type="text"
        placeholder=""
        className="font-pacifo w-2/3 rounded-lg border-none bg-gray-400 p-2 text-center text-white outline-none focus:ring-0"
      />
      <button
        disabled={!buddyAddress}
        onClick={() => updateBuddyAddress()}
        className="inline-flex w-1/2 justify-center rounded-md bg-cyan-500 px-4 py-2 text-base font-medium uppercase tracking-wide text-white shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-600 sm:text-sm"
      >
        {updating ? 'Updating. . .' : 'Update'}
      </button>
      <div
        onClick={() => setOpen(false)}
        className="absolute right-8 top-5 cursor-pointer"
      >
        <XCircleIcon className="h-5 text-red-500" />
      </div>
    </div>
  )
}

export default Modaluser
