import { Injectable } from '@angular/core';
import { NhomNguoiDung } from '../../models/danhmuc/nhomnguoidung';
import { Filter } from '../../models/filter/filter';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NhomNguoiDungService {
    httpOptions = {  
        headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
        })  
  }; 
    constructor(private http: HttpClient) {
    }

    getNhomList(filter: any): Observable<any> {
       let querystring = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
       return this.http.get(environment.serverUrl_employee + 'AdministrationOfUserGroups?' + querystring, this.httpOptions);
    }
    
    getNhom(id: any): Observable<any> {
        return this.http.get(environment.serverUrl_employee + `AdministrationOfUserGroups/${id}`,this.httpOptions);
    }

    addOrUpdateNhom(nhomnguoidung: NhomNguoiDung , by: null | number): Observable<any> {
        if(nhomnguoidung.ID != 0 && nhomnguoidung.ID){
            nhomnguoidung.UpdatedBy = by;
        }else{
            nhomnguoidung.CreatedBy = by;
        }
        return this.http.post(environment.serverUrl_employee + `AdministrationOfUserGroups/save`,nhomnguoidung,this.httpOptions);
    }

    deleteNhom(id: number , deleteBy : number): Observable<any> {
        return this.http.delete(environment.serverUrl_employee + `AdministrationOfUserGroups/${id}?deleteBy/${deleteBy}`,this.httpOptions)
    }
}