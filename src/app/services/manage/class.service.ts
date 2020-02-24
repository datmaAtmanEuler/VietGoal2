import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from '../../models/manage/class';
import { environment } from 'environments/environment';
import { Filter } from 'app/models/filter/filter';
import { ImportViewModel } from 'app/models/importviewmodel';
@Injectable({
  providedIn: 'root'
})
export class ClassService {
    Classlist: Class[] ;
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 


    constructor(private http: HttpClient) {
    }

    getClassList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.apiUrl + 'Class?' + queryString , this.httpOptions);
    }
    
    getClass(id: any): Observable<any>  {
        return this.http.get(environment.apiUrl + `Class/${id}` , this.httpOptions);
    }

    addOrUpdateClass(Class: Class, by: null | number): Observable<any> {
        if(Class.Id == 0) {
            Class.CreatedBy = by;
        } else {
            Class.UpdatedBy = by;
        }
        return this.http.post(environment.apiUrl + `Class`, Class, this.httpOptions);
    }

    deleteClass(ClassId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.apiUrl + `Class/${ClassId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `Class/import`, importViewModel , this.httpOptions);
    }
}