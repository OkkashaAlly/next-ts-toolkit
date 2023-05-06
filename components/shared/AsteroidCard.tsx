// 'use client'
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { H3 } from "../typography";

import globeImg from "@/assets/globe.jpg";

const AsteroidCard = ({ info }: { info: any }) => {
  console.log("info: ", info);

  return (
    <>
      <div className="border-b border-b-zinc-800 text-zinc-400 hover:text-zinc-200 rounded p-4 px-5 flex items-center hover:bg-[#ea8281]/20">
        <div className="w-[60px]">
          <Image src={globeImg} width={30} height={30} alt={info.name} />
        </div>
        <div className="w-[300px] flex items-baseline">
          <H3 styles="ml-1">{info.name}</H3>
        </div>
        <div className="w-[200px] flex items-baseline">
          <p className="ml-1">{info.close_approach_data[0].orbiting_body}</p>
        </div>
        <div className="w-[200px] flex items-baseline">
          <p className="ml-1">
            {Number(
              info.close_approach_data[0].relative_velocity.kilometers_per_hour
            ).toFixed(2)}
            <small className="text-gray-500 font-light">km/h</small>
          </p>
        </div>
        <div className="w-[200px] flex items-baseline">
          <p className="ml-1">{info.absolute_magnitude_h}</p>
        </div>
        <div className="w-[200px] flex items-baseline">
          <p className="ml-1">
            {info.close_approach_data[0].close_approach_date}
          </p>
        </div>
        <div className="w-[200px] flex items-baseline px-4">
          <Link
            className="rounded-md w-full bg-[#ffc5ad] text-center px-8 py-2 text-zinc-950 flex items-center gap-5"
            href={`/asteroids/${info.id}`}
          >
            <span className="ml-2">View</span>
            <FaExternalLinkAlt className="w-3 h-3" />
          </Link>
        </div>
      </div>
      
    </>
  );
};

export default AsteroidCard;


