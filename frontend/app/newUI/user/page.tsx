import Roster from "./Roster";
import { loadPlayers, frameSrc, videoSrc, STATUS_LABEL } from "../lib/league";

export const revalidate = 0;

export default async function Rosa() {
  const players = await loadPlayers();

  return (
    <section
      className="pv-wrap pv-section"
      style={{ paddingTop: "clamp(2.2rem, 5vw, 4rem)" }}
    >
      <Roster
        players={players.map((p) => ({
          name: p.name,
          src: frameSrc(p),
          video: videoSrc(p.name),
          status: STATUS_LABEL[p.role] ?? "",
        }))}
      />
    </section>
  );
}
