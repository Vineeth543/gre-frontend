import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://ws-21289:8082';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    const header = new HttpHeaders({
      'Content-type': 'application/json; Charset=UTF-8',
    });
    return this.http.post<any>(
      this.baseUrl + '/login',
      { email: data.email, password: data.password },
      { headers: header }
    );
  }

  register(data: { email: string; password: string }) {
    const header = new HttpHeaders({
      'Content-type': 'application/json; Charset=UTF-8',
    });
    return this.http.post<any>(
      this.baseUrl + '/register',
      { email: data.email, password: data.password },
      { headers: header }
    );
  }

  registerUserInLocalStorage(data: { email: string; password: string }): void {
    let registered: boolean = false;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.forEach((user: { email: string; password: string }) => {
      if (user.email === data.email) {
        alert('User already exists');
        registered = true;
        return;
      }
    });
    if (!registered) {
      users.push(data);
      localStorage.setItem('users', JSON.stringify(users));
      alert('User registered successfully');
      this.router.navigate(['/']);
    }
  }

  loginUserUsingLocalStorage(data: { email: string; password: string }): void {
    let loggedIn: boolean = false;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.forEach((user: { email: string; password: string }) => {
      if (user.email === data.email) {
        if (user.password !== data.password) {
          alert('Invalid password');
          loggedIn = true;
        } else {
          alert('User logged in successfully');
          this.router.navigate(['/']);
          loggedIn = true;
        }
      }
    });
    if (!loggedIn) alert('User not found');
  }
}
