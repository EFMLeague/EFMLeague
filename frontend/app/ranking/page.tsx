import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { RankingRow, computeRankings } from "./computeRankings";
import { fetchAll } from "../utils/supabase/fetchAll";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });

  const [users, matches, plays] = await Promise.all([
    fetchAll(supabase, "user", "id,name,warnings"),
    fetchAll(supabase, "league_match", "id,date"),
    fetchAll(
      supabase,
      "has_played_league_match",
      "user_id,match_id,mvp,hasWon,score"
    ),
  ]);

  const rankings = computeRankings(users, matches, plays);

  return (
    <div>
      <div className="container mx-auto pt-6">
        <div className="text-center">
          <p className="text-4xl font-bold text-white">
            OUR <span className="text-red-600">NUMBERS</span>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 py-10 text-3xl font-bold text-white">
            <div className="text-center mx-auto">
              <p className="text-hero">{rankings.subscribers}</p>
              <p className="text-base">Subscriber</p>
            </div>
            <div className="text-center mx-auto">
              <p className="text-hero">{rankings.gamesPlayed}</p>
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
          <RankingTable
            title="HIGHEST WIN RATE"
            border="border-white-600"
            shadow="shadow-tableWhite"
            text="text-white-600"
            rows={rankings.winRate}
            format={(value) => value.toFixed(2)}
            valueClass={(value) =>
              value >= 50
                ? "bg-green-200 overflow-hidden rounded-r-sm"
                : "bg-red-200 rounded-r-sm"
            }
          />
          <RankingTable
            title="Most winning player"
            border="border-green-600"
            shadow="shadow-tableGreen"
            text="text-green-600"
            rows={rankings.mostWinning}
          />
          <RankingTable
            title="TOP POINTS FARMER"
            border="border-black"
            shadow="shadow-tableBlack"
            text="text-black-600"
            rows={rankings.mostPoints}
          />
          <RankingTable
            title="Most losing player"
            border="border-red-600"
            shadow="shadow-tableRed"
            text="text-red-600"
            rows={rankings.mostLosing}
          />
          <RankingTable
            title="Most active player"
            border="border-blue-600"
            shadow="shadow-tableBlue"
            text="text-blue-600"
            rows={rankings.mostActive}
          />
          <RankingTable
            title="TROFEO PEPE"
            border="border-purple-600"
            shadow="shadow-tablePurple"
            text="text-purple-600"
            rows={rankings.warnings}
          />
          <RankingTable
            title="KING OF SOLA"
            border="border-orange-600"
            shadow="shadow-tableOrange"
            text="text-orange-600"
            rows={rankings.sola}
          />
          <RankingTable
            title="Most MVP"
            border="border-yellow-600"
            shadow="shadow-tableYellow"
            text="text-yellow-600"
            rows={rankings.mostMvp}
          />
        </div>
      </div>
      {rankings.winStreak.names.length > 0 && (
        <p className="text-4xl font-bold text-white text-center py-10">
          <span className="bg-white text-black p-2">HIGHEST WIN STREAK:</span>
          {rankings.winStreak.names.map((name) => (
            <React.Fragment key={name}>
              <br />
              <br />
              <a href={"./user/" + name}>
                <span className="bg-black border p-2 hover:bg-neutral-900">
                  {name} (<span className="">{rankings.winStreak.value}</span>)
                </span>
              </a>
            </React.Fragment>
          ))}
        </p>
      )}
    </div>
  );
}

const MEDALS = ["medal_gold", "medal_silver", "medal_bronze"];

function RankingTable({
  title,
  border,
  shadow,
  text,
  rows,
  format = (value) => String(value),
  valueClass = () => "",
}: {
  title: string;
  border: string;
  shadow: string;
  text: string;
  rows: RankingRow[];
  format?: (value: number) => string;
  valueClass?: (value: number) => string;
}) {
  return (
    <div
      className={`bg-white grid grid-cols-6 text-black ${border} border-2 ${shadow} rounded-md m-3`}
    >
      <div className={`col-span-6 border ${border} ${shadow}`}>
        <p
          className={` ${text} text-center font-bold uppercase text-[2rem]`}
        >
          {title}
        </p>
      </div>
      {rows.map((player, index) => (
        <React.Fragment key={player.name}>
          <div className="col-span-1 p-1 border-b border-r border-neutral-200">
            {index < MEDALS.length ? (
              <img
                src={`../img/logo/${MEDALS[index]}.png`}
                className="h-8 mx-auto"
                alt=""
              />
            ) : (
              index + 1
            )}
          </div>
          <div className="col-span-4 p-1 border-b border-neutral-200 hover:bg-neutral-100">
            <a className="p-2" href={"./user/" + player.name}>
              {player.name}
            </a>
          </div>
          <div
            className={
              "col-span-1 p-1 font-bold border-b border-neutral-200 " +
              valueClass(player.value)
            }
          >
            {format(player.value)}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
