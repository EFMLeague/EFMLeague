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
      <div className="h-screen -z-10 fixed">
        <img src="./img/banner.jpg" className="object-cover h-full" alt="" />
        <div className="overlay"></div>
      </div>
      <div className="h-screen p-2">
        <div className="h-full flex flex-wrap container">
          <div className="basis-full">
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
          <div className="basis-full">
            <img src="./img/logo/Logocentrato.png" alt="" />
          </div>
        </div>
      </div>

      <div className="container pt-5">
        <div className="text-center">
          <p className="text-4xl font-bold text-white">
            OUR <span className="text-red-600">NUMBERS</span>
          </p>
          <div className="grid grid-cols-2 gap-y-10 py-10 text-3xl font-bold text-white">
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
            <div className="text-center mx-auto col-span-2">
              <p className="text-hero">00</p>
              <p className="text-base">Kicked</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <p className="text-4xl font-bold text-white text-center">
          <span className="">OUR</span>{" "}
          <span className="text-blue-700">RANKINGS</span>
        </p>

        <div className="bg-white grid grid-cols-6 text-black ">
          <div className="col-span-6 border border-red-600 shadow-tableYellow">
            <p className=" text-red-600 text-center font-bold">
              Most winning player
            </p>
          </div>
          {mostWinningPlayers?.map((player, index) => (
            <>
              <div className="col-span-1">{index + 1}</div>
              <div className="col-span-4">{player.name}</div>
              <div className="col-span-1 font-bold">{player.win}</div>
            </>
          ))}
        </div>

        {/*
          <div className="col-12 col-md-5 mx-auto">
            <div className="row bg-white">
              <div className="col text-center fs-3 fw-bold text-uppercase">
                Most losing player
              </div>
            </div>
            {mostLosingPlayers?.map((player, index) => (
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
                <div className="col-2 fw-bold">{player.lose}</div>
              </div>
            ))}
          </div>
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
