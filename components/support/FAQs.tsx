import React, { useState } from 'react'
import { client } from '../../lib/sanity'

const faqs = [
  {
    id: 1,
    question:
      'How many BTC BULL NFTs will there be, and will there ever be any more?',
    answer:
      '10,000 BTC BULLS to start, and that’s the final cap we will ever produce.',
  },
  {
    id: 2,
    question: 'How much does it cost for 1 BTC BULL?',
    answer:
      '$350 paid in USDC.e on the polygon blockchain. \n USDC.e Contract:  0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  },
  {
    id: 3,
    question: 'When will I get the BTC mined?',
    answer:
      'Monthly deposits back into the contracts between the 1-5th of every month in the form of WBTC',
  },
]

const FAQs = () => {
  const [faqs, setFaqs] = useState<any>([])
  const fetchFaqs = async () => {
    const query = `
      *[_type == "faqs"]{
        question,
        answer
      }
    `
    const sanityResponse = await client.fetch(query)
    setFaqs(sanityResponse)
  }

  fetchFaqs()
  return (
    <div
      id="faqs"
      className="relative mt-5 flex min-h-fit w-full snap-center flex-col  items-start justify-start gap-4 bg-black px-[10%] pb-10  transition-all duration-500 ease-in-out sm:mt-10 md:min-h-[100vh] md:px-[10%]"
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
        {faqs.map((faq: any, i: number) => (
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
