import Link from "next/link";
import Board from "../components/Board";
import { Arrow } from "../components/Marks";
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
      <section className="pv-wrap pv-section" style={{ paddingTop: "clamp(2.2rem, 5vw, 4rem)" }}>
        <div className="pv-section-head">
          <h1 className="pv-display pv-h1">Classifiche</h1>
          <p className="pv-lede">
            {rankings.gamesPlayed} partite, {rankings.subscribers} giocatori. In
            ogni scheda il primo è segnato a matita e la riga sotto ogni nome è lunga
            quanto il suo numero.
          </p>
        </div>

        {streak.names.length > 0 && (
          <div className="pv-streak">
            <Arrow className="pv-streak__arrow" />
            <p className="pv-display">
              Serie più lunga: {streak.value} vittorie di fila
            </p>
            <p className="pv-streak__names">
              {streak.names.map((name, i) => (
                <span key={name}>
                  {i > 0 && " · "}
                  <Link href={profileHref(name)}>{name}</Link>
                </span>
              ))}
            </p>
          </div>
        )}
      </section>

      <section className="pv-wrap" aria-label="Schede di classifica">
        <div className="pv-boards">
          <Board
            title="Win rate"
            note="Partite vinte su giocate"
            rows={rankings.winRate}
            players={byName}
            format={(v) => v.toFixed(1) + "%"}
            threshold={50}
            max={100}
            expandable
          />
          <Board
            title="Più vittorie"
            note="Partite vinte in totale"
            rows={rankings.mostWinning}
            players={byName}
            expandable
          />
          <Board
            title="Più MVP"
            note="Volte migliore in campo"
            rows={rankings.mostMvp}
            players={byName}
            expandable
          />
          <Board
            title="Più presenze"
            note="Partite giocate"
            rows={rankings.mostActive}
            players={byName}
            max={rankings.gamesPlayed}
            expandable
          />
          <Board
            title="Più sconfitte"
            note="Partite perse in totale"
            rows={rankings.mostLosing}
            players={byName}
            leaderMark="cross"
            expandable
          />
          <Board
            title="King of Sola"
            note="Partite saltate"
            rows={rankings.sola}
            players={byName}
            leaderMark="dim"
            max={rankings.gamesPlayed}
            expandable
          />
          <Board
            title="Trofeo Pepe"
            note="Ammonizioni ricevute"
            rows={rankings.warnings.filter((r) => r.value > 0)}
            players={byName}
            expandable
          />
          {hasPoints && (
            <Board
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
