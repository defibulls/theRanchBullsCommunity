import React from "react";
import Header from "../Header";

const Home = async () => {
  return (
    <div className="">
      <Header notLanding={false} />
      <main className="h-screen w-full flex font-marker text-4xl text-white justify-center items-center">
        Coming Soon
      </main>
    </div>
  );
};

export default Home;
