const API = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-puuid/";

export const getUserEloSoloQ = async (puuid: string) => {
  const result = await fetch(API + puuid, {
    headers: { "X-Riot-Token": process.env.RIOT_TOKEN as string },
    next: { revalidate: 150 },
  });
  const elo = result.ok ? ((await result.json()) as any[]) : [];
  return (
    elo.find((queue) => queue.queueType === "RANKED_SOLO_5x5") ?? {
      tier: "UNRANKED",
      rank: " ",
    }
  );
};
