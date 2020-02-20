import { Injectable } from '@angular/core';
import { User } from '../../models/acl/user';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    httpOptions = {  
        headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
        })  
  }; 
    constructor(private http: HttpClient) {
    }

    getNhomList(filter: any): Observable<any> {
       let querystring = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
       return this.http.get(environment.serverUrl_employee + 'Users?' + querystring, this.httpOptions);
    }
    
    getNhom(id: any): Observable<any> {
        return this.http.get(environment.serverUrl_employee + `Users/${id}`,this.httpOptions);
    }

    addOrUpdateNhom(user: User , by: null | number): Observable<any> {
        if(user.Id != 0 && user.Id){
            user.UpdatedBy = by;
        }else{
            user.CreatedBy = by;
        }
        return this.http.post(environment.serverUrl_employee + `Users/save`,user,this.httpOptions);
    }

    deleteNhom(id: number , deleteBy : number): Observable<any> {
        return this.http.delete(environment.serverUrl_employee + `Users/${id}?deleteBy/${deleteBy}`,this.httpOptions)
    }
}