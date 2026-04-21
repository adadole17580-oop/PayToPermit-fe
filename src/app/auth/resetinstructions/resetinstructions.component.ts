import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resetinstructions',
  templateUrl: './resetinstructions.component.html',
  styleUrls: ['./resetinstructions.component.scss']
})
export class ResetInstructionsComponent {
  email: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOninit() {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }

  resendEmail(): void {
    console.log("Resending email to:", this.email);
    // TODO: Call API to resend reset instructions
  }
}