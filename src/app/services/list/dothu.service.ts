import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { DotThu } from 'app/models/list/dotthu';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DotThuService {
    ttlhList: DotThu[];
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    };

    constructor(private http: HttpClient) {
    }

    getDotThuList(filter: any): Observable<any>  {
        let queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Collections?' + queryString, this.httpOptions);
    }

    getDotThu(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `Collections/${id}` , this.httpOptions);
    }

    addOrUpdateDotThu(DotThu: DotThu, by: null | number): Observable<any> {
        if(DotThu.Id == 0) {
            DotThu.CreatedBy = by;
        } else {
            DotThu.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `Centrals`, DotThu, this.httpOptions);
    }

    deleteDotThu(DotThuId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Centrals/${DotThuId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}