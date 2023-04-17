import Header from "../../Header";

type Member = {
  name: string;
  designation: string;
  image: any;
  linkedIn: string;
  about: string;
};

const Vault = async () => {
  return (
    <div className="h-full w-full overflow-x-hidden ">
      <Header notLanding={true} />
    </div>
  );
};

export default Vault;
