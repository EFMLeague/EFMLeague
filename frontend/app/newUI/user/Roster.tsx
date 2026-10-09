"use client";
import { useId, useState } from "react";
import { SearchIcon } from "../components/Marks";
import Shot from "../components/Shot";

type RosterPlayer = {
  name: string;
  src: string | null;
  video: string | null;
  status: string;
};

// L'intera rosa come foglio di provini: una posa per giocatore, in ordine
// alfabetico, con la ricerca per nome.
export default function Roster({ players }: { players: RosterPlayer[] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const q = query.trim().toLowerCase();
  const shown = q
    ? players.filter((p) => p.name.toLowerCase().includes(q))
    : players;

  return (
    <>
      <div className="pv-section-head">
        <div>
          <h1 className="pv-display pv-h1">Rosa</h1>
          <p className="pv-lede" style={{ marginTop: "1.1rem" }}>
            {players.length} giocatori in ordine alfabetico. Le pose scure sono
            di chi non ha una foto in archivio.
          </p>
        </div>
        <label className="pv-search" htmlFor={inputId}>
          <SearchIcon />
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

      <p className="pv-mono pv-status" aria-live="polite">
        {q ? `${shown.length} su ${players.length}` : " "}
      </p>

      {shown.length === 0 ? (
        <p className="pv-empty">
          <span className="pv-marker">nessuno sul rullino</span>
          Nessun giocatore con &laquo;{query}&raquo; nel nome.
        </p>
      ) : (
        <div className="pv-strip pv-strip--sheet" style={{ marginTop: "0.6rem" }}>
          {shown.map((p, i) => (
            <Shot
              key={p.name}
              src={p.src}
              blank={p.name.slice(0, 2)}
              alt={`${p.name}, ${p.status}`}
              href={"/newUI/user/" + encodeURIComponent(p.name)}
              video={p.video}
              number={String(i + 1).padStart(2, "0")}
              label={p.name}
              eager={i < 12}
            />
          ))}
        </div>
      )}
    </>
  );
}
