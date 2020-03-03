import { Injectable } from '@angular/core';
import { Notification } from '../../models/manage/notification';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    };

    constructor(private http: HttpClient) {
    }

    getList(filter: any): Observable<any> {
        let queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Notification?' + queryString, this.httpOptions);
    }
    getViewedList(filter: any): Observable<any> {
        let queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Notification/ViewedList?' + queryString, this.httpOptions);
    }

    get(id: any): Observable<any> {
        return this.http.get(environment.serverUrl + `Notification/${id}`, this.httpOptions);
    }

    addOrUpdate(notification: Notification): Observable<any> {
        if (notification.id == 0) {
            return this.http.post(environment.serverUrl + 'Notification', notification, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `Notification/${notification.id}`, notification, this.httpOptions);
        }
    }

    delete(notificationId: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Notification/${notificationId}`, this.httpOptions);
    }
}