import { Injectable } from '@angular/core';
import { UserGroup } from '../../models/acl/usergroup';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserGroupService {
    httpOptions = {  
        headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
        })  
  }; 
    constructor(private http: HttpClient) {
    }

    getNhomList(filter: any): Observable<any> {
       let querystring = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
       return this.http.get(environment.apiUrl + 'Groups?' + querystring, this.httpOptions);
    }
    
    getNhom(id: any): Observable<any> {
        return this.http.get(environment.apiUrl + `Groups/${id}`,this.httpOptions);
    }

    addOrUpdateNhom(usergroup: UserGroup , by: null | number): Observable<any> {
        if(usergroup.Id != 0 && usergroup.Id){
            usergroup.UpdatedBy = by;
        }else{
            usergroup.CreatedBy = by;
        }
        return this.http.post(environment.apiUrl + `Groups`,usergroup,this.httpOptions);
    }

    deleteNhom(id: number , deleteBy : number): Observable<any> {
        return this.http.delete(environment.apiUrl + `Groups/${id}?deleteBy/${deleteBy}`,this.httpOptions)
    }
}