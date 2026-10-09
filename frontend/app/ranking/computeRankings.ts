export type RankingUser = { id: number; name: string; warnings: number };
export type RankingMatch = { id: number; date: string };
export type RankingPlay = {
  user_id: number;
  match_id: number;
  mvp: boolean;
  hasWon: boolean;
  score: number | null;
};

export type RankingRow = { name: string; value: number };

// Account segnaposto usato per i giocatori esterni: escluso da tutte le classifiche
const PLACEHOLDER_USER = "FORESTIERO";

const sortDesc = (rows: RankingRow[]) =>
  rows.sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));

export const computeRankings = (
  users: RankingUser[],
  matches: RankingMatch[],
  plays: RankingPlay[]
) => {
  const realUsers = users.filter((u) => u.name !== PLACEHOLDER_USER);
  const matchDate = new Map(matches.map((m) => [m.id, m.date]));

  const playsByUser = new Map<number, RankingPlay[]>();
  for (const play of plays) {
    const list = playsByUser.get(play.user_id) ?? [];
    list.push(play);
    playsByUser.set(play.user_id, list);
  }

  const stats = realUsers
    .filter((u) => playsByUser.has(u.id))
    .map((u) => {
      // Ordine cronologico, a parità di data per id partita
      const userPlays = playsByUser
        .get(u.id)!
        .sort(
          (a, b) =>
            (matchDate.get(a.match_id) ?? "").localeCompare(
              matchDate.get(b.match_id) ?? ""
            ) || a.match_id - b.match_id
        );
      let streak = 0;
      let bestStreak = 0;
      for (const play of userPlays) {
        streak = play.hasWon ? streak + 1 : 0;
        bestStreak = Math.max(bestStreak, streak);
      }
      const played = userPlays.length;
      const win = userPlays.filter((p) => p.hasWon).length;
      return {
        name: u.name,
        played,
        win,
        lose: played - win,
        mvp: userPlays.filter((p) => p.mvp).length,
        points: userPlays.reduce((sum, p) => sum + (p.score ?? 0), 0),
        bestStreak,
      };
    });

  const pick = (field: keyof (typeof stats)[number]) =>
    sortDesc(stats.map((s) => ({ name: s.name, value: s[field] as number })));

  const maxStreak = Math.max(0, ...stats.map((s) => s.bestStreak));

  return {
    subscribers: realUsers.length,
    gamesPlayed: matches.length,
    winRate: sortDesc(
      stats.map((s) => ({ name: s.name, value: (s.win * 100) / s.played }))
    ),
    mostWinning: pick("win"),
    mostLosing: pick("lose"),
    mostActive: pick("played"),
    mostMvp: pick("mvp"),
    mostPoints: pick("points"),
    sola: sortDesc(
      stats.map((s) => ({ name: s.name, value: matches.length - s.played }))
    ),
    warnings: sortDesc(
      realUsers.map((u) => ({ name: u.name, value: u.warnings }))
    ),
    winStreak: {
      value: maxStreak,
      names: stats
        .filter((s) => maxStreak > 0 && s.bestStreak === maxStreak)
        .map((s) => s.name),
    },
  };
};
