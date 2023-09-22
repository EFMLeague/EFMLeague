import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "./components/navbar/navbar";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: users } = await supabase
    .from("User")
    .select()
    .order("name", { ascending: true });
  const { data: match } = await supabase.from("Match").select();

  const { data: mostWinningPlayers } = await supabase
    .from("most_winning_players")
    .select();

  const { data: mostLosingPlayers } = await supabase
    .from("most_losing_players")
    .select();

  const { data: mostActivePlayer } = await supabase
    .from("most_playing_players")
    .select();
  const { data: mostMvpPlayer } = await supabase
    .from("most_mvp_players")
    .select();

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

      <div className="container mx-auto">
        <div className="text-center">
          <p className="text-4xl font-bold text-white">
            OUR <span className="text-red-600">NUMBERS</span>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 py-10 text-3xl font-bold text-white">
            <div className="text-center mx-auto">
              <p className="text-hero">{users?.length}</p>
              <p className="text-base">Subscriber</p>
            </div>
            <div className="text-center mx-auto">
              <p className="text-hero">{match?.length}</p>
              <p className="text-base">games played</p>
            </div>
            <div className="text-center mx-auto">
              <p className="text-hero">43</p>
              <p className="text-base">New friends</p>
            </div>
            <div className="text-center mx-auto">
              <p className="text-hero">12</p>
              <p className="text-base">Match for week</p>
            </div>
            <div className="text-center mx-auto col-span-2 md:col-span-1">
              <p className="text-hero">00</p>
              <p className="text-base">Kicked</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto" id="rankings">
        <p className="text-4xl font-bold text-white text-center">
          <span className="">OUR</span>{" "}
          <span className="text-blue-700">RANKINGS</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          <div className="bg-white grid grid-cols-6 text-black border-green-600 border-2 shadow-tableGreen rounded-md  m-3">
            <div className="col-span-6 border border-green-600 shadow-tableGreen">
              <p className=" text-green-600 text-center font-bold uppercase text-[2rem]">
                Most winning player
              </p>
            </div>

            {mostWinningPlayers?.map((player, index) => (
              <>
                <div className="col-span-1 p-1 border-b border-r border-neutral-200">
                  {index + 1}
                </div>
                <div className="col-span-4 p-1 border-b border-neutral-200">
                  {player.name}
                </div>
                <div className="col-span-1 p-1 font-bold border-b border-neutral-200">
                  {player.win}
                </div>
              </>
            ))}
          </div>

          <div className="bg-white grid grid-cols-6 text-black border-red-600 border-2 shadow-tableRed rounded-md  m-3">
            <div className="col-span-6 border border-red-600 shadow-tableRed">
              <p className=" text-red-600 text-center font-bold uppercase text-[2rem]">
                Most losing player
              </p>
            </div>
            {mostLosingPlayers?.map((player, index) => (
              <>
                <div className="col-span-1 p-1 border-b border-r border-neutral-200">
                  {index + 1}
                </div>
                <div className="col-span-4 p-1 border-b border-neutral-200">
                  {player.name}
                </div>
                <div className="col-span-1 p-1 font-bold border-b border-neutral-200">
                  {player.lose}
                </div>
              </>
            ))}
          </div>

          <div className="bg-white grid grid-cols-6 text-black border-blue-600 border-2 shadow-tableBlue rounded-md m-3">
            <div className="col-span-6 border border-blue-600 shadow-tableBlue">
              <p className=" text-blue-600 text-center font-bold uppercase text-[2rem]">
                Most active player
              </p>
            </div>
            {mostActivePlayer?.map((player, index) => (
              <>
                <div className="col-span-1 p-1 border-b border-r border-neutral-200">
                  {index + 1}
                </div>
                <div className="col-span-4 p-1 border-b border-neutral-200">
                  {player.name}
                </div>
                <div className="col-span-1 p-1 font-bold border-b border-neutral-200">
                  {player.played}
                </div>
              </>
            ))}
          </div>
        </div>

        {/*
          
          <div className="col-12 col-md-5 mx-auto">
            <div className="row bg-white">
              <div className="col text-center fs-3 fw-bold text-uppercase">
                Most active player
              </div>
            </div>
            {mostActivePlayer?.map((player, index) => (
              <div
                className={
                  "p-1 row border " +
                  (index === 0 ? "bg-warning " : " ") +
                  (index === 1 ? "bg-silver " : " ") +
                  (index === 2 ? "bg-bronze " : " ") +
                  (index > 2 ? " bg-white " : "bg- white")
                }
              >
                <div className="col-2 border-end">{index + 1}</div>
                <div className="col">{player.name}</div>
                <div className="col-2 fw-bold">{player.played}</div>
              </div>
            ))}
          </div>
          <div className="col-12 col-md-5 mx-auto">
            <div className="row bg-white">
              <div className="col text-center fs-3 fw-bold text-uppercase">
                Most performer player
              </div>
            </div>
            {mostMvpPlayer?.map((player, index) => (
              <div
                className={
                  " p-1 row border " +
                  (index === 0 ? "bg-warning " : " ") +
                  (index === 1 ? "bg-silver " : " ") +
                  (index === 2 ? "bg-bronze " : " ") +
                  (index > 2 ? " bg-white " : "bg- white")
                }
              >
                <div className="col-2 border-end">{index + 1}</div>
                <div className="col">{player.name}</div>
                <div className="col-2 fw-bold">{player.played}</div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
