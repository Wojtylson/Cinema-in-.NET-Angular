import { Component, NgModule } from '@angular/core';
import {
  FormControl,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../services/user-model';
import { UserMainServiceService } from '../../services/user-main-service.service';
@Component({
  selector: 'app-user-log',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormField, NgFor],
  templateUrl: './user-log.component.html',
  styleUrl: './user-log.component.css',
})
export class UserLogComponent {
  constructor(
    public service: UserServiceService,
    private umservice: UserMainServiceService,
    private router: Router
  ) {}
  onSubmit(form: NgForm) {
    this.service.postUsers().subscribe({
      next: (res) => {
        alert('Użytkownik został dodany');
        console.log(res);
        this.service.refreshList();
        this.service.resetForm(form);
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
        this.service.resetForm(form);
      },
    });
  }
  ngOnInit(): void {
    this.ok();
  }
  isAdmin: boolean;
  isLogged: boolean = false;
  users: User[] = [];
  user: User;
  private ok() {
    this.service.refreshList();
    console.log(
      'Nie powinno pokazywac wszystkich userów ale nie posiadam wystarczających kwalifikacji aby to zmienić (ani też czasu) :('
    );
  }
  onLogin(form: NgForm) {
    this.ok();
    const email = form.value.emaillogin;
    const password = form.value.passwordlogin;
    this.service.getLoginUser().subscribe({
      next: (res: User[]) => {
        this.users = res;
        const userExists = this.service.list.some(
          (user) => user.email === email
        );
        if (userExists) {
          this.user = this.service.list.find(
            (user) => user.email === email && user.password === password
          );
          console.log('User:', this.user);
          if (this.user) {
            alert('Zalogowano pomyślnie.');
            if (this.user.isAdmin) {
              this.isAdmin = true;
              this.isLogged = true;
              this.umservice.setId(this.user.id);
              this.umservice.setAdmin(true);
              this.umservice.setEmail(this.user.email);
              this.umservice.setPassword(this.user.password);
              this.umservice.setLogged(this.isLogged);
              this.router.navigate(['/home']);
            } else {
              this.isAdmin = false;
              this.isLogged = true;
              this.umservice.setId(this.user.id);

              this.umservice.setAdmin(this.isAdmin);
              this.umservice.setEmail(this.user.email);
              this.umservice.setPassword(this.user.password);
              this.umservice.setLogged(this.isLogged);
              this.router.navigate(['/home']);
            }
          } else {
            alert('Podaj poprawne hasło');
            this.isLogged = false;
            form.resetForm();
          }
        } else {
          alert('Nie ma takiego użytkownika w bazie');
          this.isLogged = false;
          form.resetForm();
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
