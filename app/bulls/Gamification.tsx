import Image from "next/image";
import React from "react";
type Props = {};

const Gamification = (props: Props) => {
  return (
    <div className=" min-h-fit w-full flex justify-center items-center max-w-7xl mx-auto pb-20 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between pt-20 md:pt-0 w-full items-center px-8">
        <div className="flex flex-col md:w-[60%] w-full text-center md:text-left mt-5 md:mt-0 items-start justify-start space-y-4">
          <div className="relative flex h-full w-full items-end">
            <div className="font-marker text-4xl font-black">
              <p>Gamification</p>
              <hr aria-orientation="horizontal" className="my-5" />
            </div>
          </div>
          <p className="text-base leading-5 tracking-wider ">
            The Ranch ecosystem incorporates a gamification layer to enhance
            engagement and encourage participation. This layer comprises two
            primary elements: Bull Battles and Death Battles. These features
            foster a competitive and interactive environment that incentivizes
            users to engage with our project and creates a sense of community.
            Moreover, the gamification layer presents users with the chance to
            augment their Bullion holdings and voting power, empowering them
            with more sway within The Ranches ecosystem. <br /> <br /> Bull
            Battles offer competitions where NFT owners can compete against one
            another, staking their monthly accrued bullion for a shot at earning
            more. These games provide a range of exciting challenges, from
            skill-based contests to games of chance. Engaging in Bull Battles
            can increase monthly rewards and provide players with opportunities
            to earn additional bullion while enjoying the camaraderie of the TR
            Bull community. <br /> <br /> It's essential to note that the
            Bullion supply is predetermined based on the NFTs held by individual
            players, and no additional Bullion is created as a bonus incentive.
            Therefore, all Bullion earned during Bull Battles originates from
            other community members who partake in these activities. However,
            opting out of participation does not result in a loss of rewards.
            The percentage of rewards received by an NFT holder remains fixed
            against the total Bullion amount, indicating that there is no
            reduction in rewards for non-participation. <br /> <br /> Death
            Battles represent a new level of risk and reward in the TR Bull
            ecosystem. In these battles, players can choose to risk losing their
            NFTs for a shot at earning more. When participating in a Death
            Battle, winners can acquire 75% of the loser's accrued bullion
            tokens per month and obtain a Battle Stone that showcases the number
            of Bulls defeated. This element is entirely optional, but for those
            willing to take the chance, the potential rewards can be
            significant. <br /> <br /> Winning a Death Battle is the only way to
            permanently increase the Bullion amount per month for an NFT and
            bestow the exclusive Battle Stone to the NFT, highlighting the
            accomplishment and increasing the Bull's pride as the owner. The
            metadata files and NFT images are updated to reflect the new Bullion
            Tokens earned per month and the number of Bulls defeated. <br />{" "}
            <br /> Engaging in Bull Battles and Death Battles offers a unique
            opportunity for players to significantly increase their percentage
            of the Bullion pool, though there is always the possibility of
            losing a portion of it. Whether you are a casual player or a
            seasoned competitor, TR Bull Battles offer something for everyone to
            enjoy. Come and join the fun to see what you can win!
          </p>
        </div>

        <div className="grid-template grid h-fit w-full gap-4 md:w-[30%] order-first md:order-last">
          <Image
            src="/images/gamification/1.png"
            alt=""
            height={50}
            width={50}
            unoptimized={true}
            className="h-auto w-full rounded-md object-contain"
          />
          <Image
            src="/images/gamification/3.png"
            alt=""
            height={50}
            unoptimized={true}
            width={50}
            className="h-auto w-full rounded-md object-contain"
          />
          <Image
            src="/images/gamification/7.png"
            alt=""
            unoptimized={true}
            height={50}
            width={50}
            className="h-auto w-full rounded-md object-contain"
          />
          <Image
            src="/images/gamification/10.png"
            alt=""
            unoptimized={true}
            height={50}
            width={50}
            className="h-auto w-full rounded-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Gamification;
