"use client";
import { useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "./Marks";

// Un video proiettato dentro la posa: niente controlli del browser, solo il
// comando PRESENTAZIONE e una riga lunga quanto il tempo già proiettato.
export default function Projector({
  src,
  poster,
  label = "Presentazione",
  className = "",
}: {
  src: string;
  poster: string | null;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    setStarted(true);
    if (el.paused) el.play().catch(() => setPlaying(false));
    else el.pause();
  };

  return (
    <div className={"pv-projector-frame " + className}>
      <video
        ref={ref}
        src={src}
        poster={poster ?? undefined}
        playsInline
        preload="none"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          setProgress(v.duration ? v.currentTime / v.duration : 0);
        }}
      />
      <button
        type="button"
        className="pv-btn pv-projector-frame__btn"
        onClick={toggle}
        aria-label={playing ? `Metti in pausa: ${label}` : `Guarda: ${label}`}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
        {playing ? "Pausa" : started ? "Riprendi" : label}
      </button>
      <span className="pv-projector-frame__time" aria-hidden>
        <span style={{ width: `${progress * 100}%` }} />
      </span>
    </div>
  );
}
