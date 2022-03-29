import { useContext, useEffect, useState } from 'react'
import { useMoralisQuery } from 'react-moralis'
import { ContractContext } from '../context/ContractContext'

const Giveaway = () => {
  const [winner, setWinner] = useState<any>([])
  const [winnerAddress, setWinnerAddress] = useState<any>([])
  const [winningPrice, setWinningPrice] = useState<number>(0)
  const { data } = useMoralisQuery(
    'GiveawayWinner',
    (query) => query.ascending('createdAt'),
    [],
    {
      live: true,
    }
  )
  const getData = async () => {
    const indexOfNfts = data?.[0]?.attributes.indexOfNfts.slice(0, 5)
    setWinner(indexOfNfts)
    const _winnersAddress = data?.[0]?.attributes.nftOwnerAddresses.slice(0, 5)
    setWinnerAddress(_winnersAddress)
    const _winningAmount = data?.[0]?.attributes.winning_amount
    setWinningPrice(_winningAmount)
  }

  useEffect(() => {
    getData()
  }, [data])

  return (
    <div
      id="giveaway"
      className="flex min-h-[100vh] flex-col items-center justify-around gap-4 bg-indigo-600 px-[10%] py-[15%] md:p-[10%]"
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="relative flex w-full flex-row items-end justify-center md:justify-start">
          <p className="text-4xl font-black">
            LEADERBOARD
            <hr aria-orientation="horizontal" className="my-5" />
          </p>

          <img
            src="images\transparentBg\81bgt.png"
            alt=""
            loading="lazy"
            className="absolute left-[650px] top-[-122px] hidden w-[200px] object-contain lg:block"
          />
        </div>
      </div>
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
        <div className="flex w-full flex-col items-center">
          <p className="mb-4 text-2xl font-bold underline underline-offset-1">
            TOP WALLETS
          </p>
          <div className="grid w-full grid-cols-3 items-center gap-2">
            <p> </p>
            <p className="text-xs font-black">Winner</p>
            <p className="text-xs font-black">Amount</p>
            {winnerAddress?.map((address: any, index: number) => (
              <>
                <p className="font-black">{index + 1}. </p>
                <p className="font-light">
                  {address.slice(0, 5)}...{address.slice(-4)}
                </p>
                <p className="font-light">{winningPrice} USDC</p>
              </>
            ))}
          </div>
        </div>
        <div className="mt-10 flex w-full flex-col items-center lg:mt-0">
          <p className="mb-4 text-2xl font-bold underline underline-offset-1 ">
            TOP BULLS
          </p>
          <div className="grid w-full grid-cols-3 items-center gap-2">
            <p> </p>
            <p className="text-xs font-black">Name</p>
            <p className="text-xs font-black">Amount</p>
            {winner?.map((winner: any, index: number) => (
              <>
                <p className="font-black">{index + 1}. </p>
                <p className="font-light">NodeBullEyes#{winner}</p>
                <p className="font-light">{winningPrice} USDC</p>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Giveaway
