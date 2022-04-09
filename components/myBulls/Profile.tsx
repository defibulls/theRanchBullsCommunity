import { useRouter } from 'next/router'
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { contractAddress, customStyles } from '../../lib/constants'
import Card from './Card'
import Modal from 'react-modal'
import ProfileLoader from '../modals/ProfileLoader'
import 'react-responsive-carousel/lib/styles/carousel.css'
import { Carousel } from 'react-responsive-carousel'
import { ContractContext } from '../../context/ContractContext'

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
  const { airdropContract } = useContext(ContractContext)
  const { isAuthenticated, user, Moralis } = useMoralis()
  const [loading, setLoading] = useState<boolean>(false)
  const [owned, setOwned] = useState<number>(0)
  const [current, setCurrent] = useState<number>(0)
  const [reward, setReward] = useState<number>()
  const [nftOwned, setNftOwned] = useState<number>(0)

  const router = useRouter()
  console.log(airdropContract)

  useEffect(() => {
    if (!isAuthenticated) return
    getNFTs()
  }, [isAuthenticated])

  const getRewardBalance = async () => {
    const _reward = await airdropContract.methods
      .getUserRewardBalance(user?.get('ethAddress'))
      .call()

    if (_reward == 0) {
      setReward(_reward)
    } else {
      const rewardUsdc = _reward / 1000000
      setReward(rewardUsdc)
    }
  }

  const getNFTs = async () => {
    setLoading(true)
    const data = await Moralis.Web3API.account.getNFTs({
      chain: 'mumbai',
      address: user?.get('ethAddress'),
      token_addresses: [contractAddress],
    })

    setNftOwned(data.result?.length!)

    const nftsr: any[] = []

    for (let i = 0; i < data.result?.length!; i++) {
      await fetch(data.result?.[i]?.token_uri!).then((res: any) => {
        res.json().then((data: any) => {
          nftsr.push(data)
        })
      })
    }

    // data.result?.map(async (nft) => {
    //   await fetch(nft.token_uri!).then((data) =>
    //     data.json().then((data: any) => {
    //       nfts.push(data)
    //     })
    //   )
    // })
    setNfts(nftsr)
    setLoading(false)
  }

  const withdrawReward = async (e: any) => {
    e.preventDefault()

    await airdropContract.methods
      .withdrawRewards(user?.get('ethAddress'))
      .send({ from: user?.get('ethAddress') })
  }

  useEffect(() => {
    if (airdropContract && user) {
      getRewardBalance()
    }
  }, [airdropContract, user])

  const image = nfts?.[nfts.length - 1]?.image

  const httpsimg = image?.replace('ipfs://', 'https://dweb.link/ipfs/')

  return (
    <div
      className="lg: flex min-h-[100vh] flex-col justify-center py-[22.5%] px-[7%] md:py-[10.5%] lg:flex-row"
      style={{
        backgroundImage: `url(/images/farm.png)`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex w-full flex-col items-center justify-center rounded-xl border bg-opacity-60 py-5 backdrop-blur-lg backdrop-filter sm:flex-row lg:mr-10 lg:w-2/3">
        <img
          src={
            httpsimg
              ? httpsimg
              : `https://avatars.dicebear.com/api/pixel-art/${user?.get(
                  'ethAddress'
                )}.svg`
          }
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
              <p className="">{nftOwned}</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex w-full items-center justify-between gap-[0.5rem]">
              <div className="flex items-center">
                <div className="mr-2 rounded-xl bg-teal-500 p-[0.5rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <p className="">{reward} USDC</p>
              </div>
              <button
                onClick={(e) => withdrawReward(e)}
                className="rounded-xl bg-teal-500 py-2 px-4"
              >
                CLAIM
              </button>
            </div>
          </li>
        </div>
      </div>
      {nfts?.length == 0 ? (
        <div className="mt-10 flex w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-opacity-60 bg-clip-padding py-5 backdrop-blur-xl backdrop-filter md:w-1/3 lg:mt-0 lg:h-full">
          <h1 className="mb-4 w-full text-center text-lg">
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
        <div className="relative flex h-full w-2/3 flex-col rounded-xl border border-gray-200 bg-opacity-60 bg-clip-padding backdrop-blur-xl backdrop-filter md:w-1/3 lg:mt-0">
          {/* <div className="absolute top-5 right-5 rounded-xl bg-teal-500 py-2 px-4 text-xl text-black ">
            NFTs Owned: {nftOwned} <br />
            Current Index: {current}
          </div> */}
          <Carousel
            animationHandler="fade"
            autoPlay
            className="mt-3"
            showStatus={false}
            infiniteLoop
            showIndicators={false}
            showThumbs={true}
            interval={5000}
          >
            {nfts?.map((nft: NFTprops, index: number) => (
              <Card name={nft.name} image={nft.image} id={index} key={index} />
            ))}
          </Carousel>
        </div>
      )}
      <Modal isOpen={loading} style={customStyles}>
        <ProfileLoader />
      </Modal>
    </div>
  )
}

export default Profile
