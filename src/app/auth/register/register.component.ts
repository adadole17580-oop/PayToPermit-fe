import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fullname: string = '';
  id: string = '';
  email: string = '';
  department: string = '';
  password: string = '';
  confirmPassword: string = '';

  selectedRole: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.selectedRole = localStorage.getItem('selectedRole');

    if (!this.selectedRole) {
      this.router.navigate(['/']);
    }
  }

  onRegister() {
    console.log('CLICKED');

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const roleToUse = this.selectedRole || localStorage.getItem('selectedRole');
    console.log('ROLE:', roleToUse);

    if (roleToUse) {
      localStorage.setItem('role', roleToUse);

      if (roleToUse === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/student/dashboard']);
      }
    } else {
      alert('No role found');
      this.router.navigate(['/']);
    }
  }
}