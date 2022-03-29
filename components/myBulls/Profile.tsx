import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { contractAddress, customStyles } from '../../lib/constants'
import Card from './Card'
import Modal from 'react-modal'
import ProfileLoader from '../modals/ProfileLoader'

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
  const [nfts, setNfts] = useState<any>()
  const { isAuthenticated, user, Moralis } = useMoralis()
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) return
    getNFTs()
  }, [isAuthenticated])

  const getNFTs = async () => {
    console.log(contractAddress)
    setLoading(true)
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
          await fetch(data[i].token_uri).then((res: any) => {
            res.json().then((res: any) => {
              nft.push(res)
            })
          })
        }
        // await data.map(async (data: any) => {
        //   await fetch(data.token_uri).then((res: any) => {
        //     res.json().then((res: any) => {
        //       nft.push(res)
        //     })
        //   })
        // })
        setNfts(nft)
        setLoading(false)
      })
  }

  const image = nfts?.[nfts.length - 1]?.image

  const httpsimg = image?.replace('ipfs://', 'https://dweb.link/ipfs/')

  return (
    <div className="flex min-h-[100vh] flex-col py-[22.5%] px-[7%] md:py-[10.5%]">
      <div className="flex w-full flex-col items-center border-b pb-6 sm:flex-row">
        <img
          src={httpsimg}
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
      {nfts?.length == 0 ? (
        <div className="mt-5 flex h-full w-full flex-col items-center">
          <h1 className="mb-4 text-lg">
            You haven't minted any NFT! Click on the button to mint some NFTs
          </h1>

          <button
            className="rounded-xl bg-purple-600 p-4 font-bold"
            onClick={() => router.push('/mint')}
          >
            Click Here
          </button>
        </div>
      ) : (
        <>
          <h1 className="my-8 text-4xl font-black">MY BULLS</h1>
          <div className="mt-5 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {nfts?.map((nft: NFTprops, index: number) => (
              <Card name={nft.name} image={nft.image} id={index} key={index} />
            ))}
          </div>
        </>
      )}
      <Modal isOpen={loading} style={customStyles}>
        <ProfileLoader />
      </Modal>
    </div>
  )
}

export default Profile
