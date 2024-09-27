import { NgFor, NgIf, SlicePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieServiceService } from '../../services/movie-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Movie } from '../../services/movie-model';
@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    MatButtonModule,
    UpperCasePipe,
    HttpClientModule,
    NgFor,
    SlicePipe,
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent {
  movie: Movie;
  movieid: string;
  constructor(
    public service: MovieServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.service.refreshList();
    this.route.params.subscribe((params) => {
      this.movieid = params['id'];
      const movieId = +this.movieid;
      console.log('Test ID:', this.movieid);
      this.movie = this.service.list.find((movie) => movie.id === movieId);
      if (!this.movie) {
        this.router.navigateByUrl('/home');
      }
    });
  }
}
