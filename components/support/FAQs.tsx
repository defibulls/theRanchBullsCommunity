import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

type Props = {}

const faqs = [
  {
    id: 1,
    question: 'WHEN WILL I GET THE BTC MINED?',
    answer:
      'We will payout the BTC monthly to our holders after 6 months of mining operations to compound our funds. There will be a holder specific section on our website where NFT holders can then connect their BTC wallet and claim their monthly reward.',
  },
  {
    id: 2,
    question: "What's the mint price?",
    answer:
      'During phase three the mint price will be pegged to approximately ~$425 USD in Ethereum. The price of mint will increase in the next phases.',
  },
  {
    id: 3,
    question: 'HOW WILL I MINT?',
    answer:
      'Minting will take place directly on our website and will then the secondary market will be OpenSea. Please only use the official links we give to avoid being scammed.',
  },
]

const FAQs = (props: Props) => {
  const [show, handleShow] = useState(false)
  return (
    <div
      id="faqs"
      className="relative mt-5 flex min-h-fit w-full snap-center flex-col  items-start justify-start gap-4 bg-black px-[10%] pb-10  transition-all duration-500 ease-in-out sm:mt-10 md:max-h-[100vh] md:px-[10%]"
    >
      <div className="relative flex w-full items-start">
        <div className="font-marker text-3xl font-black uppercase">
          FAQs
          <hr aria-orientation="horizontal" className="my-5" />
          <img
            src="/images/transparentBg/416bgt.png"
            alt=""
            className="absolute right-[320px] top-[-120px] hidden w-[200px] object-contain lg:block"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 transition-all duration-700 md:grid-cols-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="group flex h-fit flex-col rounded-md bg-gray-800 px-20 py-8 transition-all duration-500 ease-in-out"
          >
            <div className="flex  items-center justify-between">
              <h1 className="font-bold uppercase tracking-widest text-gray-400">
                {faq.question}
              </h1>
              {/* <div
                className="cursor-pointer rounded-md bg-gray-600 p-2"
                onClick={() => handleShow(!show)}
              >
                {show ? (
                  <MinusIcon className="h-4" />
                ) : (
                  <PlusIcon className="h-4" />
                )}
              </div> */}
            </div>
            <div className={`mt-6 hidden group-hover:block`}>
              <p className="text-xs font-normal tracking-widest text-gray-400">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQs
