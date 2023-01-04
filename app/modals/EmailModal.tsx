import { XCircleIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { useState, useContext, useEffect } from 'react'
import { ContractContext } from '../../context/ContractContext'

function Modaluser() {
  const [emailAddress, setEmailAddress] = useState('')
  const { setEmailModal } = useContext(ContractContext)
  const [currentEmail, setCurrentEmail] = useState('')
  const [updating, setUpdating] = useState(false)
  const { data } = useSession()
  //@ts-ignore
  const account = data?.user?.address

  const style = {
    wrapper: `h-[20rem] z-50 w-[35rem] relative space-y-5 text-white bg-[#000] rounded-3xl p-10 flex flex-col items-center justify-center`,
    title: `font-semibold text-xl mb-6`,
  }

  return (
    <div className={style.wrapper}>
      {currentEmail == '' ? (
        <div className="text-xl font-semibold uppercase tracking-widest text-gray-400">
          Update Email
        </div>
      ) : (
        <div className="text-xl font-semibold uppercase tracking-widest text-gray-400">
          Email Address
        </div>
      )}

      <input
        disabled={currentEmail != ''}
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        type="text"
        placeholder={currentEmail}
        className="font-pacifo w-2/3 rounded-lg border-none bg-gray-400 p-2 text-center text-white placeholder-slate-600 outline-none focus:ring-0"
      />
      {currentEmail == '' && (
        <button
          disabled={!emailAddress}
          className="inline-flex w-1/2 justify-center rounded-md bg-cyan-500 px-4 py-2 text-base font-medium uppercase tracking-wide text-white shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-600 sm:text-sm"
        >
          {updating ? 'Updating...' : 'Update'}
        </button>
      )}

      <div
        onClick={() => setEmailModal(false)}
        className="absolute right-8 top-5 cursor-pointer"
      >
        <XCircleIcon className="h-5 text-red-500" />
      </div>
    </div>
  )
}

export default Modaluser
