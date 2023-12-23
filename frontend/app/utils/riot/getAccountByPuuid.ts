const API =
  "https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/";

export const getAccountByPuuid = async (puuid: string) => {
  try {
    const response = await fetch(API + puuid, {
      headers: {
        "X-Riot-Token": process.env.RIOT_TOKEN as string,
        Accept: "application/json", // Specificare il tipo di risposta accettato
      },
    });
    if (!response.ok) {
      throw new Error(`Errore nella richiesta: ${response.statusText}`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Errore durante la richiesta API:", error);
    throw error; // Puoi gestire l'errore in modo appropriato o propagarlo
  }
};
