import { Game } from "../types/game";

// Kezdő minta adatok — nyugodtan törölheted vagy szerkesztheted a "Játék hozzáadása" gombbal.
export const sampleGames: Game[] = [
  {
    id: "1",
    name: "Elden Ring",
    status: "played",
    rating: 5,
    hoursPlayed: 93,
    note: "Minden idők egyik legjobb Soulslike-ja. NG+ még hátra van.",
    logoUrl: null,
    coverUrl: null,
    genreTags: ["RPG"],
    dateAdded: new Date().toISOString()
  },
  {
    id: "2",
    name: "Resident Evil 4",
    status: "played",
    rating: 5,
    hoursPlayed: 21,
    note: "Remake, tökéletes remaster, atmoszféra brutális.",
    logoUrl: null,
    coverUrl: null,
    genreTags: ["Horror"],
    dateAdded: new Date().toISOString()
  },
  {
    id: "3",
    name: "Baldur's Gate 3",
    status: "planned",
    rating: 0,
    hoursPlayed: null,
    note: "Kupon várja a leárazást, utána azonnal.",
    logoUrl: null,
    coverUrl: null,
    genreTags: ["RPG"],
    dateAdded: new Date().toISOString()
  },
  {
    id: "4",
    name: "Outlast 2",
    status: "not_played",
    rating: 3,
    hoursPlayed: 3,
    note: "Túl ijesztő volt éjszaka, majd folytatom nappal.",
    logoUrl: null,
    coverUrl: null,
    genreTags: ["Horror"],
    dateAdded: new Date().toISOString()
  }
];
