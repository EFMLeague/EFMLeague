import Projector from "../../components/Projector";

// L'ingrandimento del giocatore: la stampa su carta, che proietta il video
// di presentazione quando c'è.
export default function Print({
  name,
  src,
  video,
  caption,
}: {
  name: string;
  src: string | null;
  video: string | null;
  caption: string;
}) {
  return (
    <figure className="pv-print" style={{ margin: 0 }}>
      <div className="pv-shot__img">
        {video ? (
          <Projector src={video} poster={src} label="Presentazione" />
        ) : src ? (
          <img src={src} alt={name} width={540} height={720} />
        ) : (
          <div className="pv-shot__blank" aria-hidden>
            {name.slice(0, 2)}
          </div>
        )}
      </div>
      <figcaption className="pv-print__caption">
        <span className="pv-marker">{name}</span>
        <span className="pv-mono">{caption}</span>
      </figcaption>
    </figure>
  );
}
