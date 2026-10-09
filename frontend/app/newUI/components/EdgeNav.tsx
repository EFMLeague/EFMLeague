"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ring } from "./Marks";
import UISwitch from "../../components/uiSwitch/UISwitch";

const LINKS = [
  { href: "/newUI/user", label: "Rosa" },
  { href: "/newUI/ranking", label: "Classifiche" },
  { href: "/newUI/match", label: "Storico" },
  { href: "/newUI/wheel", label: "Sorteggio" },
];

// La navigazione è il bordo della pellicola: le voci sono stampate sul bordo
// e la pagina corrente è cerchiata a matita grassa.
export default function EdgeNav() {
  const pathname = usePathname() ?? "";
  return (
    <header className="pv-band pv-nav">
      <nav className="pv-wrap pv-nav__inner" aria-label="Principale">
        <Link href="/newUI" className="pv-nav__brand">
          EFM <span>League</span>
        </Link>
        {LINKS.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className="pv-nav__link pv-mono"
              aria-current={active ? "page" : undefined}
            >
              {link.label}
              {active && <Ring />}
            </Link>
          );
        })}
        <UISwitch
          className="pv-uiswitch pv-mono"
          optionClassName="pv-uiswitch__opt"
          activeClassName="pv-uiswitch__opt--on"
        />
      </nav>
    </header>
  );
}
