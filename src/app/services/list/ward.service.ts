import { Injectable } from '@angular/core';
import { Ward } from '../../models/list/wards';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImportViewModel } from '../../models/importviewmodel';

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
       return this.http.get(environment.apiUrl + 'Wards?' + queryString , this.httpOptions);
    }
    
    getWard(id: any): Observable<any> {
        console.log(id);
        return this.http.get(environment.apiUrl + `Wards/${id}`, this.httpOptions);
    }

    addOrUpdateWard(ward: Ward ): Observable<any> {
        if (ward.id == 0) {
            return this.http.post(environment.serverUrl + 'Wards', ward, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `Wards/${ward.id}`, ward, this.httpOptions);
        }
    }
    
    deleteWard(id: number , deleteBy : number): Observable<any> {
       
        return this.http.delete(environment.apiUrl + `Wards/${id}?deleteBy=${deleteBy}`, this.httpOptions);
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `Wards/import`, importViewModel , this.httpOptions);
    }
}