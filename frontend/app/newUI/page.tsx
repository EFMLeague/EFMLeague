import Link from "next/link";
import { LuArrowRight, LuDownload, LuFileText } from "react-icons/lu";
import Leaderboard from "./components/Leaderboard";
import MatchCard from "./components/MatchCard";
import PlayerCard from "./components/PlayerCard";
import VideoPanel from "./components/VideoPanel";
import WatchButton from "./components/WatchButton";
import {
  Player,
  STATUS_LABEL,
  formatMonth,
  frameSrc,
  loadGames,
  loadPlayers,
  loadRankings,
  profileHref,
  videoSrc,
} from "./lib/league";

export const revalidate = 0;

const DOCS = [
  {
    href: "/pdf/regolamento.pdf",
    title: "Regolamento",
    note: "Le regole della lega · PDF",
  },
  {
    href: "/pdf/organigramma.pdf",
    title: "Organigramma",
    note: "Chi faceva cosa nello staff · PDF",
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

  const mvpKing = rankings.mostMvp[0];
  const first = games[games.length - 1];
  const last = games[0];

  // In vetrina chi ha giocato di più
  const featured = rankings.mostActive
    .map((r) => byName.get(r.name))
    .filter((p): p is Player => Boolean(p))
    .slice(0, 12);

  const season =
    first && last
      ? `${formatMonth(first.date).split(" ")[0]} – ${formatMonth(last.date)}`
      : null;

  return (
    <>
      <section className="efm-hero">
        <div className="efm-wrap efm-hero__inner">
          <div className="efm-hero__copy">
            <h1 className="efm-display efm-hero__title">
              <span>EFM</span>
              <span>League</span>
            </h1>
            <p className="efm-lede">
              La nostra lega di partite personalizzate 5 contro 5. Qui c&apos;è
              tutto: le partite, le classifiche, gli MVP e le ammonizioni
              {season ? `, da ${season}` : ""}.
            </p>
            <dl className="efm-facts">
              <div>
                <dt>Partite</dt>
                <dd>{games.length}</dd>
              </div>
              <div>
                <dt>Giocatori</dt>
                <dd>{rankings.subscribers}</dd>
              </div>
              {mvpKing && (
                <div className="is-gold">
                  <dt>Re degli MVP · {mvpKing.value}</dt>
                  <dd>
                    <Link href={profileHref(mvpKing.name)}>{mvpKing.name}</Link>
                  </dd>
                </div>
              )}
            </dl>
            <div className="efm-actions">
              <WatchButton label="Guarda la presentazione" />
              <Link href="/newUI/ranking" className="efm-btn efm-btn--secondary efm-btn--big">
                Classifiche
              </Link>
            </div>
          </div>
          <VideoPanel
            src="/video/IntroPresentazione.mp4"
            poster="/img/screenshots/frame_intro.jpg"
            title="Video di presentazione della EFM League"
            listen
          />
        </div>
      </section>

      {last && (
        <section className="efm-wrap efm-section" id="ultima-partita">
          <div className="efm-section-head">
            <h2 className="efm-display efm-h2">Ultima partita</h2>
            <Link href="/newUI/match" className="efm-link">
              Tutte le {games.length} partite <LuArrowRight aria-hidden />
            </Link>
          </div>
          <MatchCard game={last} number={games.length} players={byId} />
        </section>
      )}

      <section className="efm-wrap efm-section">
        <div className="efm-section-head">
          <h2 className="efm-display efm-h2">Classifiche</h2>
          <Link href="/newUI/ranking" className="efm-link">
            Tutte le classifiche <LuArrowRight aria-hidden />
          </Link>
        </div>
        <div className="efm-boards">
          <Leaderboard
            title="Win rate"
            note="Partite vinte su giocate"
            rows={rankings.winRate}
            players={byName}
            format={(v) => v.toFixed(1) + "%"}
            threshold={50}
            max={100}
          />
          <Leaderboard
            title="Più MVP"
            note="Volte migliore in campo"
            rows={rankings.mostMvp}
            players={byName}
          />
          <Leaderboard
            title="Trofeo Pepe"
            note="Ammonizioni ricevute"
            rows={rankings.warnings.filter((r) => r.value > 0)}
            players={byName}
          />
        </div>
      </section>

      <section className="efm-wrap efm-section">
        <div className="efm-section-head">
          <h2 className="efm-display efm-h2">La rosa</h2>
          <Link href="/newUI/user" className="efm-link">
            Tutti i {players.length} giocatori <LuArrowRight aria-hidden />
          </Link>
        </div>
        <div className="efm-players">
          {featured.map((p) => (
            <PlayerCard
              key={p.name}
              name={p.name}
              src={frameSrc(p)}
              video={videoSrc(p.name)}
              status={STATUS_LABEL[p.role]}
              href={profileHref(p.name)}
            />
          ))}
        </div>
      </section>

      <section className="efm-wrap efm-section">
        <div className="efm-section-head">
          <h2 className="efm-display efm-h2">Documenti della lega</h2>
        </div>
        <div className="efm-docs">
          {DOCS.map((d) => (
            <a key={d.href} href={d.href} download className="efm-doc">
              <span className="efm-doc__icon">
                <LuFileText aria-hidden />
              </span>
              <span>
                <strong>{d.title}</strong>
                <span>{d.note}</span>
              </span>
              <LuDownload aria-label="Scarica" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
