import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { UserLogComponent } from '../user-log/user-log.component';
import { UserMainServiceService } from '../../services/user-main-service.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    UserLogComponent,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  email: string = '';
  password: string = '';
  islogged: boolean;
  constructor(
    public umservice: UserMainServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  adminprofile(): void {
    console.log('Przechodze do profilu admina');
    this.router.navigate(['/admin']);
  }
  userprofile(): void {
    console.log('Przechodze do profilu użytkownika');
    this.router.navigate(['/user']);
  }
  logout(): void {
    alert('Wylogowano pomyślnie');
    this.router.navigate(['/home']);
    setTimeout(() => {
      this.email = 'user';
      this.password = 'password';
      this.islogged = false;
      this.umservice.setLogged(this.islogged);
      this.umservice.setEmail(this.email);
      this.umservice.setPassword(this.password);
      this.umservice.setAdmin(false);
      console.log('Status zalogowania:');
      console.log(this.umservice.getLogged());
      console.log('Czy admin?:');
      console.log(this.umservice.getAdmin());
      console.log(this.umservice.getEmail());
      console.log(this.umservice.getPassword());
    }, 300);
  }
}
