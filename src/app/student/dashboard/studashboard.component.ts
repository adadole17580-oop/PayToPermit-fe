import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UploadComponent } from '../uploadphoto/upload.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, UploadComponent],
  templateUrl: './studashboard.component.html',
  styleUrls: ['./studashboard.component.scss']
})

export class StudashboardComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  studentId: string = 'student001';
  showUploadModal = false;
  isLoading = false;
  isUploading = false;

  submissions: any[] = [];

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.id && user?.role === 'student') {
          this.studentId = user.id;
        }
      } catch (error) {
        console.warn('Invalid user data in localStorage:', error);
      }
    }

    // Prevent bad IDs from causing upload FK errors.
    if (!this.studentId || !this.studentId.toLowerCase().startsWith('student')) {
      this.studentId = 'student001';
    }
    this.loadSubmissions();
  }

  loadSubmissions() {
    this.isLoading = true;
    this.authService.getStudentSubmissions(this.studentId).subscribe({
      next: (response) => {
        if (response.success) {
          this.submissions = response.submissions.map((sub: any) => ({
            file: sub.original_filename,
            permit: sub.permit_number || '-',
            status: sub.status,
            id: sub.id
          }));
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading submissions:', error);
        this.isLoading = false;
      }
    });
  }

  openUploadModal() {
    this.showUploadModal = true;
  }

  closeUploadModal() {
    this.showUploadModal = false;
  }

  handleUpload(file: File) {
    if (this.isUploading) return;

    // Upload via AuthService
    const formData = new FormData();
    formData.append('file', file);
    formData.append('studentId', this.studentId);
    this.isUploading = true;

    this.authService.uploadPaymentProof(formData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('File uploaded successfully!');
          this.loadSubmissions(); // Reload submissions
          this.closeUploadModal();
        } else {
          alert(response?.message || 'Upload was not successful.');
        }
        this.isUploading = false;
      },
      error: (error) => {
        console.error('Upload error:', error);
        alert(error?.error?.message || 'Error uploading file');
        this.isUploading = false;
      }
    });
  }

  logout() {
    if (confirm('Are you sure you want to log out your account?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}