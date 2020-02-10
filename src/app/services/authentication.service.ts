import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpHeaders, HttpParams } from '@angular/common/http';
import { Register } from '../models/register';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    currentUserSubject: BehaviorSubject<Register>;
    currentUser: Observable<Register>;
    serverURL  = `${environment.serverUrl}Login/`; 
    header: HttpHeaders;
    constructor(private http: HttpClient) {
        const headerSettings: {[name: string]: string | string[]; } = {};  
        this.header = new HttpHeaders(headerSettings); 
        let obj = localStorage.getItem("currentUser");
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
	let body: HttpParams = new HttpParams();
    	body = body.append('UserName', username);
    	body = body.append('Password', password);
	         return this.http.post<any>(this.serverURL+'UserLogin', body,{ headers: this.header})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.UserInfo) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.UserInfo));
                    this.currentUserSubject.next(user.UserInfo);
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}