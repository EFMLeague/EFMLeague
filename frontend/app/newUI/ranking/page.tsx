import Link from "next/link";
import { LuFlame } from "react-icons/lu";
import Leaderboard from "../components/Leaderboard";
import { loadPlayers, loadRankings, profileHref } from "../lib/league";

export const revalidate = 0;

export default async function Classifiche() {
  const [players, rankings] = await Promise.all([
    loadPlayers(),
    loadRankings(),
  ]);
  const byName = new Map(players.map((p) => [p.name, p]));
  const hasPoints = rankings.mostPoints.some((r) => r.value > 0);
  const streak = rankings.winStreak;

  return (
    <>
      <header className="efm-wrap efm-page-head">
        <h1 className="efm-display efm-h1">Classifiche</h1>
        <p className="efm-lede">
          {rankings.gamesPlayed} partite e {rankings.subscribers} giocatori.
          Quelle serie e quelle che pesano di più: King of Sola e Trofeo Pepe
          compresi.
        </p>
      </header>

      <section className="efm-wrap" aria-label="Schede di classifica">
        {streak.names.length > 0 && (
          <div className="efm-streak">
            <span className="efm-streak__icon">
              <LuFlame aria-hidden />
            </span>
            <p>
              <strong>Serie più lunga: {streak.value} vittorie di fila</strong>
              <span>
                {streak.names.map((name, i) => (
                  <span key={name}>
                    {i > 0 && " · "}
                    <Link href={profileHref(name)} className="efm-name-link">
                      {name}
                    </Link>
                  </span>
                ))}
              </span>
            </p>
          </div>
        )}

        <div className="efm-boards">
          <Leaderboard
            title="Win rate"
            note="Partite vinte su giocate"
            rows={rankings.winRate}
            players={byName}
            format={(v) => v.toFixed(1) + "%"}
            threshold={50}
            max={100}
            expandable
          />
          <Leaderboard
            title="Più vittorie"
            note="Partite vinte in totale"
            rows={rankings.mostWinning}
            players={byName}
            expandable
          />
          <Leaderboard
            title="Più MVP"
            note="Volte migliore in campo"
            rows={rankings.mostMvp}
            players={byName}
            expandable
          />
          <Leaderboard
            title="Più presenze"
            note="Partite giocate"
            rows={rankings.mostActive}
            players={byName}
            max={rankings.gamesPlayed}
            expandable
          />
          <Leaderboard
            title="Più sconfitte"
            note="Partite perse in totale"
            rows={rankings.mostLosing}
            players={byName}
            expandable
          />
          <Leaderboard
            title="King of Sola"
            note="Partite saltate"
            rows={rankings.sola}
            players={byName}
            max={rankings.gamesPlayed}
            expandable
          />
          <Leaderboard
            title="Trofeo Pepe"
            note="Ammonizioni ricevute"
            rows={rankings.warnings.filter((r) => r.value > 0)}
            players={byName}
            expandable
          />
          {hasPoints && (
            <Leaderboard
              title="Più punti"
              note="Punteggio accumulato"
              rows={rankings.mostPoints}
              players={byName}
              expandable
            />
          )}
        </div>
      </section>
    </>
  );
}
