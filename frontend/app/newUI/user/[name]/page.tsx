import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowRight, LuChevronDown, LuCrown } from "react-icons/lu";
import { fetchAll } from "@/app/utils/supabase/fetchAll";
import { getLoLVersion } from "@/app/utils/riot/getLoLVersion";
import { getUserByPuuid } from "@/app/utils/riot/getUserByPuuid";
import { getUserEloFlex } from "@/app/utils/riot/getUserEloFlex";
import { getUserEloSoloQ } from "@/app/utils/riot/getUserEloSoloQ";
import Avatar from "../../components/Avatar";
import VideoPanel from "../../components/VideoPanel";
import {
  Appearance,
  Game,
  PLACEHOLDER_USER,
  Player,
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

const titleCase = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

// Una riga della cronologia, come nel client: esito, campione e ruolo,
// partita, e le due squadre in miniatura.
function HistoryRow({
  game,
  me,
  number,
  player,
}: {
  game: Game;
  me: Appearance;
  number: number;
  player: Player;
}) {
  const champ = champSrc(me.ChampGiocato);
  const team = (side: "blue" | "red") =>
    ROLES.map((role) => game.players.find((p) => p.Squadra === side && p.Ruolo === role));
  return (
    <li className={"efm-hrow " + (me.Vittoria ? "is-win" : "is-loss")}>
      <div className="efm-hrow__result">
        <strong>{me.Vittoria ? "Vittoria" : "Sconfitta"}</strong>
        <span>{formatDate(game.date)}</span>
      </div>
      <div className="efm-hrow__champ">
        {champ ? (
          <img src={champ} alt={me.ChampGiocato ?? ""} width={56} height={56} loading="lazy" />
        ) : (
          <Avatar player={player} size={56} />
        )}
        <img
          className="efm-hrow__role"
          src={`/img/roles/${me.Ruolo}.png`}
          alt={ROLE_LABEL[me.Ruolo]}
          title={ROLE_LABEL[me.Ruolo]}
          width={24}
          height={24}
        />
      </div>
      <div className="efm-hrow__info">
        <Link href={`/newUI/match#partita-${number}`} className="efm-name-link">
          Partita {pad(number, 3)} · {game.name}
        </Link>
        <span>
          {me.ChampGiocato ?? "Campione non segnato"} · {ROLE_LABEL[me.Ruolo]}
          {me.MVP && (
            <>
              {" · "}
              <span className="efm-mvp">
                <LuCrown aria-hidden /> MVP
              </span>
            </>
          )}
        </span>
      </div>
      <div className="efm-hrow__teams" aria-hidden>
        {(["blue", "red"] as const).flatMap((side) =>
          team(side).map((row, i) => {
            const src = champSrc(row?.ChampGiocato ?? null);
            const mine = row?.IDGiocatore === me.IDGiocatore;
            return src ? (
              <img
                key={side + i}
                src={src}
                alt=""
                title={row?.username}
                className={mine ? "is-me" : undefined}
                loading="lazy"
              />
            ) : (
              <i key={side + i} title={row?.username} className={mine ? "is-me" : undefined} />
            );
          })
        )}
      </div>
    </li>
  );
}

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
  const me: Player = byId.get(user.id) ?? {
    id: user.id,
    name: user.name,
    role: user.role,
    warnings: user.warnings ?? 0,
    hasFrame: Boolean(user.banner_source),
  };

  // Numerazione globale: ordine cronologico di tutte le partite
  const numberOf = new Map(
    allMatches
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id)
      .map((m, i) => [m.id, i + 1])
  );

  // già dalla più recente
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
  const winRate = percent(wins, played);
  const form = appearances.slice(0, 10);

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
      <span className="efm-elo">
        <img src={`/img/elo/${tier}.png`} alt="" width={36} height={36} />
        <span>
          {label}
          <strong>
            {TIER_LABEL[value.tier] ?? titleCase(value.tier)} {value.rank?.trim()}
          </strong>
        </span>
      </span>
    );
  };

  const frame = frameSrc(me);
  // lo splash del campione più giocato fa da sfondo alla testata
  const splash = champs[0]
    ? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champs[0].champ}_0.jpg`
    : null;
  const video = videoSrc(user.name);
  const RECENT = 10;
  const recent = appearances.slice(0, RECENT);
  const older = appearances.slice(RECENT);

  const wr = (value: number, playedCount: number) => (
    <span className={"efm-wr" + (playedCount && value < 50 ? " is-low" : "")}>
      <span>{playedCount ? value.toFixed(0) + "%" : "—"}</span>
      <span className="efm-bar" aria-hidden>
        <span style={{ width: `${playedCount ? value : 0}%` }} />
      </span>
    </span>
  );

  return (
    <>
      <section className="efm-profile-hero">
        {splash ? (
          <div
            className="efm-profile-hero__bg is-splash"
            style={{ backgroundImage: `url("${splash}")` }}
            aria-hidden
          />
        ) : (
          frame && (
            <div
              className="efm-profile-hero__bg"
              style={{ backgroundImage: `url("${frame}")` }}
              aria-hidden
            />
          )
        )}
        <div className="efm-wrap efm-profile-hero__inner">
          {video && frame ? (
            <VideoPanel
              src={video}
              poster={frame}
              title={`Video di presentazione di ${user.name}`}
              className="efm-portrait"
              autoPlay={false}
              progress={false}
            />
          ) : (
            <div className="efm-portrait">
              {frame ? (
                <img src={frame} alt={`Presentazione di ${user.name}`} />
              ) : (
                <div className="efm-pcard__blank" aria-hidden>
                  {user.name.slice(0, 2)}
                </div>
              )}
            </div>
          )}

          <div>
            <h1 className="efm-display efm-profile__name">{user.name}</h1>
            <div className="efm-profile__meta">
              <span className="efm-badge efm-badge--plain">
                {STATUS_LABEL[user.role] ?? "Giocatore"}
              </span>
              {iconSrc && (
                <img
                  className="efm-summoner"
                  src={iconSrc}
                  alt="Icona evocatore"
                  width={44}
                  height={44}
                />
              )}
              {elo("SoloQ", soloQ)}
              {elo("Flex", flex)}
            </div>

            <dl className="efm-stats">
              <div className="efm-stat">
                <dt>Presenze</dt>
                <dd>
                  {played}
                  <small>su {totalMatches} partite</small>
                </dd>
              </div>
              <div className="efm-stat">
                <dt>Win rate</dt>
                <dd>
                  {played ? winRate.toFixed(1) + "%" : "—"}
                  <small>
                    {wins} V · {played - wins} S
                  </small>
                </dd>
              </div>
              <div className="efm-stat is-gold">
                <dt>MVP</dt>
                <dd>
                  {mvp}
                  <small>
                    {played ? percent(mvp, played).toFixed(0) + "% delle partite" : "—"}
                  </small>
                </dd>
              </div>
              <div className="efm-stat">
                <dt>Serie migliore</dt>
                <dd>
                  {bestStreak}
                  <small>vittorie di fila</small>
                </dd>
              </div>
              <div className="efm-stat">
                <dt>Ammonizioni</dt>
                <dd>
                  {warnings}
                  <small>punti lega {wins - Math.round(warnings / 2)}</small>
                </dd>
              </div>
            </dl>

            {form.length > 0 && (
              <div className="efm-form">
                <span className="efm-label">Forma</span>
                <ol aria-label="Ultime partite, dalla più recente">
                  {form.map(({ game, me: row }) => (
                    <li
                      key={game.id}
                      className={row.Vittoria ? "is-win" : "is-loss"}
                      title={`${row.Vittoria ? "Vittoria" : "Sconfitta"} · ${formatDate(game.date)}`}
                    >
                      {row.Vittoria ? "V" : "S"}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </section>

      {played === 0 ? (
        <section className="efm-wrap efm-section">
          <div className="efm-card efm-empty">
            <strong>Nessuna partita giocata</strong>
            {user.name} è nella rosa ma non ha giocato partite della lega.
          </div>
        </section>
      ) : (
        <>
          <section className="efm-wrap efm-section">
            <div className="efm-section-head">
              <h2 className="efm-display efm-h2">Cronologia</h2>
              <Link href="/newUI/match" className="efm-link">
                Tutte le partite <LuArrowRight aria-hidden />
              </Link>
            </div>
            <ol className="efm-history">
              {recent.map(({ game, me: row }) => (
                <HistoryRow
                  key={game.id}
                  game={game}
                  me={row}
                  number={numberOf.get(game.id) ?? 0}
                  player={me}
                />
              ))}
            </ol>
            {older.length > 0 && (
              <details className="efm-more efm-card" style={{ marginTop: "0.75rem" }}>
                <summary>
                  Altre {older.length} partite <LuChevronDown aria-hidden />
                </summary>
                <ol className="efm-history" style={{ padding: "0.75rem" }}>
                  {older.map(({ game, me: row }) => (
                    <HistoryRow
                      key={game.id}
                      game={game}
                      me={row}
                      number={numberOf.get(game.id) ?? 0}
                      player={me}
                    />
                  ))}
                </ol>
              </details>
            )}
          </section>

          <section className="efm-wrap efm-section efm-cols">
            <div className="efm-card efm-table-card">
              <h2 className="efm-display efm-h2">Ruoli</h2>
              <table className="efm-table">
                <thead>
                  <tr>
                    <th scope="col">Ruolo</th>
                    <th scope="col" className="efm-num">
                      Giocate
                    </th>
                    <th scope="col">Win rate</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((r) => (
                    <tr key={r.role}>
                      <td>
                        <span className="efm-cell">
                          <img
                            className="is-role"
                            src={`/img/roles/${r.role}.png`}
                            alt=""
                            width={24}
                            height={24}
                          />
                          {ROLE_LABEL[r.role]}
                        </span>
                      </td>
                      <td className="efm-num">{r.played}</td>
                      <td>{wr(r.winRate, r.played)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="efm-card efm-table-card">
              <h2 className="efm-display efm-h2">Campioni</h2>
              {champs.length === 0 ? (
                <p className="efm-empty">
                  Nessun campione registrato: nelle prime serate della lega i
                  campioni non venivano segnati.
                </p>
              ) : (
                <table className="efm-table">
                  <thead>
                    <tr>
                      <th scope="col">Campione</th>
                      <th scope="col" className="efm-num">
                        Giocate
                      </th>
                      <th scope="col" className="efm-num">
                        Vinte
                      </th>
                      <th scope="col">Win rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {champs.map((c) => (
                      <tr key={c.champ}>
                        <td>
                          <span className="efm-cell">
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
                        <td className="efm-num">{c.played}</td>
                        <td className="efm-num">{c.wins}</td>
                        <td>{wr(percent(c.wins, c.played), c.played)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
