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
      *[_type == "team"] | order(DateOfYear asc){
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

  const team = await getTeam();

  return (
    <div className="h-full w-full overflow-x-hidden ">
      <Header notLanding={true} />
      <section className="mt-24">
        <h1 className="text-2xl  text-gray-500 font-semibold tracking-widest ml-10">
          TEAM
        </h1>
        <div className="grid grid-cols-1 w-full px-20 sm:grid-cols-2 place-items-center gap-5 gap-y-10 md:grid-cols-3">
          {team.map((member: Member, i: number) => (
            <Member
              key={i}
              linkedIn={member.linkedIn}
              about={member.about}
              name={member.name}
              designation={member.designation}
              image={urlFor(member.image).url()}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;
