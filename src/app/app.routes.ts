import { Routes } from '@angular/router';

import { HomePageComponent } from './homepage/hp.component';
import { StudentLoginComponent } from './student/login/login.component';
import { AdminLoginComponent } from './admin/login/login.component';
import { AdminRegisterComponent } from './admin/register/register.component';


export const routes: Routes = [
  { path: '', component: HomePageComponent }, 
  { path: 'student', component: StudentLoginComponent },
  { path: 'admin', component: AdminLoginComponent },
  { path: 'register', component: AdminRegisterComponent },

  { path: '**', redirectTo: '' }
];
