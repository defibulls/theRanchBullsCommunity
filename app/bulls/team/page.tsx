import Header from "../../Header";

type Props = {};

const Team = (props: Props) => {
  return (
    <div className="h-full w-full overflow-x-hidden ">
      <Header notLanding={true} />
      <section className="mt-24">
        <h1 className="text-2xl  text-gray-500 font-semibold tracking-widest ml-10">
          TEAM
        </h1>
      </section>
    </div>
  );
};

export default Team;
