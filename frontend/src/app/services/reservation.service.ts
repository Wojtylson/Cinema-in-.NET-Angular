import { Injectable } from '@angular/core';
import { Movie } from './movie-model';
import { Reservation_Details } from './reservation_details-model';
import { Reservation } from './reservation-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private movie: Movie;
  private hour: string;
  private day: string;
  private seats: number[];
  private reservation_details: Reservation_Details;
  private reservation: Reservation;
  private allseats: boolean[];
  url: string = environment.apiBaseUrl + '/Reservation';
  private baseUrl = 'http://localhost:5206/api/ReservationDetails';
  constructor(private http: HttpClient) {}
  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.url, reservation);
  }
  getReservedSeats(
    movieId: number,
    date: string,
    hour: string
  ): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.url}/movie/${movieId}/date/${date}/hour/${hour}`
    );
  }
  getReservationsDetailsByUserId(userId: number): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.baseUrl}/ReservationDetailsIds/${userId}`
    );
  }
  //http://localhost:5206/api/ReservationDetails/ReservationDetails?ids=3&ids=1&ids=9
  //public async Task<IActionResult> GetReservationDetailsByIds([FromQuery] List<int> ids)
  getReservationDetailsByIds(ids: number[]): Observable<Reservation_Details[]> {
    let params = new HttpParams();
    ids.forEach((id) => {
      params = params.append('ids', id.toString());
    });
    return this.http.get<Reservation_Details[]>(
      `${this.baseUrl}/ReservationDetails`,
      { params }
    );
  }
  setAllSeats(allseats) {
    this.allseats = allseats;
  }
  getAllSeats() {
    return this.allseats;
  }
  setReservation(reservation) {
    this.reservation = reservation;
  }
  getReservation(reservation) {
    return this.reservation;
  }
  setReservation_Details(reservation_details) {
    this.reservation_details = reservation_details;
  }
  getReservation_Details() {
    return this.reservation_details;
  }
  setMovie(movie) {
    this.movie = movie;
  }
  setHour(hour) {
    this.hour = hour;
  }
  setDay(day) {
    this.day = day;
  }
  setSeats(seats) {
    this.seats = seats;
  }
  getMovie() {
    return this.movie;
  }
  getHour() {
    return this.hour;
  }
  getDay() {
    return this.day;
  }
  getSeats() {
    return this.seats;
  }
}
