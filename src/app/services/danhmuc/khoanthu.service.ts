import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { KhoanThu } from 'app/models/danhmuc/khoanthu';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class KhoanThuService {
      ttlhList: KhoanThu[] ;
  
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 
  
    constructor(private http: HttpClient) {
    }
    
    getKhoanThuList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Fees?' + queryString , this.httpOptions);
    }
    
    getKhoanThu(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `Fees/${id}` , this.httpOptions);
    }

    addOrUpdateKhoanThu(KhoanThu: KhoanThu, by: null | number): Observable<any> {
        if(KhoanThu.Id == 0) {
            KhoanThu.CreatedBy = by;
        } else {
            KhoanThu.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `Fees`, KhoanThu, this.httpOptions);
    }

    deleteKhoanThu(KhoanThuId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Fees/${KhoanThuId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
  }