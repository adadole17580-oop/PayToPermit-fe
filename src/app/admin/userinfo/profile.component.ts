import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class AdminProfileComponent {
  user = {
    name: 'Jane Doe',
    email: 'john.doe@university.edu.ph',
    id: '2024-00123',
    phone: '+1 555 123-4567',
    address: '123 University Ave, Campus City',
    joined: '1/15/2024'
  };

  constructor(private router: Router) {}

  editProfile() {
    alert('Edit Profile modal will open here.');
  }

  changePassword() {
    alert('Change Password flow triggered.');
  }

  enable2FA() {
    alert('2FA setup initiated.');
  }

  logout() {
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  deleteAccount() {
    if (confirm('Once you delete your account, there is no going back. Please be certain.')) {
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
    }
  }
}