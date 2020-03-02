import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Filter } from 'app/models/filter/filter';
import { ImportViewModel } from 'app/models/importviewmodel';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 


    constructor(private http: HttpClient) {
    }

    getCoachsList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl_employee + 'Coachs?' + queryString , this.httpOptions);
    }

    getCoachSchedulesList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl_employee + 'CoachSchedules?' + queryString , this.httpOptions);
    }

     getCoachSelectWithExcludesList(filter: any, excludesList: any[]): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.post(environment.serverUrl_employee + 'Coachs/GetCoachSelectWithExcludesList?' + queryString, excludesList , this.httpOptions);
    }
    
    getCoach(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl_employee + `Coach/${id}` , this.httpOptions);
    }

    addOrUpdateCoach(Coach: any, by: null | number): Observable<any> {
        if(Coach.id == 0) {
            Coach.createdBy = by;
        } else {
            Coach.updatedBy = by;
        }
        return this.http.post(environment.serverUrl_employee + `Coachs`, Coach, this.httpOptions);
    }

    deleteCoach(CoachId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl_employee + `Coachs/${CoachId}?deletedBy=${deletedBy}` , this.httpOptions);
    }

    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `Coachs/import`, importViewModel , this.httpOptions);
    }
}