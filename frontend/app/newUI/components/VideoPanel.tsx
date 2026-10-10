"use client";
import { useEffect, useRef, useState } from "react";
import { LuPause, LuPlay, LuVolume2, LuVolumeX } from "react-icons/lu";

export const PLAY_EVENT = "efm:play-intro";

// Video verticale di presentazione: parte muto in loop (se il visitatore non
// ha chiesto meno movimento), con play/pausa e audio a portata di mano.
// Con `listen` risponde al bottone "Guarda" della testata.
export default function VideoPanel({
  src,
  poster,
  title,
  className = "efm-reel-video",
  autoPlay = true,
  progress = true,
  listen = false,
}: {
  src: string;
  poster: string;
  title: string;
  className?: string;
  autoPlay?: boolean;
  progress?: boolean;
  listen?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !autoPlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.play().catch(() => setPlaying(false));
  }, [autoPlay]);

  useEffect(() => {
    if (!listen) return;
    const restart = () => {
      const el = ref.current;
      if (!el) return;
      el.currentTime = 0;
      el.muted = false;
      setMuted(false);
      el.play().catch(() => undefined);
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    window.addEventListener(PLAY_EVENT, restart);
    return () => window.removeEventListener(PLAY_EVENT, restart);
  }, [listen]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => undefined);
    else el.pause();
  };

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted && el.paused) el.play().catch(() => undefined);
  };

  return (
    <div className={className}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={title}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (barRef.current && v.duration)
            barRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
        }}
      />
      <div className="efm-reel-video__controls">
        <button
          type="button"
          className="efm-iconbtn"
          onClick={toggleSound}
          aria-label={muted ? "Attiva l’audio" : "Togli l’audio"}
        >
          {muted ? <LuVolumeX /> : <LuVolume2 />}
        </button>
        <button
          type="button"
          className="efm-iconbtn"
          onClick={toggle}
          aria-label={playing ? "Metti in pausa" : "Riproduci"}
        >
          {playing ? <LuPause /> : <LuPlay />}
        </button>
      </div>
      {progress && (
        <div className="efm-reel-video__progress" aria-hidden>
          <span ref={barRef} style={{ transform: "scaleX(0)" }} />
        </div>
      )}
    </div>
  );
}
