const Footer = () => {
  return (
    <div className="flex h-fit flex-col items-center bg-gray-800 p-8">
      <a
        href="/#home"
        className="flex items-center rounded-xl bg-purple-900 py-1 px-2"
      >
        <img
          src="/Logo/tp-logo.png"
          alt="TRB"
          className="-ml-6 h-12 cursor-pointer rounded-xl object-cover"
        />
        <p className="-ml-3 text-lg font-bold">THE RANCH BULLS</p>
      </a>
      <div className="mt-10 flex w-full justify-center gap-8">
        <a target="_blank" href="https://discord.gg/URMH4bSAht">
          <img
            src="/discord.png"
            alt=""
            className="object-coantin max-w-[3rem] cursor-pointer"
          />
        </a>
        <a target="_blank" href="https://twitter.com/0xTheRanch">
          <img
            src="/twitter.png"
            alt=""
            className="object-coantin max-w-[3rem] cursor-pointer"
          />
        </a>
      </div>
      <p className="mt-8 w-full text-center text-4xl font-light text-white">
        RANCH BULLS 2022
      </p>
    </div>
  )
}

export default Footer
