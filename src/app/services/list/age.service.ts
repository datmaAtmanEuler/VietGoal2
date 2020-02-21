import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Age } from 'app/models/list/age';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AgeService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    };
    ttlhList: Age[];
    constructor(private http: HttpClient) {
    }

    getAgeList(filter: any): Observable<any> {
        let queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.apiUrl + 'Ages', this.httpOptions);
    }

    getAge(id: any): Observable<any> {
        return this.http.get(environment.apiUrl + `Ages/${id}` , this.httpOptions);
    }

    addOrUpdateAge(Age: any, by: null | number): Observable<any> {
        if (Age.id == 0) {
            return this.http.post(environment.serverUrl + 'Ages', Age, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `Ages/${Age.id}`, Age, this.httpOptions);
        }
        return this.http.post(environment.apiUrl + `Ages/${Age.Id}`, Age, this.httpOptions);
    }

    deleteAge(AgeId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.apiUrl + `Ages/${AgeId}` , this.httpOptions);
    }
}