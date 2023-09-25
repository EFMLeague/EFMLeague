import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "./components/navbar/navbar";
import { cookies } from "next/headers";

export default async function Home() {
  return (
    <div className="">
      <div className="h-screen p-2">
        <div className="h-full flex flex-wrap container justify-center items-center mx-auto">
          <div className="basis-full md:basis-1/2">
            <p className="text-4xl font-bold text-white">
              <span className="text-blue-800">NEW</span> COMPETITIVE TOURNAMENT
              of :<br />
              <span className="text-blue-800"> L</span>EAGUE{" "}
              <span className="">O</span>F{" "}
              <span className="text-blue-800">L</span>EGENDS
            </p>
            <p className="text-lg text-white">
              Born from the idea of some friends and finally become reality,
              thanks also to the support of foreigners. Place where the tryhard
              is necessary like discord.
            </p>
          </div>
          <div className="basis-ful md:basis-1/2">
            <img
              src="./img/logo/Logocentrato.png"
              className="mx-auto md:max-h-[300px]"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto py-14">
        <p className="text-4xl font-bold text-white text-center ">DOWNLOAD:</p>
        <div className="flex justify-evenly flex-wrap">
          <a href="./pdf/regolamento.pdf" download>
            <div className=" text-white text-[2rem] min-w-[300px] text-center bg-blue-600 p-3 rounded-lg font-bold mt-4 hover:bg-blue-900 hover:cursor-pointer">
              REGOLAMENTO
            </div>
          </a>
          <a href="./pdf/organigramma.pdf" download>
            <div className="text-white text-[2rem] min-w-[300px] text-center bg-red-600 p-3 rounded-lg font-bold mt-4 hover:bg-red-900 hover:cursor-pointer">
              ORGANIGRAMMA
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
