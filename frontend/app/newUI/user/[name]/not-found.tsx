import Link from "next/link";

export default function GiocatoreNonTrovato() {
  return (
    <section className="pv-wrap pv-section">
      <h1 className="pv-display pv-h1">Posa mancante</h1>
      <p className="pv-lede" style={{ marginTop: "1.2rem" }}>
        Nessun giocatore con questo nome nell&apos;archivio della lega. Forse ha
        cambiato nome: cercalo nella rosa.
      </p>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/newUI/user" className="pv-btn">
          Apri la rosa
        </Link>
      </p>
    </section>
  );
}
