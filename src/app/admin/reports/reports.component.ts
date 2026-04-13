import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class AdminReportsComponent {
  summary = {
    total: 80,
    approved: 56,
    rejected: 6
  };

  monthly = [
    { month: 'January', total: 15, approved: 13, rejected: 2 },
    { month: 'February', total: 22, approved: 20, rejected: 2 },
    { month: 'March', total: 25, approved: 23, rejected: 2 }
  ];
}