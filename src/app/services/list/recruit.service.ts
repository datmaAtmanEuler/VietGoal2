import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { Recruit } from '../../models/list/recruit';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ImportViewModel } from 'app/models/importviewmodel';

@Injectable({
    providedIn: 'root'
  })
  export class RecruitService {
    httpOptions = {  
        headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
        })  
  }; 
      constructor(private http: HttpClient) {
      }
  
      getRecruitsList(filter: any): Observable<any> {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.apiUrl + 'Recruits?' + queryString , this.httpOptions);
    }
    
    getRecruit(id: any): Observable<any> {
        return this.http.get(environment.serverUrl + `Recruits/${id}` , this.httpOptions);
    }

    addOrUpdateRecruit(recruit: Recruit): Observable<any> {
        if (recruit.id == 0) {
            return this.http.post(environment.serverUrl + 'Recruits', recruit, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `Recruits/${recruit.id}`, recruit, this.httpOptions);
        }
    }

    deleteRecruit(id: number): Observable<any> {
        return this.http.delete(environment.apiUrl + `Recruits/${id}` , this.httpOptions);
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `Recruits/import`, importViewModel , this.httpOptions);
    }
}