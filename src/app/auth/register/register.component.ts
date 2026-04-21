import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { AuthService } from '../../core/services/auth.service';

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
  address: string = '';
  phone: string = '';
  department: string = '';
  password: string = '';
  confirmPassword: string = '';

  selectedRole: string | null = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.selectedRole = localStorage.getItem('selectedRole');

    if (!this.selectedRole) {
      this.router.navigate(['/']);
    }
  }

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const roleToUse = this.selectedRole || localStorage.getItem('selectedRole');
    if (!roleToUse) {
      alert('No role found');
      this.router.navigate(['/']);
      return;
    }

    const registerData = {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
      address: this.address,
      phone: this.phone,
      department: this.department,
      password: this.password,
      role: roleToUse
    };

    this.authService.register(registerData).subscribe({
      next: (res: any) => {
        if (res.success) {
          localStorage.setItem('role', roleToUse);
          if (roleToUse === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/student/dashboard']);
          }
        } else {
          alert(res.message || 'Registration failed');
        }
      },
      error: (err: any) => {
        console.error('Registration request failed:', err);
        alert('Registration failed. Please try again.');
      }
    });
  }
}