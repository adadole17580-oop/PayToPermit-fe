import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface Notification {
  id?: number;
  title: string;
  message: string;
  time: string;
  type: 'approved' | 'warning' | 'error' | 'info';
  read: boolean;
}

@Component({
  selector: 'app-notification',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  userId: string = 'student001';
  isLoading = false;
  notifications: Notification[] = [];

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.id) {
          this.userId = user.id;
        }
      } catch (error) {
        console.warn('Invalid user data in localStorage:', error);
      }
    }
    this.loadNotifications();
  }

  loadNotifications() {
    this.isLoading = true;
    this.authService.getNotifications(this.userId, 'student').subscribe({
      next: (response) => {
        if (response.success) {
          this.notifications = response.notifications.map((notif: any) => ({
            id: notif.id,
            title: notif.title,
            message: notif.message,
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
    return date.toLocaleDateString();
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markAsRead(notif: Notification) {
    if (notif.id) {
      this.authService.markNotificationAsRead(notif.id).subscribe({
        next: () => {
          notif.read = true;
        },
        error: (error) => {
          console.error('Error marking notification as read:', error);
        }
      });
    }
  }

  markAllAsRead() {
    this.authService.markAllNotificationsAsRead(this.userId, 'student').subscribe({
      next: () => {
        this.notifications.forEach(n => n.read = true);
      },
      error: (error) => {
        console.error('Error marking all notifications as read:', error);
      }
    });
  }

  getIcon(type: string): string {
    switch (type) {
      case 'approved': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  }

  logout() {
    if (confirm('Are you sure you want to log out your account?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}