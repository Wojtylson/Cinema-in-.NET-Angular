import {
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserMainServiceService } from '../../services/user-main-service.service';
import { ReservationService } from '../../services/reservation.service';
import { Movie } from '../../services/movie-model';
import { Reservation_Details } from '../../services/reservation_details-model';
@Component({
  selector: 'app-seats',
  standalone: true,
  imports: [RouterLink, RouterModule, NgIf, NgFor, NgStyle, NgClass],
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.css',
})
export class SeatsComponent {
  constructor(
    public umservice: UserMainServiceService,
    public rservice: ReservationService,
    private router: Router
  ) {}
  selectedSeats: number[] = []; //!!!!!!!
  email: string = '';
  password: string = '';
  islogged: boolean;
  isadmin: boolean = false;
  id: number = null;
  selectedMovie: Movie;
  data: string;
  hour: string;
  allseats: number[] = Array.from({ length: 24 }, (_, i) => i + 1);
  reservation_details: Reservation_Details;
  reservedSeats: number[] = [];
  ngOnInit(): void {
    this.reservation_details = new Reservation_Details();
    this.id = this.umservice.getId();
    this.email = this.umservice.getEmail();
    this.password = this.umservice.getPassword();
    this.islogged = this.umservice.getLogged();
    this.isadmin = this.umservice.getAdmin();
    this.data = this.rservice.getDay();
    this.hour = this.rservice.getHour();
    this.selectedMovie = this.rservice.getMovie();
    console.log('Status zalogowania:');
    console.log(this.islogged);
    console.log('Czy użytkownik jest adminem?');
    console.log(this.isadmin);
    console.log('Login:');
    console.log(this.email);
    console.log('Hasło:');
    console.log(this.password);
    console.log('Dzień seansu:');
    console.log(this.data);
    console.log('Godzina seansu');
    console.log(this.hour);
    console.log('Wybrany film:');
    console.log(this.selectedMovie);
    console.log('Nie wybrano jeszcze miejsc');
    console.log(this.selectedSeats);
    this.rservice.setSeats(this.selectedSeats);
    if (!this.selectedMovie) {
      this.router.navigateByUrl('/home');
    }
    this.getSeats();
  }
  getSeats(): void {
    if (this.selectedMovie && this.data && this.hour) {
      this.rservice
        .getReservedSeats(this.selectedMovie.id, this.data, this.hour)
        .subscribe({
          next: (takenSeats: number[]) => {
            this.reservedSeats = takenSeats;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
  selectSeat(seat: number): void {
    if (this.reservedSeats.includes(seat)) {
      return;
    }
    const index = this.selectedSeats.indexOf(seat);
    if (index === -1) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats.splice(index, 1);
    }
  }
  moveOn() {
    if (!this.selectedSeats || this.selectedSeats.length === 0) {
      alert('Nie wybrano żadnego miejsca');
      return;
    }

    this.router.navigateByUrl('/summary');
    this.reservation_details.day = this.data;
    this.reservation_details.hour = this.hour;
    this.reservation_details.movie = this.selectedMovie;
    this.reservation_details.seats = this.selectedSeats;
    this.rservice.setReservation_Details(this.reservation_details);
    console.log(this.rservice.getReservation_Details());
  }
}
