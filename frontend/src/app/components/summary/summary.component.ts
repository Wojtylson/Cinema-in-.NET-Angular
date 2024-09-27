import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserMainServiceService } from '../../services/user-main-service.service';
import { ReservationService } from '../../services/reservation.service';
import { Reservation_Details } from '../../services/reservation_details-model';
import { Reservation } from '../../services/reservation-model';
import { User } from '../../services/user-model';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  reservation_details: Reservation_Details;
  reservation: Reservation;
  email: string = '';
  password: string = '';
  islogged: boolean;
  isadmin: boolean = false;
  id: number = null;
  user: User = new User();

  constructor(
    public umservice: UserMainServiceService,
    private rservice: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservation = new Reservation();
    this.reservation_details = this.rservice.getReservation_Details();
    this.id = this.umservice.getId();
    this.email = this.umservice.getEmail();
    this.password = this.umservice.getPassword();
    this.islogged = this.umservice.getLogged();
    this.isadmin = this.umservice.getAdmin();

    this.user.active = this.islogged;
    this.user.email = this.email;
    this.user.password = this.password;
    this.user.isAdmin = this.isadmin;
    this.user.id = this.id;
    if (!this.reservation_details) {
      this.router.navigateByUrl('/home');
    }
    console.log('ID użytkownika:', this.id);
    console.log('Status zalogowania:', this.islogged);
    console.log('Czy użytkownik jest adminem?', this.isadmin);
    console.log('Login:', this.email);
    console.log('Hasło:', this.password);
    console.log('Detale rezerwacji:', this.reservation_details);
  }

  moveOn() {
    this.reservation.user = this.user;
    this.reservation.reservationDetails = this.reservation_details;
    this.rservice.addReservation(this.reservation).subscribe({
      next: (response) => {
        this.umservice.addReservation(this.reservation);
        this.router.navigateByUrl('/user');
        console.log(this.reservation);
      },
      error: (error) => {
        this.umservice.addReservation(this.reservation);
        this.router.navigateByUrl('/user');
      },
    });
  }
}
