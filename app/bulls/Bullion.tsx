import Image from "next/image";

type Props = {};

const Bullion = (props: Props) => {
  return (
    <div className=" min-h-fit pb-20 w-full snap-end flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-center pt-10 md:pt-0 w-full items-center px-8">
        {/* Image */}
        <div>
          <Image
            src="/images/3BullionTokens.png"
            alt="logo"
            loading="eager"
            height={600}
            width={600}
          />
        </div>
        {/* Description */}
        <div className="flex flex-col md:w-1/2 text-center md:text-left w-full items-start justify-start space-y-4">
          <div className="relative flex h-full w-full items-end">
            <div className="font-marker text-4xl font-black">
              <p>Bullion</p>
              <hr aria-orientation="horizontal" className="my-5" />
            </div>
          </div>
          <p className="text-base leading-5 tracking-wid">
            Bullion is a unique point system that lies at the core of the TR
            Bulls ecosystem and drives its value and growth. Every TR Bull NFT
            (Normal or Alpha) earns a specific amount of Bullion every month,
            which is derived from the cost of the NFT multiplied by the
            Magnifier value. Accrued Bullion serves two primary purposes: reward
            distribution and voting power. <br /> <br /> Unlike other
            fixed-value tokens, Bullion does not have a fixed value but is the
            basis for calculating the percentage of rewards each stakeholder
            receives based on their staked amount and voting activity. At the
            beginning of each month, the Bullion amount is deliberately
            calculated to snapshot and determine the reward allocation ratio for
            that month's reward tokens. <br /> <br /> Snapshotting the Bullion
            tokens at the start of the month allows each account to optionally
            participate in Bull Battles through the gamification layer. During
            Bull Battles, the total token count in the ecosystem remains
            constant, as none is created out of thin air.
            <br /> <br /> After rewards are dispensed mid-month based on the
            accounts' Bullion holding, all Bullion is wiped from stakeholders'
            accounts and recalculated the following month to repeat the
            rewarding process. However, the deflationary mechanism of death
            battles can affect Bullion's value. In a death battle, TR Bull NFTs
            compete, with the winner taking a portion of the loser's Bullion
            production. This mechanism reduces the overall supply of Bullion,
            making it scarcer and potentially increasing its value.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bullion;
