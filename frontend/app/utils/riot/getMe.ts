const api = "https://europe.api.riotgames.com/riot/account/v1/accounts/me";

export const getMe = async (token: string) => {
  const res = await fetch(api, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res.json();
};
