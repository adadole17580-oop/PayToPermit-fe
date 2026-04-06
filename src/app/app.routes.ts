import { Routes } from '@angular/router';

// Import your components
import { HomePageComponent } from './homepage/hp.component';
import { StudentLoginComponent } from './studentlogin/login.component';
import { AdminLoginComponent } from './adminlogin/login.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent }, // default page
  { path: 'student', component: StudentLoginComponent },
  { path: 'admin', component: AdminLoginComponent },

  // fallback (VERY IMPORTANT)
  { path: '**', redirectTo: '' }
];
