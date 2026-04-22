import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface Receipt {
  submission_id: number;
  student_id: string;
  original_filename: string;
  upload_date: string;
  status: 'pending' | 'approved' | 'rejected';
  permit_number?: string;
  admin_id?: string;
  file_size: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService) {}

  adminId: string = 'admin001';
  receipts: Receipt[] = [];
  isLoading = false;
  stats = {
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
  };
  sequence = 1;
  private refreshTimer: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.id) {
          this.adminId = user.id;
        }
      } catch (error) {
        console.warn('Invalid user data in localStorage:', error);
      }
    }
    this.loadSubmissions();
    this.loadStats();
    this.refreshTimer = setInterval(() => {
      this.loadSubmissions();
      this.loadStats();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  loadSubmissions() {
    this.isLoading = true;
    this.authService.getAllSubmissions().subscribe({
      next: (response) => {
        if (response.success) {
          this.receipts = response.submissions.map((sub: any) => ({
            submission_id: sub.submission_id ?? sub.id,
            student_id: sub.student_id,
            original_filename: sub.original_filename,
            upload_date: sub.upload_date,
            status: sub.status,
            permit_number: sub.permit_number,
            admin_id: sub.admin_id,
            file_size: sub.file_size
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
    alert(`Receipt Details:
Student ID: ${receipt.student_id}
File: ${receipt.original_filename}
Date: ${receipt.upload_date}
Status: ${receipt.status}
Permit: ${receipt.permit_number || 'Not assigned'}`);
  }

  approve(receipt: Receipt) {
    if (confirm(`Are you sure you want to approve this submission?`)) {
      this.authService.approveSubmission(receipt.submission_id, this.adminId).subscribe({
        next: (response) => {
          if (response.success) {
            alert(`Submission approved! Permit Number: ${response.permitNumber}`);
            this.loadSubmissions(); // Refresh the list
            this.loadStats(); // Refresh stats
          }
        },
        error: (error) => {
          console.error('Error approving submission:', error);
          alert('Error approving submission');
        }
      });
    }
  }

  reject(receipt: Receipt) {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason && reason.trim()) {
      this.authService.rejectSubmission(receipt.submission_id, this.adminId, reason).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Submission rejected successfully');
            this.loadSubmissions(); // Refresh the list
            this.loadStats(); // Refresh stats
          }
        },
        error: (error) => {
          console.error('Error rejecting submission:', error);
          alert('Error rejecting submission');
        }
      });
    }
  }

  logout() {
    if (confirm('Are you sure you want to log out your account?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
