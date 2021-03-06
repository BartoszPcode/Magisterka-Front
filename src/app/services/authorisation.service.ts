import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { RegisterDTO } from '../models/registerDTO';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();    
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  register(model: RegisterDTO) {
    return this.http.post(`${environment.apiURL}auth/register`, model);
}

  login(model: any) {
      return this.http.post<any>(`${environment.apiURL}auth/login`, model)
          .pipe(map(user => {            
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));             
              this.currentUserSubject.next(user);
              return user;
          })
          );
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/home']);
  }
}
