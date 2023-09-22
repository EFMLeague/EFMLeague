import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

export default async function Page({
  params: { idmatch },
}: {
  params: {
    idmatch: string;
  };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: match } = await supabase
    .from("user_played_match")
    .select()
    .eq("match_id", idmatch);

  if (match === null) {
    return;
  }
  const extractPlayer = (
    role: "top" | "mid" | "jng" | "adc" | "sup",
    team: "blue" | "red"
  ) => {
    const p = match.find(
      (el) => el.hasPlayed_role === role && el.hasPlayed_team === team
    );
    return <span>{p.user_name}</span>;
  };
  console.log(match);
  return (
    <div>
      <p className="fw-bold text-white text-center title-users bg-black text-nowrap overflow-hidden traslate pt-5">
        GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME
        GAME GAME GAME GAME GAME
      </p>

      {/* <div className="w-100 d-flex justify-content-center">
        <p className="bg-dark match-title">MATCH</p>
      </div>

      <div className="input-match">
        <label className="label-match">MATCH NAME:</label>
      </div>
      <div className="input-match">
        <label className="label-match">DAY OF THE MATCH:</label>
      </div>
      <div className="d-flex justify-content-center align-items-center w-100 p-4">
        <img src="./../img/trofeo.png" width={150} alt="" />
        <label className="label-match">WINNERS</label>
        <img src="./../img/trofeo.png" width={150} alt="" />
      </div> 
        <div className="d-flex justify-content-center align-items-center w-100 p-4 bg-white">
        <img src="./../img/crown1.png" width={150} alt="" />
        <label className="label-match text-black">MVP</label>

        <img src="./../img/crown1.png" width={150} alt="" />
      </div>*/}
      <div className="row">
        <div className="bg-primary col col-md-4">
          <p className="team-name text-center">TEAM BLUE</p>

          <div className="line-role-name">
            <img
              src="./../img/roles/top.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-blue">{extractPlayer("top", "blue")}</p>
          </div>

          <div className="line-role-name">
            <img
              src="./../img/roles/jungle.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-blue">{extractPlayer("jng", "blue")}</p>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/mid.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-blue">{extractPlayer("mid", "blue")}</p>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/bot.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-blue">{extractPlayer("adc", "blue")}</p>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/support.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-blue">{extractPlayer("sup", "blue")}</p>
          </div>
        </div>
        <div className="bg-white col-12 col-md-4 ">
          <div className="row">
            <p className="bg-dark match-title">MATCH</p>
          </div>

          <div className="row">
            <p className="label-match text-black text-center">
              {match[0].match_date.split("T")[0].replaceAll("-", "/")}
            </p>
          </div>
          <div className="row align-items-center">
            <div className="col-4 text-center">
              <img src="./../img/trofeo.png" width={130} alt="" />
            </div>
            <div className="col-4">
              <p className="fs-1 fw-bold text-uppercase text-black text-center">
                {match[0].hasPlayed_hasWon
                  ? match[0].hasPlayed_team
                  : match[0].hasPlayed_team === "RED"
                  ? "BLUE"
                  : "RED"}
              </p>
            </div>
            <div className="col-4 text-center ">
              <img src="./../img/trofeo.png" width={130} alt="" />
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-3 text-center">
              <img src="./../img/crown1.png" width={100} alt="" />
            </div>
            <div className="col-6 ">
              <p className="fs-1 fw-bold text-black text-center ">
                MVP:&nbsp;{match.find((p) => p.hasPlayed_mvp).user_name}
              </p>
            </div>
            <div className="col-3 text-center">
              <img src="./../img/crown1.png" width={100} alt="" />
            </div>
          </div>
        </div>
        <div className="bg-danger col-12 col-md-4">
          <p className="team-name text-center">TEAM RED</p>
          <div className="line-role-name">
            <img
              src="./../img/roles/top.png"
              className="p-1"
              height={50}
              alt=""
            />
            <label className="ruoli-red">{extractPlayer("top", "red")}</label>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/jungle.png"
              className="p-1"
              height={50}
              alt=""
            />
            <label className="ruoli-red">{extractPlayer("jng", "red")}</label>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/mid.png"
              className="p-1"
              height={50}
              alt=""
            />
            <label className="ruoli-red">{extractPlayer("mid", "red")}</label>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/bot.png"
              className="p-1"
              height={50}
              alt=""
            />
            <label className="ruoli-red">{extractPlayer("adc", "red")}</label>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/support.png"
              className="p-1"
              height={50}
              alt=""
            />
            <label className="ruoli-red">{extractPlayer("sup", "red")}</label>
          </div>
        </div>
      </div>

      <p className="fw-bold text-white text-center title-users bg-black text-nowrap overflow-hidden traslate">
        GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME
        GAME GAME GAME GAME GAME
      </p>
    </div>
  );
}
