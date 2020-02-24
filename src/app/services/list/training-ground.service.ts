import { Injectable } from '@angular/core';
import { TrainingGround } from '../../models/list/training-ground';
import { Filter } from '../../models/filter/filter';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImportViewModel } from '../../models/importviewmodel';

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
        return this.http.get(environment.apiUrl + 'TrainingGrounds?' + queryString , this.httpOptions);
    }
    
    getTrainingGround(id: any): Observable<any> {
        return this.http.get(environment.apiUrl + `TrainingGrounds/${id}` , this.httpOptions);
    }

    addOrUpdateTrainingGround(train: TrainingGround, by: null | number): Observable<any> {
        train.DisplayOrder = parseInt(train.DisplayOrder + '');
        if (train.Id != 0 && train.Id) {
            train.UpdatedBy = by;
        } else {
            train.CreatedBy = by;
        }
        return this.http.post(environment.apiUrl + `TrainingGrounds`, train, this.httpOptions);
    }

    deleteTrainingGround(id: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.apiUrl + `TrainingGrounds/${id}?deletedBy=${deletedBy}` , this.httpOptions);
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `TrainingGrounds/import`, importViewModel , this.httpOptions);
    }
}