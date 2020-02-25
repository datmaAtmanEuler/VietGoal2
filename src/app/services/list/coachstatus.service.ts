import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { CoachStatus } from '../../models/list/coachstatus';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { ImportViewModel } from 'app/models/importviewmodel';

@Injectable({
    providedIn: 'root'
  })
  export class CoachStatusService {
      ttlhList: CoachStatus[];
  
      constructor(private http: HttpClient) {
      }
      
    httpOptions = { 
        headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
        })  
  }; 

    getCoachStatusList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'CoachStatus?' + queryString , this.httpOptions);
    }
    
    getCoachStatus(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `CoachStatus/${id}` , this.httpOptions);
    }

    addOrUpdateCoachStatus(CoachStatus: CoachStatus): Observable<any> {
        if (CoachStatus.id == 0) {
            return this.http.post(environment.serverUrl + 'CoachStatus', CoachStatus, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `CoachStatus/${CoachStatus.id}`, CoachStatus, this.httpOptions);
        }
    }

    deleteCoachStatus(CoachStatusId: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `CoachStatus/${CoachStatusId}` , this.httpOptions);
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `CoachStatus/import`, importViewModel , this.httpOptions);
    }
  }