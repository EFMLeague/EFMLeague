const API = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";

export const getUserByName = async (name: string) => {
  const result = await fetch(API + name, {
    headers: {
      "X-Riot-Token": process.env.RIOT_TOKEN as string,
    },
  });
  return result.json();
};
