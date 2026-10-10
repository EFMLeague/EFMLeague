import type { Metadata } from "next";
import Link from "next/link";
import { Barlow, Barlow_Condensed } from "next/font/google";
import Nav from "./components/Nav";
import "./efm.css";

// Display: grottesco condensato corsivo e nero, come le scritte dei video
// di presentazione della lega
const display = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800", "900"],
  style: ["italic"],
  variable: "--f-display",
  display: "swap",
});

// Testo e interfaccia: sans da lavoro con cifre tabellari
const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--f-body",
  display: "swap",
});

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
    <div lang="it" className={`efm ${display.variable} ${barlow.variable}`}>
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
