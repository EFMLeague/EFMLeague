import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import "../../../app/globals.css";
import { getUserByPuuid } from "@/app/utils/riot/getUserByPuuid";
import { getLoLVersion } from "@/app/utils/riot/getLoLVersion";
import { getUserEloFlex } from "@/app/utils/riot/getUserEloFlex";
import { getUserEloSoloQ } from "@/app/utils/riot/getUserEloSoloQ";
import { fetchAll } from "@/app/utils/supabase/fetchAll";
import CircularProgress from "@/app/components/tailwind/circularProgress";
import ProgBar from "@/app/components/tailwind/progBar";
import Image from "next/image";
import MatchHistory from "@/app/components/tailwind/matchHistory";

const ROLES = ["top", "jng", "mid", "adc", "sup"];
// Icona profilo di default di League of Legends
const DEFAULT_PROFILE_ICON = 29;

const percent = (part: number, total: number) =>
  total === 0 ? 0 : Number(((part * 100) / total).toFixed(2));

export default async function Page({
  params: { name },
}: {
  params: {
    name: string;
  };
}) {
  const supabase = createServerComponentClient({ cookies });
  const userName = decodeURIComponent(name);

  const { data: user, error } = await supabase
    .from("user")
    .select("id,name,puuid,warnings,role")
    .eq("name", userName)
    .maybeSingle();
  if (error) throw new Error(`Errore lettura user: ${error.message}`);
  // Gestito da error.tsx ("Utente non trovato")
  if (!user) throw new Error(`Utente non trovato: ${userName}`);

  const [summoner, versionLOL, eloSoloQ, eloFlex, totalMatches, myGames] =
    await Promise.all([
      getUserByPuuid(user),
      getLoLVersion(),
      getUserEloSoloQ(user.puuid),
      getUserEloFlex(user.puuid),
      supabase
        .from("league_match")
        .select("id", { count: "exact", head: true })
        .then(({ count }) => count ?? 0),
      fetchAll(
        supabase,
        "hasplayed_match_merged",
        "*",
        "IDPartecipazione",
        (q) => q.eq("IDGiocatore", user.id)
      ),
    ]);

  // Tutti i giocatori delle partite dell'utente, per la match history
  const matchIds = myGames.map((g) => g.IDPartita);
  const matchRows = matchIds.length
    ? await fetchAll(
        supabase,
        "hasplayed_match_merged",
        "*",
        "IDPartecipazione",
        (q) => q.in("IDPartita", matchIds)
      )
    : [];
  const playersByMatch = new Map<number, any[]>();
  for (const row of matchRows) {
    const list = playersByMatch.get(row.IDPartita) ?? [];
    list.push(row);
    playersByMatch.set(row.IDPartita, list);
  }
  const history = [...myGames].sort(
    (a, b) =>
      b.DataPartita.localeCompare(a.DataPartita) || b.IDPartita - a.IDPartita
  );

  const played = myGames.length;
  const wins = myGames.filter((g) => g.Vittoria).length;
  const mvp = myGames.filter((g) => g.MVP).length;
  const winRate = percent(wins, played).toFixed(2);

  const rolesPlayed = ROLES.map((role) => {
    const games = myGames.filter((g) => g.Ruolo === role);
    return {
      role,
      played: games.length,
      winRate: percent(games.filter((g) => g.Vittoria).length, games.length),
    };
  });

  const champsByName = new Map<string, { played: number; wins: number }>();
  for (const g of myGames) {
    if (!g.ChampGiocato) continue;
    const stats = champsByName.get(g.ChampGiocato) ?? { played: 0, wins: 0 };
    stats.played++;
    if (g.Vittoria) stats.wins++;
    champsByName.set(g.ChampGiocato, stats);
  }
  const champsStats = Array.from(champsByName.entries())
    .map(([champ, stats]) => ({ champ, ...stats }))
    .sort((a, b) => b.played - a.played || a.champ.localeCompare(b.champ));

  //CREAZIONE LINK IMMAGINI
  const iconUser =
    "https://ddragon.leagueoflegends.com/cdn/" +
    versionLOL +
    "/img/profileicon/" +
    (summoner.profileIconId ?? DEFAULT_PROFILE_ICON) +
    ".png";
  const iconEloSoloQ = "/img/elo/" + eloSoloQ.tier.toLowerCase() + ".png";
  const iconEloFlex = "/img/elo/" + eloFlex.tier.toLowerCase() + ".png";

  const status = () => {
    if (user.role === 0) {
      return "Padre fondatore";
    }
    if (user.role === 1) {
      return "Esperto partecipante";
    }
    if (user.role === 2) {
      return "Nuova recluta";
    }
  };

  return (
    <div className="">
      <div className="h-screen -z-10 fixed">
        <img src="/img/banner.jpg" className="object-cover h-full" alt="" />
        <div className="overlay"></div>
      </div>

      <div>
        <div className="container md:flex md:justify-center md:items-center mx-auto bg-white pt-6">
          <img
            src={iconUser}
            className="w-20 rounded-full border-2 border-gray-900 object-center mx-auto md:mx-0"
            alt="icon user"
          />
          <p className="text-[2.5rem] md:text-[3.5rem] font-semibold text-center">
            &nbsp;{user.name}&nbsp;
          </p>
          <img
            src={iconUser}
            className="w-20 rounded-full border-2 border-gray-900 object-center mx-auto hidden md:block md:mx-0"
            alt="icon user"
          />
        </div>
        <div className="flex justify-center flex-wrap container mx-auto bg-white p-6">
          <p className="text-center text-[1.4rem] italic bg-white">
            ~{status()}~
          </p>
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
              percent={percent(played, totalMatches).toString()}
              textInside={played.toString()}
              textSpan={" of " + totalMatches}
              color={"#2196f3"}
              title="Presence"
            />
          </div>

          <div className="grid grid-cols-9 border place-items-center gap-4 shadow-md p-3">
            <div className="col-span-2">Roles</div>
            <div className="col-span-1">Played</div>
            <div className="col-span-3">WinRate</div>
            <div className="col-span-3">PlayRate</div>
            {rolesPlayed.map((roleStats) => (
              <React.Fragment key={roleStats.role}>
                <div className="flex col-span-2">
                  <img
                    src={"/img/roles/" + roleStats.role + ".png"}
                    alt=""
                    className="h-12"
                  />
                </div>
                <div className="col-span-1 text-lg">{roleStats.played}</div>
                <div className="col-span-3 w-full">
                  <ProgBar
                    value={roleStats.winRate}
                    colors={roleStats.winRate >= 50 ? "green" : "red"}
                    barProps={
                      roleStats.winRate <= 0 && roleStats.played != 0
                        ? "bg-red-500"
                        : ""
                    }
                  />
                </div>
                <div className="col-span-3 w-full">
                  <ProgBar
                    value={percent(roleStats.played, played)}
                    colors={"blue"}
                    barProps=""
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="grid grid-cols-3 w-full py-6">
            <div className="flex justify-between items-center col-span-3 md:col-span-1 md:justify-center">
              <p className="text-4xl bg-white ">
                Points:&nbsp;
                <span className="font-bold">
                  {wins - Math.round(user.warnings / 2)}
                </span>
              </p>
              <Image
                src={"/img/icons/cup64.png"}
                height={64}
                width={64}
                alt=""
              ></Image>
            </div>
            <div className="flex justify-between items-center col-span-3 md:col-span-1 md:justify-center">
              <p className="text-4xl  bg-white ">
                Warnings:
                <span className="font-bold">&nbsp;{user.warnings}&nbsp;</span>
              </p>
              <Image
                src={"/img/icons/yellowCard64.png"}
                height={64}
                width={64}
                alt=""
              ></Image>
            </div>
            <div className="flex justify-between items-center col-span-3 md:col-span-1 md:justify-center">
              <p className="text-4xl bg-white ">
                MVP: <span className="font-bold">&nbsp;{mvp}&nbsp;</span>
              </p>
              <Image
                src={"/img/icons/crown64.png"}
                height={64}
                width={64}
                alt=""
              ></Image>
            </div>
          </div>
          <div className="w-full">
            <p className="text-[2rem] font-bold italic py-6 text-center">
              Champions stats
            </p>
            <div className="grid grid-cols-4 md:w-1/2 w-full gap-2 border p-4 shadow-lg mx-auto">
              <div className="italic col-span-2">
                <p>Champion</p>
              </div>
              <div className="italic col-span-1">
                <p>Played</p>
              </div>
              <div className="italic col-span-1">
                <p>WinRate</p>
              </div>
              {champsStats.map((champ) => {
                const champWinRate = percent(champ.wins, champ.played);
                return (
                  <React.Fragment key={champ.champ}>
                    <div className="flex items-center col-span-2">
                      <Image
                        src={
                          "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
                          champ.champ +
                          ".png"
                        }
                        alt=""
                        width={40}
                        height={40}
                      ></Image>
                      <p className="px-4">{champ.champ}</p>
                    </div>
                    <div className="col-span-1">
                      <ProgBar
                        value={percent(champ.played, champsStats[0].played)}
                        typography={champ.played.toString()}
                        colors={"blue"}
                        barProps=""
                        percent={true}
                      />
                    </div>
                    <div className="col-span-1">
                      <ProgBar
                        value={champWinRate}
                        colors={champWinRate >= 50 ? "green" : "red"}
                        barProps={champWinRate <= 0 ? "bg-red-500" : ""}
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="">
            <p className="basis-full text-[2rem] font-bold italic py-6">
              Match history
            </p>
            {history.map((game) => (
              <div key={game.IDPartita}>
                <MatchHistory
                  game={{ data: playersByMatch.get(game.IDPartita) ?? [game] }}
                  hasWon={game.Vittoria}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
