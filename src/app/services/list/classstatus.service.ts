import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { ClassStatus } from '../../models/list/classstatus';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ImportViewModel } from 'app/models/importviewmodel';

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

    addOrUpdateClassStatus(ClassStatus: ClassStatus): Observable<any> {
        if (ClassStatus.id == 0) {
            return this.http.post(environment.serverUrl + 'ClassStatus', ClassStatus, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `ClassStatus/${ClassStatus.id}`, ClassStatus, this.httpOptions);
        }
    }

    deleteClassStatus(ClassStatusId: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `ClassStatus/${ClassStatusId}`, this.httpOptions);
    }
    
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `ClassStatus/import`, importViewModel , this.httpOptions);
    }
}