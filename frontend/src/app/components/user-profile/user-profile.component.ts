import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserMainServiceService } from '../../services/user-main-service.service';
import { UserServiceService } from '../../services/user-service.service';
import { Reservation } from '../../services/reservation-model';
import { Reservation_Details } from '../../services/reservation_details-model';
import { ReservationService } from '../../services/reservation.service';
import { User } from '../../services/user-model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User = new User();
  reservations: Reservation[] = [];
  reservation_details: Reservation_Details;
  id: number = null;
  email: string = '';
  password: string = '';
  islogged: boolean;
  isadmin: boolean = false;
  rd_list: number[] = [];
  rd: Reservation_Details;
  rdd: Reservation_Details[];

  constructor(
    private user_service: UserServiceService,
    private um_service: UserMainServiceService,
    private rservice: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.um_service.getId();
    this.email = this.um_service.getEmail();
    this.password = this.um_service.getPassword();
    this.islogged = this.um_service.getLogged();
    this.isadmin = this.um_service.getAdmin();
    this.reservations = this.um_service.getReservations() || [];
    this.reservation_details = this.rservice.getReservation_Details();

    this.user.id = this.id;
    this.user.email = this.email;
    this.user.active = this.islogged;
    this.user.password = this.password;
    this.user.isAdmin = this.isadmin;
    this.user.reservations = this.reservations;
    console.log('Rezerwacje użytkownika', this.user.reservations);
    console.log('Detale rezerwacji', this.reservation_details);
    console.log('Status zalogowania:', this.islogged);
    console.log('Czy użytkownik jest adminem?', this.isadmin);
    console.log('Login:', this.email);
    console.log('Hasło:', this.password);

    if (!this.islogged) {
      this.router.navigate(['/home']);
    }
    this.rservice.getReservationsDetailsByUserId(this.id).subscribe({
      next: (rd_list: number[]) => {
        this.rd_list = rd_list;
        console.log('Reservation_details Ids:', this.rd_list);
        this.rservice.getReservationDetailsByIds(this.rd_list).subscribe({
          next: (rdd: Reservation_Details[]) => {
            this.rdd = rdd.sort((a, b) => {
              const dataA = a.day;
              const dataB = b.day;
              return dataA.localeCompare(dataB);
            });
            console.log('Reservation_details:', this.rdd);
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
