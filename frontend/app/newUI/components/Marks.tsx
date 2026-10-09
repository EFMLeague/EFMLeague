// Segni a matita grassa: cerchio = MVP / attivo, croce = sconfitta, freccia = serie.
// Ogni segno è tracciato in due passate di larghezza diversa e passato nel
// filtro #pv-wax (definito in WaxFilter): bordo rotto e grana della cera.

type MarkProps = { className?: string; title?: string };

const common = {
  viewBox: "0 0 100 100",
  preserveAspectRatio: "none",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Filtro unico, montato una volta nel layout
export function WaxFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <filter id="pv-wax" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.2"
            xChannelSelector="R"
            yChannelSelector="G"
            result="rough"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.9"
            numOctaves="1"
            seed="3"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.55"
            result="grainMask"
          />
          <feComposite in="rough" in2="grainMask" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

const wax = { filter: "url(#pv-wax)" };

export function Ring({ className = "", title }: MarkProps) {
  return (
    <svg
      {...common}
      className={"pv-mark pv-mark--ring " + className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      <g style={wax}>
        <path
          d="M55 4.5C80 3 97.5 22 96 50.5 94.5 79 74 97 47 95.5 20 94 3 74 4.5 47 6 21 26 4 61 7.5"
          strokeWidth={5}
          vectorEffect="non-scaling-stroke"
        />
        {/* la cera si accumula dove la mano preme: lato destro e attacco */}
        <path
          d="M62 6C84 9 97 28 95.5 52 94 74 80 90 62 94"
          strokeWidth={8}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M40 7C62 1 92 14 94 44 96 70 82 90 58 94"
          strokeWidth={2.4}
          opacity={0.85}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
}

export function Cross({ className = "", title }: MarkProps) {
  return (
    <svg
      {...common}
      className={"pv-mark pv-mark--cross " + className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      <g style={wax}>
        <path
          d="M12 14C38 38 62 62 89 87M87 11C61 37 38 61 13 89"
          strokeWidth={5}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M16 13C40 40 60 60 86 84"
          strokeWidth={7}
          opacity={0.75}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
}

export function Arrow({ className = "" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 100 60"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <g style={wax}>
        <path d="M4 40C28 22 58 18 92 24M76 8 93 24 74 38" strokeWidth={5.5} />
        <path d="M10 37C34 22 60 21 88 25" strokeWidth={2.5} opacity={0.75} />
      </g>
    </svg>
  );
}

// Legenda: piccoli segni in linea con il testo
export function RingGlyph() {
  return (
    <svg viewBox="0 0 100 80" fill="none" stroke="currentColor" aria-hidden className="pv-glyph-wax">
      <path
        style={wax}
        d="M55 6C80 5 96 20 95 40 94 62 74 76 47 75 20 74 4 60 5 39 6 19 26 6 61 9"
        strokeWidth={8}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CrossGlyph() {
  return (
    <svg viewBox="0 0 100 80" fill="none" stroke="currentColor" aria-hidden>
      <path
        style={wax}
        d="M22 10C42 30 58 50 78 70M78 10C58 30 42 50 22 70"
        strokeWidth={8}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EdgeArrow() {
  return (
    <svg viewBox="0 0 10 10" width="9" height="9" aria-hidden className="pv-edge-arrow">
      <path d="M1 1 9 5 1 9Z" fill="currentColor" />
    </svg>
  );
}

export function Chevron({ className = "pv-chev" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden>
      <path
        d="M2 4.5 6 8.5 10 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path
        d="M12 3v12m0 0-5-5m5 5 5-5M4 20h16"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" strokeWidth={1.8} />
      <path d="m15.5 15.5 5 5" strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="14" height="14">
      <path d="M7 4.5v15L19.5 12 7 4.5Z" fill="currentColor" />
    </svg>
  );
}

export function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="14" height="14">
      <path d="M7 4.5h3.5v15H7zM13.5 4.5H17v15h-3.5z" fill="currentColor" />
    </svg>
  );
}
