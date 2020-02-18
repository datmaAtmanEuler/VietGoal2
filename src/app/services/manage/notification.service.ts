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

    getNotificationsList(filter: any): Observable<any> {
        let queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Notifications?' + queryString, this.httpOptions);
    }

    getNotification(id: any): Observable<any> {
        return this.http.get(environment.serverUrl + `Notifications/${id}`, this.httpOptions);
    }

    addOrUpdateNotification(notification: Notification, by: null | number): Observable<any> {
        if (notification.Id == 0) {
            notification.CreatedBy = by;
        } else {
            notification.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `Notifications`, notification, this.httpOptions);
    }

    deleteNotification(notificationId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Notifications/${notificationId}?deletedBy=${deletedBy}`, this.httpOptions);
    }
}