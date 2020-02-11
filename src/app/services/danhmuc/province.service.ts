import { Injectable } from '@angular/core';
import { Province } from '../../models/danhmuc/province';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
    httpOptions = {  
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 

    constructor(private http: HttpClient) {
    }

    getProvincesList(filter: any): Observable<any> {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl_employee + 'provinces?' + queryString , this.httpOptions);
    }
    
    getProvince(id: any): Observable<any> {
        return this.http.get(environment.serverUrl_employee + `provinces/${id}` , this.httpOptions);
    }

    addOrUpdateProvince(province: Province, by: null | number): Observable<any> {
        if (province.ID != 0 && province.ID) {
            province.UpdatedBy = by;
        } else {
            province.CreatedBy = by;
        }
        return this.http.post(environment.serverUrl_employee + `provinces/save`, province, this.httpOptions);
    }

    deleteProvince(id: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl_employee + `provinces/${id}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}