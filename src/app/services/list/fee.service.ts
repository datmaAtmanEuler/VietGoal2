import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { Fee } from 'app/models/list/fee';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class FeeService {
      ttlhList: Fee[] ;
  
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 
  
    constructor(private http: HttpClient) {
    }
    
    getFeeList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Fees?' + queryString , this.httpOptions);
    }
    
    getFee(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `Fees/${id}` , this.httpOptions);
    }

    addOrUpdateFee(Fee: Fee, by: null | number): Observable<any> {
        if(Fee.Id == 0) {
            Fee.CreatedBy = by;
        } else {
            Fee.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `Fees`, Fee, this.httpOptions);
    }

    deleteFee(FeeId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Fees/${FeeId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
  }