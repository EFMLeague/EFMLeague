const API = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/";

export const getUserEloSoloQ = async (userId: string) => {
  const result = await fetch(API + userId, {
    headers: { "X-Riot-Token": process.env.RIOT_TOKEN as string },
  });
  const elo = (await result.json()) as any[];
  if (elo.length === 0) {
    return { tier: "UNRANKED", rank: " " };
  } else {
    return elo.find((queue) => queue.queueType === "RANKED_SOLO_5x5");
  }
};
