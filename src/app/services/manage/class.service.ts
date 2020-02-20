import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from '../../models/manage/class';
import { environment } from 'environments/environment';
import { Filter } from 'app/models/filter/filter';
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
        return this.http.get(environment.serverUrl + 'Class?' + queryString , this.httpOptions);
    }
    
    getClass(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `Class/${id}` , this.httpOptions);
    }

    addOrUpdateClass(Class: Class, by: null | number): Observable<any> {
        if(Class.Id == 0) {
            Class.CreatedBy = by;
        } else {
            Class.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `Class/save`, Class, this.httpOptions);
    }

    deleteClass(ClassId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Class/${ClassId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}