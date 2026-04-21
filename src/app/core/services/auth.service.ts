import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  // Fees
  getFees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/fees`);
  }

  // Payment
  uploadPaymentProof(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/payments/upload`, formData);
  }

  getStudentSubmissions(studentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/payments/student/${studentId}`);
  }

  getAllSubmissions(limit: number = 50, offset: number = 0): Observable<any> {
    return this.http.get(`${this.baseUrl}/payments/all?limit=${limit}&offset=${offset}`);
  }

  getPaymentStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/payments/stats`);
  }

  getMonthlyStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/payments/monthly-stats`);
  }

  approveSubmission(submissionId: number, adminId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/payments/${submissionId}/approve`, { adminId });
  }

  rejectSubmission(submissionId: number, adminId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/payments/${submissionId}/reject`, { adminId });
  }

  // Student
  getStudentProfile(studentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/students/${studentId}`);
  }

  updateStudentProfile(studentId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/students/${studentId}`, data);
  }

  getAllStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students`);
  }

  // Admin
  getAdminProfile(adminId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/${adminId}`);
  }

  updateAdminProfile(adminId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/${adminId}`, data);
  }

  // Notifications
  getNotifications(userId: string, role: 'student' | 'admin'): Observable<any> {
    return this.http.get(`${this.baseUrl}/notifications/${userId}?role=${role}`);
  }

  markNotificationAsRead(notificationId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/notifications/${notificationId}/read`, {});
  }

  markAllNotificationsAsRead(userId: string, role: 'student' | 'admin'): Observable<any> {
    return this.http.post(`${this.baseUrl}/notifications/read-all`, { userId, role });
  }

  createNotification(userId: string, role: 'student' | 'admin', title: string, message: string, type: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/notifications`, { userId, role, title, message, type });
  }
}