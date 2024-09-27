import { NgFor, NgIf, SlicePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MovieServiceService } from '../../services/movie-service.service';
import { UserMainServiceService } from '../../services/user-main-service.service';
import { Movie } from '../../services/movie-model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [
    RouterLink,
    UpperCasePipe,
    NgIf,
    NgFor,
    RouterModule,
    SlicePipe,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css',
})
export class ScreenComponent {
  constructor(
    public service: MovieServiceService,
    public umservice: UserMainServiceService,
    private rservice: ReservationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.umservice.getId();
    this.email = this.umservice.getEmail();
    this.password = this.umservice.getPassword();
    this.islogged = this.umservice.getLogged();
    this.isadmin = this.umservice.getAdmin();
    console.log('Status zalogowania:');
    console.log(this.islogged);
    console.log('Czy użytkownik jest adminem?');
    console.log(this.isadmin);
    console.log('Login:');
    console.log(this.email);
    console.log('Hasło:');
    console.log(this.password);
    this.minDate = new Date().toISOString().split('T')[0];
    this.service.refreshList();
  }
  id: number = null;
  email: string = '';
  password: string = '';
  islogged: boolean;
  isadmin: boolean = false;
  selectedMovie: Movie;
  minDate: string = '';
  data: Date;
  hour: string;
  seats: number[];
  onSubmit() {
    if (!this.data || !this.hour || !this.selectedMovie) {
      alert('Uzupełnij wszystkie pola!');
      this.router.navigate(['/screenings']);
    }
    if (!this.islogged) {
      alert('Użytkownik nie jest zalogowany');
      this.router.navigate(['/screenings']);
    } else {
      this.seats = null;
      this.hour = this.hour + ':00';
      console.log('Dzień seansu:');
      this.rservice.setDay(this.data);
      console.log('Godzina seansu');
      this.rservice.setHour(this.hour);
      console.log(this.hour);
      console.log('Wybrany film:');
      this.rservice.setMovie(this.selectedMovie);
      console.log(this.selectedMovie);
      console.log('Nie wybrano jeszcze miejsc');
      this.rservice.setSeats(this.seats);
      console.log(this.seats);
      this.router.navigate(['/seats']);
    }
  }
  onMovieChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const movieId = target.value;
    if (movieId) {
      this.selectedMovie = this.service.list.find(
        (movie) => movie.id === +movieId
      );
    } else {
      this.selectedMovie = null;
    }
  }
}
