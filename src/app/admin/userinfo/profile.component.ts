import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  adminId: string = 'ADM001'; // This should come from auth service
  adminData: any = {};
  isLoading = false;
  showLogoutModal = false;
  passwordData: any = {};
  showPasswordModal = false;
  isEditMode = false;
  editedUser: any = {};
  user: any = {};

  ngOnInit() {
    this.loadAdminProfile();
  }

  loadAdminProfile() {
    this.isLoading = true;
    this.authService.getAdminProfile(this.adminId).subscribe({
      next: (response) => {
        if (response.success) {
          this.adminData = response.admin;
          this.user = response.admin;
          this.editedUser = { ...response.admin };
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading admin profile:', error);
        this.isLoading = false;
      }
    });
  }

  updateProfile() {
    this.isLoading = true;
    this.authService.updateAdminProfile(this.adminId, this.adminData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Profile updated successfully');
          this.user = { ...this.editedUser };
          this.adminData = { ...this.editedUser };
          this.isEditMode = false;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        alert('Error updating profile');
        this.isLoading = false;
      }
    });
  }

  editProfile() {
    this.isEditMode = true;
  }

  saveProfile() {
    this.updateProfile();
  }

  cancelEdit() {
    this.editedUser = { ...this.user };
    this.isEditMode = false;
  }

  deleteAccount() {
    if (confirm('Once you delete your account, there is no going back. Please be certain.')) {
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
    }
  }

  changePassword() {
    const newPassword = prompt('Enter new password:');
    if (newPassword) {
      this.isLoading = true;
      this.authService.updateAdminProfile(this.adminId, { password: newPassword }).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Password changed successfully');
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error changing password:', error);
          alert('Error changing password');
          this.isLoading = false;
        }
      });
    }
  }

  logout() {
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
  }

  confirmLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openPasswordModal() {
    this.showPasswordModal = true;
  }

  closePasswordModal() {
    this.showPasswordModal = false;
  }

  savePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    this.isLoading = true;
    this.authService.updateAdminProfile(this.adminId, { password: this.passwordData.newPassword }).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Password changed successfully');
          this.closePasswordModal();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error changing password:', error);
        alert('Error changing password');
        this.isLoading = false;
      }
    });
  }
}
