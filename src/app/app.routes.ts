import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailMedecinComponent } from './pages/detail-medecin/detail-medecin.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: 'medecins', pathMatch: 'full' },
  {
    path: 'medecin/:id',
    component: DetailMedecinComponent,
  },
  {
    path: 'medecins',
    component: MainComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
