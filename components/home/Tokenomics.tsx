const Tokenomics = () => {
  return (
    <div
      id="tokenomics"
      className="flex min-h-fit flex-col items-center justify-around gap-4 bg-black p-[10%] md:flex-row"
    >
      <div className="flex min-h-fit w-full flex-col items-start justify-center">
        <div className="relative flex w-full flex-row items-end justify-center md:justify-start">
          <p className="font-marker text-4xl font-black">
            TOKENOMICS
            <hr aria-orientation="horizontal" className="my-5" />
          </p>

          <img
            src="images\transparentBg\23bgt.png"
            alt=""
            loading="lazy"
            className="absolute left-[650px] top-[-122px] hidden w-[200px] object-contain lg:block"
          />
        </div>
        <div className="mt-[2rem] grid w-full grid-cols-1 gap-y-0 lg:gap-y-[5%]">
          <div className="tokenomics">
            <img
              src="/Icons/RaffleTicket.svg"
              loading="lazy"
              className="hidden w-[128px] object-contain md:block"
              alt=""
            />
            <div className="flex flex-col py-2 px-3">
              <p className="text-2xl font-bold tracking-wider text-gray-600">
                LIFETIME TICKET FOR REWARDS
              </p>
              <p className="text-md font-normal text-gray-300">
                1 BTC Bull = 1 ticket to the monthly profits from our Bitcoin
                Mining Clusters
              </p>
            </div>
          </div>
          <div className="tokenomics">
            <img
              src="/Icons/Networking.svg"
              loading="lazy"
              className="hidden w-[128px] object-contain md:block"
              alt=""
            />
            <div className="flex flex-col py-2 px-3">
              <p className="text-2xl font-bold tracking-widest text-gray-600">
                BTC BULL CENTRALITY
              </p>
              <p className="text-md font-normal text-gray-300">
                Ownership of a BTC BULL is the central part of this project.
                There will be other assets deployed within the ecosystem but all
                assets are tied back to the BTC Bulls. For example, let's say we
                deploy Llama's within The Ranch that will be invested into
                another project to create revenue for us. Each Llama NFT would
                be rewarded, pro-rata, but the funds are sent back to the BTC
                Bulls contract and go through this logic to update USDC amounts
                for the BTC Bulls. When this happens, owning a BTC Bull is a key
                part to make sure that the higher percentage of the amount
                deposited for the Llama's owners address is retained.
                <br />
                <br />
                The BTC Bulls will grow to be the central tie back point for
                many animals living on the ranch. Each additional NFT stream
                will be completely voluntary everyone. Owning a BTC Bull does
                not automatically give you another NFT such as the Llamas.
              </p>
            </div>
          </div>
          <div className="tokenomics">
            <img
              src="/Icons/RaffleDrawingMachine.svg"
              loading="lazy"
              className="hidden w-[128px] object-contain md:block"
              alt=""
            />
            <div className="flex flex-col py-2 px-3">
              <p className="text-2xl font-bold tracking-widest text-gray-600">
                MINTING RAFFLE
              </p>
              <p className="text-md font-normal text-gray-300">
                A raffle happens every 100 Mints during the sale of our 10,000
                BTC Bulls. 1 entry per address for each raffle
              </p>
            </div>
          </div>
          <div className="tokenomics">
            <img
              src="/Icons/CompoundingIllustration.svg"
              loading="lazy"
              className="hidden w-[128px] object-contain md:block"
              alt=""
            />
            <div className="flex flex-col py-2 px-3">
              <p className="text-2xl font-bold tracking-widest text-gray-600">
                COMPOUNDING EFFORTS
              </p>
              <p className="text-md font-normal text-gray-300">
                All BTC mining efforts will be processed monthly.
                <br />
                <br />
                1/3 of all rewards received from the mining facility will be
                reinvested back into the mining cluster to purchase more BTC
                miners.
                <br />
                <br />
                2/3 of the monthly reward received will be converted to WBTC and
                deposited into the BTC Bulls Smart Contract with 10% going back
                to The Ranch Core Team for continued project growth, security
                measures, and marketing. The remaining 90% is then dispersed to
                the owners of the BTC Bulls NFTs in pro-rata format. Using this
                approach, each NFT is awarded the exact same amount. An address
                owning 5 NFTs would get 5x more WBTC rewards than a person
                owning a single NFT.
              </p>
            </div>
          </div>
          <div className="tokenomics">
            <img
              src="/Icons/BuddySystem.svg"
              loading="lazy"
              className="hidden w-[128px] object-contain md:block"
              alt=""
            />
            <div className="flex flex-col py-2 px-3">
              <p className="text-2xl font-bold tracking-widest text-gray-600">
                BUDDY SYSTEM
              </p>
              <p className="text-md font-normal text-gray-300">
                The Buddy System is an onboarding system that benefits team
                builders and new participants in The Ranch Ecosystem.
                Participation is completely voluntary, however by utilizing the
                Buddy System, not only are participants rewarded for building
                out their teams organically but newcomers are provided equal
                incentive to participate. Unlike other multi-level marketing and
                scam-type referral systems, which consist of pyramid structures,
                tiered referral trees, etc. There is only 1 level of affiliate
                rewards within The Ranch Ecosystem. Rewards during three events:{' '}
                <br />
                <br />
                1) Whenever the referred individual mints new BTC Bull NFTs
                where 2% of the minting transaction cost will be given to the
                partner of the referred person.
                <br />
                <br />
                2) During monthly WBTC payouts, 2% of the total rewards payout
                for the owner's NFTS is split 50/50, or 1% each, between the
                referred and referrer and uploaded to the amount that each is
                allowed to withdraw from the contract. In order to receive the
                Buddy System bonus, the person who is set as your buddy must own
                a BTC Bull during the rewarding event.
                <br />
                <br />
                3) Anytime profits from other secondary streams/animals are
                deposited into The Ranch, 5% of the projected payout to the NFT
                holder is given to the Buddy.
                <br />
                <br />
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tokenomics
