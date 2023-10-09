const API =
  "https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json";
export const getAllChamps = async () => {
  const result = await fetch(API);
  return result.json();
};
