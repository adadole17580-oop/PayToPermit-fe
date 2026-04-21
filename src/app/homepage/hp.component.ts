import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hp.component.html',
  styleUrls: ['./hp.component.scss']
})
export class HomePageComponent {

  isUploadOpen = false;
  fees: any[] = [];
  selectedFile: File | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loadFees();
  }

  goToLogin(role: string) {
    localStorage.setItem('selectedRole', role);
    this.router.navigate(['/login']);
  }

  loadFees() {
    this.authService.getFees().subscribe({
      next: (data) => {
        this.fees = data;
      },
      error: (error) => {
        console.error('Error loading fees:', error);
      }
    });
  }

  viewFees() {
    if (this.fees.length === 0) {
      this.loadFees();
    }
    // The modal will show automatically when fees are loaded
  }

  openUpload() {
    this.isUploadOpen = true;
  }

  closeUpload() {
    this.isUploadOpen = false;
  }

  handleFile(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  uploadProof() {
    if (!this.selectedFile) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('proofOfPayment', this.selectedFile);
    formData.append('studentId', '1'); // You should get this from logged in user
    formData.append('feeId', '1'); // You should get this from selected fee

    this.authService.uploadPaymentProof(formData).subscribe({
      next: (response) => {
        console.log('Upload successful:', response);
        alert('Proof of payment uploaded successfully!');
        this.closeUpload();
      },
      error: (error) => {
        console.error('Upload error:', error);
        alert('Error uploading proof of payment');
      }
    });
  }
}