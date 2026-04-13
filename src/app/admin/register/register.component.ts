import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class AdminRegisterComponent {

  fullName: string = '';
  studentId: string = '';
  email: string = '';
  department: string = '';
  password: string = '';
  confirmPassword: string = '';

  register() {
    if (!this.fullName || !this.studentId || !this.email || !this.department || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('User Registered:', {
      fullName: this.fullName,
      studentId: this.studentId,
      email: this.email,
      department: this.department,
      password: this.password
    });

    alert('Account created successfully!');

    this.fullName = '';
    this.studentId = '';
    this.email = '';
    this.department = '';
    this.password = '';
    this.confirmPassword = '';
  }
}