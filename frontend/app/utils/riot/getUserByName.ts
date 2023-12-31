const API = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";

export const getUserByName = async (name: string) => {
  try {
    const response = await fetch(API + name, {
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
