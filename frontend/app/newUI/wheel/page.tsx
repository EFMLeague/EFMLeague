import Sorteggio from "./Sorteggio";
import { loadPlayers } from "../lib/league";

export const revalidate = 0;

export default async function SorteggioPage() {
  const players = await loadPlayers();
  return (
    <>
      <header className="efm-wrap efm-page-head">
        <h1 className="efm-display efm-h1">Sorteggio</h1>
        <p className="efm-lede">
          Scegli fino a dieci giocatori e gira: il rullo si ferma su un
          giocatore e su un posto in squadra. Conferma, e si passa al prossimo.
        </p>
      </header>
      <section className="efm-wrap">
        <Sorteggio
          players={players.map((p) => ({ name: p.name, hasFrame: p.hasFrame }))}
        />
      </section>
    </>
  );
}
