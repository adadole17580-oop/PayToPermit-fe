import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

  }
}