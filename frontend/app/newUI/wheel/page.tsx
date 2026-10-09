import Sorteggio from "./Sorteggio";
import { frameSrc, loadPlayers } from "../lib/league";

export const revalidate = 0;

export default async function SorteggioPage() {
  const players = await loadPlayers();
  return (
    <section
      className="pv-wrap pv-section"
      style={{ paddingTop: "clamp(2.2rem, 5vw, 4rem)" }}
    >
      <div className="pv-section-head">
        <h1 className="pv-display pv-h1">Sorteggio</h1>
        <p className="pv-lede">
          Scegli fino a dieci giocatori e proietta: la pellicola si ferma su un
          giocatore e su un posto in squadra. Conferma, e si passa al prossimo.
        </p>
      </div>
      <Sorteggio
        players={players.map((p) => ({ name: p.name, src: frameSrc(p) }))}
      />
    </section>
  );
}
