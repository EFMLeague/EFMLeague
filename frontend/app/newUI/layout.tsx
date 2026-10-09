import type { Metadata } from "next";
import Link from "next/link";
import { Archivo, Martian_Mono, Permanent_Marker } from "next/font/google";
import EdgeNav from "./components/EdgeNav";
import { WaxFilter } from "./components/Marks";
import "./provino.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--f-display",
  display: "swap",
});

const martian = Martian_Mono({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--f-mono",
  display: "swap",
});

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-marker",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EFM League — Archivio",
  description:
    "L'archivio della EFM League: giocatori, partite e classifiche della lega tra amici.",
};

export default function NewUILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      lang="it"
      className={`pv ${archivo.variable} ${martian.variable} ${marker.variable}`}
      style={{ ["--f-body" as string]: "var(--f-display)" }}
    >
      <WaxFilter />
      <EdgeNav />
      <main className="pv-main">{children}</main>
      <footer className="pv-band pv-foot">
        <div className="pv-wrap pv-foot__inner pv-mono">
          <span>Fine rullino · EFM League · Stagione 1 · 2023</span>
          <span>
            Di Francesco Nicolò e Stefano Piccoli ·{" "}
            <Link href="/">Vecchia versione del sito</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
