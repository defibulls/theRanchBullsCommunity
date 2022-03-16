const Giveaway = () => {
  return (
    <div
      id="giveaway"
      className="flex min-h-[100vh] flex-col items-center justify-around gap-4 bg-indigo-600 px-[10%] py-[15%] md:p-[10%]"
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="relative flex w-full flex-col items-center justify-between gap-4 md:text-4xl">
          <p className="text-3xl font-black">
            GIVEAWAY <hr aria-orientation="horizontal" />
          </p>
          <div className="justify-self-end">
            <div className="relative flex flex-col items-center">
              <p className="font-bold">NEXT GIVEAWAY</p>
            </div>
            <div className="mt-4 flex min-w-max justify-center rounded-3xl bg-lime-600 py-4 px-8">
              <p className="text-2xl font-black text-white">05:05:10:10</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between gap-4 ">
        <div className="flex w-full flex-col items-center">
          <p className="mb-2 text-2xl font-bold">WEEKLY WINNERS</p>
          <div className="grid w-full grid-cols-5 items-center gap-2">
            <p> </p>
            <p className="text-xs font-black">Winner</p>
            <p className="text-xs font-black">Prize</p>
            <p className="text-xs font-black">Amount</p>
            <p className="text-xs font-black">Tx</p>
            <p className="font-black">1. </p>
            <p className="font-light">0xcd...4c31</p>
            <p className="font-light">$STRONG</p>
            <p className="font-light">10</p>
            <a href="" target="_blank" rel="noreferrer">
              <p className="font-light underline underline-offset-1">
                0xcd...4c31
              </p>
            </a>
            <p className="font-black">2. </p>
            <p className="font-light">0xcd...4c31</p>
            <p className="font-light">$STRONG</p>
            <p className="font-light">10</p>
            <a href="" target="_blank" rel="noreferrer">
              <p className="font-light underline underline-offset-1">
                0xcd...4c31
              </p>
            </a>
            <p className="font-black">3. </p>
            <p className="font-light">0xcd...4c31</p>
            <p className="font-light">$STRONG</p>
            <p className="font-light">10</p>
            <a href="" target="_blank" rel="noreferrer">
              <p className="font-light underline underline-offset-1">
                0xcd...4c31
              </p>
            </a>
          </div>
        </div>
        <div className="flex w-full flex-col items-center">
          <p className="text-4xl font-bold">YEAR 1 VALUES</p>
          <div className="giveaway mt-2 grid w-[85%] gap-y-8 gap-x-2">
            <p className="font-bold">Total GIVEAWAYS</p>
            <hr
              aria-orientation="vertical"
              className="h-full border-l border-solid opacity-60"
            />
            <p>SOON</p>
            <p className="font-bold">Total WINNERS</p>
            <hr
              aria-orientation="vertical"
              className="h-full border-l border-solid opacity-60"
            />
            <p>SOON</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Giveaway
