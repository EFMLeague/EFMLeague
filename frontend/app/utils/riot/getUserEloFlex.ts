const API = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/";

export const getUserEloFlex = async (userId: string) => {
  const result = await fetch(API + userId, {
    headers: { "X-Riot-Token": process.env.RIOT_TOKEN as string },
  });
  const elo = (await result.json()) as any[];
  return elo.find((queue) => queue.queueType === "RANKED_FLEX_SR");
};
