import { useChain, useMoralis } from 'react-moralis'

const ChainNotSupported = () => {
  const { switchNetwork, chainId } = useChain()
  const { enableWeb3 } = useMoralis()
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-700">
        Please Switch to Polygon Network to Continue!
      </h1>
      <button
        onClick={() => {
          if (chainId == null) {
            enableWeb3()
          } else {
            switchNetwork('0x13881')
          }
        }}
        className="mt-5 rounded-lg bg-purple-500 py-3 px-2"
      >
        Switch to Polygon
      </button>
    </div>
  )
}

export default ChainNotSupported
