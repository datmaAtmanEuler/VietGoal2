import { Injectable } from '@angular/core';
import { Yard } from '../../models/list/yard';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
        return this.http.get(environment.apiUrl + 'Yards?' + queryString , this.httpOptions);
    }
    
    getYard(id: any): Observable<any> {
        return this.http.get(environment.apiUrl + `Yards/${id}` , this.httpOptions);
    }

    addOrUpdateYard(yard: Yard, by: null | number): Observable<any> {
        yard.DisplayOrder = parseInt(yard.DisplayOrder + '');
        if (yard.Id != 0 && yard.Id) {
            yard.UpdatedBy = by;
        } else {
            yard.CreatedBy = by;
        }
        return this.http.post(environment.apiUrl + `Yards/save`, yard, this.httpOptions);
    }

    deleteYard(id: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.apiUrl + `Yards/${id}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}