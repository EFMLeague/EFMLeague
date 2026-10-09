// Costanti e tipi usabili anche dai componenti client

export const PLACEHOLDER_USER = "FORESTIERO";
export const ROLES = ["top", "jng", "mid", "adc", "sup"] as const;
export type Role = (typeof ROLES)[number];
export type Side = "blue" | "red";

export const ROLE_LABEL: Record<Role, string> = {
  top: "Top",
  jng: "Jungle",
  mid: "Mid",
  adc: "ADC",
  sup: "Support",
};

export const STATUS_LABEL: Record<number, string> = {
  0: "Padre fondatore",
  1: "Esperto partecipante",
  2: "Nuova recluta",
};
