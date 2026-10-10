"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { LuVideo } from "react-icons/lu";

// Card giocatore: il fotogramma di presentazione; chi ha un video si anima
// al passaggio o al focus.
export default function PlayerCard({
  name,
  src,
  video,
  status,
  href,
  eager = false,
}: {
  name: string;
  src: string | null;
  video: string | null;
  status?: string;
  href: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!mounted) setMounted(true);
    else ref.current?.play().catch(() => undefined);
  };

  const stop = () => {
    const el = ref.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setPlaying(false);
  };

  return (
    <Link
      href={href}
      className={"efm-pcard" + (playing ? " is-playing" : "")}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      <div className="efm-pcard__media">
        {src ? (
          <img
            src={src}
            alt=""
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            width={300}
            height={400}
          />
        ) : (
          <div className="efm-pcard__blank" aria-hidden>
            {name.slice(0, 2)}
          </div>
        )}
        {video && mounted && (
          <video
            ref={ref}
            src={video}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden
            onPlaying={() => setPlaying(true)}
          />
        )}
        {video && (
          <span className="efm-pcard__video-tag" title="Ha un video di presentazione">
            <LuVideo aria-hidden />
          </span>
        )}
      </div>
      <div className="efm-pcard__body">
        <strong>{name}</strong>
        {status && <span>{status}</span>}
      </div>
    </Link>
  );
}
