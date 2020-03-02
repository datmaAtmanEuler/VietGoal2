import { Injectable } from '@angular/core';
import { UserGroup } from '../../models/acl/usergroup';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ImportViewModel } from 'app/models/importviewmodel';
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

    addOrUpdateNhom(usergroup: UserGroup ): Observable<any> {
        if (usergroup.id == 0) {
            return this.http.post(environment.serverUrl + 'Groups', usergroup, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `Groups/${usergroup.id}`, usergroup, this.httpOptions);
        }
    }

    deleteNhom(id: number): Observable<any> {
        return this.http.delete(environment.apiUrl + `Groups/${id}`,this.httpOptions)
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `Groups/import`, importViewModel , this.httpOptions);
    }
}