"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Cross, Ring } from "./Marks";

export type ShotProps = {
  src: string | null;
  // testo per le pose non sviluppate (iniziali del giocatore)
  blank?: string;
  alt?: string;
  href?: string;
  video?: string | null;
  // numero di bordo a sinistra, nome a destra
  number?: React.ReactNode;
  label?: React.ReactNode;
  mark?: "ring" | "cross" | null;
  markTitle?: string;
  tag?: React.ReactNode;
  className?: string;
  eager?: boolean;
};

// Una posa di pellicola mezzo formato. Con un video, la posa si anima
// al passaggio del mouse o al focus: il fotogramma torna filmato.
export default function Shot({
  src,
  blank,
  alt = "",
  href,
  video,
  number,
  label,
  mark,
  markTitle,
  tag,
  className = "",
  eager,
}: ShotProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsPlay = useRef(false);
  const [playing, setPlaying] = useState(false);
  // il video viene montato solo al primo passaggio: niente download prima
  const [videoOn, setVideoOn] = useState(false);

  const play = () => {
    const el = videoRef.current;
    if (!el || !wantsPlay.current) return;
    el.play().then(
      () => wantsPlay.current && setPlaying(true),
      () => setPlaying(false)
    );
  };

  useEffect(play, [videoOn]);

  const start = () => {
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    wantsPlay.current = true;
    if (videoOn) play();
    else setVideoOn(true);
  };

  const stop = () => {
    wantsPlay.current = false;
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setPlaying(false);
  };

  const body = (
    <>
      <div className="pv-shot__img">
        {src ? (
          <img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            width={300}
            height={400}
          />
        ) : (
          <div className="pv-shot__blank" aria-hidden>
            {blank}
          </div>
        )}
        {video && videoOn && (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
          />
        )}
        {mark === "cross" && <Cross title={markTitle} />}
        {tag}
      </div>
      {mark === "ring" && <Ring title={markTitle} />}
      {(number !== undefined || label !== undefined) && (
        <span className="pv-shot__edge">
          {number !== undefined && <i>{number}</i>}
          {label !== undefined && <b>{label}</b>}
        </span>
      )}
    </>
  );

  const cls =
    "pv-shot " +
    (mark === "cross" ? "is-loss " : "") +
    (playing ? "is-playing " : "") +
    className;
  const handlers = video
    ? {
        onMouseEnter: start,
        onMouseLeave: stop,
        onFocus: start,
        onBlur: stop,
      }
    : {};

  return href ? (
    <Link href={href} className={cls} {...handlers}>
      {body}
    </Link>
  ) : (
    <div className={cls} {...handlers}>
      {body}
    </div>
  );
}
