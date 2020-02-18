import { Injectable } from '@angular/core';
import { TrainingGround } from '../../models/list/training-ground';
import { Filter } from '../../models/filter/filter';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingGroundService {
    httpOptions = {  
        headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
        })  
  }; 
    constructor(private http:HttpClient) {
    }

    getTrainingGroundsList(filter: any): Observable<any> {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl_employee + 'TrainingGround?' + queryString , this.httpOptions);
    }
    
    getTrainingGround(id: any): Observable<any> {
        return this.http.get(environment.serverUrl_employee + `TrainingGround/${id}` , this.httpOptions);
    }

    addOrUpdateTrainingGround(yard: TrainingGround, by: null | number): Observable<any> {
        yard.DisplayOrder = parseInt(yard.DisplayOrder + '');
        if (yard.Id != 0 && yard.Id) {
            yard.UpdatedBy = by;
        } else {
            yard.CreatedBy = by;
        }
        return this.http.post(environment.serverUrl_employee + `TrainingGround/save`, yard, this.httpOptions);
    }

    deleteTrainingGround(id: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl_employee + `TrainingGround/${id}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}