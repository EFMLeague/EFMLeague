import Roster from "./Roster";
import { loadPlayers, frameSrc, videoSrc, STATUS_LABEL } from "../lib/league";

export const revalidate = 0;

export default async function Rosa() {
  const players = await loadPlayers();

  return (
    <Roster
      players={players.map((p) => ({
        name: p.name,
        src: frameSrc(p),
        video: videoSrc(p.name),
        status: STATUS_LABEL[p.role] ?? "",
      }))}
    />
  );
}
