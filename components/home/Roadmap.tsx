import React from 'react'

const Roadmap = () => {
  return (
    <div
      id="roadmap"
      className="flex min-h-fit flex-col items-center justify-around gap-4 bg-indigo-600 px-[10%] py-[15%] md:flex-row md:p-[10%]"
    >
      <div className="flex h-full w-full flex-col items-start justify-center">
        <div className="relative flex h-full w-full flex-col items-start justify-center ">
          <p className="text-4xl font-black">
            ROADMAP
            <hr aria-orientation="horizontal" className="my-5" />
          </p>
          <img
            src="/images/transparentBg/416bgt.png"
            loading="lazy"
            alt=""
            className="absolute left-[500px] top-[-122px] hidden w-[250px] object-contain lg:block"
          />
        </div>
        <p className="text-6xl font-black">2022</p>
        <div className="mt-[1rem] flex h-fit w-full flex-col space-y-2 text-left lg:flex-row lg:space-y-0 lg:space-x-2">
          <div className="flex w-full flex-col rounded-xl bg-teal-600 p-5 font-light text-indigo-600">
            <p className="text-5xl font-bold">Q1</p>
            <br />
            <p className="font-bold">Gen 1 Mint</p>
            <p>6969 NFTs + 21 custom.</p>
            <p>Price: 1 MATIC.</p>
            <p>100% of mint proceeds went to treasury.</p>
            <p>
              Sold out in 25 mins. <br />
              <br />
            </p>
            <p className="font-bold">Treasury distribution</p>
            <p>45 STRONG NODES.</p>
            <p>12 THOR Odin nodes.</p>
            <p>
              300 PXT nodes.
              <br />
              <br />
            </p>
            <p className="font-bold">Weekly giveaways</p>
            <p>40% of rewards go to giveaways.</p>
            <p>Start: 11th of Febr/uary</p>
            <p>Draw winners on Friday.</p>
            <p>
              5 Min winners. <br />
              <br />
            </p>
            <p className="font-bold">Gen 2 Mint</p>
            <p>6969 NFTs - including 37 custom.</p>
            <p>Price: 3 MATIC.</p>
            <p>WL spot guaranteed for holders with 3 or more Gen 1 Bears.</p>
            <p>
              90% of proceeds to treasury. <br />
              <br />
            </p>
            <p className="font-bold">Weekly giveaways with 4x treasury</p>
            <p>Each Friday (More drawing days might be added).</p>
            <p>More than 26 winners.</p>
          </div>
          <div className="flex w-full flex-col rounded-xl bg-teal-500 p-5 font-light text-indigo-600">
            <p className="text-5xl font-bold">Q2</p>
            <br />
            <p className="font-bold">Baby Bears &amp; $HONEY</p>
            <p>1000 NFTs</p>
            <p>Price: TRB (Max 0.5 AVAX for sustainability).</p>
            <p>
              Only holders of 2 Gen1 &amp; 2 Gen2 bears will be able to mint.
            </p>
            <p>
              Baby Bears will earn $HONEY tokens every day, you will be able to
              use that token to buy clothes for your baby bears, and earn more
              $HONEY.
            </p>
            <p>
              Or put $HONEY Into a honeypot where you will be able to win all of
              the honey in the pot!
            </p>
            <p>
              More info TRB.
              <br />
              <br />
            </p>
            <p className="font-bold">Ranch Bulls</p>
            <p>
              All Ranch Bull holders will have early access to this project.
            </p>
            <p>More info TRB.</p>
            <p>
              This project is not gonna be 100% in Q2 because we don’t want to
              release bad project
            </p>
          </div>
          <div className="flex w-full flex-col rounded-xl bg-teal-400 p-5 font-light text-indigo-600">
            <p className="text-5xl font-bold">Q3</p>
            <br />
            <p className="font-bold">Node Bears P2E Mobile Game</p>
            <p>
              Not many things we can release about this, but these are for sure:
              Leaderboard.
            </p>
            <p>Top players will be rewarded $HONEY.</p>
          </div>
          <div className="flex w-full flex-col rounded-xl bg-teal-300 p-5 font-light text-indigo-600">
            <p className="text-5xl font-bold">Q4</p>
            <br />
            <p className="font-bold">The Gifting Season</p>
            <p>
              From Thanksgiving week until Christmas day we will be giving away
              90% of rewards earned.
            </p>
            <p>That way we can give a nice gift to all of you!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roadmap
