"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LuCheck, LuRotateCcw, LuShuffle } from "react-icons/lu";
import Avatar from "../components/Avatar";
import { ROLES, ROLE_LABEL, Role, Side } from "../lib/shared";

type Candidate = { name: string; hasFrame: boolean };
type Slot = { side: Side; role: Role };
type Teams = Record<Side, Record<Role, string | null>>;

const MAX = 10;
const REPEAT = 7;
const SIDE_LABEL: Record<Side, string> = { blue: "Blu", red: "Rosso" };

const ALL_SLOTS: Slot[] = ROLES.flatMap((role) =>
  (["blue", "red"] as Side[]).map((side) => ({ side, role }))
);

const emptyTeams = (): Teams => ({
  blue: { top: null, jng: null, mid: null, adc: null, sup: null },
  red: { top: null, jng: null, mid: null, adc: null, sup: null },
});

const slotKey = (s: Slot) => s.side + "-" + s.role;

// Porta l'elemento index-esimo del rullo sotto l'indicatore centrale
const centerOffset = (track: HTMLElement, index: number) => {
  const item = track.children[index] as HTMLElement | undefined;
  const reel = track.parentElement;
  if (!item || !reel) return 0;
  return reel.clientWidth / 2 - (item.offsetLeft + item.offsetWidth / 2);
};

