export const weddingConfig = {
  // Noms des mariés
  groomName: "Ayoub",
  brideName: "Safa",

  // Date et heure du mariage (ISO string)
  weddingDate: "2026-07-27T18:00:00",

  // Lieu
  venue: {
    name: "Salle des Fêtes Al Andalus",
    address: "123 Avenue des Roses, Marrakech, Maroc",
    mapsUrl: "https://maps.google.com/?q=Casablanca+Maroc",
  },

  // Musique
  musicUrl: "/music.mp3",

  // RSVP
  rsvp: {
    endpoint: "", // Laisser vide pour le mode démo
    method: "POST" as const,
  },
} as const;

export type WeddingConfig = typeof weddingConfig;
