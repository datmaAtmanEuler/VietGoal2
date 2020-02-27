import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KpiConfigService {
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 


    constructor(private http: HttpClient) {
    }

    getKpiConfigsList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'KpiConfigs?' + queryString , this.httpOptions);
    }
    
    getKpiConfig(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `KpiConfigs/${id}` , this.httpOptions);
    }

    addOrUpdateKpiConfig(kpiConfig: any): Observable<any> {
        if (kpiConfig.id == 0) {
            return this.http.post(environment.serverUrl + 'KpiConfigs', kpiConfig, this.httpOptions);
        } else {
            return this.http.put(environment.serverUrl + `KpiConfigs/${kpiConfig.id}`, kpiConfig, this.httpOptions);
        }
    }

    deleteKpiConfig(kpiCongigId: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `KpiConfigs/${kpiConfigId}` , this.httpOptions);
    }
}