import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { contractAddress } from '../../lib/contants'
import Card from './Card'

interface NFTprops {
  name: string
  description: string
  compiler: string
  date: number
  attributes: any
  image: string
  dna: string
  edition: number
}

const Profile = () => {
  const [nfts, setNfts] = useState<any>([])
  const { isAuthenticated, user, Moralis } = useMoralis()

  useEffect(() => {
    if (!isAuthenticated) return
    getNFTs()
  }, [isAuthenticated, user])

  const getNFTs = async () => {
    await Moralis.Web3API.account
      .getNFTs({
        chain: 'mumbai',
        address: user?.get('ethAddress'),
        token_addresses: [contractAddress],
      })
      .then(async (res: any) => {
        const data = res.result
        let nft: any[] = []
        for (let i = 0; i < data.length; i++) {
          await fetch(data[i].token_uri).then((res: any) =>
            res.json().then((data: any) => nft.push(data))
          )
        }
        setNfts(nft)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  console.log(nfts)
  return (
    <div className="flex min-h-[100vh] flex-col py-[22.5%] px-[7%] md:py-[10.5%]">
      <div className="flex w-full flex-col items-center border-b pb-6 sm:flex-row">
        <img
          src={`https://avatars.dicebear.com/api/pixel-art/${user?.get(
            'username'
          )}.svg`}
          alt=""
          className="h-52 w-52 rounded-full border-4 border-teal-500 object-contain"
        />

        <div className="ml-10 mt-6 flex flex-col space-y-6 sm:mt-2">
          <li className="flex items-start">
            <div className="flex items-center gap-[0.5rem]">
              <div className="rounded-xl bg-teal-500 p-[0.5rem]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
              <p className="chakra-text css-kaq1dv">
                {user?.get('ethAddress')}
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex items-center gap-[0.5rem]">
              <div className="rounded-xl bg-teal-500 p-[0.5rem]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <p className="">{nfts?.length}</p>
            </div>
          </li>
        </div>
      </div>
      <div className="mt-5  grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {nfts?.map((nft: NFTprops, index: number) => (
          <Card name={nft.name} image={nft.image} id={index} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Profile
