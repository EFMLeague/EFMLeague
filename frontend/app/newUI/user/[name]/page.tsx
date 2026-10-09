import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchAll } from "@/app/utils/supabase/fetchAll";
import { getLoLVersion } from "@/app/utils/riot/getLoLVersion";
import { getUserByPuuid } from "@/app/utils/riot/getUserByPuuid";
import { getUserEloFlex } from "@/app/utils/riot/getUserEloFlex";
import { getUserEloSoloQ } from "@/app/utils/riot/getUserEloSoloQ";
import GameStrip from "../../components/GameStrip";
import { Chevron, CrossGlyph, RingGlyph } from "../../components/Marks";
import Shot from "../../components/Shot";
import {
  PLACEHOLDER_USER,
  ROLES,
  ROLE_LABEL,
  STATUS_LABEL,
  champSrc,
  formatDate,
  frameSrc,
  loadGames,
  loadPlayers,
  pad,
  percent,
  supabaseServer,
  videoSrc,
} from "../../lib/league";
import Print from "./Print";

export const revalidate = 0;

type Elo = { tier: string; rank: string };
const UNRANKED: Elo = { tier: "UNRANKED", rank: "" };

// I dati Riot sono un extra: se l'API non risponde la pagina regge lo stesso
const safe = async <T,>(fn: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await fn();
  } catch {
    return fallback;
  }
};

const TIER_LABEL: Record<string, string> = {
  UNRANKED: "Senza classifica",
};

