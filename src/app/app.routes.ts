import { Routes } from '@angular/router';
import { RoleGuard } from './core/guards/role.guard';

import { HomePageComponent } from './homepage/hp.component';

import { LoginComponent } from './auth/signin/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPassComponent } from './auth/resetpass/resetpass.component';
import { ResetInstructionsComponent } from './auth/resetinstructions/resetinstructions.component';

import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminHistoryComponent } from './admin/paymenthistory/history.component';
import { AdminNotifsComponent } from './admin/notifs/notifs.component';
import { AdminReportsComponent } from './admin/reports/reports.component';
import { AdminProfileComponent } from './admin/userinfo/profile.component';

import { StudashboardComponent } from './student/dashboard/studashboard.component';
import { NotificationsComponent } from './student/notifications/notifications.component';
import { StudentUserPageComponent } from './student/profile/userpage.component';
import { UploadComponent } from './student/uploadphoto/upload.component';

export const routes: Routes = [

  { path: '', component: HomePageComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPassComponent },
  { path: 'reset-instructions', component: ResetInstructionsComponent},

  {
    path: 'admin',
    canActivate: [RoleGuard],
    data: { role: 'admin' },
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'history', component: AdminHistoryComponent },
      { path: 'notifs', component: AdminNotifsComponent },
      { path: 'reports', component: AdminReportsComponent },
      { path: 'profile', component: AdminProfileComponent }
    ]
  },

  {
    path: 'student',
    canActivate: [RoleGuard],
    data: { role: 'student' },
    children: [
      { path: 'dashboard', component: StudashboardComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'profile', component: StudentUserPageComponent },
      { path: 'upload', component: UploadComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];