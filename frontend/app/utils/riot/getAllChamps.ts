import { getLoLVersion } from "./getLoLVersion";

export const getAllChamps = async () => {
  const version = await getLoLVersion();
  const API =
    "https://ddragon.leagueoflegends.com/cdn/" +
    version +
    "/data/en_US/champion.json";
  const res = await fetch(API);
  const result = await res.json();

  return result.data;
};
