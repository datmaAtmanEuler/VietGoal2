import { Injectable } from '@angular/core';
import { User } from '../../models/acl/user';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ImportViewModel } from '../../models/importviewmodel';
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

    getUserAdministrationList(filter: any): Observable<any> {
       let querystring = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
       return this.http.get(environment.serverUrl + 'Users?' + querystring, this.httpOptions);
    }
    
    getNhom(id: any): Observable<any> {
        return this.http.get(environment.serverUrl + `Users/${id}`,this.httpOptions);
    }

    addOrUpdateNhom(user: User): Observable<any> {
        if (user.id == 0) {
            return this.http.post(environment.serverUrl + 'Users', user, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `Users/${user.id}`, user, this.httpOptions);
        }
    }

    deleteNhom(id: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Users/${id}`,this.httpOptions)
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl + `Users/import`, importViewModel , this.httpOptions);
    }
}