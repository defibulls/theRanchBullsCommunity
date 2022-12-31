import React from "react";
import About from "./About";
import Banner from "./Banner";
import Slider from "./Slider";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="h-full w-full overflow-x-hidden ">
      <Banner />
      <About />
      <Slider />
    </div>
  );
};

export default Home;
