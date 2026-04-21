import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface PaymentRecord {
  name: string;
  permit: string;
  date: string;
  amount: number;
  status: 'Approved' | 'Rejected';
  id?: number;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class AdminHistoryComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  isLoading = false;
  records: PaymentRecord[] = [];

  ngOnInit() {
    this.loadPaymentHistory();
  }

  loadPaymentHistory() {
    this.isLoading = true;
    this.authService.getAllSubmissions(100).subscribe({
      next: (response) => {
        if (response.success) {
          // Filter only approved and rejected submissions
          this.records = response.submissions
            .filter((sub: any) => sub.status !== 'pending')
            .map((sub: any) => ({
              name: sub.student_name,
              permit: sub.permit_number || 'N/A',
              date: new Date(sub.upload_date).toLocaleDateString(),
              amount: 150, // Default amount - you could add this to the database
              status: sub.status.charAt(0).toUpperCase() + sub.status.slice(1) as 'Approved' | 'Rejected',
              id: sub.id
            }));
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading payment history:', error);
        this.isLoading = false;
      }
    });
  }

  exportCSV() {
    if (this.records.length === 0) {
      alert('No records to export.');
      return;
    }

    const headers = ['Name', 'Permit', 'Date', 'Amount', 'Status'];
    const csvContent = [
      headers.join(','),
      ...this.records.map(r => `${r.name},${r.permit},${r.date},${r.amount},${r.status}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `payment_history_${new Date().getTime()}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  viewReceipt(record: PaymentRecord) {
    alert(`Displaying receipt for ${record.name}.`);
  }

  logout() {
    if (confirm('Are you sure you want to log out your account?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}