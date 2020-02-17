import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { LuaTuoi } from 'app/models/danhmuc/luatuoi';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LuaTuoiService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    };
    ttlhList: LuaTuoi[];
    constructor(private http: HttpClient) {
    }

    getLuaTuoiList(filter: any): Observable<any>{
        let queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Ages?' + queryString, this.httpOptions);
    }

    getLuaTuoi(id: any): Observable<any> {
        return this.http.get(environment.serverUrl + `Ages/${id}` , this.httpOptions);
    }

    addOrUpdateLuaTuoi(LuaTuoi: LuaTuoi, by: null | number): Observable<any> {
        if(LuaTuoi.Id == 0) {
            LuaTuoi.CreatedBy = by;
        } else {
            LuaTuoi.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `Ages`, LuaTuoi, this.httpOptions);
    }

    deleteLuaTuoi(LuaTuoiId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Ages/${LuaTuoiId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}