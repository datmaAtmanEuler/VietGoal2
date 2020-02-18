import { Injectable } from '@angular/core';
import { Position } from '../../models/list/position';
import { Filter } from '../../models/filter/filter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

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

    addOrUpdatePosition(Position: Position, by: null | number): Observable<any> {
        if(Position.Id == 0) {
            Position.CreatedBy = by;
        } else {
            Position.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `Positions`, Position, this.httpOptions);
    }

    deletePosition(PositionId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Positions/${PositionId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}