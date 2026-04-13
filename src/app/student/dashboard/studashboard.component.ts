import { Component } from '@angular/core';

@Component({
  selector: 'app-studashboard',
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