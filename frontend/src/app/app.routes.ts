import { RouteConfigLoadEnd, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserLogComponent } from './components/user-log/user-log.component';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';
import { MovieComponent } from './components//movie/movie.component';
import { ScreenComponent } from './components/screen/screen.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SeatsComponent } from './components/seats/seats.component';
import { SummaryComponent } from './components/summary/summary.component';
export const routes: Routes = [
  { path: 'logowanie', component: UserLogComponent },
  { path: 'home', component: MainComponent },
  { path: 'home/movie/:id', component: MovieComponent },
  { path: 'screenings', component: ScreenComponent },
  { path: 'admin', component: AdminProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'seats', component: SeatsComponent },
  { path: 'summary', component: SummaryComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