function useReel<T>(items: T[], key: string) {
  const ref = useRef<HTMLDivElement>(null);
  // a riposo il rullo mostra il primo elemento del secondo giro
  useLayoutEffect(() => {
    const track = ref.current;
    if (!track) return;
    track.getAnimations().forEach((a) => a.cancel());
    track.style.transform = `translateX(${centerOffset(track, items.length)}px)`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const run = (target: number, duration: number) =>
    new Promise<void>((resolve) => {
      const track = ref.current;
      if (!track || items.length === 0) return resolve();
      const from = track.style.transform || "translateX(0px)";
      const to = `translateX(${centerOffset(
        track,
        (REPEAT - 2) * items.length + target
      )}px)`;
      if (duration === 0) {
        track.style.transform = to;
        return resolve();
      }
      const anim = track.animate(
        [
          { transform: from, filter: "blur(0px)" },
          { transform: from, filter: "blur(1.5px)", offset: 0.06 },
          { transform: to, filter: "blur(0px)" },
        ],
        { duration, easing: "cubic-bezier(0.12, 0.7, 0.08, 1)" }
      );
      anim.onfinish = () => {
        track.style.transform = to;
        resolve();
      };
    });

  return { ref, run };
}

export default function Sorteggio({ players }: { players: Candidate[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [teams, setTeams] = useState<Teams>(emptyTeams);
  const [spinning, setSpinning] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  const [result, setResult] = useState<{ name: string; slot: Slot } | null>(
    null
  );

  const assigned = new Set(
    (["blue", "red"] as Side[]).flatMap((side) =>
      ROLES.map((role) => teams[side][role]).filter(Boolean)
    ) as string[]
  );
  const pool = selected.filter((n) => !assigned.has(n));
  const slots = ALL_SLOTS.filter((s) => !teams[s.side][s.role]);
  const done = assigned.size > 0 && (pool.length === 0 || slots.length === 0);

  const playerReel = useReel(pool, pool.join("|"));
  const slotReel = useReel(slots, slots.map(slotKey).join("|"));
  const byName = new Map(players.map((p) => [p.name, p]));

  // un sorteggio non confermato decade se cambia la scelta
  useEffect(() => setResult(null), [selected]);

  const toggle = (name: string) => {
    if (spinning || assigned.has(name)) return;
    setSelected((s) =>
      s.includes(name)
        ? s.filter((n) => n !== name)
        : s.length < MAX
        ? [...s, name]
        : s
    );
  };

  const spin = async () => {
    if (spinning || pool.length === 0 || slots.length === 0) return;
    const p = Math.floor(Math.random() * pool.length);
    const s = Math.floor(Math.random() * slots.length);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setResult(null);
    setSpinning(true);
    await Promise.all([
      playerReel.run(p, reduce ? 0 : 2600),
      slotReel.run(s, reduce ? 0 : 3100),
    ]);
    setSpinning(false);
    setResult({ name: pool[p], slot: slots[s] });
  };

  const confirm = () => {
    if (!result) return;
    setTeams((t) => ({
      ...t,
      [result.slot.side]: { ...t[result.slot.side], [result.slot.role]: result.name },
    }));
    setLast(result.name);
    setResult(null);
  };

  const reset = () => {
    setTeams(emptyTeams());
    setSelected([]);
    setResult(null);
    setLast(null);
  };

  const repeated = <T,>(items: T[]) =>
    Array.from({ length: REPEAT }, () => items).flat();

  return (
    <div className="efm-draw">
      <div className="efm-reels-col" style={{ display: "grid", gap: "1rem" }}>
        <section className="efm-card efm-panel" aria-label="Giocatori da sorteggiare">
          <div className="efm-panel__head">
            <h2 className="efm-h3">
              Giocatori{" "}
              <span className="efm-muted efm-num" aria-live="polite">
                · {selected.length} di {MAX}
              </span>
            </h2>
            {(selected.length > 0 || assigned.size > 0) && (
              <button
                type="button"
                className="efm-btn efm-btn--secondary"
                onClick={reset}
                disabled={spinning}
              >
                <LuRotateCcw aria-hidden /> Azzera tutto
              </button>
            )}
          </div>
          <div className="efm-picks">
            {players.map((p) => {
              const on = selected.includes(p.name);
              const used = assigned.has(p.name);
              const full = !on && selected.length >= MAX;
              return (
                <button
                  key={p.name}
                  type="button"
                  className={"efm-pick" + (used ? " is-used" : "")}
                  aria-pressed={on}
                  disabled={spinning || used || full}
                  onClick={() => toggle(p.name)}
                  title={used ? "Già in squadra" : undefined}
                >
                  <Avatar player={p} size={32} />
                  <span>{p.name}</span>
                  {on && <LuCheck className="efm-pick__check" aria-hidden />}
                </button>
              );
            })}
          </div>
        </section>

        <section className="efm-card efm-panel" aria-label="Rullo">
          <div className="efm-reels" aria-hidden>
            <div className="efm-reel">
              <div className="efm-reel__track" ref={playerReel.ref}>
                {pool.length === 0 ? (
                  <div className="efm-reel__empty">Nessuno in gioco</div>
                ) : (
                  repeated(pool).map((name, i) => (
                    <div className="efm-reel__item" key={i}>
                      <Avatar player={byName.get(name)} size={56} />
                      <b>{name}</b>
                    </div>
                  ))
                )}
              </div>
              {pool.length > 0 && <div className="efm-reel__marker" />}
            </div>
            <div className="efm-reel efm-reel--slots">
              <div className="efm-reel__track" ref={slotReel.ref}>
                {repeated(slots).map((s, i) => (
                  <div
                    className={`efm-reel__item efm-reel__item--slot efm-reel__item--${s.side}`}
                    key={i}
                  >
                    <img src={`/img/roles/${s.role}.png`} alt="" width={20} height={20} />
                    {ROLE_LABEL[s.role]}
                  </div>
                ))}
              </div>
              {slots.length > 0 && <div className="efm-reel__marker" />}
            </div>
          </div>

          <div className="efm-verdict" aria-live="polite">
            {result ? (
              <>
                <p className="efm-verdict__result">
                  <strong>{result.name}</strong>
                  <span>
                    {ROLE_LABEL[result.slot.role]} · Squadra{" "}
                    {SIDE_LABEL[result.slot.side]}
                  </span>
                </p>
                <div className="efm-verdict__actions">
                  <button type="button" className="efm-btn efm-btn--primary" onClick={confirm}>
                    <LuCheck aria-hidden /> Conferma
                  </button>
                  <button type="button" className="efm-btn efm-btn--secondary" onClick={spin}>
                    Rigira
                  </button>
                </div>
              </>
            ) : done ? (
              <>
                <p className="efm-verdict__result">
                  <strong>Squadre fatte</strong>
                </p>
                <button type="button" className="efm-btn efm-btn--primary" onClick={reset}>
                  Nuovo sorteggio
                </button>
              </>
            ) : (
              <>
                <p>
                  {pool.length === 0
                    ? "Scegli almeno un giocatore qui sopra."
                    : spinning
                    ? "Il rullo gira…"
                    : `${pool.length} in gioco, ${slots.length} posti liberi.`}
                </p>
                <button
                  type="button"
                  className="efm-btn efm-btn--primary efm-btn--big"
                  onClick={spin}
                  disabled={spinning || pool.length === 0 || slots.length === 0}
                >
                  <LuShuffle aria-hidden /> Gira
                </button>
              </>
            )}
          </div>
        </section>
      </div>

      <div className="efm-lineup">
        {(["blue", "red"] as Side[]).map((side) => (
          <section
            className={`efm-card efm-lineup__team efm-lineup__team--${side}`}
            key={side}
            aria-label={`Squadra ${SIDE_LABEL[side]}`}
          >
            <h3 className="efm-h3">Squadra {SIDE_LABEL[side]}</h3>
            <ol>
              {ROLES.map((role) => {
                const name = teams[side][role];
                return (
                  <li key={role} className={name && name === last ? "is-new" : undefined}>
                    <img src={`/img/roles/${role}.png`} alt="" width={20} height={20} />
                    <span className="efm-label">{ROLE_LABEL[role]}</span>
                    {name ? (
                      <strong>{name}</strong>
                    ) : (
                      <strong className="is-empty">Libero</strong>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
