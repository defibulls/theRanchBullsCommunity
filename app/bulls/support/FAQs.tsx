import { client } from "../../../lib/sanity";
import Faq from "./Faq";

const fetchFaqs = async () => {
  const query = `
      *[_type == "faqs"]{
        question,
        answer
      }
    `;
  const sanityResponse = await client.fetch(query);
  return sanityResponse;
};

const FAQs = async () => {
  const faqs = await fetchFaqs();

  return (
    <div
      id="faqs"
      className="relative mt-5 flex min-h-fit w-full flex-col  items-start justify-start gap-4 bg-black px-[10%] pb-10 transition-all duration-500 ease-in-out sm:mt-10 md:min-h-[100vh] md:px-[10%]"
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
      <div className="grid grid-cols-1 gap-10  md:grid-cols-2">
        {faqs.map((faq: any, i: number) => (
          <Faq answer={faq.answer} question={faq.question} key={i} />
        ))}
      </div>
    </div>
  );
};

export default FAQs;
