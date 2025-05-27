// This file contains an array of anime movie objects with their details.
import { Injectable } from '@angular/core';
import { animeMovies } from '../../../environments/data/data.movies';
import { AnimeMovie } from '../../features/models/anime.movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies: AnimeMovie[] = [...animeMovies];

  getMovies(): AnimeMovie[] {
    return this.movies;
  }

  filterMovies(searchTerm: string, genre: string): AnimeMovie[] {
    return this.movies.filter((movie) => {
      const genreMatch = genre === 'all' || movie.genres.includes(genre);
      const titleMatch =
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.originalTitle.toLowerCase().includes(searchTerm.toLowerCase());
      return genreMatch && titleMatch;
    });
  }

  sortMovies(movies: AnimeMovie[], descending: boolean): AnimeMovie[] {
    return movies.sort((a, b) =>
      descending ? b.year - a.year : a.year - b.year
    );
  }
}
