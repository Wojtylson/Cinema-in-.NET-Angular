import { Injectable } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Movie } from './movie-model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class MovieServiceService {
  url: string = environment.apiBaseUrl + '/Movie';
  list: Movie[] = [];
  formData: Movie = new Movie();

  constructor(private http: HttpClient) {}
  refreshList() {
    this.http.get(this.url).subscribe({
      next: (res) => {
        this.list = res as Movie[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteMovieById(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json',
    };
    return this.http.delete<any>(`${this.url}/${id}`, httpOptions);
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new Movie();
  }
  postMovie() {
    return this.http.post(this.url, this.formData);
  }
}
