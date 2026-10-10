import Link from "next/link";
import { LuChevronDown } from "react-icons/lu";
import { Player, profileHref } from "../lib/league";
import Avatar from "./Avatar";

type Row = { name: string; value: number };

// Scheda di classifica: il primo in testa con il suo valore, gli altri in
// lista con una barra proporzionale al valore.
export default function Leaderboard({
  title,
  note,
  rows,
  players,
  format = (v) => String(v),
  max,
  threshold,
  limit = 5,
  expandable = false,
}: {
  title: string;
  note: string;
  rows: Row[];
  players: Map<string, Player>;
  format?: (value: number) => string;
  max?: number;
  threshold?: number;
  limit?: number;
  expandable?: boolean;
}) {
  const top = rows[0];
  const scale = max ?? Math.max(1, ...rows.map((r) => r.value));
  const shown = rows.slice(0, limit);
  const rest = expandable ? rows.slice(limit) : [];

  const row = (r: Row, i: number) => (
    <li key={r.name} className={"efm-row" + (i === 0 ? " is-first" : "")}>
      <span className="efm-row__rank">{i + 1}</span>
      <Avatar player={players.get(r.name)} size={28} />
      <span className="efm-row__name">
        <Link href={profileHref(r.name)} className="efm-name-link">
          {r.name}
        </Link>
        <span
          className={
            "efm-bar" +
            (threshold !== undefined && r.value < threshold ? " efm-bar--below" : "")
          }
          aria-hidden
        >
          <span style={{ width: `${Math.min(100, (r.value / scale) * 100)}%` }} />
        </span>
      </span>
      <span className="efm-row__value">{format(r.value)}</span>
    </li>
  );

  return (
    <section className="efm-board" aria-label={title}>
      <header className="efm-board__head">
        {top && <Avatar player={players.get(top.name)} size={52} gold />}
        <div>
          <h3 className="efm-h3">{title}</h3>
          <p>{note}</p>
        </div>
        {top && (
          <div className="efm-board__leader">
            <strong>{format(top.value)}</strong>
            <Link href={profileHref(top.name)}>{top.name}</Link>
          </div>
        )}
      </header>
      {rows.length === 0 ? (
        <p className="efm-empty">Nessuno in classifica.</p>
      ) : (
        <ol>{shown.map(row)}</ol>
      )}
      {rest.length > 0 && (
        <details className="efm-more">
          <summary>
            Mostra tutti ({rows.length}) <LuChevronDown aria-hidden />
          </summary>
          <ol>{rest.map((r, i) => row(r, i + limit))}</ol>
        </details>
      )}
    </section>
  );
}
