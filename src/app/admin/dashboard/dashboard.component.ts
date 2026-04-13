import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Receipt {
  name: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  permit?: string;
}

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent {

  receipts: Receipt[] = [
    {
      name: 'John Doe',
      date: '01/29/2026',
      status: 'Approved',
      permit: 'PMT2600129'
    },
    {
      name: 'Dawn Nicole',
      date: '12/20/2025',
      status: 'Pending'
    },
    {
      name: 'Ayana Faye',
      date: '01/22/2026',
      status: 'Pending'
    }
  ];

  get pendingCount() {
    return this.receipts.filter(r => r.status === 'Pending').length;
  }

  get approvedCount() {
    return this.receipts.filter(r => r.status === 'Approved').length;
  }

  get rejectedCount() {
    return this.receipts.filter(r => r.status === 'Rejected').length;
  }

  viewReceipt(receipt: Receipt) {
    alert(`Viewing receipt of ${receipt.name}`);
  }

  approve(receipt: Receipt) {
    receipt.status = 'Approved';
    receipt.permit = 'PMT' + Math.floor(1000000 + Math.random() * 9000000);
  }

  reject(receipt: Receipt) {
    receipt.status = 'Rejected';
    receipt.permit = '';
  }
}