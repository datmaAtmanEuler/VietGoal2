import { Injectable } from '@angular/core';
import { Yard } from '../../models/list/yard';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImportViewModel } from 'app/models/importviewmodel';

@Injectable({
  providedIn: 'root'
})
export class YardService {
    httpOptions = {  
        headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
        })  
  }; 


    constructor(private http: HttpClient) {
    }
    getYardsList(filter: any): Observable<any> {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Yards?' + queryString , this.httpOptions);
    }
    
    getYard(id: any): Observable<any> {
        return this.http.get(environment.serverUrl + `Yards/${id}` , this.httpOptions);
    }

    addOrUpdateYard(yard: Yard): Observable<any> {
        if (yard.id == 0) {
            return this.http.post(environment.serverUrl + 'Yards', yard, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `Yards/${yard.id}`, yard, this.httpOptions);
        }
    }

    deleteYard(id: number ): Observable<any> {
        return this.http.delete(environment.apiUrl + `Yards/${id}` , this.httpOptions);
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `Yards/import`, importViewModel , this.httpOptions);
    }
}