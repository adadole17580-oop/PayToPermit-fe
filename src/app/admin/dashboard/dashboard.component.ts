import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface Receipt {
  id: number;
  name: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  permit?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  adminId: string = 'ADM001'; // This should come from auth service
  receipts: Receipt[] = [];
  isLoading = false;
  stats = {
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
  };
  sequence = 1;

  ngOnInit() {
    this.loadSubmissions();
    this.loadStats();
  }

  loadSubmissions() {
    this.isLoading = true;
    this.authService.getAllSubmissions().subscribe({
      next: (response) => {
        if (response.success) {
          this.receipts = response.submissions;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading submissions:', error);
        this.isLoading = false;
      }
    });
  }

  loadStats() {
    this.authService.getPaymentStats().subscribe({
      next: (response) => {
        if (response.success) {
          this.stats = response.stats;
        }
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }

  get pendingCount() {
    return this.stats.pending;
  }

  get approvedCount() {
    return this.stats.approved;
  }

  get rejectedCount() {
    return this.stats.rejected;
  }

  viewReceipt(receipt: Receipt) {
    alert(`Viewing receipt of ${receipt.name}`);
  }

  approve(receipt: Receipt) {
    receipt.status = 'Approved';
    const dateParts = receipt.date.split('/');
    const day = dateParts[1]; // DD
    const year = dateParts[2].slice(-2); // YY
    const seq = this.sequence.toString().padStart(3, '0');
    receipt.permit = `PM${year}${seq}${day}-${this.adminId}`;
    this.sequence++;
  }

  reject(receipt: Receipt) {
    receipt.status = 'Rejected';
    receipt.permit = '';
  }

  logout() {
    if (confirm('Are you sure you want to log out your account?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
