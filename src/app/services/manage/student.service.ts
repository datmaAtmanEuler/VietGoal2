import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ImportViewModel } from 'app/models/importviewmodel';
import { Student } from 'app/models/manage/student';

@Injectable({ providedIn: 'root' })
export class StudentService {
    StudentList: Student[] ;
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 

    constructor(private http: HttpClient) {
    }
    getList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Students?' + queryString , this.httpOptions);
    }
    
    get(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `Students/${id}` , this.httpOptions);
    }

    addOrUpdate(model: Student, classId?: number): Observable<any> {
        if (model.id == 0 && classId) {
            return this.http.post(environment.serverUrl + `Students/${classId}`, model, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `Students/${model.id}`, model, this.httpOptions);
        }
    }

    delete(id: number, ): Observable<any> {
        return this.http.delete(environment.serverUrl + `Students/${id}` , this.httpOptions);
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `Students/import`, importViewModel , this.httpOptions);
    }
}