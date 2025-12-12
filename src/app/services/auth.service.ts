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

