"use client";
import { useId, useState } from "react";
import { LuSearch } from "react-icons/lu";
import PlayerCard from "../components/PlayerCard";

type RosterPlayer = {
  name: string;
  src: string | null;
  video: string | null;
  status: string;
};

// L'intera rosa in ordine alfabetico, con la ricerca per nome
export default function Roster({ players }: { players: RosterPlayer[] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const q = query.trim().toLowerCase();
  const shown = q
    ? players.filter((p) => p.name.toLowerCase().includes(q))
    : players;

  return (
    <>
      <header className="efm-wrap efm-page-head">
        <div className="efm-section-head" style={{ marginBottom: 0 }}>
          <div>
            <h1 className="efm-display efm-h1">Rosa</h1>
            <p className="efm-lede">
              {players.length} giocatori in ordine alfabetico. Passa sopra una
              card: chi ha il video di presentazione si anima.
            </p>
          </div>
          <label className="efm-search" htmlFor={inputId}>
            <LuSearch aria-hidden />
            <input
              id={inputId}
              type="search"
              placeholder="Cerca un giocatore"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
          </label>
        </div>
      </header>

      <section className="efm-wrap" aria-label="Giocatori">
        <p className="efm-status" aria-live="polite">
          {q ? `${shown.length} su ${players.length}` : " "}
        </p>
        {shown.length === 0 ? (
          <div className="efm-card efm-empty">
            <strong>Nessun giocatore trovato</strong>
            Nessuno ha &laquo;{query}&raquo; nel nome. Prova con meno lettere.
          </div>
        ) : (
          <div className="efm-players">
            {shown.map((p, i) => (
              <PlayerCard
                key={p.name}
                name={p.name}
                src={p.src}
                video={p.video}
                status={p.status}
                href={"/newUI/user/" + encodeURIComponent(p.name)}
                eager={i < 12}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
