import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { TrangThaiHocVien } from '../../models/danhmuc/trangthaihocvien';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class TrangThaiHocVienService {
      tthv: TrangThaiHocVien[] ;
      httpOptions = { 
            headers: new HttpHeaders({  
              'Content-Type': 'application/json; charset=utf-8'  
            })  
      }; 
  
  
    
    constructor(private http: HttpClient) {
    }

    getTrangThaiHocVienList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'StudentStatus?' + queryString , this.httpOptions);
    }
    
    getTrangThaiHocVien(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `StudentStatus/${id}` , this.httpOptions);
    }

    addOrUpdateTrangThaiHocVien(trangThaiHocVien: TrangThaiHocVien, by: null | number): Observable<any> {
        if(trangThaiHocVien.Id == 0) {
            trangThaiHocVien.CreatedBy = by;
        } else {
            trangThaiHocVien.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `StudentStatus`, trangThaiHocVien, this.httpOptions);
    }

    deleteTrangThaiHocVien(trangThaiHocVienId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `StudentStatus/${trangThaiHocVienId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
  }