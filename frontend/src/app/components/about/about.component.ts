import { Component } from '@angular/core';
import { UserMainServiceService } from '../../services/user-main-service.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  constructor(public umservice: UserMainServiceService) {}
  ngOnInit(): void {
    this.email = this.umservice.getEmail();
    this.password = this.umservice.getPassword();
    this.islogged = this.umservice.getLogged();
    this.isadmin = this.umservice.getAdmin();
    this.id = this.umservice.getId();
    console.log('Status zalogowania:');
    console.log(this.islogged);
    console.log('Czy użytkownik jest adminem?');
    console.log(this.isadmin);
    console.log('Login:');
    console.log(this.email);
    console.log('Hasło:');
    console.log(this.password);
  }
  id: number = null;
  email: string = '';
  password: string = '';
  islogged: boolean;
  isadmin: boolean = false;
}
