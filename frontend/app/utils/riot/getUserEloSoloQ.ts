const API = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/";

export const getUserEloSoloQ = async (userId: string) => {
  const result = await fetch(API + userId, {
    headers: { "X-Riot-Token": process.env.RIOT_TOKEN as string },
    next: { revalidate: 150 },
  });
  const elo = (await result.json()) as any[];
  if (elo.find((queue) => queue.queueType === "RANKED_SOLO_5x5")) {
    return elo.find((queue) => queue.queueType === "RANKED_SOLO_5x5");
  } else {
    return { tier: "UNRANKED", rank: " " };
  }
};
