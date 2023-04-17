"use client";
import { client } from "../../../lib/sanity";
import Faq from "./Faq";
import { Fragment } from "react";
import { useState } from "react";
import faqs from "../../../lib/faqs.json";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const FAQs = () => {
  const [tab, setTab] = useState("Overview");

  return (
    <div
      id="faqs"
      className="relative mt-5 flex min-h-fit w-full flex-col max-w-7xl mx-auto items-start justify-start gap-4 bg-black px-[10%] transition-all duration-500 ease-in-out sm:mt-10 md:min-h-[100vh] md:px-0"
    >
      <div className="h-fit p-10 lg:p-20 bg-gray-900 rounded-2xl">
        <div className="relative flex w-full items-start">
          <div className="font-marker text-3xl font-black uppercase">
            FAQs
            <hr aria-orientation="horizontal" className="my-5" />
          </div>
        </div>
        <div className="flex flex-col items-end justify-center w-full">
          <Menu as="div" className="relative inline-block text-left mb-5">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-400 shadow-sm">
                {tab}
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => setTab("Overview")}
                        className={classNames(
                          active
                            ? "bg-gray-800 text-gray-400"
                            : "text-gray-300",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Overview
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => setTab("Battles")}
                        className={classNames(
                          active
                            ? "bg-gray-800 text-gray-400"
                            : "text-gray-300",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Battles
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => setTab("Bullion")}
                        className={classNames(
                          active
                            ? "bg-gray-800 text-gray-400"
                            : "text-gray-300",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Bullion
                      </div>
                    )}
                  </Menu.Item>
                  <form method="POST" action="#">
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => setTab("Staking & Governance")}
                          className={classNames(
                            active
                              ? "bg-gray-800 text-gray-400"
                              : "text-gray-300",
                            "block w-full px-4 py-2 text-left text-sm cursor-pointer"
                          )}
                        >
                          Staking & Governance
                        </div>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="grid grid-cols-1 gap-10  md:grid-cols-2">
          {faqs.questions
            .filter((faq) => faq.type == tab)
            .map((faq: any, i: number) => (
              <Faq answer={faq.answer} question={faq.question} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
