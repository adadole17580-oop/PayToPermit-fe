import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class StudentUserPageComponent {
  user = {
    name: 'Jane Doe',
    email: 'john.doe@university.edu.ph',
    id: '2024-00123',
    phone: '+1 555 123-4567',
    address: '123 University Ave, Campus City',
    joined: '1/15/2024'
  };
}