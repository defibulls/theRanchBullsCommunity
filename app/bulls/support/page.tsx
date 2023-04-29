import React from "react";
import Header from "../../Header";
import FAQs from "./FAQs";

type Props = {};

const Support = (props: Props) => {
  return (
    <div>
      <Header notLanding={true} />
      <section className="pt-24 min-h-screen flex flex-col justify-center items-center">
        <FAQs />
      </section>
    </div>
  );
};

export default Support;
