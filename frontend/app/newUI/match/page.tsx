import GameStrip from "../components/GameStrip";
import {
  Game,
  formatMonth,
  formatNight,
  loadGames,
  loadPlayers,
  nightKey,
} from "../lib/league";

export const revalidate = 0;

type Night = { key: string; games: Game[] };
type Month = { label: string; nights: Night[]; count: number };

export default async function Storico() {
  const [games, players] = await Promise.all([loadGames(), loadPlayers()]);
  const byId = new Map(players.map((p) => [p.id, p]));

  // Numero di posa: ordine cronologico, la prima partita è la 001
  const numberOf = new Map(
    games
      .slice()
      .reverse()
      .map((g, i) => [g.id, i + 1])
  );

  const months: Month[] = [];
  for (const game of games) {
    const label = formatMonth(game.date);
    let month = months[months.length - 1];
    if (!month || month.label !== label) {
      month = { label, nights: [], count: 0 };
      months.push(month);
    }
    const key = nightKey(game.date);
    let night = month.nights[month.nights.length - 1];
    if (!night || night.key !== key) {
      night = { key, games: [] };
      month.nights.push(night);
    }
    night.games.push(game);
    month.count++;
  }

  return (
    <>
      <section
        className="pv-wrap pv-section"
        style={{ paddingTop: "clamp(2.2rem, 5vw, 4rem)", paddingBottom: 0 }}
      >
        <div className="pv-section-head">
          <h1 className="pv-display pv-h1">Storico</h1>
          <p className="pv-lede">
            Tutte le {games.length} partite, dalla più recente. Blu a sinistra,
            rosso a destra, nell&apos;ordine dei ruoli; chi perde resta
            sottoesposto, l&apos;MVP è cerchiato.
          </p>
        </div>
      </section>

      {games.length === 0 && (
        <p className="pv-wrap pv-empty">
          <span className="pv-marker">rullino vuoto</span>
          Nessuna partita registrata.
        </p>
      )}

      {months.map((month) => (
        <section className="pv-wrap" key={month.label} aria-label={month.label}>
          <div className="pv-month">
            <h2 className="pv-display">{month.label}</h2>
            <span className="pv-mono">
              {month.count === 1 ? "1 partita" : `${month.count} partite`}
            </span>
          </div>
          {month.nights.map((night) => (
            <div className="pv-night" key={night.key}>
              <div className="pv-night__head">
                <h3>{formatNight(night.games[0].date)}</h3>
                <span className="pv-mono">
                  {night.games.length === 1
                    ? "1 partita"
                    : `${night.games.length} partite`}
                </span>
              </div>
              {night.games.map((game) => (
                <GameStrip
                  key={game.id}
                  game={game}
                  number={numberOf.get(game.id) ?? 0}
                  players={byId}
                />
              ))}
            </div>
          ))}
        </section>
      ))}
    </>
  );
}
