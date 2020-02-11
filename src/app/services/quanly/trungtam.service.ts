import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trungtam } from '../../models/quanly/trungtam';
import { environment } from 'environments/environment';
import { Filter } from 'app/models/filter/filter';
@Injectable({
  providedIn: 'root'
})
export class TrungtamService {
    httpOptions = { 
          headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
          })  
    }; 

    trungtamlist: Trungtam[] ;

    constructor(private http: HttpClient) {
    }

    getTrungtamsList(filter: null | Filter) {
        // const result:Trungtam[] = this.trungtamlist.filter((trungtam: Trungtam) => filter.SearchTerm == '' || (filter.SearchTerm != '' && trungtam.TenTrungTam.toLowerCase().indexOf(filter.SearchTerm.toLowerCase()) != -1));
        // return result;
        
        var result:Trungtam[];
        let queryString =  Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
        this.http.get(environment.serverUrl + 'provinces?' + queryString , this.httpOptions).subscribe((list: any) => {
            
        });
        return result;
    }
    
    getTrungtam(id: any): Trungtam {
        const result: Trungtam[] = this.trungtamlist.filter((trungtam: Trungtam) => trungtam.Id == id);
        return new Trungtam(result[0].Id, result[0].MaTrungTam, result[0].TenTrungTam, result[0].DiaChi, result[0].DTKhuonVien
            , result[0].TinhThanh, result[0].QuanHuyen, result[0].PhuongXa, result[0].DienThoai, result[0].NgayThanhLap, result[0].GhiChu, result[0].isHienThi);
    }

    addOrUpdateTrungtam(trungtam: Trungtam): boolean {
        if(trungtam.Id == 0) {
            if (this.trungtamlist.filter((tt: Trungtam) => tt.MaTrungTam == trungtam.MaTrungTam).length > 0) {
                return false;
            }
            trungtam.Id = this.trungtamlist.length + 1;
            this.trungtamlist.push(trungtam);
        } else {
            if (this.trungtamlist.filter((tt: Trungtam) => tt.MaTrungTam == trungtam.MaTrungTam && tt.Id != trungtam.Id).length > 0) {
                return false;
            } else {
                const temptrungtam: Trungtam[] = this.trungtamlist.filter((tt: Trungtam) => tt.Id == trungtam.Id);
                temptrungtam[0].MaTrungTam = trungtam.MaTrungTam;
                temptrungtam[0].TenTrungTam = trungtam.TenTrungTam;
                temptrungtam[0].DiaChi = trungtam.DiaChi;
                temptrungtam[0].DTKhuonVien = trungtam.DTKhuonVien;
                temptrungtam[0].TinhThanh = trungtam.TinhThanh;
                temptrungtam[0].QuanHuyen = trungtam.QuanHuyen;
                temptrungtam[0].PhuongXa = trungtam.PhuongXa;
                temptrungtam[0].DienThoai = trungtam.DienThoai;
                temptrungtam[0].NgayThanhLap = trungtam.NgayThanhLap;
                temptrungtam[0].GhiChu = trungtam.GhiChu;
                temptrungtam[0].isHienThi = trungtam.isHienThi;
                console.log(this.trungtamlist);
            }
        }
        return true;
    }

    deleteTrungtam(trungtamId: number) {
        const id: number = this.trungtamlist.map((trungtam: Trungtam) => trungtam.Id).indexOf(trungtamId);
        if(id != -1) {
            this.trungtamlist.splice(id, 1);
        }
    }
}