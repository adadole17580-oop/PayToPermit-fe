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

  openUpload() {
    this.isUploadOpen = true;
  }

  closeUpload() {
    this.isUploadOpen = false;
  }

  selectRole(role: string) {
    if (role === 'student') {
      this.router.navigate(['/student']);
    } else {
      this.router.navigate(['/admin']);
    }
  }

  viewFees() {
    this.router.navigate(['/fees']);
  }
}