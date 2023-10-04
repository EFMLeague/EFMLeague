import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import "../../../app/globals.css";
import { getUserByName } from "@/app/utils/riot/getUserByName";
import { getLoLVersion } from "@/app/utils/riot/getLoLVersion";
import { getUserEloFlex } from "@/app/utils/riot/getUserEloFlex";
import { getUserEloSoloQ } from "@/app/utils/riot/getUserEloSoloQ";
import CircularProgress from "@/app/components/tailwind/circularProgress";
import ProgBar from "@/app/components/tailwind/progBar";
import Image from "next/image";
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

  const eloFlex = await getUserEloFlex(userData.id);
  const eloSoloQ = await getUserEloSoloQ(userData.id);
  // console.log(eloSoloQ);
  //CREAZIONE LINK IMMAGINI
  const iconUser =
    "https://ddragon.leagueoflegends.com/cdn/" +
    versionLOL +
    "/img/profileicon/" +
    userData.profileIconId +
    ".png";
  const iconEloSoloQ = "../../img/elo/" + eloSoloQ.tier.toLowerCase() + ".png";
  const iconEloFlex = "../../img/elo/" + eloFlex.tier.toLowerCase() + ".png";
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
  const { data: match } = await supabase.from("Match").select();
  const { data: matchHistory } = await supabase
    .from("hasPlayed")
    .select("*,Match (*)")
    .eq("rUser", users[0].id)
    .order("name", { foreignTable: "Match", ascending: false });

  const { data: rolesPlayed } = await supabase
    .from("win_rate_per_ruolo")
    .select()
    .eq("IDUtente", users[0].id);

  if (
    !winnedMatch ||
    !playedMatch ||
    !mvpMatch ||
    !matchHistory ||
    !prefRole ||
    !match
  ) {
    return;
  }
  const winRate = ((winnedMatch?.length * 100) / playedMatch?.length).toFixed(
    2
  );
  return (
    <div className="">
      <div className="h-screen -z-10 fixed">
        <img src="./img/banner.jpg" className="object-cover h-full" alt="" />
        <div className="overlay"></div>
      </div>
      {users?.map((user) => (
        <div>
          <div className="container md:flex md:justify-center md:items-center mx-auto bg-white pt-6">
            <img
              src={iconUser}
              className="w-20 rounded-full border-2 border-gray-900 object-center mx-auto md:mx-0"
              alt="icon user"
            />
            <p className="text-[2.5rem] md:text-[3.5rem] font-semibold text-center">
              &nbsp;{userData.name}&nbsp;
            </p>
            <img
              src={iconUser}
              className="w-20 rounded-full border-2 border-gray-900 object-center mx-auto hidden md:block md:mx-0"
              alt="icon user"
            />
          </div>
          <div className="flex justify-center flex-wrap container mx-auto bg-white p-6">
            <div className="flex flex-col justify-center items-center basis-full">
              <div className="flex">
                <div className="">
                  <div className="relative">
                    <img src={iconEloSoloQ} className="w-48" alt="elo user" />
                    <p className="text-center font-light italic absolute bottom-4 left-[50%] -translate-x-[50%]">
                      Solo/Duo
                    </p>
                  </div>
                  <p className="text-center text-2xl font-semibold">
                    {eloSoloQ.tier}&nbsp;<span>{eloSoloQ.rank}</span>
                  </p>
                </div>
                <div>
                  <div className="relative">
                    <img src={iconEloFlex} className="w-48" alt="elo user" />
                    <p className="text-center font-light italic absolute bottom-4 left-[50%] -translate-x-[50%]">
                      Flex
                    </p>
                  </div>
                  <p className="text-center text-2xl font-semibold">
                    {eloFlex.tier}&nbsp;<span>{eloFlex.rank}</span>
                  </p>
                </div>
              </div>
            </div>
            <p className="basis-full text-[2rem] font-bold italic py-6">
              EFM League stats
            </p>
            <div className="flex justify-center items-center flex-wrap">
              <CircularProgress
                percent={winRate}
                textInside={winRate}
                textSpan="%"
                color={Number(winRate) >= 50 ? "#4caf50" : "#f44336"}
                title="WinRate"
              />
              <CircularProgress
                percent={(
                  (100 * Number(playedMatch?.length.toFixed(2))) /
                  match?.length
                ).toString()}
                textInside={playedMatch?.length.toString()}
                textSpan={" of " + match?.length}
                color={"blue"}
                title="Presence"
              />
            </div>

            <div className="grid grid-cols-9 border place-items-center gap-4 shadow-md p-3">
              <div className="col-span-2">Roles</div>
              <div className="col-span-1">Played</div>
              <div className="col-span-3">WinRate</div>
              <div className="col-span-3">PlayRate</div>
              {rolesPlayed?.map((roleStats) => (
                <>
                  <div className="flex col-span-2">
                    <img
                      src={"/img/roles/" + roleStats.Ruolo + ".png"}
                      alt=""
                      className="h-12"
                    />
                  </div>
                  <div className="col-span-1 text-lg">
                    {roleStats.PartiteGiocate}
                  </div>
                  <div className="col-span-3 w-full">
                    <ProgBar
                      value={roleStats.WinRate.toFixed(2)}
                      colors={
                        roleStats.WinRate.toFixed(2) >= 50 ? "green" : "red"
                      }
                      barProps={
                        roleStats.WinRate.toFixed(2) <= 0.0 &&
                        roleStats.PartiteGiocate != 0
                          ? "bg-red-500"
                          : ""
                      }
                    />
                  </div>
                  <div className="col-span-3 w-full">
                    <ProgBar
                      value={Number(
                        (
                          (roleStats.PartiteGiocate * 100) /
                          playedMatch?.length
                        ).toFixed(2)
                      )}
                      colors={"blue"}
                      barProps=""
                    />
                  </div>
                </>
              ))}
            </div>
            <div className="grid grid-cols-3 w-full py-6">
              <div className="flex justify-between items-center col-span-3 md:col-span-1 md:justify-center">
                <p className="text-4xl font-semibold bg-white ">
                  Points:&nbsp;
                  {winnedMatch
                    ? winnedMatch.length - Math.round(users[0].warnings / 2)
                    : "errore"}
                </p>
                <Image
                  src={"/img/icons/cup64.png"}
                  height={64}
                  width={64}
                  alt=""
                ></Image>
              </div>
              <div className="flex justify-between items-center col-span-3 md:col-span-1 md:justify-center">
                <p className="text-4xl font-semibold bg-white ">
                  Warnings:&nbsp;{users[0].warnings}&nbsp;
                </p>
                <Image
                  src={"/img/icons/yellowCard64.png"}
                  height={64}
                  width={64}
                  alt=""
                ></Image>
              </div>
              <div className="flex justify-between items-center col-span-3 md:col-span-1 md:justify-center">
                <p className="text-4xl font-semibold bg-white ">
                  MVP:&nbsp;{mvpMatch.length}&nbsp;
                </p>
                <Image
                  src={"/img/icons/crown64.png"}
                  height={64}
                  width={64}
                  alt=""
                ></Image>
              </div>
            </div>
            {/* <div className=" bg-white min-w-[350px] mt-4">
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

              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-black text-white">
                  &nbsp;MVP&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white border border-black">
                  &nbsp;{mvpMatch.length}&nbsp;
                </p>
              </div>
            </div> */}
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
