import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { StudentStatus } from '../../models/list/studentstatus';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class StudentStatusService {
      tthv: StudentStatus[] ;
      httpOptions = { 
            headers: new HttpHeaders({  
              'Content-Type': 'application/json; charset=utf-8'  
            })  
      }; 
  
  
    
    constructor(private http: HttpClient) {
    }

    getStudentStatusList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'StudentStatus?' + queryString , this.httpOptions);
    }
    
    getStudentStatus(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `StudentStatus/${id}` , this.httpOptions);
    }

    addOrUpdateStudentStatus(StudentStatus: StudentStatus): Observable<any> {
        if (StudentStatus.id == 0) {
            return this.http.post(environment.serverUrl + 'StudentStatus', StudentStatus, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `StudentStatus/${StudentStatus.id}`, StudentStatus, this.httpOptions);
        }
    }

    deleteStudentStatus(StudentStatusId: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `StudentStatus/${StudentStatusId}` , this.httpOptions);
    }
  }