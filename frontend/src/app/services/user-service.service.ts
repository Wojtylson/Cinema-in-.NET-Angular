import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user-model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  url: string = environment.apiBaseUrl + '/User';
  private_url: string = this.url + 'Admin';
  list: User[] = [];
  formData: User = new User();
  formLogin: User = new User();
  constructor(private http: HttpClient) {}
  refreshList(): void {
    this.http.get<User[]>(this.url).subscribe({
      next: (res) => (this.list = res),
      error: (err) => console.error(err),
    });
  }

  postUsers() {
    return this.http.post(this.url, this.formData);
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new User();
  }
  getLoginUser() {
    return this.http.get(
      `${this.url}/${this.formLogin.email}/${this.formLogin.password}`
    );
  }
  getLoginUsers() {
    return this.http.get(this.url);
  }
  getAllUsers() {
    return this.http.get(this.private_url);
  }
  deleteUserById(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.delete<any>(`${this.url}/${id}`, httpOptions);
  }
}
