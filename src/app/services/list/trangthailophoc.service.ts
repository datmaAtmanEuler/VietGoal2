import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { TrangThaiLopHoc } from '../../models/list/trangthailophoc';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TrangThaiLopHocService {
    ttlhList: TrangThaiLopHoc[];

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    };


    constructor(private http: HttpClient) {
    }

    getTrangThaiLopHocList(filter: any): Observable<any> {
        let queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'ClassStatus?' + queryString, this.httpOptions);
    }

    getTrangThaiLopHoc(id: any): Observable<any> {
        return this.http.get(environment.serverUrl + `ClassStatus/${id}`, this.httpOptions);
    }

    addOrUpdateTrangThaiLopHoc(trangThaiLopHoc: TrangThaiLopHoc, by: null | number): Observable<any> {
        if (trangThaiLopHoc.Id == 0) {
            trangThaiLopHoc.CreatedBy = by;
        } else {
            trangThaiLopHoc.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `ClassStatus`, trangThaiLopHoc, this.httpOptions);
    }

    deleteTrangThaiLopHoc(trangThaiLopHocId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `ClassStatus/${trangThaiLopHocId}?deletedBy=${deletedBy}`, this.httpOptions);
    }
}