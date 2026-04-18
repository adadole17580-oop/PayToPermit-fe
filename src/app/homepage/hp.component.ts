import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hp.component.html',
  styleUrls: ['./hp.component.scss']
})
export class HomePageComponent {

  isUploadOpen = false;

  constructor(private router: Router) {}

  goToLogin(role: string) {
    localStorage.setItem('selectedRole', role);
    this.router.navigate(['/login']); 
  }

  viewFees() {
    console.log('View fees clicked');
  }

  openUpload() {
    this.isUploadOpen = true;
  }

  closeUpload() {
    this.isUploadOpen = false;
  }

  handleFile(event: any) {
    const file = event.target.files[0];
    console.log('Selected file:', file);
  }
}