const API =
  "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/";

export const getUserByPuuid = async (user: any) => {
  var result = await fetch(API + user.puuid, {
    headers: { "X-Riot-Token": process.env.RIOT_TOKEN as string },
    next: { revalidate: 150 },
  });
  const usr = await result.json();
  return usr;
};
