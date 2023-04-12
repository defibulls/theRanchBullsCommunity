import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  minted: number;
  maxbulls: number;
  price: number;
};

const PublicSale = ({ minted, maxbulls, price }: Props) => {
  const [count, setCount] = useState<number>(1);

  const decrement = (e: any) => {
    e.preventDefault();
    if (count == 1) return;
    setCount(count - 1);
  };

  const increment = (e: any) => {
    e.preventDefault();
    if (count == 5) return;
    setCount(count + 1);
  };

  return (
    <motion.div
      initial={{
        x: 200,
        opacity: 0,
      }}
      viewport={{ once: true }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      className="flex w-full flex-col justify-center lg:w-[50%]"
    >
      <p className="mb-1 text-4xl font-black text-cyan-600 underline underline-offset-2">
        MINT NOT LIVE
      </p>

      <p className="text-4xl font-black">
        {minted} / {maxbulls}
      </p>
      <p className="text-5xl font-black">
        EACH <span className="font-marker text-purple-600">BULL</span> COSTS{" "}
        {price}
        <span className="font-marker text-purple-600"> USDC</span>
        <br />
        <br />
      </p>
      <div className={`pb-4 text-lg font-normal text-cyan-600`}>
        <p className="font-marker uppercase tracking-widest">
          {maxbulls > 250
            ? "Next Phase: TBA"
            : "Minting start on April 12 @ 7PM EST"}
        </p>
        <br />
      </div>
      <div className="flex w-fit flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            className="rounded-lg border p-2 "
            onClick={(e) => decrement(e)}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              focusable="false"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
            </svg>
          </button>
          <p className="text-2xl font-bold text-cyan-600">{count}</p>
          <p className="font-marker text-2xl font-bold">BULL</p>
          <button
            onClick={(e) => increment(e)}
            className="rounded-lg border p-2"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              //t="1551322312294"
              viewBox="0 0 1024 1024"
              version="1.1"
              aria-hidden="true"
              focusable="false"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs></defs>
              <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
              <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
            </svg>
          </button>
        </div>
        <button
          disabled={true}
          className="w-full rounded-md bg-cyan-600 px-4 py-2 uppercase tracking-wider disabled:cursor-not-allowed disabled:bg-gray-600"
        >
          Mint
        </button>
        <p>
          TOTAL PRICE: <b>0 USDC</b>
        </p>
      </div>
    </motion.div>
  );
};

export default PublicSale;
