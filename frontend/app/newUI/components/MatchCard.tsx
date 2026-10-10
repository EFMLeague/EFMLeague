import Link from "next/link";
import { LuCrown } from "react-icons/lu";
import {
  Game,
  Player,
  ROLES,
  ROLE_LABEL,
  Side,
  champSrc,
  formatDate,
  pad,
  profileHref,
} from "../lib/league";
import Avatar from "./Avatar";

const SIDE_LABEL: Record<Side, string> = { blue: "Blu", red: "Rosso" };

// Una partita come la schermata post-game del client: blu e rosso affiancati,
// nell'ordine dei ruoli, l'MVP con la corona.
export default function MatchCard({
  game,
  number,
  players,
}: {
  game: Game;
  number: number;
  players: Map<number, Player>;
}) {
  const sides: Side[] = ["blue", "red"];
  return (
    <article
      className="efm-match"
      id={`partita-${number}`}
      aria-label={`Partita ${number}, ${game.name}`}
    >
      <header className="efm-match__head">
        <div className="efm-match__title">
          <strong>Partita {pad(number, 3)}</strong>
          <span>
            {game.name} · {formatDate(game.date)}
          </span>
        </div>
        <span className={"efm-badge efm-badge--" + game.winner}>
          Vince {SIDE_LABEL[game.winner]}
        </span>
      </header>
      <div className="efm-match__teams">
        {sides.map((side) => {
          const won = side === game.winner;
          return (
            <section
              key={side}
              className={`efm-team efm-team--${side}` + (won ? " is-winner" : "")}
              aria-label={`Squadra ${SIDE_LABEL[side]}`}
            >
              <div className="efm-team__head">
                <span>Squadra {SIDE_LABEL[side]}</span>
                <span className="efm-team__result">
                  {won ? "Vittoria" : "Sconfitta"}
                </span>
              </div>
              <ol>
                {ROLES.map((role) => {
                  const row = game.players.find(
                    (p) => p.Squadra === side && p.Ruolo === role
                  );
                  const player = row ? players.get(row.IDGiocatore) : undefined;
                  const champ = champSrc(row?.ChampGiocato ?? null);
                  return (
                    <li
                      key={role}
                      className={"efm-slot" + (row?.MVP ? " is-mvp" : "")}
                    >
                      <img
                        className="efm-slot__role"
                        src={`/img/roles/${role}.png`}
                        alt={ROLE_LABEL[role]}
                        title={ROLE_LABEL[role]}
                        width={18}
                        height={18}
                      />
                      {champ ? (
                        <img
                          className="efm-champ"
                          src={champ}
                          alt=""
                          title={row?.ChampGiocato ?? undefined}
                          width={36}
                          height={36}
                          loading="lazy"
                        />
                      ) : (
                        <Avatar player={player} size={36} />
                      )}
                      <span className="efm-slot__name">
                        {player ? (
                          <Link
                            className="efm-name-link"
                            href={profileHref(player.name)}
                          >
                            {row?.username}
                          </Link>
                        ) : (
                          row?.username ?? "—"
                        )}
                        {row?.ChampGiocato && <small>{row.ChampGiocato}</small>}
                      </span>
                      {row?.MVP ? (
                        <span className="efm-mvp">
                          <LuCrown aria-hidden /> MVP
                        </span>
                      ) : (
                        <span />
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </article>
  );
}
