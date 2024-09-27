import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserLogComponent } from './components/user-log/user-log.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { MatFormField } from '@angular/material/form-field';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';
import { MovieComponent } from './components/movie/movie.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScreenComponent } from './components/screen/screen.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { SeatsComponent } from './components/seats/seats.component';
import { SummaryComponent } from './components/summary/summary.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    MatToolbarModule,
    RouterModule,
    UserLogComponent,
    RouterLink,
    UserLogComponent,
    MatFormField,
    MainComponent,
    MovieComponent,
    AboutComponent,
    FooterComponent,
    ScreenComponent,
    AdminProfileComponent,
    SeatsComponent,
    SummaryComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'projekt';
}