export default async function Profilo({
  params: { name },
}: {
  params: { name: string };
}) {
  const userName = decodeURIComponent(name);
  if (userName === PLACEHOLDER_USER) notFound();
  const supabase = supabaseServer();

  const { data: user, error } = await supabase
    .from("user")
    .select("id,name,puuid,warnings,role,banner_source")
    .eq("name", userName)
    .maybeSingle();
  if (error) throw new Error(`Errore lettura user: ${error.message}`);
  if (!user) notFound();

  const hasRiot = Boolean(user.puuid) && user.puuid !== "NULL";

  const [mine, allMatches, players, summoner, version, soloQ, flex] =
    await Promise.all([
      fetchAll(
        supabase,
        "hasplayed_match_merged",
        "IDPartita",
        "IDPartecipazione",
        (q) => q.eq("IDGiocatore", user.id)
      ),
      fetchAll(supabase, "league_match", "id,date", "date"),
      loadPlayers(),
      hasRiot ? safe(() => getUserByPuuid(user), null) : null,
      safe(getLoLVersion, null),
      hasRiot
        ? safe<Elo>(() => getUserEloSoloQ(user.puuid), UNRANKED)
        : UNRANKED,
      hasRiot ? safe<Elo>(() => getUserEloFlex(user.puuid), UNRANKED) : UNRANKED,
    ]);

  const myIds = mine.map((r) => r.IDPartita);
  const games = myIds.length
    ? await loadGames((q) => q.in("IDPartita", myIds))
    : [];

  const byId = new Map(players.map((p) => [p.id, p]));
  const me = byId.get(user.id) ?? {
    id: user.id,
    name: user.name,
    role: user.role,
    warnings: user.warnings ?? 0,
    hasFrame: Boolean(user.banner_source),
  };

  // Numero di posa globale: ordine cronologico di tutte le partite
  const numberOf = new Map(
    allMatches
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id)
      .map((m, i) => [m.id, i + 1])
  );

  const appearances = games.map((g) => ({
    game: g,
    me: g.players.find((p) => p.IDGiocatore === user.id)!,
  }));
  const chrono = appearances
    .slice()
    .sort(
      (a, b) =>
        (numberOf.get(a.game.id) ?? 0) - (numberOf.get(b.game.id) ?? 0)
    );

  const played = appearances.length;
  const wins = appearances.filter((a) => a.me.Vittoria).length;
  const mvp = appearances.filter((a) => a.me.MVP).length;
  let streak = 0;
  let bestStreak = 0;
  for (const a of chrono) {
    streak = a.me.Vittoria ? streak + 1 : 0;
    bestStreak = Math.max(bestStreak, streak);
  }
  const totalMatches = allMatches.length;
  const warnings = user.warnings ?? 0;

  const roles = ROLES.map((role) => {
    const list = appearances.filter((a) => a.me.Ruolo === role);
    const w = list.filter((a) => a.me.Vittoria).length;
    return { role, played: list.length, winRate: percent(w, list.length) };
  });

  const champMap = new Map<string, { played: number; wins: number }>();
  for (const a of appearances) {
    const champ = a.me.ChampGiocato;
    if (!champ) continue;
    const s = champMap.get(champ) ?? { played: 0, wins: 0 };
    s.played++;
    if (a.me.Vittoria) s.wins++;
    champMap.set(champ, s);
  }
  const champs = Array.from(champMap.entries())
    .map(([champ, s]) => ({ champ, ...s }))
    .sort((a, b) => b.played - a.played || a.champ.localeCompare(b.champ));

  const iconSrc =
    summoner?.profileIconId !== undefined && version
      ? `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`
      : null;

  const elo = (label: string, value: Elo) => {
    const tier = (value.tier || "UNRANKED").toLowerCase();
    return (
      <span className="pv-elo">
        <img src={`/img/elo/${tier}.png`} alt="" width={44} height={44} />
        <span className="pv-mono">
          {label}
          <strong>
            {TIER_LABEL[value.tier] ?? value.tier} {value.rank?.trim()}
          </strong>
        </span>
      </span>
    );
  };

  // già dalla più recente: le ultime in vista, le altre a richiesta
  const RECENT = 8;
  const recent = appearances.slice(0, RECENT);
  const older = appearances.slice(RECENT);

  return (
    <>
      <section className="pv-wrap pv-profile">
        <Print
          name={user.name}
          src={frameSrc(me)}
          video={videoSrc(user.name)}
          caption={STATUS_LABEL[user.role] ?? ""}
        />
        <div>
          <h1
            className="pv-display pv-h1 pv-profile__name"
            style={{
              // i nomi lunghi si stringono invece di andare a capo
              fontSize: `clamp(2.2rem, ${Math.min(
                11,
                150 / Math.max(user.name.length, 1)
              ).toFixed(2)}vw, 6rem)`,
            }}
          >
            {user.name}
          </h1>
          <div className="pv-profile__status">
            {iconSrc && (
              <img
                src={iconSrc}
                alt="Icona evocatore"
                width={44}
                height={44}
                style={{ background: "var(--film)" }}
              />
            )}
            {elo("SoloQ", soloQ)}
            {elo("Flex", flex)}
          </div>

          <table className="pv-log">
            <caption className="pv-mono">Registro del giocatore</caption>
            <tbody>
              <tr>
                <th scope="row">Presenze</th>
                <td className="pv-num">
                  {played} <small>su {totalMatches} partite</small>
                </td>
              </tr>
              <tr>
                <th scope="row">Vittorie</th>
                <td className="pv-num">
                  {wins}{" "}
                  <small>
                    win rate {percent(wins, played).toFixed(1)}% · sconfitte{" "}
                    {played - wins}
                  </small>
                </td>
              </tr>
              <tr>
                <th scope="row">MVP</th>
                <td className="pv-num">{mvp}</td>
              </tr>
              <tr>
                <th scope="row">Serie migliore</th>
                <td className="pv-num">
                  {bestStreak} <small>vittorie di fila</small>
                </td>
              </tr>
              <tr>
                <th scope="row">Ammonizioni</th>
                <td className="pv-num">
                  {warnings}{" "}
                  <small>punti lega {wins - Math.round(warnings / 2)}</small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="pv-wrap pv-section">
        <div className="pv-section-head">
          <h2 className="pv-display pv-h2">Il rullino</h2>
          <p className="pv-mono pv-status">
            Una posa per partita giocata, in ordine
          </p>
        </div>
        {played === 0 ? (
          <p className="pv-empty">
            <span className="pv-marker">rullino vergine</span>
            {user.name} non ha giocato nessuna partita della lega.
          </p>
        ) : (
          <>
            <div className="pv-strip pv-strip--sheet pv-roll">
              {chrono.map(({ game, me: row }) => {
                const n = numberOf.get(game.id) ?? 0;
                return (
                  <Shot
                    key={game.id}
                    src={champSrc(row.ChampGiocato) ?? frameSrc(me)}
                    blank={user.name.slice(0, 2)}
                    alt={`Posa ${n}, ${formatDate(game.date)}: ${
                      row.Vittoria ? "vinta" : "persa"
                    }${row.MVP ? ", MVP" : ""}${
                      row.ChampGiocato ? `, ${row.ChampGiocato}` : ""
                    }`}
                    href={`/newUI/match#posa-${n}`}
                    number={pad(n, 3)}
                    mark={row.MVP ? "ring" : row.Vittoria ? null : "cross"}
                    className={!row.Vittoria && row.MVP ? "is-dim" : ""}
                  />
                );
              })}
            </div>
            <div className="pv-legend pv-mono">
              <span>
                <RingGlyph /> MVP
              </span>
              <span>
                <CrossGlyph /> Sconfitta
              </span>
              <span>Posa chiara: vittoria</span>
            </div>
          </>
        )}
      </section>

      {played > 0 && (
        <section className="pv-wrap pv-section pv-cols">
          <div>
            <h2 className="pv-display pv-h2" style={{ marginBottom: "1.4rem" }}>
              Ruoli
            </h2>
            <table className="pv-table">
              <thead>
                <tr>
                  <th scope="col">Ruolo</th>
                  <th scope="col" className="pv-num">
                    Giocate
                  </th>
                  <th scope="col">Win rate</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((r) => (
                  <tr key={r.role}>
                    <td>
                      <span className="pv-cellname">
                        <img
                          src={`/img/roles/${r.role}.png`}
                          alt=""
                          width={32}
                          height={32}
                          style={{ background: "transparent", filter: "brightness(0.15)" }}
                        />
                        {ROLE_LABEL[r.role]}
                      </span>
                    </td>
                    <td className="pv-num">{r.played}</td>
                    <td>
                      <span className="pv-mono">
                        {r.played ? r.winRate.toFixed(0) + "%" : "—"}
                      </span>
                      <span className="pv-measure" aria-hidden>
                        <span style={{ width: `${r.winRate}%` }} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="pv-display pv-h2" style={{ marginBottom: "1.4rem" }}>
              Campioni
            </h2>
            {champs.length === 0 ? (
              <p className="pv-status">
                Nessun campione registrato per le sue partite: nelle prime serate
                della lega i campioni non venivano segnati.
              </p>
            ) : (
              <table className="pv-table">
                <thead>
                  <tr>
                    <th scope="col">Campione</th>
                    <th scope="col" className="pv-num">
                      Giocate
                    </th>
                    <th scope="col" className="pv-num">
                      Vinte
                    </th>
                    <th scope="col">Win rate</th>
                  </tr>
                </thead>
                <tbody>
                  {champs.map((c) => {
                    const wr = percent(c.wins, c.played);
                    return (
                      <tr key={c.champ}>
                        <td>
                          <span className="pv-cellname">
                            <img
                              src={champSrc(c.champ) ?? ""}
                              alt=""
                              width={32}
                              height={32}
                              loading="lazy"
                            />
                            {c.champ}
                          </span>
                        </td>
                        <td className="pv-num">{c.played}</td>
                        <td className="pv-num">{c.wins}</td>
                        <td>
                          <span className="pv-mono">{wr.toFixed(0)}%</span>
                          <span className="pv-measure" aria-hidden>
                            <span style={{ width: `${wr}%` }} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}

      {played > 0 && (
        <section className="pv-wrap pv-section">
          <div className="pv-section-head">
            <h2 className="pv-display pv-h2">Ultime partite</h2>
            <Link href="/newUI/match" className="pv-mono">
              Tutto lo storico
            </Link>
          </div>
          {recent.map(({ game }) => (
            <GameStrip
              key={game.id}
              game={game}
              number={numberOf.get(game.id) ?? 0}
              players={byId}
            />
          ))}
          {older.length > 0 && (
            <details className="pv-more">
              <summary className="pv-mono">
                Altre {older.length} partite <Chevron />
              </summary>
              {older.map(({ game }) => (
                <GameStrip
                  key={game.id}
                  game={game}
                  number={numberOf.get(game.id) ?? 0}
                  players={byId}
                />
              ))}
            </details>
          )}
        </section>
      )}
    </>
  );
}
