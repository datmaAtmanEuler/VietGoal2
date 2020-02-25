import { Injectable } from '@angular/core';
import { Position } from '../../models/list/position';
import { Filter } from '../../models/filter/filter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ImportViewModel } from 'app/models/importviewmodel';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
    PositionList: Position[] ;
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 

    constructor(private http: HttpClient) {
    }

    getPositionList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Positions?' + queryString , this.httpOptions);
    }
    
    getPosition(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `Positions/${id}` , this.httpOptions);
    }

    addOrUpdatePosition(Position: Position): Observable<any> {
        if (Position.id == 0) {
            return this.http.post(environment.serverUrl + 'Positions', Position, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `Positions/${Position.id}`, Position, this.httpOptions);
        }
    }

    deletePosition(PositionId: number, ): Observable<any> {
        return this.http.delete(environment.serverUrl + `Positions/${PositionId}` , this.httpOptions);
    }
    
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `Positions/import`, importViewModel , this.httpOptions);
    }
}