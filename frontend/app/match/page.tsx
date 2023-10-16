import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import MatchHistory from "../components/tailwind/matchHistory";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });

  const { data: allGames } = await supabase
    .from("Match")
    .select("*")
    .order("date", { ascending: false });
  if (!allGames) {
    return;
  }
  return (
    <div>
      <div className="container mx-auto pt-6">
        <p className="text-center text-white text-[3rem] font-bold">
          MATCH HISTORY EFM League
        </p>
        <div className="">
          {allGames.map(async (game) => (
            <div key={game.IDPartita}>
              <MatchHistory
                game={await supabase
                  .from("hasplayed_match_merged")
                  .select("*")
                  .eq("IDPartita", game.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
