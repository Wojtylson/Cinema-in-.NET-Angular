import { Injectable } from '@angular/core';
import { User } from './user-model';
import { Reservation } from './reservation-model';
@Injectable({
  providedIn: 'root',
})
export class UserMainServiceService {
  private email: string = 'guest';
  private password: string = 'password';
  private islogged: boolean = false;
  private isAdmin: boolean = false;
  private id: number = 0;
  private reservations: Reservation[] = [];
  private reservation: Reservation;

  private user: User = {
    id: 0,
    email: 'guest',
    active: false,
    isAdmin: false,
    password: 'password',
    reservations: [],
  };
  addReservation(reservation: Reservation) {
    console.log('Dodawanie rezerwacji:', reservation);
    this.reservations.push(reservation);
  }
  setReservation(reservations: Reservation[]) {
    this.reservations = reservations;
  }
  getReservations(): Reservation[] {
    return this.reservations;
  }
  setId(id) {
    this.id = id;
  }
  getId() {
    return this.id;
  }
  setEmail(email) {
    this.email = email;
  }
  setPassword(password) {
    this.password = password;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  setLogged(islogged) {
    this.islogged = islogged;
  }
  getLogged() {
    return this.islogged;
  }
  setAdmin(isAdmin) {
    this.isAdmin = isAdmin;
  }
  getAdmin() {
    return this.isAdmin;
  }
}
