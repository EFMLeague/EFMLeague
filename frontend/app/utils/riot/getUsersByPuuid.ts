const API =
  "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/";

export const getUsersByPuuid = async (users: any[]) => {
  var result = await Promise.all(
    users.map(async (user) => {
      const res = await fetch(API + user.puuid, {
        headers: { "X-Riot-Token": process.env.RIOT_TOKEN as string },
        next: { revalidate: 150 },
      });
      const usr = await res.json();
      return { ...usr, video_source: user.video_source, dbName: user.name };
    })
  );
  return result;
};
