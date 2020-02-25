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
        return this.http.get(environment.apiUrl + 'Areas?' + queryString , this.httpOptions);
    }
    
    getArea(id: any): Observable<any> {
        return this.http.get(environment.apiUrl + `Areas/${id}` , this.httpOptions);
    }

    addOrUpdateArea(area: Area, by: null | number): Observable<any> {
        area.DisplayOrder = parseInt(area.DisplayOrder+ '');
        if (area.Id != 0 && area.Id) {
            area.UpdatedBy = by;
        } else {
            area.CreatedBy = by;
        }
        return this.http.post(environment.apiUrl + `Areas`, area, this.httpOptions);
    }

    deleteArea(id: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.apiUrl + `Areas/${id}?deletedBy=${deletedBy}` , this.httpOptions);
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `Areas/import`, importViewModel , this.httpOptions);
    }
}