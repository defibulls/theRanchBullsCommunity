import { useChain } from 'react-moralis'

const ChainNotSupported = () => {
  const { switchNetwork } = useChain()
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-700">
        Please Switch to Polygon Network to Continue!
      </h1>
      <button
        onClick={() => switchNetwork('0x13881')}
        className="mt-5 rounded-lg bg-purple-500 py-3 px-2"
      >
        Switch to Polygon
      </button>
    </div>
  )
}

export default ChainNotSupported
