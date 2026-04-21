import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface Notification {
  id?: number;
  message: string;
  time: string;
  type: 'success' | 'error' | 'warning';
  read: boolean;
}

@Component({
  selector: 'app-notifs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notifs.component.html',
  styleUrls: ['./notifs.component.scss']
})
export class AdminNotifsComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  adminId: string = 'ADM001'; // This should come from auth service
  isLoading = false;
  notifications: Notification[] = [];

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.isLoading = true;
    this.authService.getNotifications(this.adminId, 'admin').subscribe({
      next: (response) => {
        if (response.success) {
          this.notifications = response.notifications.map((notif: any) => ({
            id: notif.id,
            message: `${notif.title}: ${notif.message}`,
            time: this.formatTime(notif.created_at),
            type: notif.type,
            read: notif.read
          }));
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
        this.isLoading = false;
      }
    });
  }

  formatTime(dateString: string): string {
    if (!dateString) return 'just now';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} day ago`;
    return '';
  }

  markAllAsRead() {
    this.authService.markAllNotificationsAsRead(this.adminId, 'admin').subscribe({
      next: () => {
        this.notifications.forEach(n => n.read = true);
      },
      error: (error) => {
        console.error('Error marking all notifications as read:', error);
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
