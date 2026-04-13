import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-studentregister',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class StudentRegisterComponent {

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