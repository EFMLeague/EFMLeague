import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import MatchHistory from "../components/tailwind/matchHistory";
import { fetchAll } from "../utils/supabase/fetchAll";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });

  // Una sola lettura della vista: le righe sono poi raggruppate per partita
  const rows = await fetchAll(
    supabase,
    "hasplayed_match_merged",
    "*",
    "IDPartecipazione"
  );

  const gamesById = new Map<number, any[]>();
  for (const row of rows) {
    const list = gamesById.get(row.IDPartita) ?? [];
    list.push(row);
    gamesById.set(row.IDPartita, list);
  }
  const games = Array.from(gamesById.entries()).sort(
    ([idA, a], [idB, b]) =>
      b[0].DataPartita.localeCompare(a[0].DataPartita) || idB - idA
  );

  return (
    <div>
      <div className="container mx-auto pt-6">
        <p className="text-center text-white text-[3rem] font-bold">
          MATCH HISTORY EFM League
        </p>
        <div className="">
          {games.map(([id, players]) => (
            <div key={id}>
              <MatchHistory game={{ data: players }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
