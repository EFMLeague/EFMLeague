import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import "../../../app/globals.css";
export default async function Page({
  params: { name },
}: {
  params: {
    name: string;
  };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: users } = await supabase.from("User").select().eq("name", name);
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

  const { data: matchHistory } = await supabase
    .from("hasPlayed")
    .select("*,Match (*)")
    .eq("rUser", users[0].id)
    .order("name", { foreignTable: "Match", ascending: false });

  if (!winnedMatch || !playedMatch || !mvpMatch || !matchHistory) {
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
          <p className="font-bold text-white text-center bg-black overflow-hidden text-[3rem] whitespace-pre w-full">
            PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER
            PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER
          </p>
          <div className="flex justify-center flex-wrap ">
            <video className="max-h-[700px]" autoPlay muted loop>
              <source
                src={"./../video/Presentazione" + users[0].name + ".mp4"}
                type="video/mp4"
              />
            </video>
            <div className="">
              <div className="flex flex-wrap p-2">
                <p className="text-3xl bg-black text-white font-bold">
                  &nbsp;PERSONAL &nbsp;
                </p>
                <p className="text-3xl bg-black text-white font-bold">
                  &nbsp;STATS &nbsp;
                </p>
              </div>

              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;USERNAME :&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;{user.name}&nbsp;
                </p>
              </div>

              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;RANK :&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;soon&nbsp;
                </p>
              </div>

              <div className="flex flex-wrap p-2">
                <p className="text-3xl bg-black text-white font-bold">
                  &nbsp;CUSTOM &nbsp;
                </p>
                <p className="text-3xl bg-black text-white font-bold">
                  &nbsp;STATS &nbsp;
                </p>
              </div>
              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;GAMES PLAYED :&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;{playedMatch?.length}&nbsp;
                </p>
              </div>
              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;POINTS :&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;
                  {winnedMatch
                    ? winnedMatch.length - Math.round(users[0].warnings / 2)
                    : "errore"}
                  &nbsp;
                </p>
              </div>
              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;AMMONIZIONI :&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;{users[0].warnings}&nbsp;
                </p>
              </div>
              {/* <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-white">&nbsp;RUOLO PREFERITO :&nbsp;</p>
                <p className="text-2xl font-semibold bg-white">&nbsp;{users[0].warnings}&nbsp;</p>
              </div> */}
              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;WR :&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;
                  {((winnedMatch?.length * 100) / playedMatch?.length).toFixed(
                    2
                  )}
                  % &nbsp;
                </p>
              </div>
              <div className="flex flex-wrap p-2">
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;MVP :&nbsp;
                </p>
                <p className="text-2xl font-semibold bg-white">
                  &nbsp;{mvpMatch.length}&nbsp;
                </p>
              </div>
            </div>
          </div>
          {/* <div className="container bg-white">
            <div className="row text-center">
              <div className="col fw-bold fs-5">DATE</div>
              <div className="col fw-bold fs-5">GAME&nbsp;NAME</div>
              <div className="col fw-bold fs-5">ROLE</div>
            </div>
            {matchHistory.reverse().map((game) => (
              <a href={"/match/" + game.rMatch}>
                <div
                  className={
                    "row text-center p-2 bg-opacity-25 border-start border-3" +
                    (game.hasWon
                      ? " border-success bg-success"
                      : " border-danger bg-danger")
                  }
                  key={game.id}
                >
                  <div className="col fs-6">
                    {game.Match.date.split("T")[0].replaceAll("-", "/")}
                  </div>
                  <div className="col">{game.Match.name}</div>
                  <div className="col">{game.role}</div>
                </div>
              </a>
            ))}
          </div> */}
          <p className="font-bold text-white text-center bg-black overflow-hidden text-[3rem] whitespace-pre w-full">
            PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER
            PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER
          </p>
        </div>
      ))}
    </div>
  );
}
