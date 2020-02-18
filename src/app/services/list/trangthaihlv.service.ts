import { Injectable } from '@angular/core';
import { Filter } from '../../models/filter/filter';
import { TrangThaiHLV } from '../../models/list/trangthaihlv';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class TrangThaiHLVService {
      ttlhList: TrangThaiHLV[];
  
      constructor(private http: HttpClient) {
      }
      
    httpOptions = { 
        headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
        })  
  }; 

  
    //   getTrangThaiHLVList(filter: Filter) {
    //       const result:TrangThaiHLV[] = this.ttlhList.filter((trangThaiHLV: TrangThaiHLV) => filter.SearchTerm == '' || (filter.SearchTerm != '' && trangThaiHLV.CoachStatusName.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
    //       return result;
    //   }
      
    //   getTrangThaiHLV(id: any): TrangThaiHLV {
    //       if(id) {
    //           const result: TrangThaiHLV[] = this.ttlhList.filter((TrangThaiHLV: TrangThaiHLV) => TrangThaiHLV.Id == id);
    //           return new TrangThaiHLV(result[0].Id, result[0].CoachStatusCode, result[0].CoachStatusName);
    //       }
    //       return new TrangThaiHLV(0, '', '');
    //   }
  
    //   addOrUpdateTrangThaiHLV(trangThaiHLV: TrangThaiHLV): boolean {
    //       if(trangThaiHLV.Id == 0) {
    //           if (this.ttlhList.filter((cv: TrangThaiHLV) => cv.CoachStatusCode == trangThaiHLV.CoachStatusCode).length > 0) {
    //               return false;
    //           }
    //           trangThaiHLV.Id = this.ttlhList.length + 1;
    //           this.ttlhList.push(trangThaiHLV);
    //       } else {
    //           if (this.ttlhList.filter((cv: TrangThaiHLV) => cv.CoachStatusCode == trangThaiHLV.CoachStatusCode && cv.Id != trangThaiHLV.Id).length > 0) {
    //               return false;
    //           } else {
    //               const tempTrangThaiHLV: TrangThaiHLV[] = this.ttlhList.filter((cv: TrangThaiHLV) => cv.Id == trangThaiHLV.Id);
    //               tempTrangThaiHLV[0].CoachStatusCode = trangThaiHLV.CoachStatusCode;
    //               tempTrangThaiHLV[0].CoachStatusName = trangThaiHLV.CoachStatusName;
    //           }
    //       }
    //       return true;
    //   }
  
    //   deleteTrangThaiHLV(trangThaiHLVId: number) {
    //       const id: number = this.ttlhList.map((cv: TrangThaiHLV) => cv.Id).indexOf(trangThaiHLVId);
    //       if(id != -1) {
    //           this.ttlhList.splice(id, 1);
    //       }
    //   }
    getTrangThaiHLVList(filter: any): Observable<any>  {
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        return this.http.get(environment.serverUrl + 'CoachStatus?' + queryString , this.httpOptions);
    }
    
    getTrangThaiHLV(id: any): Observable<any>  {
        return this.http.get(environment.serverUrl + `CoachStatus/${id}` , this.httpOptions);
    }

    addOrUpdateTrangThaiHLV(trangThaiHLV: TrangThaiHLV, by: null | number): Observable<any> {
        if(trangThaiHLV.Id == 0) {
            trangThaiHLV.CreatedBy = by;
        } else {
            trangThaiHLV.UpdatedBy = by;
        }
        return this.http.post(environment.serverUrl + `CoachStatus`, trangThaiHLV, this.httpOptions);
    }

    deleteTrangThaiHLV(trangThaiHLVId: number, deletedBy: number): Observable<any> {
        return this.http.delete(environment.serverUrl + `CoachStatus/${trangThaiHLVId}?deletedBy=${deletedBy}` , this.httpOptions);
    }
  }