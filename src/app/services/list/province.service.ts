import { Injectable } from '@angular/core';
import { Province } from '../../models/list/province';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ImportViewModel } from '../../models/importviewmodel';
import { Filter } from '../../models/filter/filter';

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
        return this.http.get(environment.apiUrl + 'Provinces?' + queryString , this.httpOptions);
    }

    getProvince(id: any): Observable<any> {
        return this.http.get(environment.apiUrl + `Provinces/${id}` , this.httpOptions);
    }

   

    addOrUpdateProvince(province: Province): Observable<any> {
        if (province.id == 0) {
            return this.http.post(environment.serverUrl + 'Provinces', province, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `Provinces/${province.id}`, province, this.httpOptions);
        }
    }

    deleteProvince(id: number): Observable<any> {
        return this.http.delete(environment.apiUrl + `Provinces/${id}` , this.httpOptions);
    }
    

    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `Provinces/import`, importViewModel , this.httpOptions);
    }
}