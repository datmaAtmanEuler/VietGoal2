import { Injectable } from '@angular/core';
import { Chucvu } from '../../models/list/Chucvu';
import { Filter } from '../../models/filter/filter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChucvuService {
    chucvuList: Chucvu[] ;
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 

    constructor(private http: HttpClient) {
    }

    getChucvuList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Positions?' + queryString , this.httpOptions);
    }
    
    getChucvu(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `Positions/${id}` , this.httpOptions);
    }

    addOrUpdateChucvu(chucvu: Chucvu, by: null | number): Observable<any> {
        if(chucvu.ID == 0) {
            chucvu.CreatedBy = by;
        } else {
            chucvu.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `Positions`, chucvu, this.httpOptions);
    }

    deleteChucvu(chucvuId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Positions/${chucvuId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}