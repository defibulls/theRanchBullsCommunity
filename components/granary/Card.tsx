interface CardProps {
  id: number
  name: string
  image: string
}

const Card = ({ id, name, image }: CardProps) => {
  const httpsimg = image.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')

  return (
    <div className="flex items-center justify-center">
      <div className="h-full w-[280px] flex-col rounded-xl bg-[#1a1c1e] text-white">
        <img className="w-full rounded-t-xl" src={httpsimg} alt={name} />
        <div className="p-[10px]">
          <div className="text-md font-black">{name}</div>
        </div>
      </div>
    </div>
  )
}

export default Card
