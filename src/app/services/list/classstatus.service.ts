import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { ClassStatus } from '../../models/list/classstatus';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClassStatusService {
    ttlhList: ClassStatus[];

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    };


    constructor(private http: HttpClient) {
    }

    getClassStatusList(filter: any): Observable<any> {
        let queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'ClassStatus?' + queryString, this.httpOptions);
    }

    getClassStatus(id: any): Observable<any> {
        return this.http.get(environment.serverUrl + `ClassStatus/${id}`, this.httpOptions);
    }

    addOrUpdateClassStatus(ClassStatus: ClassStatus, by: null | number): Observable<any> {
        if (ClassStatus.Id == 0) {
            ClassStatus.CreatedBy = by;
        } else {
            ClassStatus.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `ClassStatus`, ClassStatus, this.httpOptions);
    }

    deleteClassStatus(ClassStatusId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `ClassStatus/${ClassStatusId}?deletedBy=${deletedBy}`, this.httpOptions);
    }
}