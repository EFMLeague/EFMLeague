"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Ring } from "../components/Marks";
import { ROLES, ROLE_LABEL, Role, Side } from "../lib/shared";

type Candidate = { name: string; src: string | null };
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

// Porta l'elemento index-esimo della pista al centro del quadro
const centerOffset = (track: HTMLElement, index: number) => {
  const item = track.children[index] as HTMLElement | undefined;
  const gate = track.parentElement;
  if (!item || !gate) return 0;
  return gate.clientWidth / 2 - (item.offsetLeft + item.offsetWidth / 2);
};

function useTrack<T>(items: T[], key: string) {
  const ref = useRef<HTMLDivElement>(null);
  // a riposo la pista mostra il primo elemento del secondo giro
  useLayoutEffect(() => {
    const track = ref.current;
    if (!track) return;
    track.getAnimations().forEach((a) => a.cancel());
    track.style.transform = `translateX(${centerOffset(
      track,
      items.length
    )}px)`;
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
          { transform: from, filter: "blur(2px)", offset: 0.08 },
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

  const playerTrack = useTrack(pool, pool.join("|"));
  const slotTrack = useTrack(slots, slots.map(slotKey).join("|"));
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
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setResult(null);
    setSpinning(true);
    await Promise.all([
      playerTrack.run(p, reduce ? 0 : 2600),
      slotTrack.run(s, reduce ? 0 : 3100),
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
    setResult(null);
  };

  const reset = () => {
    setTeams(emptyTeams());
    setSelected([]);
    setResult(null);
  };

  const repeated = <T,>(items: T[]) =>
    Array.from({ length: REPEAT }, () => items).flat();

  return (
    <>
      <div className="pv-section-head" style={{ marginBottom: "0.8rem" }}>
        <p className="pv-mono pv-status" aria-live="polite">
          {selected.length} di {MAX} scelti
        </p>
        {(selected.length > 0 || assigned.size > 0) && (
          <button
            type="button"
            className="pv-btn pv-btn--ghost"
            onClick={reset}
            disabled={spinning}
          >
            Azzera tutto
          </button>
        )}
      </div>

      <div className="pv-strip pv-strip--sheet" role="group" aria-label="Giocatori da sorteggiare">
        {players.map((p) => {
          const on = selected.includes(p.name);
          const used = assigned.has(p.name);
          const full = !on && selected.length >= MAX;
          return (
            <button
              key={p.name}
              type="button"
              className="pv-shot pv-pick"
              aria-pressed={on}
              disabled={spinning || used || full}
              onClick={() => toggle(p.name)}
            >
              <span className="pv-shot__img" style={{ display: "block" }}>
                {p.src ? (
                  <img src={p.src} alt="" loading="lazy" width={300} height={400} />
                ) : (
                  <span className="pv-shot__blank" aria-hidden>
                    {p.name.slice(0, 2)}
                  </span>
                )}
              </span>
              {on && <Ring />}
              <span className="pv-shot__edge">
                <i>{used ? "In squadra" : on ? "Scelto" : ""}</i>
                <b>{p.name}</b>
              </span>
            </button>
          );
        })}
      </div>

      <div className="pv-projector pv-section">
        <div>
          <h2 className="pv-display pv-h2" style={{ marginBottom: "1.2rem" }}>
            Proiezione
          </h2>
          <div className="pv-gate" aria-hidden>
            <div className="pv-gate__track" ref={playerTrack.ref}>
              {pool.length === 0 ? (
                <div className="pv-shot" style={{ margin: "0 auto" }}>
                  <div className="pv-shot__img">
                    <div className="pv-shot__blank">?</div>
                  </div>
                </div>
              ) : (
                repeated(pool).map((name, i) => {
                  const c = byName.get(name);
                  return (
                    <div className="pv-shot" key={i}>
                      <div className="pv-shot__img">
                        {c?.src ? (
                          <img src={c.src} alt="" width={300} height={400} />
                        ) : (
                          <div className="pv-shot__blank">{name.slice(0, 2)}</div>
                        )}
                      </div>
                      <span className="pv-shot__edge">
                        <b>{name}</b>
                      </span>
                    </div>
                  );
                })
              )}
            </div>
            <div className="pv-gate__window" />
          </div>
          <div className="pv-gate pv-gate--slots" aria-hidden>
            <div className="pv-gate__track" ref={slotTrack.ref}>
              {repeated(slots).map((s, i) => (
                <div className={"pv-slot pv-slot--" + s.side} key={i}>
                  {ROLE_LABEL[s.role]}
                  <small>{SIDE_LABEL[s.side]}</small>
                </div>
              ))}
            </div>
            <div className="pv-gate__window" />
          </div>

          <div className="pv-verdict" aria-live="polite">
            {result ? (
              <>
                <p className="pv-verdict__text">
                  <em>{result.name}</em>
                  <br />
                  {ROLE_LABEL[result.slot.role]} · {SIDE_LABEL[result.slot.side]}
                </p>
                <div className="pv-verdict__actions">
                  <button type="button" className="pv-btn pv-btn--big" onClick={confirm}>
                    Conferma
                  </button>
                  <button type="button" className="pv-btn pv-btn--ghost" onClick={spin}>
                    Rifai
                  </button>
                </div>
              </>
            ) : done ? (
              <>
                <p className="pv-verdict__text">Squadre fatte</p>
                <button type="button" className="pv-btn pv-btn--big" onClick={reset}>
                  Nuovo sorteggio
                </button>
              </>
            ) : (
              <>
                <p className="pv-status" style={{ margin: 0, maxWidth: "36ch" }}>
                  {pool.length === 0
                    ? "Scegli almeno un giocatore dal provino qui sopra."
                    : spinning
                    ? "La pellicola scorre…"
                    : `${pool.length} in pellicola, ${slots.length} posti liberi.`}
                </p>
                <button
                  type="button"
                  className="pv-btn pv-btn--big"
                  onClick={spin}
                  disabled={spinning || pool.length === 0 || slots.length === 0}
                >
                  Proietta
                </button>
              </>
            )}
          </div>
        </div>

        <div className="pv-teams">
          {(["blue", "red"] as Side[]).map((side) => (
            <div className="pv-team" key={side}>
              <h3 className="pv-h3">
                <span className={"pv-side pv-side--" + side}>
                  Squadra {SIDE_LABEL[side]}
                </span>
              </h3>
              <ol>
                {ROLES.map((role) => (
                  <li key={role}>
                    <img src={`/img/roles/${role}.png`} alt="" width={26} height={26} />
                    <span className="pv-mono">{ROLE_LABEL[role]}</span>
                    {teams[side][role] ? (
                      <span className="pv-marker">{teams[side][role]}</span>
                    ) : (
                      <span className="pv-mono is-empty">libero</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
