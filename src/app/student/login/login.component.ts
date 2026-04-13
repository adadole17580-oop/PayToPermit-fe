import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-studentlogin',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class StudentLoginComponent {

  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    if (this.email && this.password) {
      console.log('Login:', this.email);

      this.router.navigate(['/student-dashboard']);
    } else {
      alert('Please fill in all fields');
    }
  }
}