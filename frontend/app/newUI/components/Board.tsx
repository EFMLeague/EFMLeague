import Link from "next/link";
import type { RankingRow } from "@/app/ranking/computeRankings";
import { Player, frameSrc, pad, profileHref, videoSrc } from "../lib/league";
import { Chevron } from "./Marks";
import Shot from "./Shot";

type BoardProps = {
  title: string;
  note: string;
  rows: RankingRow[];
  players: Map<string, Player>;
  format?: (value: number) => string;
  // valore di riferimento sotto cui la misura è attenuata (es. 50% di vittorie)
  threshold?: number;
  max?: number;
  top?: number;
  expandable?: boolean;
  // come è segnata la posa del primo: cerchio, croce o posa sottoesposta
  leaderMark?: "ring" | "cross" | "dim";
};

const Rows = ({
  rows,
  offset,
  format,
  threshold,
  max,
}: {
  rows: RankingRow[];
  offset: number;
  format: (value: number) => string;
  threshold?: number;
  max: number;
}) => (
  <ol className="pv-rows" start={offset + 1}>
    {rows.map((row, i) => (
      <li className="pv-row" key={row.name}>
        <span className="pv-row__pos">{pad(offset + i + 1)}</span>
        <Link className="pv-row__name" href={profileHref(row.name)}>
          {row.name}
        </Link>
        <span className="pv-row__val">{format(row.value)}</span>
        <span className="pv-row__bar" aria-hidden>
          <span
            className={
              threshold !== undefined && row.value < threshold ? "is-under" : ""
            }
            style={{ width: max > 0 ? `${(row.value / max) * 100}%` : 0 }}
          />
        </span>
      </li>
    ))}
  </ol>
);

// Una classifica come scheda di registro: il primo è la posa cerchiata,
// la riga sotto ogni nome è lunga esattamente quanto il suo valore.
export default function Board({
  title,
  note,
  rows,
  players,
  format = (value) => String(value),
  threshold,
  max,
  top = 5,
  expandable = false,
  leaderMark = "ring",
}: BoardProps) {
  const leader = rows[0];
  const leaderPlayer = leader ? players.get(leader.name) : undefined;
  const scale = max ?? Math.max(0, ...rows.map((r) => r.value));
  const visible = rows.slice(0, top);
  const rest = rows.slice(top);

  return (
    <section className="pv-board" aria-label={title}>
      <div className="pv-board__head">
        {leader && (
          <Shot
            src={leaderPlayer ? frameSrc(leaderPlayer) : null}
            blank={leader.name.slice(0, 2)}
            alt={leader.name}
            href={profileHref(leader.name)}
            video={videoSrc(leader.name)}
            mark={leaderMark === "dim" ? null : leaderMark}
            className={leaderMark === "dim" ? "is-dim" : ""}
          />
        )}
        <div>
          <h3 className="pv-h3">{title}</h3>
          <p className="pv-mono">{note}</p>
          {leader && (
            <Link className="pv-board__leader" href={profileHref(leader.name)}>
              {leader.name} · {format(leader.value)}
            </Link>
          )}
        </div>
      </div>
      {rows.length === 0 ? (
        <p className="pv-status">Nessun dato registrato.</p>
      ) : (
        <>
          <Rows
            rows={visible}
            offset={0}
            format={format}
            threshold={threshold}
            max={scale}
          />
          {expandable && rest.length > 0 && (
            <details className="pv-more">
              <summary className="pv-mono">
                Altri {rest.length} <Chevron />
              </summary>
              <Rows
                rows={rest}
                offset={top}
                format={format}
                threshold={threshold}
                max={scale}
              />
            </details>
          )}
        </>
      )}
    </section>
  );
}
