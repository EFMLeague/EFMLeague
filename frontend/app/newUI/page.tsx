import Link from "next/link";
import Board from "./components/Board";
import GameStrip from "./components/GameStrip";
import { DownloadIcon, EdgeArrow } from "./components/Marks";
import Projector from "./components/Projector";
import Shot from "./components/Shot";
import {
  Player,
  formatMonth,
  frameSrc,
  loadGames,
  loadPlayers,
  loadRankings,
  pad,
  profileHref,
  videoSrc,
} from "./lib/league";

export const revalidate = 0;

const ATTACHMENTS = [
  {
    href: "/pdf/regolamento.pdf",
    title: "Regolamento",
    note: "Le regole della lega, PDF",
  },
  {
    href: "/pdf/organigramma.pdf",
    title: "Organigramma",
    note: "Chi faceva cosa nello staff, PDF",
  },
];

export default async function Home() {
  const [players, rankings, games] = await Promise.all([
    loadPlayers(),
    loadRankings(),
    loadGames(),
  ]);

  const byName = new Map(players.map((p) => [p.name, p]));
  const byId = new Map(players.map((p) => [p.id, p]));

  // Le pose del rullino: chi ha giocato di più, il re degli MVP in testa
  const mvpKing = rankings.mostMvp[0];
  const order = [
    ...(mvpKing ? [mvpKing.name] : []),
    ...rankings.mostActive
      .map((r) => r.name)
      .filter((name) => name !== mvpKing?.name),
  ]
    .map((name) => byName.get(name))
    .filter((p): p is Player => Boolean(p));
  const stripA = order.slice(0, 9);
  const stripB = order.slice(9, 18);

  const first = games[games.length - 1];
  const last = games[0];
  const streak = rankings.winStreak;

  const shot = (player: Player, index: number, eager: boolean) => (
    <Shot
      key={player.name}
      src={frameSrc(player)}
      blank={player.name.slice(0, 2)}
      alt={player.name}
      href={profileHref(player.name)}
      video={videoSrc(player.name)}
      number={pad(index + 1)}
      label={player.name}
      mark={index === 0 && mvpKing ? "ring" : null}
      markTitle={index === 0 ? "Re degli MVP" : undefined}
      eager={eager}
    />
  );

  return (
    <>
      <section className="pv-wrap pv-hero">
        <div className="pv-hero__title">
          <div>
            <h1 className="pv-display pv-h1">
              EFM
              <br />
              League
            </h1>
            <p className="pv-mono pv-hero__edgeline">
              EFM 2023 <EdgeArrow /> Archivio <EdgeArrow /> {games.length} pose
            </p>
          </div>
          <p className="pv-lede">
            L&apos;archivio della nostra lega di partite personalizzate:{" "}
            {games.length} partite e {rankings.subscribers} giocatori, sviluppati
            e stampati a contatto. Ogni posa è un giocatore, ogni striscia una
            partita.
          </p>
        </div>
        <table className="pv-log">
          <caption className="pv-mono">Registro del rullino</caption>
          <tbody>
            <tr>
              <th scope="row">Stagione</th>
              <td>Prima e unica</td>
            </tr>
            {first && last && (
              <tr>
                <th scope="row">Sviluppo</th>
                <td>
                  Da {formatMonth(first.date).split(" ")[0]} a{" "}
                  {formatMonth(last.date)}
                </td>
              </tr>
            )}
            <tr>
              <th scope="row">Giocatori</th>
              <td className="pv-num">{rankings.subscribers}</td>
            </tr>
            <tr>
              <th scope="row">Pose</th>
              <td className="pv-num">
                {games.length} partite <small>· 10 giocatori l&apos;una</small>
              </td>
            </tr>
            {mvpKing && (
              <tr>
                <th scope="row">Re degli MVP</th>
                <td>
                  <Link href={profileHref(mvpKing.name)}>{mvpKing.name}</Link>
                  <small>{mvpKing.value} MVP</small>
                </td>
              </tr>
            )}
            {streak.names.length > 0 && (
              <tr>
                <th scope="row">Serie più lunga</th>
                <td>
                  {streak.names.map((name, i) => (
                    <span key={name}>
                      {i > 0 && ", "}
                      <Link href={profileHref(name)}>{name}</Link>
                    </span>
                  ))}
                  <small>{streak.value} vittorie di fila</small>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section aria-label="La rosa sul rullino" className="pv-hero-strips">
        <div className="pv-strip">
          {stripA.map((p, i) => shot(p, i, true))}
        </div>
        {stripB.length > 0 && (
          <div className="pv-strip">
            {stripB.map((p, i) => shot(p, i + stripA.length, false))}
          </div>
        )}
      </section>
      <div className="pv-wrap pv-hint">
        <span className="pv-marker pv-hint--hover">
          passaci sopra: chi ha il video si anima
        </span>
        <span className="pv-marker pv-hint--touch">
          tocca una posa per aprire il giocatore
        </span>
        <Link href="/newUI/user" className="pv-mono">
          Tutta la rosa ({players.length})
        </Link>
      </div>

      {last && (
        <section className="pv-wrap pv-section">
          <div className="pv-section-head">
            <h2 className="pv-display pv-h2">L&apos;ultima posa</h2>
            <Link href="/newUI/match" className="pv-mono">
              Tutto lo storico, {games.length} partite
            </Link>
          </div>
          <GameStrip game={last} number={games.length} players={byId} />
        </section>
      )}

      <section className="pv-wrap pv-section">
        <div className="pv-section-head">
          <h2 className="pv-display pv-h2">Segnati a matita</h2>
          <Link href="/newUI/ranking" className="pv-mono">
            Tutte le classifiche
          </Link>
        </div>
        <div className="pv-boards">
          <Board
            title="Win rate"
            note="Partite vinte su giocate"
            rows={rankings.winRate}
            players={byName}
            format={(v) => v.toFixed(1) + "%"}
            threshold={50}
            max={100}
          />
          <Board
            title="Più MVP"
            note="Volte migliore in campo"
            rows={rankings.mostMvp}
            players={byName}
          />
          <Board
            title="Trofeo Pepe"
            note="Ammonizioni ricevute"
            rows={rankings.warnings.filter((r) => r.value > 0)}
            players={byName}
          />
        </div>
      </section>

      <section className="pv-wrap pv-section pv-screen">
        <div className="pv-screen__film">
          <Projector
            src="/video/IntroPresentazione.mp4"
            poster="/img/screenshots/frame_intro.jpg"
            label="Guarda il filmato"
          />
        </div>
        <div>
          <h2 className="pv-display pv-h2">La presentazione</h2>
          <p className="pv-lede" style={{ marginTop: "1.2rem" }}>
            Il filmato con cui la lega ha presentato i suoi giocatori. Le singole
            presentazioni si animano sulle pose della rosa e nei profili.
          </p>
          <h3 className="pv-h3" style={{ marginTop: "3rem", marginBottom: "0.9rem" }}>
            Allegati
          </h3>
          <ul className="pv-sleeves">
            {ATTACHMENTS.map((a) => (
              <li key={a.href}>
                <a href={a.href} download>
                  <span>
                    <span className="pv-h3">{a.title}</span>
                    <p className="pv-mono">{a.note}</p>
                  </span>
                  <DownloadIcon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
