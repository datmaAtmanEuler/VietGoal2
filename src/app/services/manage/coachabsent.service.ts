import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CoachAbsent, CoachAbsentMapping } from 'app/models/manage/coachabsent';
import { ImportViewModel } from 'app/models/importviewmodel';

@Injectable({ providedIn: 'root' })
export class CoachAbsentService {
    CoachAbsentList: CoachAbsent[] ;
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 

    constructor(private http: HttpClient) {
    }
    getList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'CoachAbsents?' + queryString , this.httpOptions);
    }
    
    get(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `CoachAbsents/${id}` , this.httpOptions);
    }

    addOrUpdate(model: CoachAbsentMapping): Observable<any> {
        if (model.id == 0) {
            return this.http.post(environment.serverUrl + 'CoachAbsents', model, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `CoachAbsents/${model.id}`, model, this.httpOptions);
        }
    }

    delete(id: number, ): Observable<any> {
        return this.http.delete(environment.serverUrl + `CoachAbsents/${id}` , this.httpOptions);
    }

    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `CoachAbsents/import`, importViewModel , this.httpOptions);
    }
}