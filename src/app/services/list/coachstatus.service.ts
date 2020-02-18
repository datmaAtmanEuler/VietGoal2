import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { CoachStatus } from '../../models/list/coachstatus';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

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

    addOrUpdateCoachStatus(CoachStatus: CoachStatus, by: null | number): Observable<any> {
        if(CoachStatus.Id == 0) {
            CoachStatus.CreatedBy = by;
        } else {
            CoachStatus.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `CoachStatus`, CoachStatus, this.httpOptions);
    }

    deleteCoachStatus(CoachStatusId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `CoachStatus/${CoachStatusId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
  }