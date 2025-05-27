// This file defines the AnimeMovie interface, which represents the structure of an anime movie object.
export interface AnimeMovie {
  id: number;
  title: string;
  originalTitle: string;
  director: string;
  studio: string;
  year: number;
  genres: string[];
  rating: number;
  duration: string;
  synopsis: string;
  poster: string;
  voiceActors: string[];
  awards: string[];
  gallery: string[];
}
