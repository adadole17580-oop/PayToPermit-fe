import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Notification {
  message: string;
  time: string;
  type: 'success' | 'error' | 'warning';
}

@Component({
  selector: 'app-notifs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notifs.component.html',
  styleUrls: ['./notifs.component.scss']
})
export class AdminNotifsComponent {
  notifications: Notification[] = [
    {
      message: 'Payment receipt from John Smith has been approved. Permit number PMT-2026-007 has been generated.',
      time: '14 hrs ago',
      type: 'success'
    },
    {
      message: 'New payment receipt submitted by Sarah Johnson requires your review.',
      time: '16 hrs ago',
      type: 'error'
    },
    {
      message: 'Payment receipt from David Wilson was rejected due to unclear documentation.',
      time: '1 day ago',
      type: 'error'
    },
    {
      message: 'Payment receipt from Emily Davis has been approved. Permit number PMT-2026-008 has been generated.',
      time: '1 day ago',
      type: 'success'
    },
    {
      message: 'System maintenance scheduled for Sunday, February 2nd from 2:00AM to 4:00AM.',
      time: '',
      type: 'warning'
    }
  ];

  clearAllNotifs() {
    this.notifications = [];
  }
}