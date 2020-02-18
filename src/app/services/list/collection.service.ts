import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { Collection } from 'app/models/list/collection';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CollectionService {
    ttlhList: Collection[];
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    };

    constructor(private http: HttpClient) {
    }

    getCollectionList(filter: any): Observable<any>  {
        let queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'Collections?' + queryString, this.httpOptions);
    }

    getCollection(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `Collections/${id}` , this.httpOptions);
    }

    addOrUpdateCollection(Collection: Collection, by: null | number): Observable<any> {
        if(Collection.Id == 0) {
            Collection.CreatedBy = by;
        } else {
            Collection.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `Collections`, Collection, this.httpOptions);
    }

    deleteCollection(CollectionId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `Collections/${CollectionId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
}