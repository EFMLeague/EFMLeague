"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NEW_PREFIX = "/newUI";
// Rotte che esistono in entrambe le versioni del sito
const SHARED_ROUTES = ["/user", "/ranking", "/match", "/wheel"];

function isNewUI(path: string) {
  return path === NEW_PREFIX || path.startsWith(NEW_PREFIX + "/");
}

function toOldUI(path: string) {
  return path.slice(NEW_PREFIX.length) || "/";
}

function toNewUI(path: string) {
  const shared = SHARED_ROUTES.some(
    (route) => path === route || path.startsWith(route + "/")
  );
  return shared ? NEW_PREFIX + path : NEW_PREFIX;
}

type Props = {
  className?: string;
  optionClassName?: string;
  activeClassName?: string;
  onSwitch?: () => void;
};

// Selettore Vecchia/Nuova UI: porta alla pagina equivalente nell'altra versione
export default function UISwitch({
  className = "",
  optionClassName = "",
  activeClassName = "",
  onSwitch,
}: Props) {
  const pathname = usePathname() ?? "/";
  const onNew = isNewUI(pathname);

  const options = [
    { label: "Vecchia", href: onNew ? toOldUI(pathname) : pathname, active: !onNew },
    { label: "Nuova", href: onNew ? pathname : toNewUI(pathname), active: onNew },
  ];

  return (
    <div className={className} role="group" aria-label="Versione del sito">
      {options.map((option) =>
        option.active ? (
          <span
            key={option.label}
            className={`${optionClassName} ${activeClassName}`}
            aria-current="true"
          >
            {option.label}
          </span>
        ) : (
          <Link
            key={option.label}
            href={option.href}
            className={optionClassName}
            onClick={onSwitch}
          >
            {option.label}
          </Link>
        )
      )}
    </div>
  );
}
