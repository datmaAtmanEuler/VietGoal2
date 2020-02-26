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
        return this.http.get(environment.apiUrl + 'Students?' + queryString , this.httpOptions);
    }
    
    getRecruitStudent(id: any): Observable<any>  {
        return this.http.get(environment.apiUrl + `Students/${id}` , this.httpOptions);
    }

    addOrUpdateRecruitStudent(student: RecruitStudent, by: null | number): Observable<any> {
        if(student.id == 0) {
            student.CreatedBy = by;
        } else {
            student.UpdatedBy = by;
        }
        return this.http.post(environment.apiUrl + `Students`, student, this.httpOptions);
    }

    deleteRecruitStudent(RecruitStudentId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.apiUrl + `Students/${RecruitStudentId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `Students/import`, importViewModel , this.httpOptions);
    }
}