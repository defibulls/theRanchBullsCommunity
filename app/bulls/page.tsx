import React from "react";
import Header from "../Header";
import About from "./About";
import Banner from "./Banner";
import Bullion from "./Bullion";
import Gamification from "./Gamification";
import PresaleDetail from "./PresaleDetail";
import Roadmap from "./Roadmap";
import Slider from "./Slider";
import Tokenomics from "./Tokenomics";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="h-full w-full bg-black overflow-x-hidden text-white ">
      <Banner />
      <About />
      <Slider />
      <PresaleDetail />
      <Tokenomics />
      {/* <Roadmap /> */}
      <Bullion />
      <Gamification />
    </div>
  );
};

export default Home;
