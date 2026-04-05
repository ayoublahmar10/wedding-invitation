export const weddingConfig = {
  // Noms des mariés
  groomName: "Ayoub",
  brideName: "Safa",

  // Date et heure du mariage (ISO string)
  weddingDate: "2026-07-27T18:00:00",

  // Lieu
  venue: {
    name: "Salle des Fêtes Pavillon Maya",
    address: " 3,5 Km, route de l'Ourika, Marrakech 40000, Maroc",
    mapsUrl: "https://maps.app.goo.gl/A45cLCjfR7gvt8Bf9",
    image: '/images/venue.webp',
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
