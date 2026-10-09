import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { fetchAll } from "@/app/utils/supabase/fetchAll";
import { computeRankings } from "@/app/ranking/computeRankings";

export * from "./shared";
import { PLACEHOLDER_USER, Role, Side } from "./shared";

export type Player = {
  id: number;
  name: string;
  role: number;
  warnings: number;
  hasFrame: boolean;
};

// Riga della vista hasplayed_match_merged
export type Appearance = {
  IDPartita: number;
  IDGiocatore: number;
  Squadra: Side;
  Ruolo: Role;
  MVP: boolean;
  Vittoria: boolean;
  ChampGiocato: string | null;
  NomePartita: string;
  DataPartita: string;
  username: string;
};

export type Game = {
  id: number;
  name: string;
  date: string;
  winner: Side;
  players: Appearance[];
};

export const supabaseServer = () => createServerComponentClient({ cookies });

export const loadPlayers = async (): Promise<Player[]> => {
  const { data, error } = await supabaseServer()
    .from("user")
    .select("id,name,role,warnings,banner_source")
    .neq("name", PLACEHOLDER_USER)
    .order("name");
  if (error) throw new Error(`Errore lettura user: ${error.message}`);
  return (data ?? []).map((u) => ({
    id: u.id,
    name: u.name,
    role: u.role,
    warnings: u.warnings ?? 0,
    hasFrame: Boolean(u.banner_source),
  }));
};

export const loadRankings = async () => {
  const supabase = supabaseServer();
  const [users, matches, plays] = await Promise.all([
    fetchAll(supabase, "user", "id,name,warnings"),
    fetchAll(supabase, "league_match", "id,date"),
    fetchAll(
      supabase,
      "has_played_league_match",
      "user_id,match_id,mvp,hasWon,score"
    ),
  ]);
  return computeRankings(users, matches, plays);
};

// Raggruppa le righe della vista per partita, dalla più recente
export const groupGames = (rows: Appearance[]): Game[] => {
  const byId = new Map<number, Appearance[]>();
  for (const row of rows) {
    const list = byId.get(row.IDPartita) ?? [];
    list.push(row);
    byId.set(row.IDPartita, list);
  }
  return Array.from(byId.entries())
    .map(([id, players]) => {
      const first = players[0];
      const winner: Side = first.Vittoria
        ? first.Squadra
        : first.Squadra === "blue"
        ? "red"
        : "blue";
      return {
        id,
        name: first.NomePartita.trim(),
        date: first.DataPartita,
        winner,
        players,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
};

export const loadGames = async (
  filter: (query: any) => any = (q) => q
): Promise<Game[]> => {
  const rows = await fetchAll(
    supabaseServer(),
    "hasplayed_match_merged",
    "IDPartita,IDGiocatore,Squadra,Ruolo,MVP,Vittoria,ChampGiocato,NomePartita,DataPartita,username",
    "IDPartecipazione",
    filter
  );
  return groupGames(rows);
};

// ---- Formattazione ----

// Le date sono mostrate come le ha sempre mostrate la lega (giorno UTC):
// così le partite giocate dopo mezzanotte restano nella serata giusta
const TZ = "UTC";

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: TZ,
  })
    .format(new Date(iso))
    .replace(/\//g, ".");

export const formatNight = (iso: string) =>
  new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TZ,
  }).format(new Date(iso));

export const formatMonth = (iso: string) =>
  new Intl.DateTimeFormat("it-IT", {
    month: "long",
    year: "numeric",
    timeZone: TZ,
  }).format(new Date(iso));

export const nightKey = (iso: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date(iso));

export const pad = (n: number, size = 2) => String(n).padStart(size, "0");

export const percent = (part: number, total: number) =>
  total === 0 ? 0 : (part * 100) / total;

// ---- Asset ----

export const frameSrc = (player: { name: string; hasFrame: boolean }) =>
  player.hasFrame
    ? "/img/screenshots/frame_" + encodeURIComponent(player.name) + ".jpg"
    : null;

// I file video non seguono sempre il nome utente
const VIDEO_FILE: Record<string, string> = {
  adoranteguardia: "Presentazioneadoranteguardia.mp4",
  alimontiguardia: "Presentazionealimontiguardia.mp4",
  DankMiza: "PresentazioneDankMiza.mp4",
  DavPalo: "PresentazioneDavPalo.mp4",
  DelyTron123: "PresentazioneDelyTron123.mp4",
  Dyuturna: "PresentazioneDyuturna.mp4",
  "frαtellonumero1": "Presentazionefrαtelllonumero1.mp4",
  GerardoIlCodardo: "PresentazioneGerardoIlCodardo.mp4",
  ImHelock: "PresentazioneImHelock.mp4",
  JustOtto: "PresentazioneJustOtto.mp4",
  MasonLuis: "PresentazioneMasonLuis.mp4",
  MinimoPericolo: "PresentazioneMinimoPericolo.mp4",
  Nicmerenda: "PresentazioneNicmerenda.mp4",
  "Nicøz": "PresentazioneNicoz.mp4",
  xXK3DXx: "PresentazionexXK3DXx.mp4",
};

export const videoSrc = (name: string) =>
  VIDEO_FILE[name] ? "/video/" + encodeURIComponent(VIDEO_FILE[name]) : null;

const DDRAGON = "13.20.1";
export const champSrc = (champ: string | null) =>
  champ
    ? `https://ddragon.leagueoflegends.com/cdn/${DDRAGON}/img/champion/${champ}.png`
    : null;

export const profileHref = (name: string) =>
  "/newUI/user/" + encodeURIComponent(name);
