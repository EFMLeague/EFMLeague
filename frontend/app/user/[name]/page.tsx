import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import "../../../app/globals.css";
import { getUserByName } from "@/app/utils/riot/getUserByName";
import { getLoLVersion } from "@/app/utils/riot/getLoLVersion";
import { getUserEloFlex } from "@/app/utils/riot/getUserEloFlex";
import { getUserEloSoloQ } from "@/app/utils/riot/getUserEloSoloQ";

export default async function Page({
  params: { name },
}: {
  params: {
    name: string;
  };
}) {
  const supabase = createServerComponentClient({ cookies });

  const userData = await getUserByName(name);
  const versionLOL = await getLoLVersion();

  const iconUser =
    "https://ddragon.leagueoflegends.com/cdn/" +
    versionLOL +
    "/img/profileicon/" +
    userData.profileIconId +
    ".png";

  const eloFlex = await getUserEloFlex(userData.id);
  const eloSoloQ = await getUserEloSoloQ(userData.id);

  const { data: users } = await supabase
    .from("User")
    .select()
    .eq("puuid", userData.puuid);

  if (!users) {
    return;
  }

  const { data: playedMatch } = await supabase
    .from("hasPlayed")
    .select("")
    .eq("rUser", users[0].id);

  const { data: mvpMatch } = await supabase
    .from("hasPlayed")
    .select("")
    .eq("rUser", users[0].id)
    .eq("mvp", "true");

  const { data: winnedMatch } = await supabase
    .from("hasPlayed")
    .select("")
    .eq("rUser", users[0].id)
    .eq("hasWon", true);

  const { data: prefRole } = await supabase
    .from("ruolo_piu_giocato")
    .select("*")
    .eq("IDUtente", users[0].id)
    .order("ConteggioRuolo", { ascending: false });

  const { data: matchHistory } = await supabase
    .from("hasPlayed")
    .select("*,Match (*)")
    .eq("rUser", users[0].id)
    .order("name", { foreignTable: "Match", ascending: false });

  if (!winnedMatch || !playedMatch || !mvpMatch || !matchHistory || !prefRole) {
    return;
  }
  return (
    <div className="">
      <div className="h-screen -z-10 fixed">
        <img src="./img/banner.jpg" className="object-cover h-full" alt="" />
        <div className="overlay"></div>
      </div>
      {users?.map((user) => (
        <div>
          <div className="flex justify-center flex-wrap container mx-auto bg-white">
            <img src={iconUser} alt="" />
            {/* {user.video_source ? (
              <video
                className="max-h-[700px]"
                autoPlay
                muted
                loop
                controls={false}
              >
                <source
                  src={"./../video/Presentazione" + users[0].name + ".mp4"}
                  type="video/mp4"
                />
              </video>
            ) : (
              <img
                className="max-h-[700px]"
                src={"./../img/screenshots/frame_intro.jpg"}
                alt=""
              />
            )} */}

            <div className=" bg-white min-w-[350px]">
              <p className="text-[2.5rem] font-semibold bg-white  text-center">
                &nbsp;{userData.name}&nbsp;
              </p>
              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-black text-white">
                  &nbsp;GAMES PLAYED&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white border border-black">
                  &nbsp;{playedMatch?.length}&nbsp;
                </p>
              </div>
              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-black text-white">
                  &nbsp;ROLE&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white uppercase border border-black">
                  &nbsp;{prefRole[0].ruoloPiuGiocato}&nbsp;-&nbsp;
                  {(
                    (prefRole[0].ConteggioRuolo * 100) /
                    playedMatch?.length
                  ).toFixed(2)}
                  %
                </p>
              </div>
              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-black text-white">
                  &nbsp;POINTS&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white border border-black">
                  &nbsp;
                  {winnedMatch
                    ? winnedMatch.length - Math.round(users[0].warnings / 2)
                    : "errore"}
                  &nbsp;
                </p>
              </div>
              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-black text-white">
                  &nbsp;AMMONIZIONI&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white border border-black">
                  &nbsp;{users[0].warnings}&nbsp;
                </p>
              </div>
              {/* <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-white">&nbsp;RUOLO PREFERITO :&nbsp;</p>
                <p className="text-2xl font-semibold bg-white">&nbsp;{users[0].warnings}&nbsp;</p>
              </div> */}
              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-black text-white">
                  &nbsp;WR&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white border border-black">
                  &nbsp;
                  {((winnedMatch?.length * 100) / playedMatch?.length).toFixed(
                    2
                  )}
                  % &nbsp;
                </p>
              </div>
              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-black text-white">
                  &nbsp;MVP&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white border border-black">
                  &nbsp;{mvpMatch.length}&nbsp;
                </p>
              </div>
            </div>
          </div>
          {/* <div className="container mx-auto pt-6">
            <p className="text-white text-[3rem] uppercase font-bold">
              Match history
            </p>
          </div>
          <div className="container mx-auto grid grid-cols-12 bg-white rounded-xl my-10">
            <div className="col-span-3 p-2 font-bold text-[1.4rem] uppercase border-2 bg-purple-200">
              Data
            </div>
            <div className="col-span-3 p-2 font-bold text-[1.4rem] uppercase border-2 bg-yellow-200">
              Role
            </div>
            <div className="col-span-3 p-2 font-bold text-[1.4rem] uppercase border-2 bg-blue-200">
              Team
            </div>
            <div className="col-span-3 p-2 font-bold text-[1.4rem] uppercase border-2 bg-neutral-200">
              Result
            </div>
            {matchHistory.reverse().map((game) => (
              <a
                href={"/match/" + game.rMatch}
                className="col-span-12 grid grid-cols-12 hover:scale-105"
              >
                <div className="col-span-3 p-2 bg-purple-50 border-b-2 border-black/20">
                  {game.Match.date.split("T")[0].replaceAll("-", "/")}
                </div>
                <div className="col-span-3 p-2 bg-yellow-50 text-[1.3rem] border-b-2 border-black/20">
                  {game.role === "adc" ? "Botlane" : ""}
                  {game.role === "sup" ? "Support" : ""}
                  {game.role === "jng" ? "Jungle" : ""}
                  {game.role === "top" ? "Toplane" : ""}
                  {game.role === "mid" ? "Midlane" : ""}
                </div>
                <div className="col-span-3 p-2 bg-blue-50 text-[1.3rem] border-b-2 border-black/20 uppercase">
                  {game.team}
                </div>
                <div
                  className={
                    "col-span-3 p-2 font-bold text-[1.3rem] border-b-2 border-black/20  " +
                    (game.hasWon ? "bg-green-200" : "bg-red-200")
                  }
                >
                  {game.hasWon ? "WIN" : "LOSE"}
                </div>
              </a>
            ))}
          </div> */}
        </div>
      ))}
    </div>
  );
}
