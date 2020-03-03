import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class StudentRegisterModulesService {
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 

    constructor(private http: HttpClient) {
    }
    getList(classId: number, year: number, month: number): Observable<any>  {
	const filter: any = {
    		classId: classId,
    		year: year,
    		month: month
	    };
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'StudentRegisterModules?' + queryString , this.httpOptions);
    }
    
    get(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `StudentRegisterModules/${id}` , this.httpOptions);
    }

    add(model: any): Observable<any> {
        return this.http.post(environment.serverUrl + `StudentRegisterModules`, model, this.httpOptions);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `StudentRegisterModules/${id}` , this.httpOptions);
    }
}