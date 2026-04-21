import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class AdminReportsComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  isLoading = false;

  summary = {
    total: 0,
    approved: 0,
    rejected: 0
  };

  monthly: Array<{ month: string; total: number; approved: number; rejected: number }> = [];

  ngOnInit() {
    this.loadStats();
    this.loadMonthlyStats();
  }

  loadStats() {
    this.isLoading = true;
    this.authService.getPaymentStats().subscribe({
      next: (response) => {
        if (response.success) {
          this.summary = {
            total: response.stats.total || 0,
            approved: response.stats.approved || 0,
            rejected: response.stats.rejected || 0
          };
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
        this.isLoading = false;
      }
    });
  }

  loadMonthlyStats() {
    this.authService.getMonthlyStats().subscribe({
      next: (response) => {
        if (response.success) {
          this.monthly = response.monthlyStats.map((stat: any) => ({
            month: new Date(stat.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            total: stat.total || 0,
            approved: stat.approved || 0,
            rejected: stat.rejected || 0
          }));
        }
      },
      error: (error) => {
        console.error('Error loading monthly stats:', error);
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