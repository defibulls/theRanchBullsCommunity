import React from "react";
import About from "./About";
import Banner from "./Banner";
import Roadmap from "./Roadmap";
import Slider from "./Slider";
import Tokenomics from "./Tokenomics";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="h-full w-full overflow-x-hidden ">
      <Banner />
      <About />
      <Slider />
      <Roadmap />
      <Tokenomics />
    </div>
  );
};

export default Home;
