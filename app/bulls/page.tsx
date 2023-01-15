import React from "react";
import Header from "../Header";
import About from "./About";
import Banner from "./Banner";
import PresaleDetail from "./PresaleDetail";
import Roadmap from "./Roadmap";
import Slider from "./Slider";
import Tokenomics from "./Tokenomics";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="h-full w-full overflow-x-hidden text-white ">
      <Header notLanding={true} />
      <Banner />
      <About />
      <Slider />
      <PresaleDetail />
      <Tokenomics />
      <Roadmap />
    </div>
  );
};

export default Home;
