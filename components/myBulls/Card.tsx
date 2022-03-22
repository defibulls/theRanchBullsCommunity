interface CardProps {
  id: number
  name: string
  image: string
}

const Card = ({ id, name, image }: CardProps) => {
  const httpsimg = image.replace('ipfs://', 'https://dweb.link/ipfs/')

  return (
    <div className="mr-[30px] h-fit w-[300px] rounded-3xl bg-[#1a1c1e] text-white">
      <img className="w-full rounded-t-3xl" src={httpsimg} alt={name} />
      <div className="p-[20px]">
        <div className="text-xl font-black">{name}</div>
      </div>
    </div>
  )
}

export default Card
