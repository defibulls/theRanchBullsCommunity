import { motion } from 'framer-motion'
import { useState } from 'react'

type Props = {
  minted: number
  maxbulls: number
  price: number
  rafflePlayers: number
  totalPrice: number
}

const PublicSale = ({
  minted,
  maxbulls,
  price,
  rafflePlayers,
  totalPrice,
}: Props) => {
  const [count, setCount] = useState<number>(1)
  const [enterRaffle, setEnterRaffle] = useState<boolean>(false)

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
      className="flex w-full flex-col justify-center lg:w-[50%]"
    >
      <p className="mb-1 text-4xl font-black text-cyan-600 underline underline-offset-2">
        PUBLIC SALE NOT LIVE
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
      <div className={`pb-4 text-lg font-normal text-cyan-600`}>
        <p className="font-marker uppercase tracking-widest">
          Max. 5 bulls per transaction
        </p>
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
          disabled={true}
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

export default PublicSale
