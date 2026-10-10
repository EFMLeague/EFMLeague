"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UISwitch from "../../components/uiSwitch/UISwitch";

const LINKS = [
  { href: "/newUI/user", label: "Rosa" },
  { href: "/newUI/ranking", label: "Classifiche" },
  { href: "/newUI/match", label: "Partite" },
  { href: "/newUI/wheel", label: "Sorteggio" },
];

export default function Nav() {
  const pathname = usePathname() ?? "";
  return (
    <header className="efm-nav">
      <nav className="efm-wrap efm-nav__inner" aria-label="Principale">
        <Link href="/newUI" className="efm-brand">
          <img src="/img/logo/Logocentrato.png" alt="" width={36} height={36} />
          <span>EFM League</span>
        </Link>
        <ul className="efm-nav__links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="efm-nav__link"
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <UISwitch
          className="efm-uiswitch"
          optionClassName="efm-uiswitch__opt"
          activeClassName="efm-uiswitch__opt--on"
        />
      </nav>
    </header>
  );
}
