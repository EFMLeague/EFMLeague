import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
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
  const { data: mostWrPlayer } = await supabase
    .from("win_rate_utenti")
    .select();
  const { data: users } = await supabase
    .from("User")
    .select()
    .order("name", { ascending: true });
  const { data: warnings } = await supabase
    .from("User")
    .select()
    .neq("name", "FORESTIERO")
    .order("warnings", { ascending: false });
  const { data: sola } = await supabase
    .from("differenza_match_disputati_e_giocati")
    .select();
  const { data: mostPoints } = await supabase
    .from("classifica_punteggi_giocatori")
    .select();
  const { data: match } = await supabase.from("Match").select();

  return (
    <div>
      <div className="container mx-auto pt-6">
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
          <div className="bg-white grid grid-cols-6 text-black border-white-600 border-2 shadow-tableWhite rounded-md m-3">
            <div className="col-span-6 border border-white-600 shadow-tableWhite">
              <p className=" text-white-600 text-center font-bold uppercase text-[2rem]">
                HIGHEST WIN RATE
              </p>
            </div>
            {mostWrPlayer?.map((player, index) => (
              <>
                <div className="col-span-1 p-1 border-b border-r border-neutral-200">
                  {index === 0 ? (
                    <img
                      src="../img/logo/medal_gold.png"
                      className="h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}

                  {index === 1 ? (
                    <img
                      src="../img/logo/medal_silver.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index === 2 ? (
                    <img
                      src="../img/logo/medal_bronze.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index > 2 ? index + 1 : ""}
                </div>
                <div className="col-span-4 p-1 border-b border-neutral-200 hover:bg-neutral-100">
                  <a className="p-2" href={"./user/" + player.NomeUtente}>
                    {player.NomeUtente}
                  </a>
                </div>
                <div
                  className={
                    "col-span-1 p-1 font-bold border-b border-neutral-200 " +
                    (player.WinRate >= 50
                      ? "bg-green-200 overflow-hidden rounded-r-sm"
                      : "bg-red-200 rounded-r-sm")
                  }
                >
                  {parseFloat(player.WinRate).toFixed(2)}
                </div>
              </>
            ))}
          </div>
          <div className="bg-white grid grid-cols-6 text-black border-green-600 border-2 shadow-tableGreen rounded-md  m-3">
            <div className="col-span-6 border border-green-600 shadow-tableGreen">
              <p className=" text-green-600 text-center font-bold uppercase text-[2rem]">
                Most winning player
              </p>
            </div>

            {mostWinningPlayers?.map((player, index) => (
              <>
                <div className="col-span-1 p-1 border-b border-r border-neutral-200">
                  {index === 0 ? (
                    <img
                      src="../img/logo/medal_gold.png"
                      className="h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}

                  {index === 1 ? (
                    <img
                      src="../img/logo/medal_silver.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index === 2 ? (
                    <img
                      src="../img/logo/medal_bronze.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index > 2 ? index + 1 : ""}
                </div>
                <div className="col-span-4 p-1 border-b border-neutral-200 hover:bg-neutral-100">
                  <a className="p-2" href={"./user/" + player.name}>
                    {player.name}
                  </a>
                </div>
                <div className="col-span-1 p-1 font-bold border-b border-neutral-200">
                  {player.win}
                </div>
              </>
            ))}
          </div>

          <div className="bg-white grid grid-cols-6 text-black border-black border-2 shadow-tableBlack rounded-md m-3">
            <div className="col-span-6 border border-black shadow-tableBlack">
              <p className=" text-black-600 text-center font-bold uppercase text-[2rem]">
                TOP POINTS FARMER
              </p>
            </div>
            {mostPoints?.map((player, index) => (
              <>
                <div className="col-span-1 p-1 border-b border-r border-neutral-200">
                  {index === 0 ? (
                    <img
                      src="../img/logo/medal_gold.png"
                      className="h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}

                  {index === 1 ? (
                    <img
                      src="../img/logo/medal_silver.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index === 2 ? (
                    <img
                      src="../img/logo/medal_bronze.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index > 2 ? index + 1 : ""}
                </div>
                <div className="col-span-4 p-1 border-b border-neutral-200 hover:bg-neutral-100">
                  <a className="p-2" href={"./user/" + player.NomeUtente}>
                    {player.NomeUtente}
                  </a>
                </div>
                <div className="col-span-1 p-1 font-bold border-b border-neutral-200 ">
                  {player.Punteggio}
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
                <div className="col-span-1 p-1 border-b border-r border-neutral-200 ">
                  {index === 0 ? (
                    <img
                      src="../img/logo/medal_gold.png"
                      className="h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}

                  {index === 1 ? (
                    <img
                      src="../img/logo/medal_silver.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index === 2 ? (
                    <img
                      src="../img/logo/medal_bronze.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index > 2 ? index + 1 : ""}
                </div>
                <div className="col-span-4 p-1 border-b border-neutral-200 hover:bg-neutral-100">
                  <a className="p-2" href={"./user/" + player.name}>
                    {player.name}
                  </a>
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
                  {index === 0 ? (
                    <img
                      src="../img/logo/medal_gold.png"
                      className="h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}

                  {index === 1 ? (
                    <img
                      src="../img/logo/medal_silver.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index === 2 ? (
                    <img
                      src="../img/logo/medal_bronze.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index > 2 ? index + 1 : ""}
                </div>
                <div className="col-span-4 p-1 border-b border-neutral-200 hover:bg-neutral-100">
                  <a className="p-2" href={"./user/" + player.name}>
                    {player.name}
                  </a>
                </div>
                <div className="col-span-1 p-1 font-bold border-b border-neutral-200">
                  {player.played}
                </div>
              </>
            ))}
          </div>

          <div className="bg-white grid grid-cols-6 text-black border-purple-600 border-2 shadow-tablePurple rounded-md m-3">
            <div className="col-span-6 border border-purple-600 shadow-tablePurple">
              <p className=" text-purple-600 text-center font-bold uppercase text-[2rem]">
                TROFEO PEPE
              </p>
            </div>
            {warnings?.map((player, index) => (
              <>
                <div className="col-span-1 p-1 border-b border-r border-neutral-200">
                  {index === 0 ? (
                    <img
                      src="../img/logo/medal_gold.png"
                      className="h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}

                  {index === 1 ? (
                    <img
                      src="../img/logo/medal_silver.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index === 2 ? (
                    <img
                      src="../img/logo/medal_bronze.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index > 2 ? index + 1 : ""}
                </div>
                <div className="col-span-4 p-1 border-b border-neutral-200 hover:bg-neutral-100">
                  <a className="p-2" href={"./user/" + player.NomeUtente}>
                    {player.name}
                  </a>
                </div>
                <div className="col-span-1 p-1 font-bold border-b border-neutral-200 ">
                  {player.warnings}
                </div>
              </>
            ))}
          </div>
          <div className="bg-white grid grid-cols-6 text-black border-orange-600 border-2 shadow-tableOrange rounded-md m-3">
            <div className="col-span-6 border border-orange-600 shadow-tableOrange">
              <p className=" text-orange-600 text-center font-bold uppercase text-[2rem]">
                KING OF SOLA
              </p>
            </div>
            {sola?.map((player, index) => (
              <>
                <div className="col-span-1 p-1 border-b border-r border-neutral-200">
                  {index === 0 ? (
                    <img
                      src="../img/logo/medal_gold.png"
                      className="h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}

                  {index === 1 ? (
                    <img
                      src="../img/logo/medal_silver.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index === 2 ? (
                    <img
                      src="../img/logo/medal_bronze.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index > 2 ? index + 1 : ""}
                </div>
                <div className="col-span-4 p-1 border-b border-neutral-200 hover:bg-neutral-100">
                  <a className="p-2" href={"./user/" + player.NomeUtente}>
                    {player.NomeUtente}
                  </a>
                </div>
                <div className="col-span-1 p-1 font-bold border-b border-neutral-200 ">
                  {player.Differenza}
                </div>
              </>
            ))}
          </div>
          <div className="bg-white grid grid-cols-6 text-black border-yellow-600 border-2 shadow-tableYellow rounded-md m-3">
            <div className="col-span-6 border border-yellow-600 shadow-tableYellow">
              <p className=" text-yellow-600 text-center font-bold uppercase text-[2rem]">
                Most MVP
              </p>
            </div>
            {mostMvpPlayer?.map((player, index) => (
              <>
                <div className="col-span-1 p-1 border-b border-r border-neutral-200">
                  {index === 0 ? (
                    <img
                      src="../img/logo/medal_gold.png"
                      className="h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}

                  {index === 1 ? (
                    <img
                      src="../img/logo/medal_silver.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index === 2 ? (
                    <img
                      src="../img/logo/medal_bronze.png"
                      className=" h-8 mx-auto"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  {index > 2 ? index + 1 : ""}
                </div>
                <div className="col-span-4 p-1 border-b border-neutral-200 hover:bg-neutral-100">
                  <a className="p-2" href={"./user/" + player.name}>
                    {player.name}
                  </a>
                </div>
                <div className="col-span-1 p-1 font-bold border-b border-neutral-200">
                  {player.played}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <p className="text-4xl font-bold text-white text-center py-10">
        <span className="bg-white text-black p-2">HIGHEST WIN STREAK:</span>{" "}
        <br />
        <br />
        <a href="./user/adoranteguardia">
          <span className="bg-black border p-2 hover:bg-neutral-900">
            adoranteguardia (<span className="">8</span>)
          </span>
        </a>
      </p>
    </div>
  );
}
