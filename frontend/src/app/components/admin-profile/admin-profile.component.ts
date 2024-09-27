import { Component } from '@angular/core';
import { MovieServiceService } from '../../services/movie-service.service';
import { NgFor, NgIf } from '@angular/common';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../services/user-model';
import { Movie } from '../../services/movie-model';
import {
  FormsModule,
  NgForm,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserMainServiceService } from '../../services/user-main-service.service';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css',
})
export class AdminProfileComponent {
  constructor(
    public service: MovieServiceService,
    private user_service: UserServiceService,
    private um_service: UserMainServiceService,
    private router: Router,
    private rservice: ReservationService
  ) {}
  ngOnInit(): void {
    this.email = this.um_service.getEmail();
    this.password = this.um_service.getPassword();
    this.islogged = this.um_service.getLogged();
    this.isadmin = this.um_service.getAdmin();
    this.id = this.um_service.getId();
    console.log('Status zalogowania:');
    console.log(this.islogged);
    console.log('Czy użytkownik jest adminem?');
    console.log(this.isadmin);
    console.log('Login:');
    console.log(this.email);
    console.log('Hasło:');
    console.log(this.password);
    if (!this.isadmin) {
      this.router.navigate(['/home']);
    }
  }
  id: number = 0;
  email: string = '';
  password: string = '';
  islogged: boolean;
  isadmin: boolean = false;
  showUsers: boolean = false;
  users: User[] = [];
  movies: Movie[] = [];
  showMovies: boolean = false;
  showAddMovies: boolean = false;
  showReservations: boolean = false;
  onSubmit(form: NgForm) {
    if (
      !this.service.formData.genre ||
      !this.service.formData.image ||
      !this.service.formData.synopsis ||
      !this.service.formData.title ||
      this.service.list.length >= 4
    ) {
      alert(
        'Nie można dodać brakuje jednego pola, lub filmów jest więcej niż 4.'
      );
      this.service.resetForm(form);
    } else {
      this.service.postMovie().subscribe({
        next: (res) => {
          alert('Film został dodany');
          console.log(res);
          this.service.refreshList();
          this.service.resetForm(form);
        },
        error: (err) => {
          console.error(err);
          alert('Wystąpił błąd');
        },
      });
    }
  }
  toggleUsers() {
    this.user_service.getLoginUsers().subscribe((data: User[]) => {
      this.users = data;
      this.showUsers = !this.showUsers;
      if (this.showUsers) {
        this.showMovies = false;
        this.showAddMovies = false;
      }
    });
  }
  toggleMovies() {
    this.service.refreshList();
    this.showMovies = !this.showMovies;
    if (this.showMovies) {
      this.showUsers = false;
      this.showAddMovies = false;
    }
  }
  toggleAddMovie() {
    this.showAddMovies = !this.showAddMovies;
    if (this.showAddMovies) {
      this.showUsers = false;
      this.showMovies = false;
    }
  }

  deleteUser(id: number) {
    this.user_service.deleteUserById(id).subscribe((res) => {
      console.log('Usunięto użytkownika', res);
      this.user_service.refreshList();
      this.showUsers = false;
    });
  }
  deleteMovie(id: number) {
    this.service.deleteMovieById(id).subscribe((res) => {
      console.log('Usunięto film', res);
      this.service.refreshList();
    });
  }
}
