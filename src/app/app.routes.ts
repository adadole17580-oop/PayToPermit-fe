import { Routes } from '@angular/router';

import { HomePageComponent } from './homepage/hp.component';
import { AdminLoginComponent } from './admin/login/login.component';
import { AdminRegisterComponent } from './admin/register/register.component';
import { AdminResetPassComponent } from './resetpass/resetpass.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminHistoryComponent } from './admin/paymenthistory/history.component';
import { AdminNotifsComponent } from './admin/notifications/notifs.component';
import { AdminReportsComponent } from './admin/reports/reports.component';
import { AdminProfileComponent } from './admin/userinfo/profile.component';

import { StudentLoginComponent } from './student/login/login.component';

export const routes: Routes = [
  { path: 'homepage', component: HomePageComponent }, 
  { path: 'login', component: AdminLoginComponent },
  { path: 'register', component: AdminRegisterComponent },
  { path: 'resetpass', component: AdminResetPassComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'history', component: AdminHistoryComponent },
  { path: 'notifs', component: AdminNotifsComponent },
  { path: 'reports', component: AdminReportsComponent },
  { path: 'profile', component: AdminProfileComponent },

  { path: 'student', component: StudentLoginComponent },

  { path: '**', redirectTo: '' }
];
