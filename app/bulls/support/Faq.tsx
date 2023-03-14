"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect, useContext } from "react";
import { ContractContext } from "../../../context/ContractContext";

type Props = {
  question: string;
  answer: string;
  key: number;
};

const Faq = ({ answer, question, key }: Props) => {
  const [show, handleShows] = useState(false);
  const { handleShow } = useContext(ContractContext);

  useEffect(() => {
    handleShow(true);
  }, []);

  return (
    <div key={key} className="relative h-fit">
      <div className="absolute inset-0 bg-purple-500 blur-sm"></div>
      <div className="relative flex h-fit flex-col rounded-md bg-gray-800 px-10 py-8">
        <div className="flex w-full items-center justify-between space-x-4">
          <h1 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            {question}
          </h1>
          <div
            className="cursor-pointer rounded-md bg-gray-600 p-2"
            onClick={() => handleShows(!show)}
          >
            {show ? (
              <MinusIcon className="h-4" />
            ) : (
              <PlusIcon className="h-4" />
            )}
          </div>
        </div>
        <div className={`mt-6 ${!show && "hidden"} `}>
          <p className="text-xs font-normal tracking-widest text-gray-400">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
