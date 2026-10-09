import {
  Game,
  Player,
  ROLES,
  ROLE_LABEL,
  Side,
  champSrc,
  formatDate,
  frameSrc,
  pad,
  profileHref,
} from "../lib/league";
import Shot from "./Shot";

const SIDE_LABEL: Record<Side, string> = { blue: "Blu", red: "Rosso" };

// Una partita stampata come striscia di dieci pose: blu a sinistra, rosso a
// destra, nell'ordine dei ruoli. La squadra che perde resta sottoesposta.
export default function GameStrip({
  game,
  number,
  players,
}: {
  game: Game;
  number: number;
  players: Map<number, Player>;
}) {
  const sides: Side[] = ["blue", "red"];
  const mvp = game.players.find((p) => p.MVP);

  return (
    <article
      className="pv-game"
      id={`posa-${number}`}
      aria-label={`Partita ${number}, ${game.name}`}
    >
      <div className="pv-game__meta pv-mono">
        <span>
          <strong>Posa {pad(number, 3)}</strong> · {game.name} ·{" "}
          {formatDate(game.date)}
        </span>
        <span>
          <span className={"pv-side pv-side--" + game.winner}>
            Vince {SIDE_LABEL[game.winner]}
          </span>
          {mvp && <> · MVP {mvp.username}</>}
        </span>
      </div>
      <div className="pv-game__strip">
        {sides.flatMap((side) =>
          ROLES.map((role, i) => {
            const row = game.players.find(
              (p) => p.Squadra === side && p.Ruolo === role
            );
            const player = row ? players.get(row.IDGiocatore) : undefined;
            const champ = champSrc(row?.ChampGiocato ?? null);
            const src = champ ?? (player ? frameSrc(player) : null);
            const name = row?.username ?? "—";
            return (
              <Shot
                key={side + role}
                src={src}
                blank={name.slice(0, 2)}
                alt={
                  row
                    ? `${name}, ${ROLE_LABEL[role]}` +
                      (row.ChampGiocato ? ` con ${row.ChampGiocato}` : "")
                    : ""
                }
                href={player ? profileHref(player.name) : undefined}
                number={ROLE_LABEL[role]}
                label={name}
                mark={row?.MVP ? "ring" : null}
                markTitle={row?.MVP ? "MVP" : undefined}
                className={side !== game.winner ? "is-dim" : ""}
                tag={
                  i === 0 ? (
                    <span className="pv-team-tag">{SIDE_LABEL[side]}</span>
                  ) : undefined
                }
              />
            );
          })
        )}
      </div>
    </article>
  );
}
