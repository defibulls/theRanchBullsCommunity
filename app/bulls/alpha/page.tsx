import React from "react";
import Header from "../../Header";
import Card from "./Card";

type Props = {};

const data = [
  {
    name: "Bronze",
    price: 350,
    totalSupply: 60,
    points: 52500,
    description: "",
  },
  {
    name: "Silver",
    price: 1000,
    totalSupply: 30,
    points: 175000,
    description: "",
  },
  {
    name: "Gold",
    price: 5000,
    totalSupply: 10,
    points: 1000000,
    description: "",
  },
];

const Home = async (props: Props) => {
  return (
    <div className="pb-20 md:pb-0">
      <Header notLanding={true} />

      <main className="min-h-screen md:mt-5 mt-20 max-w-7xl mx-auto grid md:grid-cols-3 grid-cols-1 w-full sm:grid-cols-2 px-10 md:place-content-center place-items-center gap-10">
        {data.map((nft, i) => (
          <Card
            key={i}
            name={nft.name}
            points={nft.points}
            price={nft.price}
            totalSupply={nft.totalSupply}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;
