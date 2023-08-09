import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostmanService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isLoggedIn: boolean = false;
  constructor(public http: HttpClient, private router: Router) { }
  getIsLoggenIn() {
    return this.isLoggedIn;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getToken() {
    return localStorage.getItem('token');
  }
  login(email: string, password: string) {
    const post = { email: email, password: password }
    this.http.post<any>('http://hmaapi.kilobytetech.com/auth/login', post).subscribe(res => {
      this.token = res.token
      console.log(this.token)
      if (this.token) {
        localStorage.setItem('token', this.token)
        this.authStatusListener.next(true)
        this.router.navigate(['/clients'])
      }
    })
  }
  getExsClients() {
    this.http.get<any>('http://hmaapi.kilobytetech.com/users?pageNo=1&size=20').subscribe(res => {
      console.log(res)
    })
  }
}
