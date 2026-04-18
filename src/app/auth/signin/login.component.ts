import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';
  password = '';

  selectedRole: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.selectedRole = localStorage.getItem('selectedRole');
  }

  onSubmit() {

    if (!this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password,
      role: this.selectedRole 
    };

    this.authService.login(loginData).subscribe({
      next: (res: any) => {

        const roleToUse = this.selectedRole || 'student';
        localStorage.setItem('role', roleToUse);

        if (roleToUse === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/student/dashboard']);
        }

      },
      error: (err: any) => {
        console.warn('Backend login failed, using mock login for frontend flow:', err);
        const roleToUse = this.selectedRole || 'student';
        localStorage.setItem('role', roleToUse);

        if (roleToUse === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/student/dashboard']);
        }
      }
    });
  }
}
