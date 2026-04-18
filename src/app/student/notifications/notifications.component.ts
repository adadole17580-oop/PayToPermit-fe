import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Notification {
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
export class NotificationsComponent {

  notifications: Notification[] = [
    {
      title: 'Receipt Approved',
      message: 'Your payment receipt has been approved.',
      time: '2 min ago',
      type: 'approved',
      read: false
    },
    {
      title: 'New Receipt Uploaded',
      message: 'You uploaded a new receipt for review.',
      time: '10 min ago',
      type: 'error',
      read: false
    },
    {
      title: 'Pending Review',
      message: 'Your receipt is under review.',
      time: '44 min ago',
      type: 'warning',
      read: true
    },
    {
      title: 'Receipt Rejected',
      message: 'Your receipt was rejected. Please upload a clearer image.',
      time: '1 hr ago',
      type: 'error',
      read: true
    },
    {
      title: 'System Maintenance',
      message: 'Scheduled maintenance on January 25.',
      time: '1 day ago',
      type: 'info',
      read: true
    }
  ];

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markAsRead(notif: Notification) {
    notif.read = true;
  }

  markAllAsRead() {
    this.notifications.forEach(n => (n.read = true));
  }

  deleteNotification(notif: Notification) {
    this.notifications = this.notifications.filter(n => n !== notif);
  }

  clearAll() {
    this.notifications = [];
  }

  getIcon(type: string): string {
    switch (type) {
      case 'approved': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  }
}