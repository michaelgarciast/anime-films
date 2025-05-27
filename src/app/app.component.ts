// import { Component } from '@angular/core';
// import { MovieListComponent } from './components/movie-list/movie-list.component';
// import { HeaderComponent } from './shared/header/header.component';
// import { FooterComponent } from './shared/footer/footer.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [MovieListComponent, HeaderComponent, FooterComponent],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent {
//   title = 'AnimeFilms';
// }

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AnimeFilms';
}
