import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { NgModel } from '@angular/forms';
import { NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import { MovieComponent } from '../movie/movie.component';
import { MovieServiceService } from '../../services/movie-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserMainServiceService } from '../../services/user-main-service.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    MovieComponent,
    RouterLink,
    RouterModule,
    HttpClientModule,
    SlicePipe,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  email: string = '';
  password: string = '';
  islogged: boolean;
  isAdmin: boolean;
  id: number = null;
  constructor(
    public service: MovieServiceService,
    public umservice: UserMainServiceService
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.service.refreshList();
      30;
    });
    this.id = this.umservice.getId();
    this.isAdmin = this.umservice.getAdmin();
    this.email = this.umservice.getEmail();
    this.password = this.umservice.getPassword();
    this.islogged = this.umservice.getLogged();
    console.log('Status zalogowania:');
    console.log(this.islogged);
    console.log('Czy użytkownik jest adminem?');
    console.log(this.isAdmin);
    console.log('Login:');
    console.log(this.email);
    console.log('Hasło:');
    console.log(this.password);
  }
}
