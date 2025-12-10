import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl="http://localhost:3000/api/auth/login";
  constructor(private http:HttpClient) {}
  loginUser(data:any):Observable<any>{
    return this.http.post(this.apiUrl,data);
  }
}
