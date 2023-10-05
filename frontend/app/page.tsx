import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "./components/navbar/navbar";
import { cookies } from "next/headers";
import Image from "next/image";
export default async function Home() {
  return (
    <div className="">
      <div className="h-screen p-2">
        <div className="min-h-full  flex flex-wrap container justify-center items-center mx-auto">
          <div className="basis-full md:basis-1/2 pt-2">
            <p className="text-4xl font-bold text-gray-100">
              <span className="text-white text-[3rem]">NEW</span> COMPETITIVE
              TOURNAMENT
              <br />
              <span className="text-green-800 text-[3rem]"> L</span>EAGUE{" "}
              <span className="text-white text-[3rem]">O</span>F{" "}
              <span className="text-red-800 text-[3rem]">L</span>EGENDS
            </p>
            <p className="text-2xl font-bold text-white pt-4">WHO WE ARE</p>
            <p className="text-lg text-gray-100 tracking-wide ">
              EFM League is where League of Legends legends come to life. We are
              a group of LoL enthusiasts who have come together to create a
              unique and stimulating community for all League of Legends
              players. Our league was born from friendship and a shared passion
              for the game, and it's open to players of all levels, from novice
              to expert.
            </p>
            <p className="text-2xl font-bold text-white pt-4">OUR MISSION</p>
            <p className="text-lg text-gray-100 tracking-wide">
              EFM League is committed to promoting friendship, healthy
              competition, and individual growth within the League of Legends
              community. We want to provide an extraordinary gaming experience
              where all participants feel involved and appreciated.
            </p>
          </div>
          <div className="basis-full pt-8 md:basis-1/2 md:pt-0">
            <Image
              src="/img/logo/Logocentrato.png"
              className="mx-auto md:max-h-[450px]"
              height={500}
              width={500}
              alt=""
            />
          </div>
        </div>
        <div className="container mx-auto py-14">
          <p className="text-4xl font-bold text-gray-100 text-center ">
            DOWNLOAD:
          </p>
          <div className="flex justify-evenly flex-wrap">
            <a href="./pdf/regolamento.pdf" download>
              <div className=" text-gray-100 text-[2rem] min-w-[300px] text-center bg-blue-600 p-3 rounded-lg font-bold mt-4 hover:bg-blue-900 hover:cursor-pointer">
                REGOLAMENTO
              </div>
            </a>
            <a href="./pdf/organigramma.pdf" download>
              <div className="text-gray-100 text-[2rem] min-w-[300px] text-center bg-red-600 p-3 rounded-lg font-bold mt-4 hover:bg-red-900 hover:cursor-pointer">
                ORGANIGRAMMA
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
