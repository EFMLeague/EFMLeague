import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

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

  if (!winnedMatch || !playedMatch || !mvpMatch) {
    return;
  }

  return (
    <div className="background-user">
      {users?.map((user) => (
        <div>
          <p className="fw-bold text-white text-center title-users bg-black text-nowrap overflow-hidden traslate">
            PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER
            PLAYER
          </p>
          <div className="d-flex justify-content-center flex-wrap p-4">
            <video className="video-card" autoPlay muted loop>
              <source src="./../video/PresentazioneNico.mp4" type="video/mp4" />
            </video>
            <div className="">
              <div className="d-flex flex-wrap p-2">
                <p className="subtitle-users">&nbsp;PERSONAL &nbsp;</p>
                <p className="subtitle-users">&nbsp;STATS &nbsp;</p>
              </div>

              <div className="d-flex flex-wrap p-2">
                <p className="counters">&nbsp;RANK :&nbsp;</p>
                <p className="counters">&nbsp;PLATINUM&nbsp;</p>
              </div>

              <div className="d-flex flex-wrap p-2">
                <p className="counters">&nbsp;WinRate :&nbsp;</p>
                <p className="counters">&nbsp;50%&nbsp;</p>
              </div>

              <div className="d-flex flex-wrap p-2">
                <p className="subtitle-users">&nbsp;CUSTOM &nbsp;</p>
                <p className="subtitle-users">&nbsp;STATS &nbsp;</p>
              </div>
              <div className="d-flex flex-wrap p-2">
                <p className="counters">&nbsp;GAMES PLAYED :&nbsp;</p>
                <p className="counters">&nbsp;{playedMatch?.length}&nbsp;</p>
              </div>
              <div className="d-flex flex-wrap p-2">
                <p className="counters">&nbsp;POINTS :&nbsp;</p>
                <p className="counters">
                  &nbsp;
                  {winnedMatch
                    ? winnedMatch.length - Math.round(users[0].warnings / 2)
                    : "errore"}
                  &nbsp;
                </p>
              </div>
              <div className="d-flex flex-wrap p-2">
                <p className="counters">&nbsp;AMMONIZIONI :&nbsp;</p>
                <p className="counters">&nbsp;{users[0].warnings}&nbsp;</p>
              </div>
              <div className="d-flex flex-wrap p-2">
                <p className="counters">&nbsp;WR :&nbsp;</p>
                <p className="counters">
                  &nbsp;
                  {((winnedMatch?.length * 100) / playedMatch?.length).toFixed(
                    2
                  )}
                  % &nbsp;
                </p>
              </div>
              <div className="d-flex flex-wrap p-2">
                <p className="counters">&nbsp;MVP :&nbsp;</p>
                <p className="counters">&nbsp;{mvpMatch.length}&nbsp;</p>
              </div>
            </div>
          </div>
          <p className="fw-bold text-white text-center title-users bg-black text-nowrap overflow-hidden traslate1">
            PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER
            PLAYER
          </p>
        </div>
      ))}
    </div>
  );
}
