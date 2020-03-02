import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecruitStudent } from '../../models/manage/recruit-student';
import { environment } from 'environments/environment';
import { Filter } from 'app/models/filter/filter';
import { ImportViewModel } from 'app/models/importviewmodel';
@Injectable({
  providedIn: 'root'
})
export class RecruitStudentService {
    recruitstudentlist: RecruitStudent[] ;
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 
    constructor(private http: HttpClient) {
    }
    getRecruitStudentList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + `StudentRecruits?` + queryString , this.httpOptions);
    }
    getRecruitStudent(id: any): Observable<any>  {
       
        return this.http.get(environment.serverUrl + `Students/${id}` , this.httpOptions);
    }
    addOrUpdateRecruitStudent(student: RecruitStudent): Observable<any> {
        if (student.id == 0) {
            return this.http.post(environment.serverUrl + 'StudentRecruits', student, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `StudentRecruits/${student.id}`, student, this.httpOptions);
        }
    }
    deleteRecruitStudent(RecruitStudentId: number): Observable<any> {
        return this.http.delete(environment.apiUrl + `Students/${RecruitStudentId}` , this.httpOptions);
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `Students/import`, importViewModel , this.httpOptions);
    }
}