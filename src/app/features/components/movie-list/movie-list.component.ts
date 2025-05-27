import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieService } from '../../services/movie.service';
import { AnimeMovie } from '../../models/anime.movie';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: AnimeMovie[] = [];
  searchTerm: string = '';
  currentGenre: string = 'all';
  sortDescending: boolean = false;
  genres: string[] = [
    'all',
    'fantasia',
    'accion',
    'drama',
    'aventura',
    'superHeroes',
  ];
  private searchSubject = new Subject<void>();
  private allMovies: AnimeMovie[] = []; // almacena todas las películas

  constructor(
    private movieService: MovieService,
    private modalService: NgbModal
  ) {
    this.searchSubject
      .pipe(debounceTime(300)) // esperar 300ms entre eventos
      .subscribe(() => {
        this.onSearch();
      });
  }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    let filteredMovies = this.movieService.filterMovies(
      this.searchTerm,
      this.currentGenre
    );
    this.movies = this.movieService.sortMovies(
      filteredMovies,
      this.sortDescending
    );

    // Guardar todas las películas al inicializar
    this.allMovies = [...this.movies];
  }

  onSearch() {
    this.loadMovies();
  }

  onSearchKeyUp(): void {
    this.searchSubject.next();
  }

  onGenreSelect(genre: string) {
    this.currentGenre = genre;
    this.loadMovies();
  }

  toggleSort() {
    this.sortDescending = !this.sortDescending;
    this.loadMovies();
  }

  showMovieDetails(movie: AnimeMovie) {
    const modalRef = this.modalService.open(MovieDetailComponent, {
      size: 'lg',
      scrollable: true,
    });
    modalRef.componentInstance.movie = movie;
  }

  generateStarRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star"></i>';
    }
    return stars;
  }

  private filterMovies(): void {
    if (!this.searchTerm.trim()) {
      this.movies = [...this.allMovies];
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.movies = this.allMovies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTermLower) ||
        movie.originalTitle.toLowerCase().includes(searchTermLower)
    );
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }
}
