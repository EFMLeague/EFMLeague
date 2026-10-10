import MatchCard from "../components/MatchCard";
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

const count = (n: number) => (n === 1 ? "1 partita" : `${n} partite`);

export default async function Partite() {
  const [games, players] = await Promise.all([loadGames(), loadPlayers()]);
  const byId = new Map(players.map((p) => [p.id, p]));

  // Numerazione in ordine cronologico: la prima partita è la 001
  const numberOf = new Map(
    games
      .slice()
      .reverse()
      .map((g, i) => [g.id, i + 1])
  );

  // Mesi, e dentro ogni mese le serate di gioco
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
      <header className="efm-wrap efm-page-head" style={{ paddingBottom: 0 }}>
        <h1 className="efm-display efm-h1">Partite</h1>
        <p className="efm-lede">
          Tutte le {games.length} partite, dalla più recente, raggruppate per
          serata. Blu e rosso nell&apos;ordine dei ruoli, l&apos;MVP con la
          corona.
        </p>
      </header>

      {games.length === 0 && (
        <div className="efm-wrap efm-section">
          <div className="efm-card efm-empty">
            <strong>Nessuna partita registrata</strong>
            Quando la lega ne registra una, compare qui.
          </div>
        </div>
      )}

      {months.map((month) => (
        <section className="efm-wrap" key={month.label} aria-label={month.label}>
          <div className="efm-month">
            <h2 className="efm-display efm-h2">{month.label}</h2>
            <span className="efm-label">{count(month.count)}</span>
          </div>
          {month.nights.map((night) => (
            <div className="efm-night" key={night.key}>
              <div className="efm-night__head">
                <h3>{formatNight(night.games[0].date)}</h3>
                <span className="efm-label">{count(night.games.length)}</span>
              </div>
              <div className="efm-matches">
                {night.games.map((game) => (
                  <MatchCard
                    key={game.id}
                    game={game}
                    number={numberOf.get(game.id) ?? 0}
                    players={byId}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </>
  );
}
