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
        return this.http.get(environment.apiUrl + 'RecruitStudent?' + queryString , this.httpOptions);
    }
    
    getRecruitStudent(id: any): Observable<any>  {
        return this.http.get(environment.apiUrl + `RecruitStudent/${id}` , this.httpOptions);
    }

    addOrUpdateRecruitStudent(RecruitStudent: RecruitStudent, by: null | number): Observable<any> {
        if(RecruitStudent.Id == 0) {
            RecruitStudent.CreatedBy = by;
        } else {
            RecruitStudent.UpdatedBy = by;
        }
        return this.http.post(environment.apiUrl + `RecruitStudent`, RecruitStudent, this.httpOptions);
    }

    deleteRecruitStudent(RecruitStudentId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.apiUrl + `RecruitStudent/${RecruitStudentId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `RecruitStudent/import`, importViewModel , this.httpOptions);
    }
}