import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PaymentRecord {
  name: string;
  permit: string;
  date: string;
  amount: number;
  status: 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class AdminHistoryComponent {

  records: PaymentRecord[] = [
    { name: 'Michael Brown', permit: 'PMT-2026-001', date: '1/23/2026', amount: 150, status: 'Approved' },
    { name: 'Jennifer Garcia', permit: 'PMT-2026-002', date: '1/22/2026', amount: 150, status: 'Approved' },
    { name: 'Robert Martinez', permit: 'PMT-2026-003', date: '1/21/2026', amount: 150, status: 'Approved' },
    { name: 'David Wilson', permit: 'PMT-2026-004', date: '1/20/2026', amount: 150, status: 'Rejected' },
    { name: 'Jessica Anderson', permit: 'PMT-2026-005', date: '1/19/2026', amount: 150, status: 'Approved' },
    { name: 'Christopher Thomas', permit: 'PMT-2026-006', date: '1/18/2026', amount: 150, status: 'Approved' }
  ];

  exportCSV() {
    alert('Exporting records to CSV.');
  }

  viewReceipt(record: PaymentRecord) {
    alert(`Displaying receipt for ${record.name}.`);
  }
}