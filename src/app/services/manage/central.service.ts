import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Central } from '../../models/manage/central';
import { environment } from 'environments/environment';
import { Filter } from 'app/models/filter/filter';
@Injectable({
  providedIn: 'root'
})
export class CentralService {
    Centrallist: Central[] ;
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 


    constructor(private http: HttpClient) {
    }

    getCentralsList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Centrals?' + queryString , this.httpOptions);
    }
    
    getCentral(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `Centrals/${id}` , this.httpOptions);
    }

    addOrUpdateCentral(Central: Central, by: null | number): Observable<any> {
        if(Central.Id == 0) {
            Central.CreatedBy = by;
        } else {
            Central.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `Centrals`, Central, this.httpOptions);
    }

    deleteCentral(CentralId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Centrals/${CentralId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}