import { avatarSrc } from "../lib/shared";

// Il volto del giocatore; senza foto, le iniziali
export default function Avatar({
  player,
  size = 32,
  gold = false,
}: {
  player?: { name: string; hasFrame: boolean } | null;
  size?: number;
  gold?: boolean;
}) {
  const src = player ? avatarSrc(player) : null;
  return (
    <span
      className={"efm-avatar" + (gold ? " efm-avatar--gold" : "")}
      style={{ ["--size" as string]: `${size}px` }}
      aria-hidden
    >
      {src ? (
        <img src={src} alt="" decoding="async" width={size} height={size} />
      ) : (
        (player?.name ?? "?").slice(0, 2)
      )}
    </span>
  );
}
