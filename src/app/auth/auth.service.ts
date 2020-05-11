import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  // @ts-ignore
  private tokenTimer: NodeJS.Timer;
  private userId: string;
  private roles: string[];
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUserRoles() {
    return this.roles;
  }

  isAdmin() {
    return this.getUserRoles() && this.getUserRoles().includes('admin');
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    };
    this.http.post(`${BACKEND_URL}/signup`, authData)
      .subscribe((response) => {
        this.router.navigate(['/']);
      }, (error) => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (authInfo) {
      const now = new Date();
      const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.token = authInfo.token;
        this.isAuthenticated = true;
        this.userId = authInfo.userId;
        this.roles = authInfo.roles;
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListener.next(true);
      }
    }
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    };
    this.http.post<{ token: string, expiresIn: number, userId: string, roles: string[] }>(`${BACKEND_URL}/login`, authData)
      .subscribe((response) => {
        this.token = response.token;
        if (this.token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.roles = response.roles;
          this.saveAuthData(this.token, expirationDate, response.userId, response.roles);
          this.router.navigate(['/']);
        }
      }, (error) => {
        this.authStatusListener.next(false);
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.roles = null;
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, roles: string[]) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('userId');
    const rolesVal = localStorage.getItem('roles');
    let roles;
    if (rolesVal) {
      roles = JSON.parse(rolesVal);
    }
    if (!token || !expirationDate) {
      return;
    }
    return { token, expirationDate: new Date(expirationDate), userId, roles };
  }
}
