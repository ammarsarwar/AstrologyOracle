export interface Constellation {
  id: string;
  name: string;
  symbol: string;
  element: string;
  date: string;
  description: string;
  historyImageUrl: string;
  skyImageUrl: string;
  symbolUrl: string;
  imageUrl: string;
  rightAscension: string;
  declination: string;
  areaDegrees: number;
  sizeRank: string;
  bordersCount: number;
  borders: string;
  brightestStars: string;
  observationInfo: string;
  observationPeriod: string;
}

export interface FavoriteConstellation {
  userId: string;
  constellationId: string;
}
