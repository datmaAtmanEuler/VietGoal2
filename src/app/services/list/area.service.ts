import { Injectable } from '@angular/core';
import { Area } from '../../models/list/area';
import { AreaFilter } from '../../models/filter/areafilter';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImportViewModel } from '../../models/importviewmodel';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
    httpOptions = {  
        headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
        })  
  }; 
    constructor(private http: HttpClient) {
    }

    getAreasList(filter: any): Observable<any> {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Areas?' + queryString , this.httpOptions);
    }
    
    getArea(id: any): Observable<any> {
        return this.http.get(environment.serverUrl + `Areas/${id}` , this.httpOptions);
    }

    addOrUpdateArea(area: Area): Observable<any> {
        if (area.id == 0) {
            return this.http.post(environment.serverUrl + 'Areas', area, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `Areas/${area.id}`, area, this.httpOptions);
        }
    }

    deleteArea(id: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Areas/${id}` , this.httpOptions);
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `Areas/import`, importViewModel , this.httpOptions);
    }
}