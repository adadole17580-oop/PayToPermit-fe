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

  studentId: string = '2024-00123'; // This should come from user service/auth in production
  showUploadModal = false;
  isLoading = false;

  submissions: any[] = [];

  ngOnInit() {
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
    // Upload via AuthService
    const formData = new FormData();
    formData.append('file', file);
    formData.append('studentId', this.studentId);

    this.authService.uploadPaymentProof(formData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('File uploaded successfully!');
          this.loadSubmissions(); // Reload submissions
          this.closeUploadModal();
        }
      },
      error: (error) => {
        console.error('Upload error:', error);
        alert('Error uploading file');
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