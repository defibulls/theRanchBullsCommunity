import React from "react";
import Banner from "./Banner";
import Header from "./Header";

type Props = {};

const Home = async (props: Props) => {
  return (
    <div className="">
      <Header notLanding={false} />
      <Banner />
    </div>
  );
};

export default Home;
