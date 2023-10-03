const API = "https://ddragon.leagueoflegends.com/api/versions.json";
export const getLoLVersion = async () => {
  const res = await fetch(API);
  const version = await res.json();
  return version[0];
};
