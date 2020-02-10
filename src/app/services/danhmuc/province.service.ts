import { Injectable } from '@angular/core';
import { Province } from '../../models/danhmuc/province';
import { Filter } from '../../models/filter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
    constructor(private http: HttpClient) {
    }

    getProvincesList(filter: any): Observable<any> {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl_employee + 'provinces?' + queryString , this.httpOptions);
    }
    
    getProvince(id: any): Observable<any> {
        return this.http.get(environment.serverUrl_employee + `provinces/${id}` , this.httpOptions);
    }

    addOrUpdateProvince(province: Province): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `provinces/save`, province, this.httpOptions);
    }

    deleteProvince(id: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl_employee + `provinces/${id}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}