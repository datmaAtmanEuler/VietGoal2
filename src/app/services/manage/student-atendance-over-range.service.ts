import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentAtendanceOverRangeService {
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 

    constructor(private http: HttpClient) {
    }
    getList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'StudentAttendanceOverRanges?' + queryString , this.httpOptions);
    }
    

    put(model: any): Observable<any> {
        return this.http.put(environment.serverUrl + `StudentAttendanceOverRanges/${model.id}`, model, this.httpOptions);
    }
}
//absentDate
//classId
//pageIndex
//pageSize
//sortName
//sortDirection