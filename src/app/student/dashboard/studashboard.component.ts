import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UploadComponent } from '../uploadphoto/upload.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, UploadComponent],
  templateUrl: './studashboard.component.html',
  styleUrls: ['./studashboard.component.scss']
})

export class StudashboardComponent {
  showUploadModal = false;

  submissions = [
    {
      file: 'payment_receipt_2026.pdf',
      permit: 'PMT2600129',
      status: 'approved'
    },
    {
      file: 'tuition_payment.jpg',
      permit: '-',
      status: 'pending'
    }
  ];

  openUploadModal() {
    this.showUploadModal = true;
  }

  closeUploadModal() {
    this.showUploadModal = false;
  }

  handleUpload(file: File) {
    console.log('Uploaded:', file);

    this.submissions.push({
      file: file.name,
      permit: 'Pending',
      status: 'pending'
    });

    this.closeUploadModal();
  }
}