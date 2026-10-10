import Link from "next/link";

export default function GiocatoreNonTrovato() {
  return (
    <section className="efm-wrap efm-page-head">
      <h1 className="efm-display efm-h1">Giocatore non trovato</h1>
      <p className="efm-lede">
        Nessun giocatore con questo nome nella lega. Forse ha cambiato nome:
        cercalo nella rosa.
      </p>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/newUI/user" className="efm-btn efm-btn--primary">
          Apri la rosa
        </Link>
      </p>
    </section>
  );
}
