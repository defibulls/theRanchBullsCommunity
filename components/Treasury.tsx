const Treasury = () => {
  return (
    <div
      id="treasury"
      className="flex min-h-[100vh] items-center justify-around gap-4 bg-black px-[10%] py-[15%]"
    >
      <div className="flex h-full w-full flex-col items-start justify-center">
        <div className="relative flex w-full flex-col items-center justify-between gap-4">
          <p className="mb-4 text-3xl font-black text-teal-500 md:text-4xl">
            TREASURY <hr aria-orientation="horizontal" className="mt-2" />
          </p>
        </div>
        <div className="flex h-fit w-full flex-col justify-evenly gap-4">
          <div className="flex w-full flex-col justify-evenly space-y-2 rounded-xl bg-gray-800 py-2 px-1 md:flex-row md:space-y-0">
            <div className="flex flex-col items-center space-y-4">
              <p className="text-2xl text-gray-600">Treasury Balance</p>
              <p className="text-3xl font-black">731,629.41</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <p className="text-2xl text-gray-600">Current Investments</p>
              <p className="text-3xl font-black">5</p>
            </div>
          </div>
          <div className="grid grid-cols-2 flex-row justify-center gap-4">
            <div className="flex flex-col items-center justify-center rounded-xl bg-gray-800 py-2 px-4">
              <p className="text-base text-gray-600">VOLUME V1</p>
              <p className="text-2xl font-black">990.34 USDC</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl bg-gray-800 py-2 px-4">
              <p className="text-base text-gray-600">VOLUME V2</p>
              <p className="text-2xl font-black">428.34 USDC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Treasury
