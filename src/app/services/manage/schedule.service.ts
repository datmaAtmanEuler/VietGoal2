import { Injectable } from '@angular/core';
import { Schedule } from 'app/models/schedule';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    };
    constructor(private http: HttpClient) {
    }

    getSchedulesList(filter: any): Observable<any>{
        let queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Schedules?' + queryString, this.httpOptions);
    }

    getSchedule(id: any): Observable<any> {
        return this.http.get(environment.serverUrl + `Schedules/${id}` , this.httpOptions);
    }

    addOrUpdateSchedule(Schedule: Schedule, by: null | number): Observable<any> {
        if(Schedule.Id == 0) {
            Schedule.CreatedBy = by;
        } else {
            Schedule.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `Schedules`, Schedule, this.httpOptions);
    }

    deleteSchedule(ScheduleId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Schedules/${ScheduleId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}