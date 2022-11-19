type Props = {}

const Paused = (props: Props) => {
  return (
    <div className="w-full lg:w-[50%]">
      <p className="mb-1 font-marker text-4xl font-black text-cyan-600 underline underline-offset-2">
        CONTRACT PAUSED
      </p>
      <p className="mt-4 text-xl font-bold ">
        Contract Paused. Please Check Discord.
        <br />
        <br />
      </p>
      <a href="https://discord.gg/URMH4bSAht" target="_blank" rel="noreferrer">
        <button className=" font-sansw-full rounded-md bg-cyan-600 px-4 py-2 font-bold ">
          CLICK HERE TO JOIN DISCORD
        </button>
      </a>
    </div>
  )
}

export default Paused
