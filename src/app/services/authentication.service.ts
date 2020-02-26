import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpHeaders, HttpParams } from '@angular/common/http';
import { Register } from '../models/register';
import { UtilsService } from './utils.service';
import { environment } from 'environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    currentUserSubject: BehaviorSubject<Register>;
    currentUser: Observable<Register>;
    header: HttpHeaders;
    constructor(private http: HttpClient, private utils: UtilsService) {
        const headerSettings: {[name: string]: string | string[]; } = {};  
        this.header = new HttpHeaders(headerSettings); 
        let obj = localStorage.getItem('currentUser');
        if(obj != null){
            try{
            this.currentUserSubject = new BehaviorSubject<Register>(JSON.parse(obj));
            }catch(e) {
                this.currentUserSubject = new BehaviorSubject<Register>(new Register());
            }
        } else {
            this.currentUserSubject = new BehaviorSubject<Register>(new Register());
        }
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Register {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
    let Email = '';
    let PhoneNumber = '';
    let PasswordHash = this.utils.md5Encode(password);
    let loginInfo = {
       userName: username,
       phoneNumber: PhoneNumber,
       email: Email,
       passwordHash: PasswordHash
    };
             return this.http.post<any>(environment.serverUrl+'Users/Login', loginInfo, { headers: this.header })
            .pipe(
                map(user => {
                const helper = new JwtHelperService();
                const token = user.token;
                let userNew = {Status: (user.status == 0) ? 'Success' : 'Error', UserInfo: helper.decodeToken(token)};
                if (userNew && userNew.UserInfo) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(userNew.UserInfo));
                    this.currentUserSubject.next(userNew.UserInfo);
                }
                return userNew;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}