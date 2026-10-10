"use client";
import { LuPlay } from "react-icons/lu";
import { PLAY_EVENT } from "./VideoPanel";

// Riavvia il video della testata dall'inizio, con l'audio
export default function WatchButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="efm-btn efm-btn--primary efm-btn--big"
      onClick={() => window.dispatchEvent(new Event(PLAY_EVENT))}
    >
      <LuPlay aria-hidden /> {label}
    </button>
  );
}
