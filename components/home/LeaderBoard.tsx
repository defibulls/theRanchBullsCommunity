import { useEffect, useState } from 'react'
import { useMoralisQuery } from 'react-moralis'
import { client } from '../../lib/sanity'

const LeaderBoard = () => {
  const [winner, setWinner] = useState<any>([])
  const [winnerAddress, setWinnerAddress] = useState([])
  const [winningPrice, setWinningPrice] = useState<number>(0)
  const { data } = useMoralisQuery(
    'GiveawayWinner',
    (query) => query.descending('createdAt'),
    [],
    {
      live: true,
    }
  )

  const getData = async () => {
    const indexOfNfts = await data?.[0]?.attributes.indexOfNfts_all.slice(0, 5)
    setWinner(indexOfNfts)
    const _winnersAddress =
      await data?.[0]?.attributes.nftOwnerAddresses_all.slice(0, 5)
    setWinnerAddress(_winnersAddress)
    const _winningAmountDec = await data?.[0]?.attributes.winning_amount_all
    const _winningAmount = Number(_winningAmountDec) / Number(1000000)
    setWinningPrice(_winningAmount)
    const airdropCount = await data?.[0]?.attributes.AirDropCount

    winnerAddress?.map(async (address) => {
      const leaderboardDoc = {
        _type: 'leaderboard',
        _id: address,
        address: address,
        timestamp: new Date(Date.now()).toISOString(),
        totalReward: _winningAmount,
      }

      await client.createIfNotExists(leaderboardDoc)
    })
  }

  useEffect(() => {
    getData()
  }, [data])

  return (
    <div
      id="giveaway"
      className="flex min-h-[100vh] snap-start flex-col items-center justify-around gap-4 bg-indigo-600 px-[10%] py-[15%] md:p-[10%]"
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="relative flex w-full flex-row items-end justify-center md:justify-start">
          <p className="text-4xl font-black">
            GIVEAWAY
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
            WEEKLY WINNERS ({winner?.length} WINNERS)
          </p>
          {winnerAddress ? (
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
          ) : (
            <div className="text-lg font-bold">COMING SOON</div>
          )}
        </div>

        <div className="mt-10 flex w-full flex-col items-center lg:mt-0">
          <p className="mb-4 text-2xl font-bold underline underline-offset-1 ">
            TOP BULLS
          </p>
          {winner ? (
            <div className="grid w-full grid-cols-3 items-center gap-2">
              <p> </p>
              <p className="text-xs font-black">Winner</p>
              <p className="text-xs font-black">Amount</p>
              {winner?.map((winner: any, index: number) => (
                <>
                  <p className="font-black">{index + 1}. </p>
                  <p className="font-light">NodeBullEyes#{winner}</p>
                  <p className="font-light">{winningPrice} USDC</p>
                </>
              ))}
            </div>
          ) : (
            <div className="text-lg font-bold">COMING SOON</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard
