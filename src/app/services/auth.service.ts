/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private baseUrl='http://localhost:4000/auth';
  private base = `${environment.apiBase}/auth`;
  public currentUser = new BehaviorSubject<User | null>(null);
  constructor(private http:HttpClient) {}
  register(name:string,email:string,mobile:string,password:string):Observable<any>{
    return this.http.post(`${this.base}/register`,{name,email,mobile,password});}

  login(email:string,password:string):Observable<any>{
    return this.http.post(`${this.base}/login`,{email,password}).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        const u = { id: res.user.id || res.user._id, name: res.user.name, email: res.user.email };
        localStorage.setItem('currentUser', JSON.stringify(u));
        this.currentUser.next(u);
      })
    );
  }  

  // Set current user (simple front-end state)
  setUser(user: User) {
    this.currentUser.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Get current user from localStorage
  getUser(): User | null {
    const data = localStorage.getItem('currentUser');
    if (data) {
      const user = JSON.parse(data);
      this.currentUser.next(user);
      return user;
    }
    return null;
  }

  // Logout
  logout() {
    /*this.currentUser.next(null);
    localStorage.removeItem('currentUser');*/
/*    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
  }
   getStoredUser(): User | null {
    const raw = localStorage.getItem('currentUser');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
*/

/*

// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User { id: string; name: string; email: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiBase}/auth`;
  public currentUser$ = new BehaviorSubject<User | null>(this.getStoredUser());

  constructor(private http: HttpClient) {}

  register(name: string, email: string, mobile: string, password: string) {
    return this.http.post(`${this.base}/register`, { name, email, mobile, password });
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${this.base}/login`, { email, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        const u = { id: res.user.id || res.user._id, name: res.user.name, email: res.user.email };
        localStorage.setItem('currentUser', JSON.stringify(u));
        this.currentUser$.next(u);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUser$.next(null);
  }

  getStoredUser(): User | null {
    const raw = localStorage.getItem('currentUser');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
*/


/*
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private user: any = null;

  constructor() {
    const saved = localStorage.getItem('user');
    if (saved) this.user = JSON.parse(saved);
  }

  setUser(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return this.user;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = null;
  }
}
*/












/*
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IUser {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:4000/auth';

  public currentUser = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient) {}

  register(name: string, email: string, mobile: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, { name, email, mobile, password });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  setUser(user: IUser) {
    this.currentUser.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser(): IUser | null {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  }

  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
  }
}*/





import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl='http://localhost:4000/auth';
    public currentUser = new BehaviorSubject<User | null>(null);
  constructor(private http:HttpClient) {}
  register(name:string,email:string,mobile:string,password:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/register`,{name,email,mobile,password});}

  login(email:string,password:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,{email,password});
  }  

  // Set current user (simple front-end state)
  setUser(user: User) {
    this.currentUser.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Get current user from localStorage
  getUser(): User | null {
    const data = localStorage.getItem('currentUser');
    if (data) {
      const user = JSON.parse(data);
      this.currentUser.next(user);
      return user;
    }
    return null;
  }

  // Logout
  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
  }

}

