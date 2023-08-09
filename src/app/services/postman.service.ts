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
    this.http.post<any>('https://hmaapi.kilobytetech.com/auth/login', post).subscribe(res => {
      this.token = res.token
      console.log(this.token)
      if (this.token) {
        localStorage.setItem('token', this.token)
        this.authStatusListener.next(true)
        this.router.navigate(['/clients'])
      }
    })
  }
  getExsClients(currentPage: number, clientsPerPage: number): Observable<any> {
    return this.http.get<any>(`https://hmaapi.kilobytetech.com/users?pageNo=${currentPage}&size=${clientsPerPage}`)
  }
  getCompanyDetails(clientId: string, finanYear: string): Observable<any> {
    return this.http.get<any>(`https://hmaapi.kilobytetech.com/documents?clientId=${clientId}&financialYear=${finanYear}`)
  }
  upload(file: File, documentId: string): Observable<any> {
    const status = "Completed";
    return this.http.put(`https://hmaapi.kilobytetech.com/documents/${documentId}`,
      { file: file, status: status })
  }
}
