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
        return this.http.get(environment.serverUrl + 'TrainingGrounds?' + queryString , this.httpOptions);
    }
    
    getTrainingGround(id: any): Observable<any> {
        return this.http.get(environment.serverUrl + `TrainingGrounds/${id}` , this.httpOptions);
    }

    addOrUpdateTrainingGround(train: TrainingGround): Observable<any> {
        if (train.id == 0) {
            return this.http.post(environment.serverUrl + 'TrainingGrounds', train, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `TrainingGrounds/${train.id}`, train, this.httpOptions);
        }
    }

    deleteTrainingGround(id: number): Observable<any> {
        return this.http.delete(environment.apiUrl + `TrainingGrounds/${id}` , this.httpOptions);
    }
    getTemplate(fileName: string) {
        return `${environment.serverOriginUrl}Docs/Templates/${fileName}`;
    }

    import(importViewModel: ImportViewModel): Observable<any> {
        return this.http.post(environment.serverUrl_employee + `TrainingGrounds/import`, importViewModel , this.httpOptions);
    }
}