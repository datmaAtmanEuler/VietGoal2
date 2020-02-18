import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { Recruit } from '../../models/list/recruit';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
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
        return this.http.get(environment.serverUrl_employee + 'recruits?' + queryString , this.httpOptions);
    }
    
    getRecruit(id: any): Observable<any> {
        return this.http.get(environment.serverUrl_employee + `recruits/${id}` , this.httpOptions);
    }

    addOrUpdateRecruit(recruit: Recruit, by: null | number): Observable<any> {
        recruit.DisplayOrder = parseInt(recruit.DisplayOrder + '');
        if (recruit.Id != 0 && recruit.Id) {
            recruit.UpdatedBy = by;
        } else {
            recruit.CreatedBy = by;
        }
        return this.http.post(environment.serverUrl_employee + `recruits/save`, recruit, this.httpOptions);
    }

    deleteRecruit(id: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl_employee + `recruits/${id}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}