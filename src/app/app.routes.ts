import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MovieListComponent } from './features/components/movie-list/movie-list.component';
import { ContactComponent } from './features/pages/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'inicio', component: MovieListComponent },
      { path: 'contacto', component: ContactComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
];
