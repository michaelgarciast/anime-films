// This file contains an array of anime movie objects with their details.
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimeMovie } from '../../models/anime.movie';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent {
  @Input() movie!: AnimeMovie;

  constructor(
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer
  ) {}

  generateStarRating(rating: number): SafeHtml {
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
    return this.sanitizer.bypassSecurityTrustHtml(stars);
  }
}
