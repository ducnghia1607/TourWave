import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient, private router: Router) {}

  setCurrentUser(user: User) {
    user.roles = [];
    var role = this.getDecodedToken(user.token).role;
    console.log(this.getDecodedToken(user.token));
    user.id = this.getDecodedToken(user.token).sid;
    Array.isArray(role) ? (user.roles = role) : user.roles.push(role);
    localStorage.setItem('token', user.token);
    this.currentUserSource.next(user);
  }

  loadCurrentUser(token: string) {
    if (token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    var headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http
      .get<User>(this.baseUrl + 'account', { headers: headers })
      .pipe(
        map((user) => {
          if (user) {
            // this.currentUserSource.next(user);
            this.setCurrentUser(user);
            return user;
          } else return null;
        })
      );
  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        if (response) {
          this.setCurrentUser(response);
        }
        return response;
      })
    );
  }
  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((response) => {
        this.setCurrentUser(response);
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    // this.router.navigateByUrl('/tours');
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
