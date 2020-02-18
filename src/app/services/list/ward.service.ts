import { Injectable } from '@angular/core';
import { Ward } from '../../models/list/wards';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WardService {
    httpOptions = {  
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 

 
    constructor(private http: HttpClient) {
    }

    getWardsList(filter: any): Observable<any> {
       let queryString = Object.keys(filter).map(key=>key + '=' + filter[key]).join('&');
       return this.http.get(environment.serverUrl_employee + 'Wards?' + queryString , this.httpOptions);
    }
    
    getWard(id: any): Observable<any> {
        return this.http.get(environment.serverUrl_employee + `wards/${id}`, this.httpOptions);
    }

    addOrUpdateWard(ward: Ward , by: null | number): Observable<any> {
        ward.DisplayOrder = parseInt(ward.DisplayOrder + '');
        if(ward.Id != 0 && ward.Id){
            ward.UpdatedBy = by;
        }else
        {
            ward.CreatedBy = by;
        }
        return this.http.post(environment.serverUrl_employee + `Wards/save`,ward, this.httpOptions);
    }
    
  deleteWard(id: number , deleteBy : number): Observable<any> {
       
        return this.http.delete(environment.serverUrl_employee + `wards/${id}?deleteBy=${deleteBy}`, this.httpOptions);
    }
}