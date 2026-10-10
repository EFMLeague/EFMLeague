import type { Metadata } from "next";
import Link from "next/link";
import Nav from "./components/Nav";
// Font self-hosted (niente download da Google Fonts durante la build)
// Display: grottesco condensato corsivo e nero, come le scritte dei video
// di presentazione della lega
import "@fontsource/barlow-condensed/700-italic.css";
import "@fontsource/barlow-condensed/800-italic.css";
import "@fontsource/barlow-condensed/900-italic.css";
// Testo e interfaccia: sans da lavoro con cifre tabellari
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow/700.css";
import "./efm.css";

export const metadata: Metadata = {
  title: "EFM League",
  description:
    "L'archivio della EFM League: giocatori, partite e classifiche della lega tra amici.",
};

export default function NewUILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="it" className="efm">
      <Nav />
      <main className="efm-main">{children}</main>
      <footer className="efm-foot">
        <div className="efm-wrap efm-foot__inner">
          <Link href="/newUI" className="efm-brand">
            <img src="/img/logo/Logocentrato.png" alt="" width={28} height={28} />
            <span>EFM League</span>
          </Link>
          <span>Stagione 1 · 2023 · Di Francesco Nicolò e Stefano Piccoli</span>
          <Link href="/">Vecchia versione del sito</Link>
        </div>
      </footer>
    </div>
  );
}
