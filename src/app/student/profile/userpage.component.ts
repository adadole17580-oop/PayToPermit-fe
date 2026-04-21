import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class StudentUserPageComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  studentId: string = 'STU001'; // This should come from auth service
  studentData: any = {};
  isLoading = false;
  passwordData: any = {};
  showPasswordModal = false;
  isEditMode = false;
  editedUser: any = {};
  user: any = {};

  ngOnInit() {
    this.loadStudentProfile();
  }

  loadStudentProfile() {
    this.isLoading = true;
    this.authService.getStudentProfile(this.studentId).subscribe({
      next: (response) => {
        if (response.success) {
          this.studentData = response.student;
          this.user = response.student;
          this.editedUser = { ...response.student };
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading student profile:', error);
        this.isLoading = false;
      }
    });
  }

  updateProfile() {
    this.isLoading = true;
    this.authService.updateStudentProfile(this.studentId, this.studentData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Profile updated successfully');
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

  logout() {
    if (confirm('Are you sure you want to log out your account. Please be certain.')) {
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
    }
  }

  deleteAccount() {
    if (confirm('Once you delete your account, there is no going back. Please be certain.')) {
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
    }
  }

  openPasswordModal() {
    this.showPasswordModal = true;
  }

  changePassword() {
    this.openPasswordModal();
  }

  editProfile() {
    this.isEditMode = true;
  }

  saveProfile() {
    this.isLoading = true;
    this.authService.updateStudentProfile(this.studentId, this.editedUser).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Profile updated successfully');
          this.user = { ...this.editedUser };
          this.studentData = { ...this.editedUser };
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

  cancelEdit() {
    this.editedUser = { ...this.user };
    this.isEditMode = false;
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
    this.authService.updateStudentProfile(this.studentId, { password: this.passwordData.newPassword }).subscribe({
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
