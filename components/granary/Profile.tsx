import React, { useContext, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { contractAddress, customStyles } from '../../lib/constants'
import Card from './Card'
import Modal from 'react-modal'
import ProfileLoader from '../modals/ProfileLoader'
import 'react-responsive-carousel/lib/styles/carousel.css'
import { Carousel } from 'react-responsive-carousel'
import { ContractContext } from '../../context/ContractContext'
import toast from 'react-hot-toast'
import { PencilIcon } from '@heroicons/react/24/solid'
import SetPartnerModal from '../modals/SetPartnerModal'

interface NFTprops {
  name: string
  description: string
  compiler: string
  date: number
  attributes: any
  image: string
  dna: string
  className: string
  edition: number
}

const Profile = () => {
  const [nfts, setNfts] = useState<any>([])
  const { isAuthenticated, user, Moralis } = useMoralis()
  const [loading, setLoading] = useState<boolean>(false)
  const [usdcRewards, setUsdcRewards] = useState<number>(0)
  const { contract, open, setOpen } = useContext(ContractContext)
  const [nftOwned, setNftOwned] = useState<number>(0)
  const [modal, setModal] = useState<string>('rewards')
  const [wbtcRewards, setWbtcRewards] = useState<number>(0)
  const [totalMaintenanceFeePending, setTotalMaintenanceFeePending] =
    useState<number>(0)
  const [standingMaintenanceFee, setStandingMaintenanceFee] =
    useState<number>(0)
  const [rewardDate, setRewardDate] = useState(0)
  const [buddyAddress, setBuddyAddress] = useState(
    '0x0000000000000000000000000000000000000000'
  )

//   const getRewardsData = async () => {
//     const btcBullOwner = await contract.methods
//       .btcBullOwners(user?.get('ethAddress'))
//       .call()
//     setUsdcRewards(btcBullOwner.USDC_Balance / 1000000)
//     setWbtcRewards(btcBullOwner.WBTC_Balance / 100000000)

//     const _rewardDate = await contract.methods.currentRewardingDate().call()
//     setRewardDate(_rewardDate)
//   }
  
  const getRewardsUSDC = async () => {
    const usdcRewards = await contract.methods
      .getUsdcBalanceForAddress(user?.get('ethAddress'))
      .call()
    setUsdcRewards(usdcRewards / 1000000)

    const _rewardDate = await contract.methods.currentRewardingDate().call()
    setRewardDate(_rewardDate)
  }
  
  const getRewardsWBTC = async () => {
    const wbtcRewards = await contract.methods
      .getWbtcBalanceForAddress(user?.get('ethAddress'))
      .call()
    setUsdcRewards(wbtcRewards / 100000000)
  }
  
  
  const getBuddyAddress = async () => {
    const _buddyAddress = await contract.methods
      .myPartner(user?.get('ethAddress'))
      .call()
    setBuddyAddress(_buddyAddress)
  }

  useEffect(() => {
    if (contract) {
      getRewardsUSDC()
      getRewardsWBTC()
      getMaintenanceFeeInfo()
      getBuddyAddress()
    }
  }, [contract])

  useEffect(() => {
    if (!isAuthenticated) return
    getNFTs()
  }, [isAuthenticated])

  const getNFTs = async () => {
    setLoading(true)
    const data = await Moralis.Web3API.account.getNFTs({
      chain: '0x13881',
      address: user?.get('ethAddress'),
      token_addresses: [contractAddress],
    })

    setNftOwned(data.result?.length!)

    const nftsr: any[] = []

    data.result?.forEach(async (nft) => {
      await fetch(nft.token_uri!).then((res: any) =>
        res
          .json()
          .then((data: any) => nftsr.push(data))
          .catch((err: any) => toast.error(err.message))
      )
    })

    setNfts(nftsr)
    setLoading(false)
  }

  const getMaintenanceFeeInfo = async () => {
    const _maintenanceFeePending = await contract.methods
      .getMaintenanceFeeBalanceForAddress()
      .call()

    setTotalMaintenanceFeePending(_maintenanceFeePending / 1000000)

    const _standingMaintenanceFee = await contract.methods
      .getMaintenanceFeeStandingForAddress()
      .call()

    setStandingMaintenanceFee(_standingMaintenanceFee / 1000000)
  }

  const paytotalMaintenanceFee = async () => {
    if (totalMaintenanceFeePending == 0)
      return toast.error('You have already payed the maintenance fee')
    await contract.methods
      .payMaintanenceFees()
      .send({ from: user?.get('ethAddress') })
  }

  const renderSection = (modal: string) => {
    if (modal == 'rewards') {
      return (
        <div className="flex w-full flex-col justify-between space-y-4  pr-10 scrollbar-thin scrollbar-thumb-cyan-600">
          <div className="flex flex-col space-y-5">
            <h1 className="text-left text-xl font-semibold uppercase tracking-wider  text-gray-500">
              TOTAL USDC.e REWARDS
            </h1>
          </div>
          <div className=" flex w-full items-center justify-between">
            <h2 className="text-lg font-medium">{usdcRewards} USDC.e</h2>
            <button
              onClick={(e) => withdrawUsdcReward(e)}
              className="flex h-10 w-20 items-center justify-center rounded-lg bg-teal-500  px-3 text-base font-medium"
            >
              Claim
            </button>
          </div>
          <div className="flex flex-col space-y-5">
            <h1 className="text-left text-xl font-semibold uppercase tracking-wider  text-gray-500">
              TOTAL WBTC REWARDS
            </h1>
          </div>
          <div className=" flex w-full items-center justify-between">
            <h2 className="text-lg font-medium">{wbtcRewards} WBTC</h2>
            <button
              onClick={(e) => withdrawWbtcReward(e)}
              className="flex h-10 w-20 items-center justify-center rounded-lg bg-teal-500  px-3 text-base font-medium"
            >
              Claim
            </button>
          </div>
          <h1 className="text-base font-semibold uppercase tracking-wider text-gray-500">
            Next Reward Date - {rewardDate == 0 ? 'TBD' : rewardDate}
          </h1>
        </div>
      )
    } else if (modal == 'buddy') {
      return (
        <div className="flex flex-col space-y-5">
          <h1 className="text-left text-xl font-semibold uppercase tracking-widest  text-gray-500">
            Buddy address
          </h1>
          <div className="flex w-full justify-around rounded-lg border border-gray-500 px-3 py-2">
            <p className="pr-3 text-sm tracking-wide text-gray-400">
              {buddyAddress}
            </p>
            {buddyAddress == '0x0000000000000000000000000000000000000000' && (
              <PencilIcon
                className="h-5 cursor-pointer"
                onClick={() => setOpen(true)}
              />
            )}
          </div>
        </div>
      )
    } else {
      return (
        <div className="w-full space-y-5 pr-10">
          <div className="flex flex-col space-y-5">
            <h1 className="text-left text-xl font-semibold uppercase tracking-wider  text-gray-500">
              TOTAL Maintenance fee pending
            </h1>
          </div>
          <div className=" flex w-full items-center justify-between">
            <h2 className="text-lg font-medium">
              {totalMaintenanceFeePending} USDC
            </h2>
            <button
              onClick={() => paytotalMaintenanceFee()}
              className="flex h-10 w-20 items-center justify-center rounded-lg bg-teal-500  px-3 text-base font-medium"
            >
              Pay
            </button>
          </div>
          <div className="flex flex-col space-y-5">
            <h1 className="text-left text-xl font-semibold uppercase tracking-wider  text-gray-500">
              Standing Maintenance fee
            </h1>
          </div>
          <div className=" flex w-full items-center justify-between text-red-500">
            <h2 className="text-lg font-medium">
              {standingMaintenanceFee} USDC
            </h2>
          </div>
        </div>
      )
    }
  }

  const withdrawUsdcReward = async (e: any) => {
    e.preventDefault()
    const account = user?.get('ethAddress')
    if (usdcRewards == 0)
      return toast.error('You have no USDC reward to withdraw')
    await contract.methods.withdrawUsdcBalance().send({
      from: account,
    })
  }

  const withdrawWbtcReward = async (e: any) => {
    e.preventDefault()
    const account = user?.get('ethAddress')
    if (wbtcRewards == 0)
      return toast.error('You have no WBTC reward to withdraw')

    await contract.methods.withdrawWbtcBalance().send({
      from: account,
    })
  }

  const image = nfts?.[nfts.length - 1]?.image

  const httpsimg = image?.replace('ipfs://', 'https://dweb.link/ipfs/')

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <div
        className="flex h-fit flex-col justify-between lg:flex-row"
        style={{
          backgroundImage: `url(/images/farm.png)`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
        }}
      >
        <div
          className="flex h-fit w-full flex-col items-center justify-around  xl:flex-row xl:items-start"
          style={{
            background: 'rgba(0,0,0,0.4)',
            backgroundImage: `linear-gradient(to top, rgba(0,0,0, 5) 0, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)`,
          }}
        >
          <div className="xs:mx-5 mt-32 flex h-fit w-full flex-col items-center rounded-xl bg-black bg-opacity-50 py-10 px-10 md:mx-10 md:w-fit  md:flex-row">
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

            <div className="mt-6 flex w-fit flex-col space-y-6 sm:mt-2 md:pl-10">
              <li className="flex md:items-start">
                <div className="flex items-center gap-[0.5rem]">
                  <div className="rounded-xl bg-teal-500 p-[0.5rem]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                      />
                    </svg>
                  </div>
                  <p className="">{user?.get('ethAddress')}</p>
                </div>
              </li>
              <li className="flex md:items-start">
                <div className="flex items-center gap-[0.5rem]">
                  <div className="rounded-xl bg-teal-500 p-[0.5rem]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <p className="">{nftOwned}</p>
                </div>
              </li>
            </div>
          </div>
          <div className="mt-32 flex h-fit w-[70%] flex-col rounded-xl bg-black bg-opacity-50 p-5 md:mr-10 md:w-[24rem]">
            {nfts.length > 0 ? (
              <Carousel
                autoPlay
                showStatus={false}
                infiniteLoop
                showIndicators={false}
                showThumbs={false}
                interval={2000}
              >
                {nfts?.map((nft: NFTprops, index: number) => (
                  <Card
                    name={nft.name}
                    image={nft.image}
                    id={index}
                    key={index}
                  />
                ))}
              </Carousel>
            ) : (
              <div className="w-fit text-center text-sm font-normal text-white">
                The address {user?.get('ethAddress')} doesn't own any Bulls.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mx-10 flex h-fit w-fit flex-col items-center justify-center rounded-xl bg-black bg-opacity-50 p-10">
        <div className="flex w-full items-start space-x-8 p-10 text-base font-semibold">
          <h1
            className={`${
              modal === 'rewards' ? `border-b-2 border-teal-500` : ``
            } cursor-pointer uppercase`}
            onClick={() => setModal('rewards')}
          >
            Rewards
          </h1>
          <h1
            className={`${
              modal == 'buddy' ? `border-b-2 border-teal-500` : ``
            }  cursor-pointer uppercase`}
            onClick={() => setModal('buddy')}
          >
            Buddy Address
          </h1>
          <h1
            className={`${
              modal === 'maintenance' ? `border-b-2 border-teal-500` : ``
            } cursor-pointer uppercase`}
            onClick={() => setModal('maintenance')}
          >
            Maintenance Fee
          </h1>
        </div>
        <div className="flex w-full flex-col items-start pl-10">
          {renderSection(modal)}
        </div>
      </div>

      <Modal isOpen={open} style={customStyles}>
        <SetPartnerModal />
      </Modal>

      <Modal isOpen={loading} style={customStyles}>
        <ProfileLoader />
      </Modal>
    </div>
  )
}

export default Profile
