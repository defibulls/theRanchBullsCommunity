import { client } from "../../../lib/sanity";
import Header from "../../Header";
import Member from "./Member";
import imageUrlBuilder from "@sanity/image-url";

type Member = {
  name: string;
  designation: string;
  image: any;
  linkedIn: string;
  about: string;
};

const builder = imageUrlBuilder(client);

const getTeam = async () => {
  const query = `
      *[_type == "team"] | order(DateOfBirth asc){
        name,
        designation,
        image,
		    linkedIn,
        about
      }
    `;
  const sanityResponse: Member[] = await client.fetch(query);
  return sanityResponse;
};

const Team = async () => {
  const urlFor = (source: any) => {
    return builder.image(source);
  };

  // const team = await getTeam();

  const team = [
    {
      name: "Dustin Perry",
      linkedIn: "https://www.linkedin.com/in/dustin-perry-55a410177/",
      designation: "Founder",
      about:
        "I am a proud veteran of the US Army with eight years of service under my belt. Throughout my military career, I discovered my passion for technology, which has since become my career. I began building communication networks during my time in the service, and this led me to develop Apple iOS apps purely out of interest. Over time, I became a Network Engineer and eventually transitioned into a Systems Engineering role, where I currently work on SD-WAN projects. However, my true passion lies in creating projects that make a difference. I am building 'The Ranch' project and ecosystem for two reasons: my belief in the potential of technology and my desire to make a positive impact. I'm not doing this for financial gain; it's a genuine passion of mine. As the founder of this project, I understand that no one cares about it as much as I do. That's why I am building it myself and putting in more effort and thought than anyone else could bring to the team. When I advertise, I will provide full transparency about the project, more so than 99% of crypto/DeFi projects. I've built the code and events that put this information clearly on the blockchain for easy consumption.",
      image: "/team/dustin.jpg",
    },
    {
      name: "Sameem",
      linkedIn: "https://www.linkedin.com/in/sameembaba/",
      designation: "Frontend Developer",
      about:
        "Sameem is a core member of our team and a skilled Web3 Developer, passionate about developing and exploring the capabilities of blockchain technology. He brings a wealth of experience and knowledge to the table, having honed his skills as a project web developer and web3 enthusiast. Sameem has a keen eye for detail and is constantly pushing himself to stay up-to-date with the latest trends and advancements in the field. He is a valuable asset to our team and plays a vital role in shaping our project's success.",
      image: "/team/sameem.jpg",
    },
  ];

  return (
    <div className="h-full w-full overflow-x-hidden ">
      <Header notLanding={true} />
      <section className="min-h-screen mt-32 flex flex-col justify-center items-cen">
        <h1 className="text-2xl  text-gray-500 font-semibold tracking-widest ml-10">
          TEAM
        </h1>
        <div className="grid grid-cols-1 w-full px-20 place-items-center gap-5 gap-y-10 ">
          {team.map((member: Member, i: number) => (
            <Member
              key={i}
              linkedIn={member.linkedIn}
              about={member.about}
              name={member.name}
              designation={member.designation}
              image={member.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;
